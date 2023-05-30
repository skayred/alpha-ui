import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { POST_DETAILS } from "./gql";
import { PostView } from "../../components/posts/Post";
import { ParamsWithID } from "../../utils";
import { Comment } from "../../types";

export const Post = () => {
  const { id } = useParams<ParamsWithID>();

  const [hasMore, setHasMore] = useState(true);

  const { data, loading, fetchMore } = useQuery(POST_DETAILS, {
    variables: {
      id,
      commentsLimit: 5,
    },
  });

  return (
    <PostView
      loading={loading}
      post={!data ? null : data.postByID}
      hasMore={hasMore}
      loadMore={async () => {
        if (!!data) {
          const cursor = Math.max(
            ...data.postByID.comments.map((comment: Comment) => comment.id)
          );
          const fetched = await fetchMore({
            variables: {
              commentsCursor: cursor,
            },
          });

          setHasMore(fetched.data && fetched.data.postByID.comments.length > 0);
        }
      }}
    />
  );
};
