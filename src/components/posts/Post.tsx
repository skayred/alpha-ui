import React from "react";
import { Card, Divider, List, Skeleton } from "antd";
import { useHistory } from "react-router";

import { Comment, Post } from "../../types";
import { CommentItem } from "./CommentItem";
import InfiniteScroll from "react-infinite-scroll-component";

interface PostProps {
  loading: boolean;
  hasMore: boolean;
  post: Post;
  loadMore(): void;
}

export const PostView = (props: PostProps) => {
  const history = useHistory();

  return (
    <Card
      title={props.post?.title}
      loading={props.loading}
      extra={
        !!props.post?.author && (
          <a onClick={() => history.push(`/users/${props.post.author.id}`)}>
            {props.post.author.name}
          </a>
        )
      }
    >
      <Card.Meta title={props.post?.title} description={props.post?.content} />
      <Divider>Comments:</Divider>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
        }}
      >
        <InfiniteScroll
          dataLength={props.post?.comments.length}
          next={props.loadMore}
          hasMore={props.hasMore}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>No more comments so far...</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            itemLayout="vertical"
            dataSource={props.post?.comments || []}
            renderItem={(comment: Comment) => <CommentItem comment={comment} />}
          />
        </InfiniteScroll>
      </div>
    </Card>
  );
};
