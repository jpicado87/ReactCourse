import React from "react";
import { IPost } from "../../models/IPost";
import { Comment } from "./Comment";

interface IPostProps {
  post: IPost;
}

export const Post: React.FC<IPostProps> = ({ post }) => {
  const renderComments = () => {
    if (!post.comments || post.comments.length === 0) {
      return null;
    }

    return (
      <ul>
        {post.comments.map((comment) => {
          return (
            <Comment key={`${comment.id}-${comment.email}`} comment={comment} />
          );
        })}
      </ul>
    );
  };

  return (
    <li>
      <p># {post.id}</p>
      <p>Wrote by: {post.author?.name}</p>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      {renderComments()}
    </li>
  );
};
