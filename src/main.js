const fs = require("fs");
const os = require("os");
const path = require("path");

function getEnvFilePath(customPath) {
  return customPath || path.resolve(__dirname, ".env");
}

// Read .env file and convert to array
const readEnvVars = (filePath) => fs.readFileSync(filePath, "utf-8").split(os.EOL);

/**
 * Finds the key in .env files and returns the corresponding value
 *
 * @param {string} key Key to find
 * @param {string} [filePath] Optional custom file path for the .env file
 * @returns {string|null} Value of the key
 */
const getDotEnvValue = (key, filePath) => {
  const envFilePath = getEnvFilePath(filePath);
  const matchedLine = readEnvVars(envFilePath).find((line) => line.split("=")[0] === key);
  return matchedLine !== undefined ? matchedLine.split("=")[1] : null;
};

/**
 * Updates value for existing key or creates a new key=value line
 *
 * @param {string} key Key to update/insert
 * @param {string} value Value to update/insert
 * @param {string} [filePath] Optional custom file path for the .env file
 */
const setDotEnvValue = (key, value, filePath) => {
  const envFilePath = getEnvFilePath(filePath);
  const envVars = readEnvVars(envFilePath);
  const targetLine = envVars.find((line) => line.split("=")[0] === key);
  if (targetLine !== undefined) {
    const targetLineIndex = envVars.indexOf(targetLine);
    envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
  } else {
    envVars.push(`${key}="${value}"`);
  }
  fs.writeFileSync(envFilePath, envVars.join(os.EOL));
};

/**
 * Converts the entire .env file into a JSON object
 *
 * @param {string} [filePath] Optional custom file path for the .env file
 * @returns {Object} JSON representation of the .env file
 */
const getAllDotEnvAsJSON = (filePath) => {
  const envFilePath = getEnvFilePath(filePath);
  const envVars = readEnvVars(envFilePath);
  const envObj = {};
  envVars.forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value !== undefined) {
      envObj[key.trim()] = value.trim().replace(/^"|"$/g, '');
    }
  });
  return envObj;
};

/**
 * Writes a JSON object back to the .env file
 *
 * @param {Object} jsonObj JSON object with key-value pairs
 * @param {string} [filePath] Optional custom file path for the .env file
 */
const writeJSONToDotEnv = (jsonObj, filePath) => {
  const envFilePath = getEnvFilePath(filePath);
  const envVars = Object.entries(jsonObj).map(([key, value]) => `${key}="${value}"`);
  fs.writeFileSync(envFilePath, envVars.join(os.EOL));
};

module.exports = { setDotEnvValue, getDotEnvValue, getAllDotEnvAsJSON, writeJSONToDotEnv };
