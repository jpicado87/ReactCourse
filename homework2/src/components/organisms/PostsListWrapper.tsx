import React from "react";
import axios from "axios";
import { PostsList } from "../molecules/PostsList";
import { IPost } from "../../models/IPost";
import { IUser } from "../../models/IUser";
import { IComment } from "../../models/IComment";

export const PostsListWrapper = () => {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getPosts = async () => {
    try {
      // Make the Request
      const [posts, comments, users] = await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/posts"),
        axios.get("https://jsonplaceholder.typicode.com/comments"),
        axios.get("https://jsonplaceholder.typicode.com/users"),
      ]);

      const postsWithAuthorsAndComments = (posts.data as IPost[]).map(
        (post) => {
          const postAuthor = (users.data as IUser[]).find(
            (user) => user.id === post.userId
          );

          const postComments = (comments.data as IComment[]).filter(
            (comment) => comment.postId === post.id
          );

          return {
            ...post,
            author: postAuthor,
            comments: postComments,
          };
        }
      );

      // Save in the state
      setPosts(postsWithAuthorsAndComments);

      // Change loading state
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  //componentDidMount
  React.useEffect(() => {
    getPosts();
  }, []);

  // const renderContent = () => {
  //   return loading ? (
  //     <p>Loading...</p>
  //   ) : (
  //     <PostsList posts={posts} />
  //   );
  // };

  // const renderContentIf = () => {
  //   if (loading) {
  //     return <p>Loading...</p>;
  //   } else {
  //     return <PostsList posts={posts} />;
  //   }
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  return <PostsList posts={posts} />;
};
