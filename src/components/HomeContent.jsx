import React from "react";

import styles from "../styles/HomeContent.module.css";

function HomeContent({ user }) {
  return (
    <div className={styles.container}>
      <img src="/logo.svg" alt="LOGO" className={styles.logo} />
      <h1 className={styles.title}>
        Welcome Back{user ? `, ${user.fullName}` : "to MPOWRD Comp"}!
      </h1>
    </div>
  );
}

export default HomeContent;
