import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import ProfilePage from "./pages/ProfilePage";
import SpecificPost from "./pages/SpecificPost";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserPosts from "./pages/UserPosts";
import ProfileEdit from './pages/ProfileEdit'
import { CircularProgress, Box } from "@mui/material";

const Login = lazy(() => import("./components/login/Login"));
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./components/signup/SignUp"));

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Suspense fallback={<Box className="h-screen w-screen flex items-center justify-center"><CircularProgress/></Box>} >
        <Routes>
          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute token={token} />}>
            <Route path="/" element={<Home />}>
              <Route index element={<Feed />} />
              <Route path="profile/:id" element={<ProfilePage />}>
                <Route index element={<UserPosts />} />
              </Route>
              <Route path="profile/edit" element={<ProfileEdit />} />
              <Route path="/p/:id" element={<SpecificPost />} />
            </Route>
          </Route>
          {/* AUTHENTICATED ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
