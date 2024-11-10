/* Made by Ralitsa Lyubcheva */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SaveIcon from "../assets/save_icon.svg";
import SaveFilledIcon from "../assets/save_filled_icon.svg";
import LoveIcon from "../assets/loveicon.svg";
import LikeFilledIcon from "../assets/like_filled_icon.svg";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsSaved(savedPosts.some((savedPost) => savedPost.id === post.id));

    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    setIsLiked(likedPosts.some((likedPost) => likedPost.id === post.id));
  }, [post.id]);

  const handleSavePost = (e) => {
    e.stopPropagation(); // Prevent navigation
    const savedPosts = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isSaved) {
      const updatedPosts = savedPosts.filter((savedPost) => savedPost.id !== post.id);
      localStorage.setItem("favorites", JSON.stringify(updatedPosts));
    } else {
      savedPosts.push(post);
      localStorage.setItem("favorites", JSON.stringify(savedPosts));
    }

    setIsSaved(!isSaved);
  };

  const handleLikePost = (e) => {
    e.stopPropagation(); // Prevent navigation
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

    if (isLiked) {
      const updatedPosts = likedPosts.filter((likedPost) => likedPost.id !== post.id);
      localStorage.setItem("likedPosts", JSON.stringify(updatedPosts));
      setLikeCount(likeCount - 1); // Decrement like count
    } else {
      likedPosts.push(post);
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      setLikeCount(likeCount + 1); // Increment like count
    }

    setIsLiked(!isLiked);
  };

  return (
    <article className="post-card" onClick={() => navigate(`/posts/${post.id}`)}>
      <div className="post-card-image-container">
        <img src={post.image} alt={post.name} className="post-card-image" />
        <div className="post-card-info">
          <span className="meal-type">{post.mealType}</span>
          <span className="time-to-prepare">{post.timeToPrepare}</span>
        </div>
      </div>
      <div className="post-card-content">
        <h3>{post.name}</h3>
        <div className="post-card-bottom">
          <span className="username">@{post.username}</span>
          <div className="post-card-likes">
            <img
              src={isLiked ? LikeFilledIcon : LoveIcon}
              alt="Like Icon"
              className="like-icon"
              onClick={handleLikePost}
            />
            <span>{likeCount}</span>
          </div>
          <img
            src={isSaved ? SaveFilledIcon : SaveIcon}
            alt="Save Icon"
            className="save-icon"
            onClick={handleSavePost}
          />
        </div>
      </div>
    </article>
  );
}
