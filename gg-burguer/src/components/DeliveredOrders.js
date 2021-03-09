import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";
import Header from './Header';
import moment from 'moment';

function DeliveredOrders(){
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        fetch("https://lab-api-bq.herokuapp.com/orders", {
          headers: {
            accept: "application/json",
            Authorization: `${token}`,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            const newOrders = json.filter((item) => item.status === "delivered");
            setOrders(newOrders);
          });
      };
        useEffect(() => {
          getOrders()
        }, [])
    return(
        <div className="finishedOrders">
            {/* <Header /> */}
            <h1>Pedidos Finalizados</h1>
            <Grid container spacing={2}>
                {orders.map((order) => {
                const { client_name, table, id, status, createdAt, updatedAt, Products } = order;
                const creatMoment = moment(createdAt).format('DD/MM/YYYY H:mm:ss');
                const creatMomentUpdate = moment(updatedAt).format('DD/MM/YYYY H:mm:ss');
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
                            }`;
                            return <p key={Math.random()}>{templateOrder}</p>;
                            })}
                            </Paper> 
                        </Grid>
                )   
                })} 
            </Grid>     
        </div>
    )
}

export default DeliveredOrders;