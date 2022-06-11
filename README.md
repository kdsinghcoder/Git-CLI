<p align="center">
 <img src="https://user-images.githubusercontent.com/50829119/173206408-2e91c683-3e55-47ef-afe0-4c978f225d0c.png" alt="The Documentation Compendium"></a>
</p>

<h3 align="center">Welcome to Git-Cli</h3>

## Table of Contents
- [About](#about)
- [How to Install](#install)
- [Usage](#use)
  - [Adding `.CSV` file to `./Data`](#cvs)
  - [`Help` cmd](#help)
  - [`Input` cmd](#input)
  - [`Update` cmd](#update) 
  - [`show` cmd](#show)
- [Dependencies](#dependencies)
 

## About <a name="about"></a>

`git-Cli` is a CLI tool automation tool developed to maintain the packages of multiple projects of an organization up to date. It provides a simple and hassle-free process of updating outdated dependencies of a repository, to do so CLIis fed with the repo name and linked to it, this can be easily done for multiple repositories at once using the `.csv` file. Once data is fed into the CLI, it makes GitHub API calls to fetch package versions if found that a package is outdated we also have an option to --update the package and simultaneously create a pull request to update the package.

<!-- GETTING STARTED -->
## Getting Started

Follow the process below to start working with git-Cli.

### Prerequisites

make sure u have a stable version of npm and node.js installed locally on your pc.
* npm
  ```sh
  npm install npm@latest -g
  ```
[Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Link NPM
   ```sh
   npm link
   ```
4. Get a free access token Key from github follow the link for the same. [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

5. Enter your Token in `.env` file
   ```js
    Token = [ENTER YOUR Token];
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


## Usage <a name="use"></a>

### **Adding `.CSV` file to `./Data`** <a name="csv"></a>

 - [ ] _add input.csv file to ```./data``` directory  in the root folder_
 - [ ] Your input.csv file must look like as below
      | name | repo |
      | :---: | :---: |
      | kdsinghcoder-sample-app-1 | https://github.com/kdsinghcoder/Travel-Buddy |
      | kdsinghcoder-sample-app-2 | https://github.com/kdsinghcoder/crowd-funding-for-artists |
      | kdsinghcoder-sample-app-3 | https://github.com/kdsinghcoder/hackoff_donate |
 - [ ] Make sute it have two parameters ```name``` and ```repo```

### **`Help` cmd** <a name="help"></a>
    _used to view cmd's and documentations_
 - **cmd**
  ```sh
  git-cli -h
  ```
- **expected output**
  ![image](https://user-images.githubusercontent.com/50829119/173206431-b5bac969-48a2-40f6-b29e-625d8156be32.png)

### **`show` cmd** <a name="show"></a>
   _Is used to view input.csv file_
    
 - **cmd**
  ```sh
  git-cli show
  ```
- **expected output**
  ![image](https://user-images.githubusercontent.com/50829119/173206483-8b9ad956-8bdf-4ebf-be3e-7bf745fcaa30.png)


### **`Input` cmd** <a name="input"></a>
   _Is used to fed in data to the CLI_
    
 - **cmd**
  ```sh
  git-cli input input.csv <package>@<version>
  ```
- **expected output**
  ![image](https://user-images.githubusercontent.com/50829119/173206609-abb0ae45-d1af-4f78-895e-2310b2b5ae4a.png)

### **`Update` cmd** <a name="update"></a>
   _used to generate pull request for outdated packages_

 - **cmd**
  ```sh
  git-cli input input.csv <package>@<version> update
  ```
- **expected output**
  ![image](https://user-images.githubusercontent.com/50829119/173206747-ff2269bf-ebfd-4e2c-9d18-38d949d3f96e.png)

  **Pull req musht be created**
  ![image](https://user-images.githubusercontent.com/50829119/171434708-40d28437-8be1-4e0c-a56c-a75b27d7de92.png)
  
  **Pull Req**
  ![image](https://user-images.githubusercontent.com/50829119/171446665-fca845c8-d09e-44c4-ad3e-f7920bd2384c.png)

