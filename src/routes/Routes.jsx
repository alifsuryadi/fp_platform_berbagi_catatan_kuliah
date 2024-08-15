// routes/Routes.jsx
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ListAllNotes from "../pages/ListAllNotes";
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Login = lazy(() => import("../pages/LoginPage"));
const Register = lazy(() => import("../pages/RegisterPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const ProfileSayaPage = lazy(() => import("../pages/ProfilePage"));
const PengaturanPage = lazy(() => import("../pages/PengaturanPage"));
const ListUserNotesPage = lazy(() => import("../pages/ListUserNotesPage"));
const NoteDetails = lazy(() => import("../pages/NoteDetails"));
const ListNotes = lazy(() => import("../pages/ListNotes"));
const NotFound = lazy(() => import("../pages/NotFound"));

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<ProfileSayaPage />} />
        <Route path="/setting" element={<PengaturanPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/list-user-notes" element={<ListUserNotesPage />} />
        <Route path="/note-details" element={<NoteDetails />} />
        <Route path="/note-details/:id" element={<NoteDetails />} />
        <Route path="/list-all-notes" element={<ListAllNotes />} />
        <Route path="/list-notes" element={<ListNotes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
