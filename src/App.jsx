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
import PostDetailsPage from "./pages/PostDetailsPage"; 
import UpdatePage from "./pages/UpdatePage";


function App() {
  return (
    <>
      <Header />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/edit/:id" element={<UpdatePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/community/:id" element={<PostDetailsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  
  );
}

export default App;
