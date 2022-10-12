import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      logout();
      router.replace("/");
    }
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
