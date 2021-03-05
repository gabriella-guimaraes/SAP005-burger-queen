import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function UpdateStatus(){

    const status = sessionStorage.getItem("status");
    const token = localStorage.getItem("token");
    const [openAlert, setOpenAlert] = useState(false);
    const [orders, setOrders] = useState([]);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false)
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
          const newOrders = json.filter((item) => item.status === "pending");
          setOrders(newOrders);
        });
    };
      useEffect(() => {
        getOrders()
      }, [])

    return(
        <div className="updateStatus">
          <Grid container spacing={2}>
          {orders.map((order) => {
              const { client_name, table, id, Products } = order;
              const orderId = id;
              return (
                <Grid item key={id} xs={4}>
                  <Paper elevation={3} >
                  <h3 key={Math.random()}>Pedido n.º {id}</h3>
                  <p key={Math.random()}>Nome do cliente: {client_name}</p>
                  <p key={Math.random()}>Mesa: {table}</p>
                  {Products && Products.map((product) => {
                      const { name, flavor, complement } = product;
                      const templateOrder = `${name} ${flavor || ""} ${
                        complement || ""
                      }`;
                      return <p key={Math.random()}>{templateOrder}</p>;
                    })}
                    <Button
                    id="btnDelivered"
                    size="medium"
                    color="primary"
                    key={Math.random()}
                    fullWidth
                    onClick={(event) => {
                      fetch(`https://lab-api-bq.herokuapp.com/orders/${orderId}`, {
                          method: "PUT",
                          headers: {
                            accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `${token}`
                          },
                          body: JSON.stringify({
                            "status": "done"
                          })

                        })
                          .then((response) => response.json())
                          .then((json) => {
                            setOpenAlert(true);
                            const update = orders.filter((item) => item.id !== orderId)
                            setOrders(update)
                          })
                    }}>
                    Pedido pronto
                  </Button>

                  </Paper>
                </Grid>
              );
            })}
          </Grid>
          <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Pedido enviado para entrega!
            </Alert>
          </Snackbar>
        </div>
    )
}

export default UpdateStatus
