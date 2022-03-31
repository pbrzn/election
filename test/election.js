//Requre the Election.sol file and store it in variable
const Election = artifacts.require('./Election.sol');

//Call the "contract" function, and write all our tests within the callback function.
//This callback function provides an "accounts" variable that represents all the accounts on our blockchain
contract("Election", function(accounts) {
  let electionInstance;

  it("initializes with two candidates", function() {
    return Election.deployed().then(instance => {
      return instance.candidatesCount()
    }).then(count => assert.equal(count, 2));
  })

  it("initializes with the correct values", function() {
    return Election.deployed().then(instance => {
      electionInstance = instance;
      return electionInstance.candidates(1)
    }).then(candidate => {
      assert.equal(candidate[0], 1, "contains the correct id");
      assert.equal(candidate[1], "Candidate One", "contains the correct name");
      assert.equal(candidate[2], 0, "contains the correct vote count");
      return electionInstance.candidates(2);
    }).then(candidate => {
      assert.equal(candidate[0], 2, "contains the correct id");
      assert.equal(candidate[1], "Candidate Two", "contains the correct name");
      assert.equal(candidate[2], 0, "contains the correct vote count");
    })
  })

  it("allows a voter to cast a vote", function() {
    return Election.deployed().then(instance => {
      electionInstance = instance;
      candidateId = 1;
      return electionInstance.vote(candidateId, { from: accounts[0] })
    }).then(voteReceipt => {
      return electionInstance.voters(accounts[0]);
    }).then(voted => {
      assert(voted, "the voter was marked as voted");
      return electionInstance.candidates(candidateId)
    }).then(candidate => {
      const voteCount = candidate[2];
      assert.equal(voteCount, 1, "the candidate's vote count has increased by 1")
    })
  })

  it("throws an exception for invalid candidates", function() {
    return Election.deployed().then(instance => {
      electionInstance = instance;
      return electionInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(error => {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return electionInstance.candidates(1);
    }).then(function(candidate1) {
      var voteCount = candidate1[2];
      assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
      return electionInstance.candidates(2);
    }).then(function(candidate2) {
      var voteCount = candidate2[2];
      assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
    })
  })

})
