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

  const routerFinishedOrders = (event) => {
    event.preventDefault();
    history.push("/pedidosprontos");
  };

  const routerDeliveredOrders = (event) => {
    event.preventDefault();
    history.push("/pedidosentregues");
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
      
    </Grid>
    <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Histórico de pedidos</h2>
        </Grid>
        <Grid item xs={4} >
          <Button
          id="finishedOrdersBtn"
          size="medium"
          color="primary"
          fullWidth
          onClick={(event) => routerFinishedOrders(event)}>
            Pedidos para entregar
          </Button>
          </Grid>
            <Grid item xs={4} >
              <Button
              id="finishedOrdersBtn"
              size="medium"
              color="primary"
              fullWidth
              onClick={(event) => routerDeliveredOrders(event)}>
                Pedidos finalizados
              </Button>
            </Grid>
            
        
      </Grid>
    </div>
  );
}

export default Hall;

