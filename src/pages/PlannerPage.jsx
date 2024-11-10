/* Made by Ralitsa Lyubcheva */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleTabs from "../components/ToggleTabs"; // Reusable toggle component
import PostCard from "../components/PostCard"; // PostCard for scheduled meal
import SmallRecipeCard from "../components/SmallRecipeCard"; // Smaller card for Kickstart Plan recipes

export default function PlannerPage() {
  const navigate = useNavigate();
  const [scheduledMeal, setScheduledMeal] = useState(null); // For next scheduled meal
  const [kickstartPlan, setKickstartPlan] = useState([]); // For kickstart plan recipes
  const [selectedDay, setSelectedDay] = useState("Monday"); // Default day for Kickstart Plan

  useEffect(() => {
    // Fetch scheduled meal from the database
    fetch(
      "https://plant-mate-posts-default-rtdb.europe-west1.firebasedatabase.app/scheduledMeal.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setScheduledMeal(data);
      })
      .catch((error) => console.error("Error fetching scheduled meal:", error));

    // Fetch kickstart plan recipes based on selected day
    fetch(
      `https://plant-mate-posts-default-rtdb.europe-west1.firebasedatabase.app/kickstartPlan/${selectedDay}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setKickstartPlan(data || []); // Default to empty array if no data
      })
      .catch((error) => console.error("Error fetching kickstart plan:", error));
  }, [selectedDay]); // Re-fetch data when selectedDay changes

  return (
    <section className="planner-page">
      {/* Toggle between Planner and Grocery */}
      <ToggleTabs
        activeTab="Planner"
        onToggle={(tab) =>
          navigate(tab === "Grocery" ? "/grocery" : "/planner")
        }
      />

      <div className="planner-content">
        <h2>Friday</h2>
        <p>18 October 2024</p>

        <h3>Your next scheduled meal:</h3>
        {scheduledMeal ? (
          <PostCard
            post={{
              id: scheduledMeal.id,
              name: scheduledMeal.name,
              mealType: scheduledMeal.mealType,
              timeToPrepare: scheduledMeal.timeToPrepare,
            }}
          />
        ) : (
          <p3>Loading scheduled meal...</p3>
        )}

        <h3>Kickstart plan</h3>
        <div className="day-tags">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <button
              key={day}
              className={`day-button ${selectedDay === day ? "active" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="kickstart-plan-recipes">
          {kickstartPlan.length > 0 ? (
            kickstartPlan.map((recipe) => (
              <SmallRecipeCard
                key={recipe.id}
                post={{
                  id: recipe.id,
                  name: recipe.name,
                  timeToPrepare: recipe.timeToPrepare,
                  username: recipe.username,
                }}
              />
            ))
          ) : (
            <p3>No recipes for {selectedDay}</p3>
          )}
        </div>
      </div>
    </section>
  );
}
