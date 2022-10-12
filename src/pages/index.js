// Imports
import React from "react";
import styles from "../styles/Home.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  // State definitions
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Next Router Definition
  const router = useRouter();

  // Auth Context Definitions from useAuth
  const { login, isLoggedIn } = useAuth();

  React.useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, []);

  // Function Definition for Login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.AccessToken && json.IdToken) {
          login(json.IdToken, json.AccessToken);
          setLoading(false);
          router.replace("/dashboard");
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  // Render
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <img src={"/logo.svg"} alt="MPOWRD Logo" className={styles.logo} />
        <form className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading ? (
            <ClipLoader color={"#117fff"} loading={loading} size={25} />
          ) : (
            <button className={styles.formButton} onClick={handleSubmit}>
              Log In
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
