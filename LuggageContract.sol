// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LuggageContract {

    // Enum to represent the status of the luggage
    enum LuggageStatus { NotRegistered, InTransit, Delivered, Lost }

    // Data model for each luggage
    struct Luggage {
        address owner;
        LuggageStatus status;
        uint256 compensationAmount;
    }

    // Mapping to associate luggage ID to its details
    mapping(string => Luggage) public luggages;

    // Event to notify clients when luggage status is updated
    event LuggageStatusUpdated(string luggageID, LuggageStatus status);

    // Register a luggage
    function registerLuggage(string memory luggageID) public {
        require(luggages[luggageID].status == LuggageStatus.NotRegistered, "Luggage already registered.");

        luggages[luggageID] = Luggage({
            owner: msg.sender,
            status: LuggageStatus.InTransit,
            compensationAmount: 0
        });
    }

    // Update the status of a luggage
    function updateLuggageStatus(string memory luggageID, LuggageStatus status) public {
        require(luggages[luggageID].owner == msg.sender, "Not the owner of the luggage.");

        luggages[luggageID].status = status;

        if (status == LuggageStatus.Lost) {
            luggages[luggageID].compensationAmount = 1000; // Arbitrary compensation amount
        }

        emit LuggageStatusUpdated(luggageID, status);
    }

    // Get luggage details
    function getLuggageDetails(string memory luggageID) public view returns (Luggage memory) {
        return luggages[luggageID];
    }
}
