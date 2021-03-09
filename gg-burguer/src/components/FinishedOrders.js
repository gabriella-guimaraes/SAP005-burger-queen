import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import Header from './Header';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FinishedOrders(){
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
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
          getOrders()
        }, [])
    return(
        <div className="finishedOrders">
            {/* <Header /> */}
            <h1>Pedidos prontos para entregar:</h1>
            <Grid container spacing={2}>
                {orders.map((order) => {
                const { client_name, table, id, status, createdAt, updatedAt, Products } = order;
                const creatMoment = moment(createdAt).format('DD/MM/YYYY H:mm:ss');
                const creatMomentUpdate = moment(updatedAt).format('DD/MM/YYYY H:mm:ss');
                const orderId = id;
                return (
                    <Grid item key={id} xs={4}>
                        <Paper elevation={3} >
                        <h3 key={Math.random()}>Pedido n.º {id}</h3>
                        <h3 key={Math.random()}> Status: {status}</h3>
                        <p key={Math.random()}>Pedido enviado em: {creatMoment}</p>
                        <p key={Math.random()}>Pedido pronto em: {creatMomentUpdate}</p>
                        <p key={Math.random()}>Nome do cliente: {client_name}</p>
                        <p key={Math.random()}>Mesa: {table}</p>
                        
                        {Products && Products.map((product) => {
                            const { name, flavor, complement } = product;
                            const templateOrder = `${name} ${flavor || ""} ${
                                complement || ""
                            }`
                            return <p key={Math.random()}>{templateOrder}</p>
                            })}
                            <Button
                                id="btnDelivered"
                                size="medium"
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
                                            "status": "delivered"
                                        })

                                        })
                                        .then((response) => response.json())
                                        .then((json) => {
                                            setOpenAlert(true);
                                            const update = orders.filter((item) => item.id !== orderId)
                                            setOrders(update)
                                        })
                                }}>
                                    Pedido entregue
                            </Button>
                        
                            </Paper> 
                        </Grid>
                )    
                })}  
            </Grid> 
            <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                Pedido entregue!
                </Alert>
            </Snackbar>    
        </div>
    )
}

export default FinishedOrders;