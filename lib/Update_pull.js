const auth = require("./cred");

function get_branch(url){
    var left =url.split("?");
    var right =left[1].split("=");
    return (right[1]);
}
async function get_content(octokit, userName,repoName,path,ref) {
    if (ref != null) {
        // console.log("calling with option");
        resp = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}?ref={ref}",
            {
                owner: userName,
                repo: repoName,
                path: path,
                ref: ref,
            }
        );
    } else {
        resp = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
            owner: userName,
            repo: repoName,
            path: path,
        });
    }
    return {
        content: Buffer.from(resp.data.content, "base64").toString(),
        sha: resp.data.sha,
        url: resp.data.url,
    };
}

async function fetchBranch(octokit,userName,repoName,ref){
   
    
    let resp =await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
        owner: userName,
        repo: repoName,
        ref: ref
      })
      return resp.data
}

async function create_new_branch(octokit,userName,repoName,newBranchName,sha){

   
    let resp =await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
        owner: userName,
        repo: repoName,
        ref: 'refs/heads/'+newBranchName,
        sha:sha
      })

    return resp.data
}

async function update_file(octokit,userName,repoName,content,sha,branchName,message,path){
    const response =await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: userName,
        repo: repoName,
        path: path,
        message: message,
        content: Buffer.from(content,'utf8').toString('base64'),
        branch: branchName,
        sha: sha
      }) 
      return response;
}

async function create_pull(octokit,userName,repoName,baseBranch,headBranch,title,body){
    let resp = await octokit.request('POST /repos/{owner}/{repo}/pulls', {
        owner: userName,
        repo: repoName,
        title: title,
        body: body,
        head: userName+':'+headBranch,
        base: baseBranch
      })
    //   console.log('Create a PR',resp.data)

      return resp.data.url;
    }


async function Update_pull(url, package , version) {
    if (url.charAt(url.length - 1) == "/") {
        url = url.substring(0, url.length - 1);
    }
    var urlData = url.trim().split("/");
    // console.log(urlData);
    var userName = urlData[3];
    var repoName = urlData[4];
    var path = "package.json";
    const octokit = await auth.authenticate(); 
    var ref =null;
    //fetch file content
    var file_content = await get_content(octokit,userName,repoName,path,ref);
    //fetch base branch of repo
    var repo_branch = get_branch(file_content.url);

    //create new branch
    var base_branch = await fetchBranch(octokit,userName,repoName,'heads/'+repo_branch);
    //create new branch
    await create_new_branch(octokit,userName,repoName,"git-cli-tool", base_branch.object.sha)
    //read file contern from new branch

    //handling package.json
    var new_file_content = await get_content(octokit,userName,repoName,path,"git-cli-tool");
    var package_content = JSON.parse(new_file_content.content);
    //package , version
    if(package_content.dependencies[package]){
        package_content.dependencies[package]="^"+version;
    }
    await update_file(octokit,userName,repoName,JSON.stringify(package_content),new_file_content.sha,"git-cli-tool","updated packages",path)
    //handling pagkage-local.json
    var new_file_content_local = await get_content(octokit,userName,repoName,"package-lock.json","git-cli-tool");
    var package_content_local = JSON.parse(new_file_content_local.content);
    //package , version
    if(package_content_local.dependencies[package]){
        package_content_local.dependencies[package]="^"+version;
    }
    await update_file(octokit,userName,repoName,JSON.stringify(package_content_local),new_file_content_local.sha,"git-cli-tool","updated packages","package-lock.json");


    // async function create_pull(octokit,userName,repoName,baseBranch,headBranch,title,body){
    var link = await create_pull(octokit,userName,repoName,repo_branch,"git-cli-tool","Packages are updated","merge if not conflicting");


    return link;
}

module.exports = { Update_pull };
