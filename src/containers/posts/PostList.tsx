import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

import { PostListComponent } from "../../components/posts/PostList";
import { POSTS_BY_USER, POSTS_LIST } from "./gql";
import { Post } from "../../types";
import { ParamsWithID, useQueryParam } from "../../utils";

interface PostListProps {
  isForUser?: boolean;
}

const MAX_LENGTH = 10;

export const PostList = (props: PostListProps) => {
  const { id } = useParams<ParamsWithID>();

  const query = useQueryParam();
  const history = useHistory();

  const [hasMore, setHasMore] = useState(true);
  const [cursor, _setCursor] = useState(query.get("cursor") || 0);

  const { data, loading, fetchMore } = useQuery(
    props.isForUser ? POSTS_BY_USER : POSTS_LIST,
    {
      variables: {
        authorID: id,
        cursor,
        limit: MAX_LENGTH,
      },
    }
  );

  useEffect(() => {
    // If initial portion of data is shorter than the pagination chunk
    setHasMore(data && data.posts.length >= MAX_LENGTH);
  }, [data]);

  return (
    <PostListComponent
      loading={loading}
      hasMore={hasMore}
      loadMore={async () => {
        if (!!data) {
          const cursor = Math.max(...data.posts.map((post: Post) => post.id));
          const fetched = await fetchMore({
            variables: {
              cursor,
            },
          });

          if (fetched.data && fetched.data.posts.length > 0) {
            setHasMore(true);
            history.push({ search: `?cursor=${cursor}` });
          } else {
            setHasMore(false);
          }
        }
      }}
      items={!data ? [] : data.posts}
    />
  );
};
