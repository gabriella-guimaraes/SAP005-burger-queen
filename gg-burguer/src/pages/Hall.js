import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Paper } from "@material-ui/core";
import AllTimeMenu from "../components/All-TimeMenu";
import Breakfast from "../components/BreakfastMenu";
import { makeStyles } from "@material-ui/core/styles";
// import moment from 'react-moment';

function Hall() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const history = useHistory();
  const [breakfastIsOpen, setBreakfastIsOpen] = useState(false);
  const [allTimeIsOpen, setAllTimeIsOpen] = useState(true);
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [orders, setOrders] = useState([]);

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

  const openBreakfast = () => {
    setBreakfastIsOpen(true);
    setAllTimeIsOpen(false);
  };
  const openAllTime = () => {
    setBreakfastIsOpen(false);
    setAllTimeIsOpen(true);
  };
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history.push("/");
  };

  const getOrders = () => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      headers: {
        accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const newOrders = json.filter((item) => item.status === "done");
        setOrders(newOrders);
        console.log(newOrders);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={10} direction="row" justify="flex-start">
        <h2 className="intro">Bem vindo(a) {name}.</h2>
      </Grid>
      <Grid item xs={2} direction="row" justify="flex-start">
      <Button
        id="logoutBtn"
        size="medium"
        fullWidth
        onClick={(event) => logout(event)}
      >
        Logout
      </Button>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button
                  variant={breakfastIsOpen ? "contained" : "outlined"}
                  color="primary"
                  onClick={openBreakfast}
                  size="medium"
                  fullWidth
                >
                  Menu Café
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant={allTimeIsOpen ? "contained" : "outlined"}
                  color="primary"
                  onClick={openAllTime}
                  size="medium"
                  fullWidth
                >
                  Menu Burguer
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} md={12} >
            {allTimeIsOpen && <AllTimeMenu />}
            {breakfastIsOpen && (
              <div className="breakfast">
                <Breakfast />
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} sm={6} direction="row" justify="flex-start">
        <Grid item xs={12}>
          <h2>Pedidos para entregar</h2>
        </Grid>
        <Grid item xs={12} >
        {orders.map((order) => {
              const { client_name, table, status,createdAt, updatedAt, Products } = order;
              // const creatMoment = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
              return (
                <Grid container key={id}>
                  <Paper elevation={3}>
                  <Grid item xs={6}>
                  <p>Nome do cliente: {client_name} Mesa: {table}</p>
                  </Grid>
                  <Grid item xs={3}>
                  <p>Mesa: {table}</p>
                  </Grid>
                  <Grid item xs={3}>
                  <p>Status do pedido: {status}</p>
                  </Grid>
                  <p>Pedido enviado em: {createdAt}</p>
                  <p>Pedido pronto em: {updatedAt}</p>
                  <>
                    {Products.map((product) => {
                      const { name, flavor, complement } = product;
                      const templateOrder = `${name} ${flavor || ""} ${
                        complement || ""
                      }`;
                      return <p key={Math.random()}>{templateOrder}</p>;
                    })}
                  </>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Hall;

{
  /* <Button color="primary" size="medium" onClick={(event)=> routerAllOrders(event)}
					>Ver pedidos pendentes</Button>

					const routerAllOrders = (event) => {
						event.preventDefault();
						history.push('/allorders')
					  }   */
}

