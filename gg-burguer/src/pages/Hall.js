import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Paper } from "@material-ui/core";
import AllTimeMenu from "../components/All-TimeMenu";
import Breakfast from "../components/BreakfastMenu";
import { makeStyles } from "@material-ui/core/styles";
import Header from '../components/Header';

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
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [orders, setOrders] = useState([]);

  const openBreakfast = () => {
    setBreakfastIsOpen(true);
    setAllTimeIsOpen(false);
  };
  const openAllTime = () => {
    setBreakfastIsOpen(false);
    setAllTimeIsOpen(true);
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
    <div className="hall-feed">
      <Header />
    <Grid container spacing={2}>
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
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} md={12}>
          <h2>Pedidos para entregar</h2>
        </Grid>
        <Grid item xs={12} md={12} >
        {orders.map((order) => {
              const { client_name, table, status, createdAt, updatedAt, Products } = order;
              return (
                <Grid item key={id} xs={4} >
                  <Paper elevation={3}>
                  <p>Nome do cliente: {client_name}</p>
                  <p>Mesa: {table}</p>
                  <p>Status do pedido: {status}</p>
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
    </div>
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
