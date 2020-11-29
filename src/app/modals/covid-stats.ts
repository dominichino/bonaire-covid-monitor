export interface CovidStats {
  lastUpdated: string | Date;
  date: string | Date;
  active: string | number;
  inHospital: string | number;
  positive: string | number;
  recovered: string | number;
  totalTested: string | number;
  negative: string | number;
  quarantined: string | number;
  deaths: string | number;

  hasOwnProperty<T>(this: T, v: any): v is keyof T;
}

// Get a human readable name from CovidStats keys
export function getCovidStatDisplayName(key: string) {
  switch (key) {
    case 'lastUpdated':
      return 'last updated';
    case 'inHospital':
      return 'in hospital';
    case 'totalTested':
      return 'total tested';

    default:
      return key;
  }
}