// Imports
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

// CSS import
import styles from "../../styles/Dashboard.module.css";

// Dashboard component
import DashboardContainer from "../../layouts/DashboardContainer";

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
  }, [isLoggedIn]);

  // Render
  return (
    <div className={styles.container}>
      <DashboardContainer />
    </div>
  );
}
