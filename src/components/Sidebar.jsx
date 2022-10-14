import React from "react";

import styles from "../styles/Sidebar.module.css";
import { useAuth } from "../context/AuthContext";

// icons
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";

function Sidebar({ active, setActive }) {
  const { logout } = useAuth();

  return (
    <div className={styles.container}>
      <img src="/logo.svg" alt="LOGO" className={styles.logo} />
      <div className={styles.menuContainer}>
        <h1 className={styles.title}>Main Menu</h1>
        <div
          className={
            active === "home" ? styles.tabContainerActive : styles.tabContainer
          }
          onClick={() => setActive("home")}
        >
          <HomeIcon
            sx={
              active === "home"
                ? {
                    color: "#fff",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
                : {
                    color: "#6f7680",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
            }
          />
          <span
            className={
              active === "home" ? styles.menuItemActive : styles.menuItem
            }
          >
            Home
          </span>
        </div>
        <div
          className={
            active === "new" ? styles.tabContainerActive : styles.tabContainer
          }
          onClick={() => setActive("new")}
        >
          <AddBoxIcon
            sx={
              active === "new"
                ? {
                    color: "#fff",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
                : {
                    color: "#6f7680",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
            }
          />
          <span
            className={
              active === "new" ? styles.menuItemActive : styles.menuItem
            }
          >
            New Claims
          </span>
        </div>
        <div
          className={
            active === "existing"
              ? styles.tabContainerActive
              : styles.tabContainer
          }
          onClick={() => setActive("existing")}
        >
          <ArticleIcon
            sx={
              active === "existing"
                ? {
                    color: "#fff",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
                : {
                    color: "#6f7680",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
            }
          />
          <span
            className={
              active === "existing" ? styles.menuItemActive : styles.menuItem
            }
          >
            Existing Claims
          </span>
        </div>
        <div
          className={
            active === "reports"
              ? styles.tabContainerActive
              : styles.tabContainer
          }
          onClick={() => setActive("reports")}
        >
          <DescriptionIcon
            sx={
              active === "reports"
                ? {
                    color: "#fff",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
                : {
                    color: "#6f7680",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
            }
          />
          <span
            className={
              active === "reports" ? styles.menuItemActive : styles.menuItem
            }
          >
            Reports
          </span>
        </div>
        <div
          className={
            active === "support"
              ? styles.tabContainerActive
              : styles.tabContainer
          }
          onClick={() => setActive("support")}
        >
          <ChatIcon
            sx={
              active === "support"
                ? {
                    color: "#fff",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
                : {
                    color: "#6f7680",
                    height: "20px",
                    width: "20px",
                    marginRight: "10px",
                  }
            }
          />
          <span
            className={
              active === "support" ? styles.menuItemActive : styles.menuItem
            }
          >
            Support
          </span>
        </div>
        <hr className={styles.line} />
        <div className={styles.logout} onClick={() => logout()}>
          <LogoutIcon
            sx={{
              color: "#117fff",
              height: "18px",
              width: "18px",
              marginRight: "10px",
            }}
          />
          <span className={styles.logoutTitle}>Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
