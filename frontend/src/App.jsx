import { useState } from "react";

const API_URL = "http://backend:4000";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    setMessage(await res.text());
  };

  const login = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    setMessage(await res.text());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>simple login page</h1>
      <h1>hello geeta</h1>
      <h2>Login App</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={register}>Register</button>
      <button onClick={login} style={{ marginLeft: "10px" }}>
        Login
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App;
