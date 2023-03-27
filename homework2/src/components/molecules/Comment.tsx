import React from "react";
import { IComment } from "../../models/IComment";

interface ICommentProps {
  comment: IComment;
}

export const Comment: React.FC<ICommentProps> = ({ comment }) => {
  return (
    <li>
      <p># {comment.id}</p>
      <p>Written by: {comment.name}</p>
      <p>{comment.body}</p>
    </li>
  );
};
