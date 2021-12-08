import { useRef, useState } from "react";
import { signup, useAuth, logout, login } from "./firebase";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (errors) {
      alert(errors.message);
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setLoading(false);
  }
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (errors) {
      alert(errors.message);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (errors) {
      alert(errors.message);
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setLoading(false);
  };

  return (
    <div className="App">
      <h3>Register User</h3>
      <input
        disabled={currentUser}
        placeholder={currentUser ? "Success" : "Email..."}
        ref={emailRef}
      />
      <input
        disabled={currentUser}
        type="password"
        placeholder={currentUser ? "Success" : "Password..."}
        ref={passwordRef}
      />

      <div>Signed in user: {currentUser?.email} </div>
      <div className="buttonContainer">
        <button disabled={loading || currentUser} onClick={handleSignup}>
          Create User
        </button>
        <button disabled={loading || !currentUser} onClick={handleLogout}>
          Log Out
        </button>
        <button disabled={loading || currentUser} onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default App;
