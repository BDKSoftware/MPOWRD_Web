import React from "react";

import styles from "../styles/NewClaimsContent.module.css";

import PersonIcon from "@mui/icons-material/Person";

function NewClaimsContent({ user }) {
  const [claims, setClaims] = React.useState([]);

  const getClaims = async () => {
    const accessToken = localStorage.getItem("accessToken");
    await fetch(
      `http://localhost:3000/api/claim/byInvestigator?claimInvestigator=${user.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.Items);
        setClaims(data.Items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getClaims();
  }, []);

  const claimTab = ({ name, date, status, severity, policyYear }) => {
    return (
      <div className={styles.claimTab}>
        <span>{name}</span>
        <span>{date}</span>
        <span>{status}</span>
        <span>{severity}</span>
        <span>{policyYear}</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Claims</h1>
        <div className={styles.iconContainer}>
          <PersonIcon
            sx={{
              color: "#117FFF",
              height: "16px",
              width: "16px",
            }}
          />
        </div>
      </div>
      <div className={styles.claimTable}>
        <table className={styles.table}>
          <tr className={styles.tableHeader}>
            <th className={styles.tableLabel}>Name of Injured Worker</th>
            <th className={styles.tableLabel}>Claim ID</th>
            <th className={styles.tableLabel}>Date of Incident</th>
            <th className={styles.tableLabel}>Status</th>
            <th className={styles.tableLabel}>Actions</th>
          </tr>
          {claims.map((claim, index) => {
            return (
              <tr
                className={
                  index % 2 == 0 ? styles.tableRow : styles.tableRowOdd
                }
                key={index}
              >
                <td className={styles.tableItem}>
                  {claim.nameOfInjuredWorker}
                </td>
                <td className={styles.tableItem}>{claim.id}</td>
                <td className={styles.tableItem}>
                  {claim.investigatorReportDate}
                </td>
                <td className={styles.tableItem}>{claim.status}</td>

                <td className={styles.tableItem}>
                  <div className={styles.button}>
                    <span className={styles.buttonText}>View Claim</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default NewClaimsContent;
