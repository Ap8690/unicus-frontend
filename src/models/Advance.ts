export interface IAdvance {
  showEth: {
    enabled: boolean;
    assetsMinted: boolean;
  };
  showPoly: {
    enabled: boolean;
    assetsMinted: boolean;
  };
  showBinance: {
    enabled: boolean;
    assetsMinted: boolean;
  };
  showAva: {
    enabled: boolean;
    assetsMinted: boolean;
  };
  showTron: {
    enabled: boolean;
    assetsMinted: boolean;
  };
  showNear: {
    enabled: boolean;
    assetsMinted: boolean;
  };
  showSolana: {
    enabled: boolean;
    assetsMinted: boolean;
  };
  showCronos: boolean;
  showSellerKyc: boolean;
  showBuyerKyc: boolean;
  defaultNftCategories:[];
  nftCategories: [];
  siteUrls: string;
  privacyPolicy: string;
  terms: string;
  aboutUs: string;
  creators:string;
}