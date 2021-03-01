import "./App.css";
import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();

  const routerRegister = () => {
    history.push("/registro");
  };
  const routerLogin = () => {
    history.push("/login");
  };

  return (
    <div className="App">
      <h1>Página home</h1>
      <Button variant="contained" color="primary" onClick={routerRegister}>
        Registro
      </Button>
      <Button variant="contained" color="primary" onClick={routerLogin}>
        Login
      </Button>
    </div>
  );
}

export default App;
