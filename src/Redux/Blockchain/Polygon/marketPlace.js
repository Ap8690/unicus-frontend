export const marketPlaceAddressP =
  process.env.REACT_APP_ENV === "prod"
    ? // mainnet
      "0xf21C3d3f1bA95c0EfFd4C9D957BFd5ddd8b40cAD"
    : // testnet
      "0x0f4C92F0C4d8eb8650a73a1c02116570227268e8";
// mainnet
//export const marketPlaceAddressP = "0xf21C3d3f1bA95c0EfFd4C9D957BFd5ddd8b40cAD";

// testnet
// export const marketPlaceAddressP = "0x0f4C92F0C4d8eb8650a73a1c02116570227268e8";

export const marketPlaceAbiP = [
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
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
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
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "sold", type: "bool" },
      { indexed: false, internalType: "bool", name: "isActive", type: "bool" },
    ],
    name: "ItemBought",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "royalty",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "sold", type: "bool" },
      { indexed: false, internalType: "bool", name: "isActive", type: "bool" },
    ],
    name: "saleCreated",
    type: "event",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [{ internalType: "uint256", name: "itemId", type: "uint256" }],
    name: "EndSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "itemId", type: "uint256" }],
    name: "buyItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftContract", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "createSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchItemsCreated",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "itemId", type: "uint256" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address payable", name: "seller", type: "address" },
          { internalType: "address payable", name: "owner", type: "address" },
          { internalType: "address payable", name: "minter", type: "address" },
          { internalType: "uint256", name: "royalty", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "bool", name: "sold", type: "bool" },
          { internalType: "bool", name: "isActive", type: "bool" },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMarketItems",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "itemId", type: "uint256" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address payable", name: "seller", type: "address" },
          { internalType: "address payable", name: "owner", type: "address" },
          { internalType: "address payable", name: "minter", type: "address" },
          { internalType: "uint256", name: "royalty", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "bool", name: "sold", type: "bool" },
          { internalType: "bool", name: "isActive", type: "bool" },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchMyNFTs",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "itemId", type: "uint256" },
          { internalType: "address", name: "nftContract", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address payable", name: "seller", type: "address" },
          { internalType: "address payable", name: "owner", type: "address" },
          { internalType: "address payable", name: "minter", type: "address" },
          { internalType: "uint256", name: "royalty", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "bool", name: "sold", type: "bool" },
          { internalType: "bool", name: "isActive", type: "bool" },
        ],
        internalType: "struct NFTMarket.MarketItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "itemid", type: "uint256" }],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "idToMarketItem",
    outputs: [
      { internalType: "uint256", name: "itemId", type: "uint256" },
      { internalType: "address", name: "nftContract", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "address payable", name: "seller", type: "address" },
      { internalType: "address payable", name: "owner", type: "address" },
      { internalType: "address payable", name: "minter", type: "address" },
      { internalType: "uint256", name: "royalty", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "bool", name: "sold", type: "bool" },
      { internalType: "bool", name: "isActive", type: "bool" },
    ],
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "item", type: "uint256" }],
    name: "royaltyForItem",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
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
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasuryRoyalty",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unicusNft",
    outputs: [{ internalType: "contract MintNft", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
