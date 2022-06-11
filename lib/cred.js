require('dotenv').config({ override: true , debug: true });
const { Octokit } = require("@octokit/rest");
const colors = require("colors");

async function authenticate(){
    let token = process.env.Token;
    if(token){
       try{
          const octokit = new Octokit({
            auth: token,
           }); 
           return octokit;
       }catch (error){
         throw error;
       }
    }else{
       console.log("Please enter github api token in .env file".red);
    }

}
  
  module.exports = {authenticate};