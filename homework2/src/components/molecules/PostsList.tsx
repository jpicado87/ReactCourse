import React from "react";
import { IPost } from "../../models/IPost";
import { Post } from "./Post";

export interface IPostsListProps {
  posts: IPost[];
}

export const PostsList: React.FC<IPostsListProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <Post key={`${post.id}`} post={post} />
      ))}
    </ul>
  );
};
