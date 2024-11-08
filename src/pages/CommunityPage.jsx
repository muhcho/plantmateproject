import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommunityPost from "../components/CommunityPost";
import SearchBar from "../components/SearchBar"; 
import AddPlusIcon from "../assets/addplus.svg";

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const [activeTag, setActiveTag] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  const tags = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://plant-mate-posts-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
        );
        const data = await response.json();

        const postsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setPosts(postsArray);
        setFilteredPosts(postsArray); 
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    }

    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    filterPosts(tag, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterPosts(activeTag, query);
  };

  const filterPosts = (tag, query) => {
    let filtered = posts;

    if (tag !== "All") {
      filtered = posts.filter((post) =>
        post.typeOfMeal.toLowerCase() === tag.toLowerCase()
      );
    }

    if (query) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <section className="community-page">
      {/* Search Bar */}
      <SearchBar placeholder="Find a friend" onSearch={handleSearch} />

      {/* Tag Section */}
      <div className="tag-section">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${activeTag === tag ? "active" : ""}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      {filteredPosts.map((post) => (
        <CommunityPost key={post.id} post={post} />
      ))}

      {/* Floating Action Button */}
      <button className="fab" onClick={() => navigate("/create")}>
        <img src={AddPlusIcon} alt="Add Post" />
      </button>
    </section>
  );
}
