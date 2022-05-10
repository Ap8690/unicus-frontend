import { IAdvance } from "./Advance";
import { IAnalytics } from "./Analytics";
import { IAppearance } from "./Appearance";
import { IGeneral } from "./General";
import { ISeo } from "./Seo";

export interface IStore {
  general: IGeneral;
  advance: IAdvance;
  appearance: IAppearance;
  analytics: IAnalytics;
  seo:ISeo;
}