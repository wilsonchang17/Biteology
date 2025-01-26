import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    // Fetch data from Flask API
    fetch("http://127.0.0.1:5000/api/hello")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  const sendData = () => {
    fetch("http://127.0.0.1:5000/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Biteology" }),
    })
      .then((response) => response.json())
      .then((data) => setResponseData(data));
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={sendData}>Send Data to Flask</button>
      {responseData && (
        <div>
          <h2>Response from Flask:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;