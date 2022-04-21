//testnet
export const createNFTAddressT = "TVxXc5kCmafEvVfnNY5Dsxh8WaJutCF7EM";

export const createNFTAbiT = [
    {
      inputs: [
        { name: "NAME", type: "string" },
        { name: "SYMBOL", type: "string" },
      ],
      stateMutability: "Nonpayable",
      type: "Constructor",
    },
    {
      inputs: [
        { indexed: true, name: "owner", type: "address" },
        { indexed: true, name: "approved", type: "address" },
        { indexed: true, name: "tokenId", type: "uint256" },
      ],
      name: "Approval",
      type: "Event",
    },
    {
      inputs: [
        { indexed: true, name: "owner", type: "address" },
        { indexed: true, name: "operator", type: "address" },
        { name: "approved", type: "bool" },
      ],
      name: "ApprovalForAll",
      type: "Event",
    },
    {
      inputs: [
        { name: "_totalNft", type: "uint256" },
        { name: "msg", type: "string" },
      ],
      name: "BatchMint",
      type: "Event",
    },
    {
      inputs: [
        { name: "_NftId", type: "uint256" },
        { name: "msg", type: "string" },
      ],
      name: "Minted",
      type: "Event",
    },
    {
      inputs: [
        { indexed: true, name: "previousOwner", type: "address" },
        { indexed: true, name: "newOwner", type: "address" },
      ],
      name: "OwnershipTransferred",
      type: "Event",
    },
    {
      inputs: [
        { indexed: true, name: "from", type: "address" },
        { indexed: true, name: "to", type: "address" },
        { indexed: true, name: "tokenId", type: "uint256" },
      ],
      name: "Transfer",
      type: "Event",
    },
    {
      outputs: [{ type: "string" }],
      inputs: [{ type: "uint256" }],
      name: "_tokenURIs",
      stateMutability: "View",
      type: "Function",
    },
    {
      inputs: [
        { name: "to", type: "address" },
        { name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      stateMutability: "Nonpayable",
      type: "Function",
    },
    {
      outputs: [{ type: "uint256" }],
      inputs: [{ name: "owner", type: "address" }],
      name: "balanceOf",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "bool" }],
      inputs: [
        { name: "_uri", type: "string[]" },
        { name: "_royalty", type: "uint256[]" },
      ],
      name: "batchMint",
      stateMutability: "Nonpayable",
      type: "Function",
    },
    {
      outputs: [{ type: "address" }],
      inputs: [{ name: "tokenId", type: "uint256" }],
      name: "getApproved",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ name: "ids", type: "uint256[]" }],
      inputs: [{ name: "user", type: "address" }],
      name: "getNFTMintedByUser",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ name: "tracker", type: "uint256" }],
      name: "getTokenCounter",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "bool" }],
      inputs: [
        { name: "owner", type: "address" },
        { name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "uint256" }],
      name: "maximumRoyalty",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "uint256" }],
      inputs: [{ type: "address" }, { type: "uint256" }],
      name: "mintedByUser",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "address" }],
      inputs: [{ type: "uint256" }],
      name: "minter",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ name: "_minter", type: "address" }],
      inputs: [{ name: "tokenId", type: "uint256" }],
      name: "minterOfToken",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "string" }],
      name: "name",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "address" }],
      name: "owner",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "address" }],
      inputs: [{ name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      stateMutability: "View",
      type: "Function",
    },
    {
      name: "renounceOwnership",
      stateMutability: "Nonpayable",
      type: "Function",
    },
    {
      outputs: [{ type: "uint256" }],
      inputs: [{ type: "uint256" }],
      name: "royalty",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ name: "percentage", type: "uint256" }],
      inputs: [{ name: "tokenId", type: "uint256" }],
      name: "royaltyForToken",
      stateMutability: "View",
      type: "Function",
    },
    {
      inputs: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      stateMutability: "Nonpayable",
      type: "Function",
    },
    {
      inputs: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "tokenId", type: "uint256" },
        { name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      stateMutability: "Nonpayable",
      type: "Function",
    },
    {
      inputs: [
        { name: "operator", type: "address" },
        { name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      stateMutability: "Nonpayable",
      type: "Function",
    },
    {
      inputs: [{ name: "_royalty", type: "uint256" }],
      name: "setMaxRoyalty",
      stateMutability: "Nonpayable",
      type: "Function",
    },
    {
      outputs: [{ type: "bool" }],
      inputs: [{ name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "string" }],
      name: "symbol",
      stateMutability: "View",
      type: "Function",
    },
    {
      outputs: [{ type: "string" }],
      inputs: [{ name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      stateMutability: "View",
      type: "Function",
    },
    {
      inputs: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      stateMutability: "Nonpayable",
      type: "Function",
    },
    {
      inputs: [{ name: "newOwner", type: "address" }],
      name: "transferOwnership",
      stateMutability: "Nonpayable",
      type: "Function",
    },
  ];