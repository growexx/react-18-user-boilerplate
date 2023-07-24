import gql from 'graphql-tag';

// QUERY
export const GET_RATES = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
      name
      rate
    }
  }
`;

// MUTATION
export const PUT_RATES = gql`
  mutation PutRates($type: String!) {
    putRates(type: $type) {
      id
      currency
      rate
      name
    }
  }
`;

// SUBSCRIPTION

export const RATES_SUBSCRIPTION = gql`
  subscription onRateChange($postID: ID!) {
    rateChanged(postID: $postID) {
      id
      content
    }
  }
`;
