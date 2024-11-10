/* Made by Mihaela Ninova, not used yet */
import React from "react";
import PropTypes from "prop-types";

export default function SmallRecipeCard({ post }) {
  return (
    <div className="small-recipe-card">
      <h4>{post.name}</h4>
      <p>{post.username}</p>
      <p>{post.timeToPrepare}</p>
    </div>
  );
}

SmallRecipeCard.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    timeToPrepare: PropTypes.string.isRequired,
  }).isRequired,
};
