import useGetPeople from "../hooks/useGetPeople";
import React, { useState } from "react";

const PeoplByReactQuery: React.FC = () => {
  const { data: posts, isLoading, isError, error } = useGetPeople();
  const [filter, setFilter] = useState<string>("");

  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="posts-loader-container">
        <div className="posts-loader"></div>
        <span className="posts-loader-text">Loading...</span>
      </div>
    );
  if (isError)
    return (
      <div className="posts-error">
        Error: {(error as Error).message}
      </div>
    );

  return (
    <div className="posts-container">
      <h2 className="posts-title">
        <span>Posts</span>
      </h2>
      <input
        type="text"
        placeholder="Search by title"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="posts-search"
      />
      <ul className="posts-list">
        {filteredPosts?.map((post) => (
          <li key={post.id} className="posts-list-item">
            <strong className="posts-list-title">{post.title}</strong>
            <p className="posts-list-body">{post.body}</p>
            <div className="posts-list-meta">
              Post ID: {post.id} | User: {post.userId}
            </div>
          </li>
        ))}
      </ul>
      {filteredPosts && filteredPosts.length === 0 && (
        <div className="posts-no-results">
          No posts found.
        </div>
      )}
    </div>
  );
};

export default PeoplByReactQuery;