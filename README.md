# Mern Authentication 
This is the full stack project of authentication.  


## 🚀Gettting Started  

  1. clone this repository  
  ```bash 
  git clone  https://github.com/venkateshg12/mernauth.git
  ```
  2. Enter Directory
  ```bash
  cd mernauth
  ```
  3. Install dependencies.  
  ```bash
  npm install
  ```
  4. Starting the server.  
  ```bash
  npm run dev
  ```
  ### open the [localhost:5173](localhost:5173) in your browser.   

# Steps for building the project

## Installing packages and dependencies

 1. install vite and tailwindcss packages

 ```bash 
  npm create vite@latest mernauth
  ```
 2. Enter the directory  
 ```bash
 cd mernauth
 ````

 ```bash
 cd client
 ```

 3. Install dependencies
 ```bash
 npm install
 ```

 4. Install tailwindcss
 ```bash
 npm install tailwindcss @tailwindcss/vite
 ```

 5. Start the server
 ```bash
 npm run dev
 ```

 ## Install the react-router-dom
 ```bash
  npm install react-router-dom
  ```
  - Add BrowserRouter, Router, route to the `App.jsx` file.  


## Creating the Backend Server

1. create a file outside client folder named api
```bash
mkdir api
```
2. Enter the api directory
```bash
cd api
```
3. install npm and typescript dependencies
```bash
npm init -y
```
4. Install the express server
```bash
npm install express
```
5. Install Typescript dependencies 
```bash
npm install --save-dev typescript @types/node @types/express
```
```bash
npm tsc --init
```
- create two folders named dist and src to store `.js` files and `.ts` files inside api folder
- go to `tsconfig.json`
- change or update these dependencies 
-  "outDir": "./dist", 
-  "rootDir": "./src",                                 

6. Install ts-node-dev
```bash
npm install --save-dev ts-node-dev
```
- add below to the scripts in `package.json` file

```bash
"dev": "ts-node-dev src/index.ts"
```
7. make sure you have all of this inside scripts
```bash
"scripts": {
  "dev": "ts-node-dev src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```
- `ts-node-dev` uses `ts-node` under the hood.
- `ts-node` compiles TypeScript in-memory and runs it without creating any `.js` files.
- It's fast and ideal for development since it also watches for changes and auto-restarts.
- It will directly execute `index.ts` without generating a `.js` file like `index.js`.
- No need use the nodemon also.

7. Inside `package.json` file under the description paste the below line so you cannot have any while imports
```bash
"type" : "module"
```
## Creating files and folders for Backend.
1. Create `index.ts` file in src folder
2. Create constants and config folder inside src folder
3. Create `env.ts` file in constants folder
4. Create `db.ts` file in config folder
5. create .env inside the api folder.

## Connecting to monogodb database server

-  Install the mongoose
```bash
npm install mongoose
```
- Write logic for connection to mongodb server inside db.ts file .
- Declare and export all the env variables inside the `env.ts` file.
- Start the server inside  `index.ts`.
