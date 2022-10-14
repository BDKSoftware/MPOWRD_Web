import React from "react";

import styles from "../styles/DashboardContainer.module.css";

import Sidebar from "../components/Sidebar";

// Imports Content
import HomeContent from "../components/HomeContent";
import NewClaimsContent from "../components/NewClaimsContent";

function DashboardContainer({ user }) {
  const [active, setActive] = React.useState("home");

  const showContent = () => {
    switch (active) {
      case "home":
        return <HomeContent user={user} />;
      case "new":
        return <NewClaimsContent user={user} />;
      // case "existing":
      //   return <ExistingClaims />;
      // case "reports":
      //   return <Reports />;
      // case "support":
      //   return <Support />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <Sidebar active={active} setActive={setActive} />
      </div>
      <div className={styles.mainContentArea}>{showContent()}</div>
    </div>
  );
}

export default DashboardContainer;
