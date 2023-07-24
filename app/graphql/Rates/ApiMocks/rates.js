import { GET_RATES } from '../rates';
const mockResponse = {
  rates: {
    __typename: 'test',
    id: '122',
    currency: 'USD',
    rate: '3.67311',
    name: 'United Arab Emirates Dirham',
  },
};

export const getRatesMock = [
  {
    request: {
      query: GET_RATES,
    },
    result: {
      data: mockResponse,
    },
  },
];
