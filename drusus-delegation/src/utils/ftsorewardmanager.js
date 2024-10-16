import { ethers } from "ethers";

export function getFtsoRewardManagerContract(provider, address) {
  const abi = [
    {
      type: "constructor",
      stateMutability: "nonpayable",
      inputs: [
        { type: "address", name: "_governance", internalType: "address" },
        {
          type: "uint256",
          name: "_feePercentageUpdateOffset",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "_defaultFeePercentage",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "event",
      name: "DailyAuthorizedInflationSet",
      inputs: [
        {
          type: "uint256",
          name: "authorizedAmountWei",
          internalType: "uint256",
          indexed: false,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "FeePercentageChanged",
      inputs: [
        {
          type: "address",
          name: "dataProvider",
          internalType: "address",
          indexed: true,
        },
        {
          type: "uint256",
          name: "value",
          internalType: "uint256",
          indexed: false,
        },
        {
          type: "uint256",
          name: "validFromEpoch",
          internalType: "uint256",
          indexed: false,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "GovernanceProposed",
      inputs: [
        {
          type: "address",
          name: "proposedGovernance",
          internalType: "address",
          indexed: false,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "GovernanceUpdated",
      inputs: [
        {
          type: "address",
          name: "oldGovernance",
          internalType: "address",
          indexed: false,
        },
        {
          type: "address",
          name: "newGoveranance",
          internalType: "address",
          indexed: false,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "InflationReceived",
      inputs: [
        {
          type: "uint256",
          name: "amountReceivedWei",
          internalType: "uint256",
          indexed: false,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "RewardClaimed",
      inputs: [
        {
          type: "address",
          name: "dataProvider",
          internalType: "address",
          indexed: true,
        },
        {
          type: "address",
          name: "whoClaimed",
          internalType: "address",
          indexed: true,
        },
        {
          type: "address",
          name: "sentTo",
          internalType: "address",
          indexed: true,
        },
        {
          type: "uint256",
          name: "rewardEpoch",
          internalType: "uint256",
          indexed: false,
        },
        {
          type: "uint256",
          name: "amount",
          internalType: "uint256",
          indexed: false,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "RewardClaimsExpired",
      inputs: [
        {
          type: "uint256",
          name: "rewardEpochId",
          internalType: "uint256",
          indexed: false,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "RewardsDistributed",
      inputs: [
        {
          type: "address",
          name: "ftso",
          internalType: "address",
          indexed: true,
        },
        {
          type: "uint256",
          name: "epochId",
          internalType: "uint256",
          indexed: false,
        },
        {
          type: "address[]",
          name: "addresses",
          internalType: "address[]",
          indexed: false,
        },
        {
          type: "uint256[]",
          name: "rewards",
          internalType: "uint256[]",
          indexed: false,
        },
      ],
      anonymous: false,
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "activate",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "bool", name: "", internalType: "bool" }],
      name: "active",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "claimGovernance",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
        { type: "uint256", name: "_rewardAmount", internalType: "uint256" },
      ],
      name: "claimReward",
      inputs: [
        {
          type: "address",
          name: "_recipient",
          internalType: "address payable",
        },
        { type: "uint256[]", name: "_rewardEpochs", internalType: "uint256[]" },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [
        { type: "uint256", name: "_rewardAmount", internalType: "uint256" },
      ],
      name: "claimRewardFromDataProviders",
      inputs: [
        {
          type: "address",
          name: "_recipient",
          internalType: "address payable",
        },
        { type: "uint256[]", name: "_rewardEpochs", internalType: "uint256[]" },
        {
          type: "address[]",
          name: "_dataProviders",
          internalType: "address[]",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "closeExpiredRewardEpoch",
      inputs: [
        { type: "uint256", name: "_rewardEpoch", internalType: "uint256" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "dailyAuthorizedInflation",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "deactivate",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "defaultFeePercentage",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "distributeRewards",
      inputs: [
        { type: "address[]", name: "_addresses", internalType: "address[]" },
        { type: "uint256[]", name: "_weights", internalType: "uint256[]" },
        { type: "uint256", name: "_totalWeight", internalType: "uint256" },
        { type: "uint256", name: "_epochId", internalType: "uint256" },
        { type: "address", name: "_ftso", internalType: "address" },
        {
          type: "uint256",
          name: "_priceEpochDurationSeconds",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "_currentRewardEpoch",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "_priceEpochEndTime",
          internalType: "uint256",
        },
        { type: "uint256", name: "_votePowerBlock", internalType: "uint256" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "feePercentageUpdateOffset",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        { type: "address", name: "", internalType: "contract IIFtsoManager" },
      ],
      name: "ftsoManager",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        { type: "bool", name: "_claimed", internalType: "bool" },
        { type: "uint256", name: "_amount", internalType: "uint256" },
      ],
      name: "getClaimedReward",
      inputs: [
        { type: "uint256", name: "_rewardEpoch", internalType: "uint256" },
        { type: "address", name: "_dataProvider", internalType: "address" },
        { type: "address", name: "_claimer", internalType: "address" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "getDataProviderCurrentFeePercentage",
      inputs: [
        { type: "address", name: "_dataProvider", internalType: "address" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256[]",
          name: "_feePercentageBIPS",
          internalType: "uint256[]",
        },
        {
          type: "uint256[]",
          name: "_validFromEpoch",
          internalType: "uint256[]",
        },
        { type: "bool[]", name: "_fixed", internalType: "bool[]" },
      ],
      name: "getDataProviderScheduledFeePercentageChanges",
      inputs: [
        { type: "address", name: "_dataProvider", internalType: "address" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        { type: "uint256", name: "_totalReward", internalType: "uint256" },
        { type: "uint256", name: "_claimedReward", internalType: "uint256" },
      ],
      name: "getEpochReward",
      inputs: [
        { type: "uint256", name: "_rewardEpoch", internalType: "uint256" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        { type: "uint256", name: "_startEpochId", internalType: "uint256" },
        { type: "uint256", name: "_endEpochId", internalType: "uint256" },
      ],
      name: "getEpochsWithClaimableRewards",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        { type: "uint256[]", name: "_epochIds", internalType: "uint256[]" },
      ],
      name: "getEpochsWithUnclaimedRewards",
      inputs: [
        { type: "address", name: "_beneficiary", internalType: "address" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "address", name: "", internalType: "address" }],
      name: "getInflationAddress",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "getRewardEpochToExpireNext",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "address[]",
          name: "_dataProviders",
          internalType: "address[]",
        },
        {
          type: "uint256[]",
          name: "_rewardAmounts",
          internalType: "uint256[]",
        },
        { type: "bool[]", name: "_claimed", internalType: "bool[]" },
        { type: "bool", name: "_claimable", internalType: "bool" },
      ],
      name: "getStateOfRewards",
      inputs: [
        { type: "address", name: "_beneficiary", internalType: "address" },
        { type: "uint256", name: "_rewardEpoch", internalType: "uint256" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256[]",
          name: "_rewardAmounts",
          internalType: "uint256[]",
        },
        { type: "bool[]", name: "_claimed", internalType: "bool[]" },
        { type: "bool", name: "_claimable", internalType: "bool" },
      ],
      name: "getStateOfRewardsFromDataProviders",
      inputs: [
        { type: "address", name: "_beneficiary", internalType: "address" },
        { type: "uint256", name: "_rewardEpoch", internalType: "uint256" },
        {
          type: "address[]",
          name: "_dataProviders",
          internalType: "address[]",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "_foundationAllocatedFundsWei",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "_totalInflationAuthorizedWei",
          internalType: "uint256",
        },
        { type: "uint256", name: "_totalClaimedWei", internalType: "uint256" },
      ],
      name: "getTokenPoolSupplyData",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        { type: "uint256", name: "_amount", internalType: "uint256" },
        { type: "uint256", name: "_weight", internalType: "uint256" },
      ],
      name: "getUnclaimedReward",
      inputs: [
        { type: "uint256", name: "_rewardEpoch", internalType: "uint256" },
        { type: "address", name: "_dataProvider", internalType: "address" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "address", name: "", internalType: "address" }],
      name: "governance",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "initialise",
      inputs: [
        { type: "address", name: "_governance", internalType: "address" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "lastInflationAuthorizationReceivedTs",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "proposeGovernance",
      inputs: [
        { type: "address", name: "_governance", internalType: "address" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "address", name: "", internalType: "address" }],
      name: "proposedGovernance",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "payable",
      outputs: [],
      name: "receiveInflation",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "setContractAddresses",
      inputs: [
        { type: "address", name: "_inflation", internalType: "address" },
        {
          type: "address",
          name: "_ftsoManager",
          internalType: "contract IIFtsoManager",
        },
        { type: "address", name: "_wNat", internalType: "contract WNat" },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "setDailyAuthorizedInflation",
      inputs: [
        { type: "uint256", name: "_toAuthorizeWei", internalType: "uint256" },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "setDataProviderFeePercentage",
      inputs: [
        {
          type: "uint256",
          name: "_feePercentageBIPS",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "totalAwardedWei",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "totalClaimedWei",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "totalExpiredWei",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "totalInflationAuthorizedWei",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "totalInflationReceivedWei",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
      name: "totalSelfDestructReceivedWei",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "transferGovernance",
      inputs: [
        { type: "address", name: "_governance", internalType: "address" },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [{ type: "address", name: "", internalType: "contract WNat" }],
      name: "wNat",
      inputs: [],
    },
  ];

  return new ethers.Contract(address, abi, provider);
}
