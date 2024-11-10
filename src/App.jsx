import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Header from "./components/Header";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import RecipesPage from "./pages/RecipesPage";
import PlannerPage from "./pages/PlannerPage";
import CommunityPage from "./pages/CommunityPage";
import FavoritesPage from "./pages/FavoritesPage";
import AccountPage from "./pages/AccountPage";
import PostDetailsPage from "./pages/PostDetailsPage"; // Different from PostDetailPage
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Recipes */}
          <Route path="/recipes" element={<RecipesPage />} />

          {/* Planner */}
          <Route path="/planner" element={<PlannerPage />} />

          {/* Community */}
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/:id" element={<PostDetailsPage />} />

          {/* Post Details */}
          <Route path="/posts/:id" element={<PostDetailPage />} />

          {/* Favorites */}
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* Account */}
          <Route path="/account" element={<AccountPage />} />

          {/* Create & Edit */}
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<UpdatePage />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
