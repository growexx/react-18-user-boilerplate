import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { link } from './httpLink';

const wsLink = new WebSocketLink({
  uri:
    process.env.REACT_APP_WS_ENDPOINT /** ws://48p1r2roz4.sse.codesandbox.io */,
  options: {
    reconnect: true,
    // authentication
    connectionParams: {
      authToken: 'user.authToken',
    },
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  link,
);

export default splitLink;
