# eth-wgen

Allows you to generate a custom Ethereum wallet by specifying the prefix and/or suffix.
The script uses Node.js Clusters to improve the speed of the entire process.

Clusters processes can be used to run multiple instances of Node.js that can distribute workloads among their application threads.

## Installation

Install all packages required from root folder.

```bash
npm install
```

## Usage

Set the prefix and/or suffix constants within the code and run the script.
It will take 'x' amount of time depending on the length of the strings

```bash
node index.js
```

## TODO

- Add extra (custom) entropy to the creation stage
- Find the maximum number of workers (recommended) for the machine
- Add estimate time required for the process