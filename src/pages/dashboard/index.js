// Imports
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

// Component Declaration
export default function Dashboard() {
  // Auth Context Definitions
  const { isLoggedIn, logout } = useAuth();

  // Next Router Definition
  const router = useRouter();

  React.useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      logout();
      router.replace("/");
    }
  }, []);

  // Render
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
