/* Made by Mihaela Ninova */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetailsPage() {
  const { id } = useParams(); // Retrieve the post ID from the URL
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const postUrl = `https://plant-mate-posts-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`;

  // Fetch the post data on mount
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(postUrl);
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error("Failed to fetch post data", error);
      }
    }
    fetchPost();
  }, [postUrl]);

  // Handle post update navigation
  const handleEditPost = () => {
    navigate(`/edit/${id}`);
  };

  // Handle post deletion
  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(postUrl, { method: "DELETE" });
        if (response.ok) {
          alert("Post deleted successfully");
          navigate("/community"); // Redirect to community page
        } else {
          console.error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error deleting post", error);
      }
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <section className="post-details-page">
      {/* Post Header */}
      <div className="post-header">
        <div className="user-info">
          <img src={post.userPicture} alt={post.user} className="user-avatar" />
          <div>
            <h3>{post.user}</h3>
            <p>{post.postedAgo}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <h2>{post.title}</h2>
      <img src={post.image} alt={post.title} className="post-image" />
      <div className="post-metadata">
        <span className="type-of-meal">{post.typeOfMeal}</span>
        <span className="time-to-cook">{post.timeToCook}</span>
      </div>
      <p>{post.shortDescription}</p>

      {/* Action Buttons */}
      <div className="action-buttons">
      <button 
  className="edit-button" 
  onClick={() => navigate(`/edit/${id}`)}
>
  Edit Post
</button>

        <button className="delete-button" onClick={handleDeletePost}>
          Delete Post
        </button>
      </div>
    </section>
  );
}