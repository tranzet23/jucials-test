export interface CourtPeople {
  judge: { name: Name };
  secretary: { name: Name };
  claimant: SideOfConflict;
  claimantRepresentative?: Representative;
  defendant: SideOfConflict;
  defendantRepresentative?: Representative;
  thirdPerson?: SideOfConflict;
  thirdPersonRepresentative?: Representative;
  expert?: { name: Name };
  witness?: {
    name: Name;
    dateOfBirth: string;
    address: string;
    work: {
      placeOfWork: string;
      position: string;
    };
  };
}

interface SideOfConflict {
  isIndividual: boolean; // Физ лицо = true
  inCourt: boolean;
  representative: boolean;
  name: Name | string; // Если физ лицо ФИО, если Юр. лицо название компании
  dateOfBirth?: string; // Только если физ лицо
}

interface Representative {
  name: Name;
  isAdvocate: boolean;
  powerOfAttorney: {
    // Если адвокат дата и номер ордера. Если представитель дата и номер (при наличии номера) доверенности
    date: string;
    number?: string;
  };
}

interface Name {
  first: string;
  last: string;
  middle: string;
}

export interface IdocumentTemplatesTypes {
  date: Date;
  readonly months: string[];
  caseNumber: string;
  people: CourtPeople;
}
