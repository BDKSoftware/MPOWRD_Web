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
  const [error, setError] = React.useState("");

  // Next Router Definition
  const router = useRouter();

  // Auth Context Definitions from useAuth
  const { login, isLoggedIn, setUser } = useAuth();

  React.useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, []);

  const getUser = async (accessToken) => {
    await fetch(`http://localhost:3000/api/user/byEmail?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.Items[0]);
        //console.log(data.Items[0]);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const validateLogin = async () => {
    if (email === "") {
      setError("Please enter your email");
      setLoading(false);
      return false;
    }

    if (password === "") {
      setError("Please enter your password");
      setLoading(false);
      return false;
    }

    if (email === "" || password === "") {
      setError("Please fill in all fields");
      setLoading(false);
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return false;
    }

    return true;
  };

  // Function Definition for Login
  const handleSubmit = async (event) => {
    setError("");
    event.preventDefault();
    setLoading(true);
    const validate = await validateLogin();
    if (!validate == false) {
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
            getUser(json.AccessToken);
            login(json.IdToken, json.AccessToken);
            setLoading(false);
            router.replace("/dashboard");
          } else {
            setError("Invalid Credentials, please try again");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    }
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
          {error ? <span className={styles.error}>{error}</span> : null}
        </form>
      </div>
    </div>
  );
}
