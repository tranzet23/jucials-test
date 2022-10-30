import { IJudicialSectorsItem } from 'store/judicialSectors/types';

export interface IJudicialSectorsPage {
  listJudicialSectors: {
    district_id: number;
    address: string;
    classification_code: string;
    district: string;
    judge: string;
    id: string;
  }[];

  loadJudicialSectors: (isPreloader: boolean) => {};
  deleteJudicialSector: (id: number) => {};
  addJudicialSector: (item: IJudicialSectorsItem) => {};
  updateJudicialSector: (item: IJudicialSectorsItem) => {};
}
