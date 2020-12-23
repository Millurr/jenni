import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice";
import { Button } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();
  const [cap, setCap] = useState();
  const [disabled, setDisabled] = useState(true);

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const getCap = async () => {
      const capKey = await Axios.get('/captcha/');
      setCap(capKey.data.cap);
    }
    getCap();
  });

  const onChange = (value) => {
    setDisabled(!disabled);
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("/users/register", newUser);
      const loginRes = await Axios.post("/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          id="register-password"
          type="password"
          placeholder="Verify Password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-display-name">Display Name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <ReCAPTCHA
            sitekey='6LdnRRIaAAAAAByyzHRHAVLrep2mWoMbFPYtM4Gp'
            onChange={onChange}
          />
        <Button disabled={disabled} variant="secondary" type="submit">Register</Button>
      </form>
    </div>
  );
}
