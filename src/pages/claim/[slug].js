import React, { useEffect } from "react";
import { useRouter } from "next/router";

function ClaimScreen() {
  const router = useRouter();
  const claimID = JSON.parse(router.query.claimId);

  const [claim, setClaim] = React.useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    console.log(claimID);
    if (claimID) {
      fetch(
        `http://localhost:3000/api/claim/byClaimNumber?claimNumber=${claimID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.Items[0]);
          setClaim(data.Items[0]);
        });
    }
  }, []);

  return (
    <div>
      <h1>{claim.id}</h1>
    </div>
  );
}

export default ClaimScreen;
