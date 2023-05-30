import React from "react";
import { Divider, Spin, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "../../types";
import { useHistory } from "react-router-dom";

interface PostListComponentProps {
  loading: boolean;
  items: Post[];
  hasMore: boolean;
  loadMore(): void;
}

export const PostListComponent = (props: PostListComponentProps) => {
  const history = useHistory();
  
  return (
    <Spin spinning={props.loading}>
      <div
        id="scrollableDiv"
        style={{
          height: 700,
          overflow: "auto",
          padding: "0 16px",
        }}
      >
        <InfiniteScroll
          dataLength={props.items.length}
          next={props.loadMore}
          hasMore={props.hasMore}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>No more items so far...</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={props.items}
            renderItem={(item: Post) => (
              <List.Item key={`post-list-${item.id}`}>
                <List.Item.Meta
                  title={<a onClick={() => history.push(`/posts/${item.id}`)}>#{item.id} {item.title}</a>}
                  description={item.author.name}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </Spin>
  );
};
