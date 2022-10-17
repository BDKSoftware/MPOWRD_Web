import React, { useEffect } from "react";
import { useRouter } from "next/router";

function ClaimScreen({ claimID }) {
  const [claim, setClaim] = React.useState(null);

  const getClaimByID = async () => {
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
  };

  useEffect(() => {
    getClaimByID();
  }, []);

  return (
    <div>
      <h1>{claim.id}</h1>
    </div>
  );
}

export default ClaimScreen;

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/claim/allClaims", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  const paths = data.Items.map((claim) => {
    return {
      params: { slug: claim.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  return {
    props: {
      claimID: context.params.slug,
    },
  };
};
