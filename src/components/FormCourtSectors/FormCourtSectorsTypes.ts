export interface IFormCourtSectors {
  handleChange: any;
  areas: string[];
  listJudicialSectors: {
    district_id: string;
    address: string;
    classification_code: string;
    district: string;
    judge: string;
  }[];
}
