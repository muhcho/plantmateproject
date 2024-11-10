/* Made by Mihaela Ninova */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(
          `https://plant-mate-9bee8-default-rtdb.firebaseio.com/recipes/${id}.json`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    }

    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  // Calculate Prep Time and Cook Time dynamically based on Total Time
  const totalTime = parseInt(post.timeToPrepare, 10) || 0;
  const prepTime = Math.floor(totalTime * 0.4); // 40% prep time
  const cookTime = totalTime - prepTime;

  return (
    <section className="post-detail-page-unique">
      {/* Back Button */}
      <button className="back-button-unique" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      {/* Header Section */}
      <div className="header-section-unique">
        <img src={post.image} alt={post.name} className="header-image-unique" />
        <h1 className="post-title-unique">{post.name}</h1>
      </div>

      {/* Preparation Times */}
      <section className="prep-times-unique">
        <div>
          <h3>Total Time</h3>
          <p>{totalTime} min</p>
        </div>
        <div>
          <h3>Prep Time</h3>
          <p>{prepTime} min</p>
        </div>
        <div>
          <h3>Cook Time</h3>
          <p>{cookTime} min</p>
        </div>
      </section>
    </section>
  );
}