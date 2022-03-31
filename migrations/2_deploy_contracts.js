var Election = artifacts.require("./Election.sol");
//'artifacts' represents the contract abstraction specific to truffle,
//giving us an election artifact that represents our smart contract...
//truffle exposes this to the rest of our app so that we can interact with it.

module.exports = function(deployer) {
  deployer.deploy(Election);
};
//this function deploys the contract via this migration.
