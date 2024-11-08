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

  const handleTagClick = (setFunction, value) => {
    setFunction(value);
  };

  const handleShare = async () => {
    const newPost = {
      image: imageUrl,
      title: "New Post", // Placeholder title; could allow user input
      shortDescription,
      typeOfMeal,
      timeToCook,
      postedAgo: "Just now",
      user: "random_user", // Placeholder for now
      userPicture: "https://via.placeholder.com/50", // Placeholder image
      likes: 0,
      comments: 0,
    };

    try {
      const response = await fetch(
        "https://plant-mate-posts-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      if (response.ok) {
        navigate("/community");
      } else {
        console.error("Failed to share post");
      }
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  return (
    <section className="create-page">
      <div className="header">
        <img src={BackIcon} alt="Back" onClick={() => navigate("/community")} />
        <h2>New Post</h2>
      </div>

      <input
        type="text"
        placeholder="Paste image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      {imageUrl && <img src={imageUrl} alt="Post Preview" className="post-preview" />}

      <div className="meal-section">
        <p>
          <img src={LeafIcon} alt="Meal Type" /> Choose the type of meal
        </p>
        <div className="tags">
          {["Breakfast", "Lunch", "Dinner", "Snack"].map((meal) => (
            <button
              key={meal}
              className={typeOfMeal === meal ? "active" : ""}
              onClick={() => handleTagClick(setTypeOfMeal, meal)}
            >
              {meal}
            </button>
          ))}
        </div>
      </div>

      <div className="time-section">
        <p>
          <img src={TimeIcon} alt="Time to Cook" /> How much time did it take you?
        </p>
        <div className="tags">
          {["5 min.", "10 min.", "15 min.", "20 min.", "30 min."].map((time) => (
            <button
              key={time}
              className={timeToCook === time ? "active" : ""}
              onClick={() => handleTagClick(setTimeToCook, time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <textarea
        placeholder="Write a short description..."
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />

      <button className="share-button" onClick={handleShare}>
        Share
      </button>
    </section>
  );
}
