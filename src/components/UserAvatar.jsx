import { useEffect, useState } from "react";

export default function UserAvatar({ uid }) {
  const [user, setUser] = useState(null); // Set initial state to null
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(
          `https://plant-mate-9bee8-default-rtdb.firebaseio.com/users/${uid}.json` // Update the path to match your database structure
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    }

    if (uid) {
      getUser();
    }
  }, [uid]); // Ensure useEffect runs when `uid` changes

  if (loading) {
    return <p>Loading...</p>; // Optional loading state
  }

  if (!user) {
    return <p>User not found</p>; // Show message if no user data is available
  }

  return (
    <div className="avatar">
      <img src={user.image || "default-avatar.png"} alt={user.name || "User"} />
      <span>
        <h3>{user.name || "Anonymous"}</h3>
        <p>{user.title || "No title available"}</p>
      </span>
    </div>
  );
}
