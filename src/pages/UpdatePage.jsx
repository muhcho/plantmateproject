/* Made by Mihaela Ninova */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePage() {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState({
    shortDescription: "",
    image: "",
    typeOfMeal: "",
    timeToCook: ""
  });
  const navigate = useNavigate();

  const postUrl = `https://plant-mate-posts-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`;

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

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(postUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
      });

      if (response.ok) {
        alert("Post updated successfully");
        navigate(`/community/${id}`);
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post", error);
    }
  };

  return (
    <section className="update-page">
      <div className="header">
        <h2>Edit Post</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="image">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={post.image}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
        {post.image && <img src={post.image} alt="Preview" className="image-preview" />}

        <label htmlFor="typeOfMeal">Type of Meal</label>
        <select
          id="typeOfMeal"
          name="typeOfMeal"
          value={post.typeOfMeal}
          onChange={handleChange}
        >
          <option value="">Select Meal Type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>

        <label htmlFor="timeToCook">Time to Cook</label>
        <input
          type="text"
          id="timeToCook"
          name="timeToCook"
          value={post.timeToCook}
          onChange={handleChange}
          placeholder="Enter time to cook"
        />

        <label htmlFor="shortDescription">Short Description</label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          value={post.shortDescription}
          onChange={handleChange}
          placeholder="Enter short description"
        ></textarea>

        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </section>
  );
}
