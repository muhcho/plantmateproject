import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch(
          `https://plant-mate-9bee8-default-rtdb.firebaseio.com/recipes/${id}.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    }

    getPost();
  }, [id]);

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://plant-mate-9bee8-default-rtdb.firebaseio.com/recipes/${id}.json`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <section className="page" id="post-page">
      <div className="container">
        <h1>{post.name}</h1>
        <img src={post.image} alt={post.name} className="post-image" />
        <p><strong>By:</strong> {post.username}</p>
        <p><strong>Description:</strong> {post.shortDescription}</p>
        <p><strong>Meal Type:</strong> {post.mealType}</p>
        <p><strong>Time to Prepare:</strong> {post.timeToPrepare}</p>
        <div className="btns">
          <button className="btn-cancel" onClick={handleDelete}>
            Delete Post
          </button>
          <button className="btn">Update Post</button>
        </div>
      </div>
    </section>
  );
}
