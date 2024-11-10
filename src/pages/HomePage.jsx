/* Made by Ralitsa Lyubcheva */
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar"; 
import BisonIcon from "../assets/avatar_bison.svg"; // Import the friendly bison icon

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [recommendedPost, setRecommendedPost] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const url = "https://plant-mate-9bee8-default-rtdb.firebaseio.com/recipes.json";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();

        // Convert object to array
        const postsArray = data ? Object.keys(data).map(postId => ({
          id: postId,
          ...data[postId]
        })) : [];

        if (postsArray.length > 0) {
          setRecommendedPost(postsArray[0]);
        }

        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  // Categorize posts
  const trendingPosts = posts.slice(1, 4);
  const sweetTreatsPosts = posts.slice(4, 7);

  return (
    <section className="page home-page">
      <SearchBar />

      {/* Friendly Bison Section */}
      <div className="bison-section">
        <img src={BisonIcon} alt="Friendly Bison" className="bison-icon" />
        <div className="text-bubble">
          <p>Out of ideas for your next meal? DM me 😉</p>
        </div>
      </div>

      {/* Scrollable Tag Buttons */}
      <div className="tag-section">
        <button className="tag-button">🍳 Breakfast</button>
        <button className="tag-button">🍰 Dessert</button>
        <button className="tag-button">🥗 Lunch</button>
        <button className="tag-button">🍲 Dinner</button>
        <button className="tag-button">🍪 Snack</button>
      </div>

      {/* Recommended for You */}
      {recommendedPost && (
        <div className="recommended-section">
          <h2>Recommended for You</h2>
          <div className="recommended-post-container">
            <PostCard post={recommendedPost} />
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="category-section">
        <h2>Trending in Denmark</h2>
        <div className="post-grid">
          {trendingPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>

        <h2>Favourite Sweet Treats</h2>
        <div className="post-grid">
          {sweetTreatsPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
}
