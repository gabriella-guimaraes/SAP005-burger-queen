import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@material-ui/core";


function UpdateStatus(){
    const newStatus = sessionStorage.getItem("newStatus");
    const status = sessionStorage.getItem("status");
    // const itemId = sessionStorage.getItem("itemId");
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

    // const updateStatus = () => {
    //     fetch(`https://lab-api-bq.herokuapp.com/orders/${itemId}`, {
    //       method: "PUT",
    //       headers: {
    //         accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: `${token}`
    //       },
    //       body: JSON.stringify({
    //         "status": newStatus
    //       })
    
    //     })
    //       .then((response) => response.json())
    //       .then((json) => {
    //         console.log(json)
            
    //       })
    //   }

      useEffect(() => {
        getOrders()
      }, [])

    return(
        <div className="updateStatus">
          <Grid container spacing={2}>

          {orders.map((order) => {
              const { client_name, table, id, Products } = order;
              sessionStorage.setItem("itemId", id);
              const itemId = id;
              // const idData = [ { id: order.id} ]
              // sessionStorage.setItem("itemId", JSON.stringify(idData));
              console.log(id)
              return (
                <Grid item key={id} xs={4}>
                  <Paper elevation={3} >
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
                      console.log('prontinho princesa ' + status)
                      // const getData = JSON.parse(sessionStorage.getItem("itemId"));
                      // const itemId = getData[0].itemId
                      // const itemId = sessionStorage.getItem("itemId")
                      sessionStorage.setItem("newStatus", "done");
                      // updateStatus()
                      fetch(`https://lab-api-bq.herokuapp.com/orders/${itemId}`, {
                          method: "PUT",
                          headers: {
                            accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `${token}`
                          },
                          body: JSON.stringify({
                            "status": newStatus
                          })
                    
                        })
                          .then((response) => response.json())
                          .then((json) => {
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
