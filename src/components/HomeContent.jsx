import React from "react";

import styles from "../styles/HomeContent.module.css";

function HomeContent() {
  return (
    <div className={styles.container}>
      <img src="/logo.svg" alt="LOGO" className={styles.logo} />
      <h1 className={styles.title}>Welcome to MPOWRD Comp</h1>
    </div>
  );
}

export default HomeContent;
