import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";
import SaveIcon from "../assets/save_icon.svg";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/posts/${post.id}`);
  }

  return (
    <article className="post-card" onClick={handleNavigate}>
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
            <svg className="heart-icon" viewBox="0 0 24 24">
              {/* SVG path for heart icon */}
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
            <span>200</span>
          </div>
          <img src={SaveIcon} alt="Save Icon" className="save-icon" />
        </div>
      </div>
    </article>
  );
}
