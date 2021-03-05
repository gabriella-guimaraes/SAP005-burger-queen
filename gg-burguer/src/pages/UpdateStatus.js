import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@material-ui/core";


function UpdateStatus(){
    // const newStatus = sessionStorage.getItem("newStatus");
    const status = sessionStorage.getItem("status");
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
          const newOrders = json.filter((item) => item.status === "pending");
          setOrders(newOrders);
          console.log(newOrders);
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
              sessionStorage.setItem("itemId", id);
              const orderId = id;
              console.log(id)
              return (
                <Grid item key={id} xs={4}>
                  <Paper elevation={3} >
                  <h3 key={Math.random()}>Pedido n.º {id}</h3>
                  <p key={Math.random()}>Nome do cliente: {client_name}</p>
                  <p key={Math.random()}>Mesa: {table}</p>
                  <h1 key={Math.random()}>id: {id}</h1>
                  {Products && Products.map((product) => {
                      const { name, flavor, complement } = product;
                      const templateOrder = `${name} ${flavor || ""} ${
                        complement || ""
                      }`;
                      return <p key={Math.random()}>{templateOrder}</p>;
                    })}
                    <Button
                    size="medium"
                    color="primary"
                    key={Math.random()}
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
                            const update = orders.filter((item) => item.id !== orderId)
                            setOrders(update)
                            console.log(json)
                          })
                    }}>
                    Pedido pronto
                  </Button>

                  </Paper>
                </Grid>
              );
            })}
          </Grid>

        </div>
    )
}

export default UpdateStatus
