const LuggageContract = artifacts.require("LuggageContract");

module.exports = function(deployer) {
  deployer.deploy(LuggageContract);
};
