import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoveIcon from "../assets/loveicon.svg";
import LikeFilledIcon from "../assets/like_filled_icon.svg";
import CommentsIcon from "../assets/commentsonposts.svg";
import SaveIcon from "../assets/save_icon.svg";
import DotsIcon from "../assets/dotsicon.svg";
import { toggleLike, isLiked } from "../utils/likeManager";

export default function CommunityPost({ post }) {
  const navigate = useNavigate();
  const [isLikedState, setIsLikedState] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  useEffect(() => {
    setIsLikedState(isLiked(post.id));
  }, [post.id]);

  const handleLike = async (e) => {
    e.stopPropagation();
    const updatedLikes = await toggleLike(post.id, likeCount);
    setLikeCount(updatedLikes);
    setIsLikedState(!isLikedState);
  };

  return (
    <div className="community-post" onClick={() => navigate(`/community/${post.id}`)}>
      <div className="user-section">
        <div className="user-info">
          <img src={post.userPicture} alt={post.user} className="user-avatar" />
          <div>
            <h3 className="user-name">{post.user}</h3>
            <p className="posted-ago">{post.postedAgo}</p>
          </div>
        </div>
        <img src={DotsIcon} alt="Options" className="dots-icon" />
      </div>

      <div className="post-image-container">
        <img src={post.image} alt={post.title} className="post-image" />
        <div className="post-labels">
          <span className="type-of-meal">{post.typeOfMeal}</span>
          <span className="time-to-cook">{post.timeToCook}</span>
        </div>
      </div>

      <div className="post-actions">
        <div className="likes-comments">
          <img
            src={isLikedState ? LikeFilledIcon : LoveIcon}
            alt="Likes"
            className="icon"
            onClick={handleLike}
          />
          <span>{likeCount}</span>
          <img src={CommentsIcon} alt="Comments" className="icon" />
          <span>{post.comments}</span>
        </div>
        <img src={SaveIcon} alt="Save" className="icon save-icon" />
      </div>

      <p className="post-description">{post.shortDescription}</p>
    </div>
  );
}
