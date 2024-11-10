/* Made by Mihaela Ninova */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/backicon.svg";
import LeafIcon from "../assets/leaficon.svg";
import TimeIcon from "../assets/timeicon.svg";

export default function CreatePage() {
  const navigate = useNavigate();
  const [typeOfMeal, setTypeOfMeal] = useState("");
  const [timeToCook, setTimeToCook] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const handleSubmit = async () => {
    if (!imageUrl || !shortDescription || !typeOfMeal || !timeToCook) {
      alert("Please fill out all fields.");
      return;
    }

    const newPost = {
      user: "random_user", 
      userPicture: "https://via.placeholder.com/50", 
      postedAgo: "Just now",
      typeOfMeal,
      timeToCook,
      image: imageUrl,
      shortDescription,
      likes: 0,
      comments: 0,
    };

    try {
      const response = await fetch(
        "https://plant-mate-posts-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          method: "POST",
          body: JSON.stringify(newPost),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit post");
      }

      const data = await response.json(); 

      // Navigate back with the new post's ID and content
      navigate("/community", { state: { newPost: { id: data.name, ...newPost } } }); 
    } catch (error) {
      console.error("Error submitting new post:", error);
      alert("Failed to create the post. Please try again.");
    }
  };

  return (
    <section className="create-page">
      {/* Header */}
      <div className="header">
        <img
          src={BackIcon}
          alt="Back"
          onClick={() => navigate("/community")}
          className="back-icon"
        />
        <h2>New Post</h2>
      </div>

      {/* Image URL Input */}
      <input
        type="text"
        placeholder="Paste image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      {imageUrl && <img src={imageUrl} alt="Post Preview" className="post-preview" />}

      {/* Type of Meal */}
      <div className="meal-section">
        <p>
          <img src={LeafIcon} alt="Meal Type" /> Choose the type of meal
        </p>
        <div className="tags">
          {["Breakfast", "Lunch", "Dinner", "Snack"].map((meal) => (
            <button
              key={meal}
              className={typeOfMeal === meal ? "active" : ""}
              onClick={() => setTypeOfMeal(meal)}
            >
              {meal}
            </button>
          ))}
        </div>
      </div>

      {/* Time to Cook */}
      <div className="time-section">
        <p>
          <img src={TimeIcon} alt="Time to Cook" /> How much time did it take
          you?
        </p>
        <div className="tags">
          {["5 min.", "10 min.", "15 min.", "20 min.", "30 min."].map((time) => (
            <button
              key={time}
              className={timeToCook === time ? "active" : ""}
              onClick={() => setTimeToCook(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Short Description */}
      <textarea
        placeholder="Write a short description..."
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />

      {/* Share Button */}
      <button className="share-button" onClick={handleSubmit}>
        Share
      </button>
    </section>
  );
}
