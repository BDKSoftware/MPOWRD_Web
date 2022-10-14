import React from "react";

import styles from "../styles/NewClaimsContent.module.css";

function NewClaimsContent() {
  const getClaims = async () => {
    const accessToken = localStorage.getItem("accessToken");
    await fetch("http://localhost:3000/api/claim/byinvestigator", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getClaims();
  }, []);

  return (
    <div className={styles.container}>
      <h1>New Claims</h1>
    </div>
  );
}

export default NewClaimsContent;
