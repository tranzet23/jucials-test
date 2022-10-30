import { IResponse } from 'models/response';

export interface IJudicialSectorsItem {
  district_id: number;
  address: string;
  classification_code: string;
  district: string;
  judge: string;
  id: string;
}

export interface IJudicialSectors {
  listJudicialSectors?: IJudicialSectorsItem[];
  isPreloader: boolean;
}

export interface IJudicialSector {
  listJudicialSectors?: IJudicialSectorsItem;
}

export type WrapDataGetJudicialSectorsResponse = IResponse<
  IJudicialSectorsItem[]
>;
