import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";

let backendUrl = 'localhost';
const httpLink = new HttpLink({
  uri: `http://${backendUrl}:4000/graphql`,
});

export const createApolloClient = () => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    // Send Error stats back to server
    if (graphQLErrors) {
      console.log("graphQLErrors", graphQLErrors);
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Post: {
          fields: {
            comments: {
              ...concatPagination(),
            },
          },
        },
        Query: {
          fields: {
            posts: {
              ...concatPagination(),
            },
          },
        },
      },
    }),
  });
};
