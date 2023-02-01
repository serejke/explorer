import Web3 from 'web3';

async function main() {
  // console.log('asd');
  const web3 = new Web3("http://localhost:7545");
  const block = await web3.eth.getBlock(3);
  console.log(block);
  block.number
}

main();