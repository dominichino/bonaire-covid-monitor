export interface NumberCard {
  id: string;
  title: string;
  count: number | string;
  difference: number | string;
}

export const numberCardDefault = {
  id: '',
  title: '-',
  count: 0,
  difference: 0,
};
