import React from "react";
import LoveIcon from "../assets/loveicon.svg";
import CommentsIcon from "../assets/commentsonposts.svg";
import SaveIcon from "../assets/save_icon.svg";

export default function CommunityPost({ post }) {
  return (
    <div className="community-post">
      {/* User Section */}
      <div className="user-section">
        <img src={post.userPicture} alt={post.user} className="user-avatar" />
        <div>
          <h3>{post.user}</h3>
          <p>{post.postedAgo}</p>
        </div>
      </div>

      {/* Post Image */}
      <div className="post-image-container">
        <img src={post.image} alt={post.title} className="post-image" />
        <div className="post-labels">
          <span className="type-of-meal">{post.typeOfMeal}</span>
          <span className="time-to-cook">{post.timeToCook}</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <div className="likes-comments">
          <img src={LoveIcon} alt="Likes" className="icon" />
          <span>{post.likes}</span>
          <img src={CommentsIcon} alt="Comments" className="icon" />
          <span>{post.comments}</span>
        </div>
        <img src={SaveIcon} alt="Save" className="icon save-icon" />
      </div>

      {/* Post Description */}
      <p className="post-description">{post.shortDescription}</p>
    </div>
  );
}
