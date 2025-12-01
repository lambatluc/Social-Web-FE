import { Routes, Route } from "react-router-dom";

import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
} from "@/pages/root";
import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "@/layouts/RootLayout";
import SignupForm from "@/pages/auth/signup";
import SigninForm from "@/pages/auth/login";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { PublicRoute } from "@/components/shared/PublicRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/sign-in"
          element={
            <PublicRoute>
              <SigninForm />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <SignupForm />
            </PublicRoute>
          }
        />
      </Route>

      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Saved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-users"
          element={
            <ProtectedRoute>
              <AllUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-post/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-profile/:id"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
