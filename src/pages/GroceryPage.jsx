/* not done */
import React from "react";
import { useNavigate } from "react-router-dom";
import ToggleTabs from "../components/ToggleTabs";

export default function GroceryPage() {
  const navigate = useNavigate();

  return (
    <section className="grocery-page">
      <ToggleTabs 
        activeTab="Grocery"
        onToggle={(tab) => navigate(tab === "Planner" ? "/planner" : "/grocery")}
      />
      
      <div className="grocery-content">
        <h2></h2>
        <br/>
        <p>Coming Soon...</p>
      </div>
    </section>
  );
}
