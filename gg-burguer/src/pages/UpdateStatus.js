import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";


function UpdateStatus(){
    const newStatus = sessionStorage.getItem("newStatus");
    const status = sessionStorage.getItem("status");
    const itemId = sessionStorage.getItem("itemId");
    const token = localStorage.getItem("token");

    const [ order, setOrder ] = useState('');

    const getOrder = () => {

      fetch(`https://lab-api-bq.herokuapp.com/orders/${itemId}`, {
        headers: {
          "accept": "application/json",
          "Authorization": `${token}`
        },
  
      })
        .then((response) => response.json())
        .then((json) => {
          const object = json.Products
          setOrder(object)
        })
    }

    const updateStatus = () => {
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
      }

      useEffect(() => {
        getOrder()
      }, [])

    return(
        <div className="updateStatus">
          <div className="update" key={Math.random()}>

          {order && order.map((product) => {
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
                      console.log('prontinho princesa' + status)
                      sessionStorage.setItem("newStatus", "done");
                      updateStatus()
                    }}>
                    Pedido pronto
                  </Button>
          </div>
            
        </div>
    )
}

export default UpdateStatus
