const ethers = require("ethers");
const cluster = require("cluster");

const prefix = ""; // * CHANGE THIS
const suffix = ""; // * CHANGE THIS
const hexReg = /^[0-9A-Fa-f]*$/;

const threads = "10";

let hasFoundIt = false;
const start = new Date().getTime();

const handleMessage = (msg) => {
  if (msg.data) {
    killAllWorkers();

    const end = new Date().getTime();
    const time = end - start;
    console.log(`\nExecution Time: ${time / 1000} seconds`);
  }
};

const killAllWorkers = () => {
  for (const id in cluster.workers) {
    const workerPID = cluster.workers[id].process.pid;
    // console.log(`worker ${workerPID} killed`);
    process.kill(workerPID);
  }
};

const verifyAddress = (wallet) => {
  const address = wallet.address;

  if (
    address.substring(2, prefix.length + 2) == prefix &&
    address.substring(address.length, address.length - suffix.length) == suffix
  ) {
    console.log(`\nFound it!`);
    console.log(`Public key: ${address}`);
    console.log(`Private Key: ${wallet.privateKey}`);
    hasFoundIt = true;
    return true;
  }
};

if (prefix.match(hexReg) && suffix.match(hexReg)) {
  if (cluster.isMaster) {
    // main process
    console.log(`${threads} workers in processing...`);

    for (let i = 0; i < threads; i++) {
      // spawn a new worker process.
      const worker = cluster.fork();

      // adds listener to worker
      worker.on("message", (msg) => handleMessage(msg));
    }
  } else {
    // const workerPID = cluster.worker.process.pid;
    // console.log(`Worker: ${workerPID} `);

    while (!hasFoundIt) {
      // generate random wallet
      // TODO: add extra entropy
      const wallet = ethers.Wallet.createRandom();

      // check the conditions
      if (verifyAddress(wallet)) process.send({ data: true });
    }
  }
} else console.log(`Incorrect params...`);
