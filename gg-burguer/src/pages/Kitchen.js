import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Paper } from "@material-ui/core";
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import UpdateStatus from './UpdateStatus'

function Kitchen() {
  const token = localStorage.getItem("token");
  const idHall = localStorage.getItem("id");
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");

  fetch(`https://lab-api-bq.herokuapp.com/users/${idHall}`, {
    headers: {
      accept: "application/json",
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      setName(json.name);
    });

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history.push("/");
  };

  return (
    <div className="kitchen-feed">
      <Grid container spacing="2">
          <Button
            id="logoutBtn"
            size="medium"
            onClick={(event) => logout(event)}
          >
            Logout
          </Button>
        <Grid item xs={12}>
          <h2 className="intro">Bem vindo(a) {name}.</h2>
          <h2>Preparar seguintes pedidos:</h2>
        </Grid>
            <UpdateStatus />
      </Grid>
    </div>
  );
}

export default Kitchen;
