import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Paper } from "@material-ui/core";
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';

function Kitchen() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
  // const [ products, setProducts ] = useState('');

  function Cooking(event) {
    event.preventDefault();
    sessionStorage.setItem("status", "pending");
    sessionStorage.setItem("newStatus", "pronto");
    history.push("/alloders");
  }

  function GetOrdersData(event) {
    event.preventDefault();
    const data = sessionStorage.getItem("order");
    console.log(data);
  }

  fetch(`https://lab-api-bq.herokuapp.com/users/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      setName(json.name);
    });

  // fazer os status dos pedidos e printar na tela
  const getOrders = () => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      headers: {
        accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const newOrders = json.filter((item) => item.status !== "");
        setOrders(newOrders);
        console.log(newOrders);
      });
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history.push("/");
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="kitchen-feed">
      <Grid container spacing="2">
          <Button
            id ="logoutBtn"
            size="medium"
            onClick={(event) => logout(event)}
          >
            Logout
          </Button>
        <Grid item xs={12}>
          <h2 className="intro">Bem vindo(a) {name}.</h2>
          <h2>Preparar seguintes pedidos:</h2>
        </Grid>
        {/* <Paper elevation={3}> */}
          <Grid container spacing={2}>
            {orders.map((order) => {
              const { client_name, table, status, Products } = order;
              return (
                <Grid item key={id} xs={4} spacing={2}>
                  <Paper elevation={3}>
                  <p>Nome do cliente: {client_name}</p>
                  <p>Mesa: {table}</p>
                  <p>Status do pedido: {status}</p>
                  <p>
                    {Products.map((product) => {
                      const { name, flavor, complement } = product;
                      const templateOrder = `${name} ${flavor || ""} ${
                        complement || ""
                      }`;
                      return <p>{templateOrder}</p>;
                    })}
                  </p>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        {/* </Paper> */}
      </Grid>
    </div>
  );
}

export default Kitchen;
