import React from "react";
import { List } from "antd";

import { Comment } from "../../types";

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem = (props: CommentItemProps) => {
  return (
    <List.Item>
      <List.Item.Meta
        title={`#${props.comment.id} ${props.comment.author.name}`}
        description={props.comment.author.email}
      />
      <div>{props.comment.content}</div>
    </List.Item>
  );
};
