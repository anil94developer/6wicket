import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProfile } from "../store/authSlice";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, profile, isProfileLoading } = useAppSelector((state) => state.auth);

  // Fetch profile when layout loads if authenticated and profile not loaded
  useEffect(() => {
    if (isAuthenticated && !profile && !isProfileLoading) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, profile, isProfileLoading, dispatch]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
