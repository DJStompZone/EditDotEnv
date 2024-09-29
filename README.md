# editDotEnv

A lightweight Node.js module for reading, writing, and converting `.env` files. 
It is completely self-contained with no external dependencies, and includes a command-line utility for interactive editing. editDotEnv currently supports conversion to/from JSON, compatibility with other formats such as (XML, MessagePack, TOML, etc) may be added in future versions, based on popular demand.

<a href="https://discord.stomp.zone"><img src="https://github.com/user-attachments/assets/2cbf784e-9c49-46d1-9a27-645f41cc1c7b" height="35px"></img></a>

## Features

- **Get value**: Retrieve the value of a key in a `.env` file.
- **Set value**: Update or insert a key-value pair in a `.env` file.
- **Convert `.env` to JSON**: Convert all key-value pairs in a `.env` file to a JSON file.
- **Convert JSON to `.env`**: Convert a JSON file with key-value pairs to a `.env` file.
- **REPL utility**: A handy command-line interface to interactively perform the above operations.
- **Use it anywhere**: Can be installed globally (-g flag) to use editDotEnv in any of your projects.
- **Small footprint**: Because editDotEnv is self-sufficient, you can use it in your project without adding any other extra dependencies.

## Installation

### Node Package

```
npm install editdotenv
```

### Clone the Repository

Alternatively, you can clone this repository:

```bash
git clone https://github.com/DJStompZone/editdotenv.git
cd editdotenv
```

### Global Installation

To install the `editdotenv` package globally, run:

```
npm install -g editdotenv
```

Once installed, you can run the REPL from any directory by typing:

```
editdotenv
```

This will start the interactive REPL menu, allowing you to get, set, and convert `.env` files to/from JSON.


## Usage

### Module API

#### `getDotEnvValue(key, filePath)`

Retrieve the value of a specific key from a `.env` file.

```javascript
const editDotEnv = require('editdotenv');

const value = editDotEnv.getDotEnvValue('OPENAI_API_KEY', './config/.env');
console.log(`OpenAI API key: ${value}`);

// Output:
// OpenAI API key: sk-R290ZWVtISBIb29rLCBsaW5lLCBhbmQgc2lua2VyISA7KQ
```

- **Parameters**:
  - `key`: The key to retrieve.
  - `filePath`: (Optional) Path to the `.env` file. Defaults to `./.env`.
  
- **Returns**: The value of the key, or `null` if not found.

#### `setDotEnvValue(key, value, filePath)`

Set or update the value of a specific key in a `.env` file.

```javascript
editDotEnv.setDotEnvValue('DISCORD_TOKEN', 'new_token', './config/.env');
```

- **Parameters**:
  - `key`: The key to set.
  - `value`: The value to assign to the key.
  - `filePath`: (Optional) Path to the `.env` file. Defaults to `./.env`.

#### `getAllDotEnvAsJSON(filePath)`

Convert all key-value pairs in a `.env` file to a JSON object.

```javascript
const jsonObject = editDotEnv.getAllDotEnvAsJSON('./config/.env');
console.log(jsonObject);

// Output:
// {
//   OPENAI_API_KEY: 'sk-R290ZWVtISBIb29rLCBsaW5lLCBhbmQgc2lua2VyISA7KQ',
//   FFMPEG_PATH: '/usr/bin/why_did_i_even_put_this_here/ffmpeg',
//   DISCORD_TOKEN: 'new_token'
// }
```

- **Parameters**:
  - `filePath`: (Optional) Path to the `.env` file. Defaults to `./.env`.
  
- **Returns**: A JSON object representing the key-value pairs in the `.env` file.

#### `writeJSONToDotEnv(jsonObject, filePath)`

Convert a JSON object into a `.env` file.

```javascript
const jsonObject = {
  DISCORD_TOKEN: 'my-shiny-new-token',
  FFMPEG_PATH: '/usr/bin/why_did_i_even_put_this_here/ffmpeg',
  CREDENTIALS: 'access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJESlN0b21wWm9uZSIsImlhdCI6MTcyNzYzMDk5NywiZXhwIjoxNzU5MTY2OTk3LCJhdWQiOiJodHRwczovL2dpdGh1Yi5jb20iLCJzdWIiOiJ1c2VyQGdpdGh1Yi5jb20iLCJHaXZlbk5hbWUiOiJESiIsIlN1cm5hbWUiOiJTdG9tcCIsIkVtYWlsIjoiODU0NTczODErREpTdG9tcFpvbmVAdXNlcnMubm9yZXBseS5naXRodWIuY29tIiwiUm9sZSI6IkZvdW5kZXIiLCJPcmdhbml6YXRpb24iOiJTdG9tcFpvbmUifQ.bhvKUwOEdMtoWE6MFCddbkWk1E1ceknanuaJyZpmv8Q; scope=https://www.googleapis.com/auth/youtube-paid-content https://www.googleapis.com/auth/youtube; token_type=Bearer; expiry_date=2069-04-20T04:20:00.000Z'
};

editDotEnv.writeJSONToDotEnv(jsonObject, './config/.env');
```

- **Parameters**:
  - `jsonObject`: A JSON object with key-value pairs.
  - `filePath`: (Optional) Path to the `.env` file. Defaults to `./.env`.

### REPL (Interactive Command Line Utility)

You can run the REPL interface for easy editing of `.env` files:

```bash
node src/repl.js
```

**Menu Options:**
1. **Get value**: Retrieve a key's value from a `.env` file.
2. **Set value**: Set or update a key-value pair in a `.env` file.
3. **Convert .env to JSON**: Convert the `.env` file to a JSON file.
4. **Convert JSON to .env**: Convert a JSON file to a `.env` file.
5. **Exit**: Exit the REPL.

Example REPL session:

```
Select operation:
1) Get value
2) Set value
3) Convert .env to JSON file
4) Convert JSON file to .env
5) Exit
> 1

Enter the path to the .env file: ./config/.env
Enter the key to retrieve: FFMPEG_PATH
Value for FFMPEG_PATH: /usr/bin/why_did_i_even_put_this_here/ffmpeg
```

## License

This project is licensed under the MIT License.

## Contributing

Feel free to contribute by submitting pull requests or opening issues for bugs, suggestions, or feature requests.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request
