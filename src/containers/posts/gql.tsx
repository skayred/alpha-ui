import { gql } from "@apollo/client";

export const UserFragment = gql`
    fragment UserFields on User {
        id
        name
        email
    }
`;

export const CommentFragment = gql`
    fragment CommentFields on Comment {
        id
        content
        author {
            ...UserFields
        }
    }
    ${UserFragment}
`;

export const DetailedPostFragment = gql`
    fragment PostFields on Post {
        id
        title
        content
        author {
            ...UserFields
        }
        comments(cursor: $commentsCursor, limit: $commentsLimit) {
            ...CommentFields
        }
    }
    ${CommentFragment}
`;

export const MinimalPostFragment = gql`
    fragment PostFields on Post {
        id
        title
        author {
            ...UserFields
        }
    }
    ${UserFragment}
`;

export const POSTS_LIST = gql`
  query posts($cursor: ID, $limit: Int!) {
    posts(cursor: $cursor, limit: $limit) {
      ...PostFields
    }
  }
  ${MinimalPostFragment}
`;

export const POSTS_BY_USER = gql`
  query posts($authorID: ID!, $cursor: ID, $limit: Int!) {
    posts: postsByAuthor(authorID: $authorID, cursor: $cursor, limit: $limit) {
      ...PostFields
    }
  }
  ${MinimalPostFragment}
`;

export const POST_DETAILS = gql`
  query postByID($id: ID!, $commentsCursor: ID, $commentsLimit: Int!) {
    postByID(id: $id) {
        ...PostFields
    }
  }
  ${DetailedPostFragment}
`;
