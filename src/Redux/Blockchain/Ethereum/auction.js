import {env_uri} from "../../../config"

// mainnet 
export const auctionAddressE =
  env_uri()
    ? // mainnet
      "0x8b073AF7a15511d803d7C0C03361d9b3016aE155"
    : // testnet
      "0xc90Ae164BCdD963352374DFD22d209Ca0C368444";

export const auctionAddressE1155 =
  env_uri()
    ? // mainnet
      "0x5a8e0F439e2D803E9319c034A5496A2fD0177241"
    : // testnet
      "0x5a8e0F439e2D803E9319c034A5496A2fD0177241";
// testnet
// export const auctionAddressE = "0xc90Ae164BCdD963352374DFD22d209Ca0C368444";

export const auctionAbiE = [
  {
    inputs: [
      { internalType: "address", name: "_nftContract", type: "address" },
      { internalType: "address", name: "_treasury", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "AuctionCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "isActive", type: "bool" },
      {
        indexed: false,
        internalType: "uint256",
        name: "Reserveprice",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "sold", type: "bool" },
    ],
    name: "AuctionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "AuctionEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BidPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "NftClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "_auctionIds",
    outputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "auctionId", type: "uint256" }],
    name: "cancelAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "auctionId", type: "uint256" }],
    name: "claimNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftContract", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint256", name: "duration", type: "uint256" },
    ],
    name: "createAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "auctionId", type: "uint256" }],
    name: "endAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "fetchMyNFTs",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "auctionId", type: "uint256" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          { internalType: "uint256", name: "reservePrice", type: "uint256" },
          { internalType: "address payable", name: "seller", type: "address" },
          { internalType: "address payable", name: "bidder", type: "address" },
          { internalType: "address payable", name: "minter", type: "address" },
          { internalType: "uint256", name: "royalty", type: "uint256" },
          { internalType: "bool", name: "isActive", type: "bool" },
          { internalType: "bool", name: "sold", type: "bool" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
        ],
        internalType: "struct NFTAuction.Auction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchSoldAuctions",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "auctionId", type: "uint256" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          { internalType: "uint256", name: "reservePrice", type: "uint256" },
          { internalType: "address payable", name: "seller", type: "address" },
          { internalType: "address payable", name: "bidder", type: "address" },
          { internalType: "address payable", name: "minter", type: "address" },
          { internalType: "uint256", name: "royalty", type: "uint256" },
          { internalType: "bool", name: "isActive", type: "bool" },
          { internalType: "bool", name: "sold", type: "bool" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
        ],
        internalType: "struct NFTAuction.Auction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchUnsoldAuctions",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "auctionId", type: "uint256" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          { internalType: "uint256", name: "reservePrice", type: "uint256" },
          { internalType: "address payable", name: "seller", type: "address" },
          { internalType: "address payable", name: "bidder", type: "address" },
          { internalType: "address payable", name: "minter", type: "address" },
          { internalType: "uint256", name: "royalty", type: "uint256" },
          { internalType: "bool", name: "isActive", type: "bool" },
          { internalType: "bool", name: "sold", type: "bool" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
        ],
        internalType: "struct NFTAuction.Auction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "fetchauctionsBid",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "auctionId", type: "uint256" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          { internalType: "uint256", name: "reservePrice", type: "uint256" },
          { internalType: "address payable", name: "seller", type: "address" },
          { internalType: "address payable", name: "bidder", type: "address" },
          { internalType: "address payable", name: "minter", type: "address" },
          { internalType: "uint256", name: "royalty", type: "uint256" },
          { internalType: "bool", name: "isActive", type: "bool" },
          { internalType: "bool", name: "sold", type: "bool" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
        ],
        internalType: "struct NFTAuction.Auction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "auctionId", type: "uint256" }],
    name: "getReservePrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "idToAuction",
    outputs: [
      { internalType: "uint256", name: "auctionId", type: "uint256" },
      { internalType: "address", name: "nftContract", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "duration", type: "uint256" },
      { internalType: "uint256", name: "reservePrice", type: "uint256" },
      { internalType: "address payable", name: "seller", type: "address" },
      { internalType: "address payable", name: "bidder", type: "address" },
      { internalType: "address payable", name: "minter", type: "address" },
      { internalType: "uint256", name: "royalty", type: "uint256" },
      { internalType: "bool", name: "isActive", type: "bool" },
      { internalType: "bool", name: "sold", type: "bool" },
      { internalType: "uint256", name: "startTime", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "auctionId", type: "uint256" }],
    name: "isHighestBidder",
    outputs: [{ internalType: "address", name: "bidder", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "auctionId", type: "uint256" }],
    name: "placeBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_treasury", type: "address" }],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "royalty", type: "uint256" }],
    name: "setTreasuryRoyalty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "auctionId", type: "uint256" }],
    name: "timeLeftForAuctionToEnd",
    outputs: [
      { internalType: "uint256", name: "timeEnd", type: "uint256" },
      { internalType: "uint256", name: "timeleft", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unicusNft",
    outputs: [{ internalType: "contract MintNft", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

export const auctionAbiE1155 = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_nftContract",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_treasury",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "AuctionCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Reserveprice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "sold",
				"type": "bool"
			}
		],
		"name": "AuctionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BidPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "NftClaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_auctionIds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "cancelAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "claimNft",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "createAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "endAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "fetchMyNFTs",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "auctionId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "nftContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reservePrice",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "bidder",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "minter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "royalty",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "sold",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTAuction.Auction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fetchSoldAuctions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "auctionId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "nftContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reservePrice",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "bidder",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "minter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "royalty",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "sold",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTAuction.Auction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fetchUnsoldAuctions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "auctionId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "nftContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reservePrice",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "bidder",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "minter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "royalty",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "sold",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTAuction.Auction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "fetchauctionsBid",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "auctionId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "nftContract",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "duration",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reservePrice",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "bidder",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "minter",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "royalty",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "sold",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					}
				],
				"internalType": "struct NFTAuction.Auction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "getReservePrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "idToAuction",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reservePrice",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "bidder",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "minter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "royalty",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "sold",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "isHighestBidder",
		"outputs": [
			{
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155BatchReceived",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_treasury",
				"type": "address"
			}
		],
		"name": "setTreasury",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "royalty",
				"type": "uint256"
			}
		],
		"name": "setTreasuryRoyalty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "auctionId",
				"type": "uint256"
			}
		],
		"name": "timeLeftForAuctionToEnd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "timeEnd",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeleft",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unicusNft",
		"outputs": [
			{
				"internalType": "contract Unicus",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]