#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const editDotEnv = require("./main.js")

let envFilePath = "";

const REPL_PREAMBLE = "\nSelect operation:";
const REPL_OPS = [
  "Get value",
  "Set value",
  "Convert .env to JSON file",
  "Convert JSON file to .env",
  "Exit"
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const bye = function () {
  console.log("Exiting...");
  rl.close();
};

function askForEnvFile(callback) {
  rl.question("Enter the path to the .env file: ", (filePath) => {
    if (!fs.existsSync(filePath)) {
      console.log("Invalid file path, please check the path and try again.");
      return askForEnvFile(callback);
    }
    envFilePath = path.resolve(filePath);
    callback();
  });
}

function getValue() {
  rl.question("Enter the key to retrieve: ", (key) => {
    const value = editDotEnv.getDotEnvValue(key, envFilePath);
    if (value !== null) {
      console.log(`Value for ${key}: ${value}`);
    } else {
      console.log(`Key "${key}" not found.`);
    }
    mainMenu();
  });
}

function setValue() {
  rl.question("Enter the key to set: ", (key) => {
    rl.question("Enter the value: ", (value) => {
      editDotEnv.setDotEnvValue(key, value, envFilePath);
      console.log(`Set ${key}=${value}`);
      mainMenu();
    });
  });
}

function convertDotEnvToJson() {
  rl.question("Enter the path to save the JSON file: ", (jsonFilePath) => {
    const envVarsAsJson = editDotEnv.getAllDotEnvAsJSON(envFilePath);
    fs.writeFileSync(jsonFilePath, JSON.stringify(envVarsAsJson, null, 2));
    console.log(
      `Saved ${Object.keys(envVarsAsJson).length} key/value pairs to ${jsonFilePath}`
    );
    mainMenu();
  });
}

function convertJsonToDotEnv() {
  rl.question("Please provide the path to the JSON file: ", (jsonFilePath) => {
    if (!fs.existsSync(jsonFilePath)) {
      console.log("Invalid file path, please check the path and try again.");
      mainMenu();
      return;
    }

    const jsonContent = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    if (fs.existsSync(envFilePath)) {
      rl.question(
        ".env file already exists in the current directory! Do you want to overwrite it? Y/N: ",
        (overwrite) => {
          if (overwrite.toUpperCase() === "Y") {
            editDotEnv.writeJSONToDotEnv(jsonContent, envFilePath);
            console.log(
              `Saved ${Object.keys(jsonContent).length} key/value pairs to ${envFilePath}`
            );
          } else {
            console.log("Operation cancelled.");
          }
          mainMenu();
        }
      );
    } else {
      editDotEnv.writeJSONToDotEnv(jsonContent, envFilePath);
      console.log(
        `Saved ${Object.keys(jsonContent).length} key/value pairs to ${envFilePath}`
      );
      mainMenu();
    }
  });
}

function mainMenu() {
  console.log(REPL_PREAMBLE);
  REPL_OPS.forEach((op, idx) => console.log(`${idx + 1}) ${op}`));

  rl.question("> ", (choice) => {
    const selectedOp = parseInt(choice, 10);
    if (isNaN(selectedOp) || selectedOp < 1 || selectedOp > REPL_OPS.length) {
      console.log("Invalid selection, please try again.");
      mainMenu();
    } else if (selectedOp === 5) {
      bye();
    } else {
      askForEnvFile(() => {
        const operations = [getValue, setValue, convertDotEnvToJson, convertJsonToDotEnv];
        operations[selectedOp - 1]();
      });
    }
  });
}

mainMenu();
