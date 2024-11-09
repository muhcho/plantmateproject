import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedPosts);
  }, []);

  return (
    <section className="favorites-page">
      {/* Header Section */}
      <header className="favorites-header">
        <h1>Saved</h1>
        <p>All saved recipes</p>
      </header>

      {/* Favorites Grid */}
      <div className="favorites-grid">
        {favorites.length > 0 ? (
          favorites.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="no-favorites-text">No favorites yet. Save your favorite recipes!</p>
        )}
      </div>
    </section>
  );
}
