// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Election {

  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  mapping(uint => Candidate) public candidates;

  uint256 public candidatesCount;
  /* using a counter-cash here to keep track of the numbner of candidates because...
  mappings are *not* iterable therefore there is no way to keep track of candidates
  from inside the mapping, so use the candidatesCount as a...
  roundabout means of tracking and iterating through candidates. */

  constructor() public {
    addCandidate("Candidate One");
    addCandidate("Candidate Two");
  }

  mapping(address => bool) public voters;

  function vote(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;
    }

  function addCandidate(string memory _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }
  /* We prepend nmae with an underscore here because it is...
  a local variable to this function, not a state variable. */
}
