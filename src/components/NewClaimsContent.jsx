import React from "react";

import styles from "../styles/NewClaimsContent.module.css";

import PersonIcon from "@mui/icons-material/Person";

import ClipLoader from "react-spinners/ClipLoader";

import { useRouter } from "next/router";

function NewClaimsContent({ user }) {
  const [claims, setClaims] = React.useState([]);

  const router = useRouter();

  const getClaims = async () => {
    const accessToken = window.localStorage.getItem("accessToken");
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
      {claims.length > 0 ? (
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
                      <span
                        className={styles.buttonText}
                        onClick={() =>
                          router.push({
                            pathname: `/claim/${claim.id}`,
                            query: { claimId: JSON.stringify(claim.id) },
                          })
                        }
                      >
                        View Claim
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <div className={styles.noClaims}>
          <ClipLoader color={"#117fff"} loading={true} size={25} />
        </div>
      )}
    </div>
  );
}

export default NewClaimsContent;
