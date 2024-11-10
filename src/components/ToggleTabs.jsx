/* Made by Ralitsa Lyubcheva */
import React from "react";
import PropTypes from "prop-types";

export default function ToggleTabs({ activeTab, onToggle }) {
  return (
    <div className="toggle-tabs">
      <button 
        className={`toggle-tab ${activeTab === "Planner" ? "active" : ""}`} 
        onClick={() => onToggle("Planner")}
      >
        Planner
      </button>
      <button 
        className={`toggle-tab ${activeTab === "Grocery" ? "active" : ""}`} 
        onClick={() => onToggle("Grocery")}
      >
        Your grocery
      </button>
    </div>
  );
}

ToggleTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};
