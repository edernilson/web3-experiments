// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

struct Voting {
    Participant[] participants;
    uint maxDate; //nao tem data, mais pode armarzenar o timestamp
}

struct Participant {
    string name;
    string photo;
    uint votes;
}

struct Vote {
    uint choice; // 1 ou 2
    uint date;
}

contract Webbb3 {


    address owner;
    uint currentVoting = 0;
    uint currentParticipantId = 0;

    Voting[] votings;
    // Estrutura para armazenar os votos de cada paredao
    mapping(uint => mapping(address => Vote)) votes;

    // 0 => 0x1 => 1
    //      0x2 => 1
    // 1 => 0x1 => 2

    constructor() {
        owner = msg.sender; // endereco de quem realizou o enviou desta mensagem
    }

    function getCurrentVoting() public view returns (Voting memory) {
        return votings[currentVoting];
    }

    function createVoting(uint timeToVote) public {
        require(msg.sender == owner, "Invalid sender");

        if (votings.length != 0) currentVoting++;
        // Voting memory newVoting;
        Voting storage v = votings.push();
        // newVoting.participants = new Participant[](numParticipants);
        v.maxDate = timeToVote + block.timestamp;
        // votings.push(newVoting);
    }

    function addParticipant(string memory name, string memory photo) public {
        require(msg.sender == owner, "Invalid sender");
        require(votings.length > 0, "Need create a Voting System first");

        // getCurrentVoting().participants[currentParticipantId].name = name;
        // getCurrentVoting().participants[currentParticipantId].photo = photo;

        Participant memory newParticipant = Participant({
            name: name,
            photo: photo,
            votes: 0
        });
        votings[currentVoting].participants.push(newParticipant);
    }

    function vote(uint choice) public {
        require(votings.length > 0, "Need create a Voting System first");
        uint totalParticipants = votings[currentVoting].participants.length;
        require(choice < totalParticipants, "Invalid choice.");
        require(getCurrentVoting().maxDate > block.timestamp, "No open voting");
        require(votes[currentVoting][msg.sender].date == 0, "You already voted on this voting");

        // for (uint i = 0; i < totalParticipants; i++) {
        //     if (votings[currentVoting].participants[i].id == choice) {
        //         votings[currentVoting].participants[i].votes++;
        //     }
        // }
        votings[currentVoting].participants[choice].votes++;

        votes[currentVoting][msg.sender].choice = choice;
        votes[currentVoting][msg.sender].date = block.timestamp;
    }
}