/* Made by Mihaela Ninova */
// src/utils/likeManager.js

export const toggleLike = async (postId, currentLikes) => {
    try {
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
      const isCurrentlyLiked = likedPosts.includes(postId);
      let newLikesCount = currentLikes;
  
      if (isCurrentlyLiked) {
        newLikesCount -= 1;
        const updatedLikes = likedPosts.filter((id) => id !== postId);
        localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
      } else {
        newLikesCount += 1;
        likedPosts.push(postId);
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      }
  
      await fetch(
        `https://plant-mate-posts-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likes: newLikesCount }),
        }
      );
  
      return newLikesCount;
    } catch (error) {
      console.error("Error toggling like:", error);
      return currentLikes; // Return the same count in case of an error
    }
  };
  
  export const isLiked = (postId) => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    return likedPosts.includes(postId);
  };
  