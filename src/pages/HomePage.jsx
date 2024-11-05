import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const url = "https://plant-mate-9bee8-default-rtdb.firebaseio.com/recipes.json";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        // Convert object to array
        const postsArray = data ? Object.keys(data).map(postId => ({
          id: postId,
          ...data[postId]
        })) : [];

        console.log("Formatted posts array:", postsArray);
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="page">
      <div className="grid">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p>No posts available</p> // Display message if no posts found
        )}
      </div>
    </section>
  );
}
