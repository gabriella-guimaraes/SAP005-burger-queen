import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

function AllTimeMenu() {
  const useStyles = makeStyles({
    root: {
      maxWidth: 300,
    },
    media: {
      height: 140,
    },
  });

  const classes = useStyles();

  useEffect(() => {
    getProducts();
  }, []);
  const [menuAllDay, setMenuAllDay] = useState("");
  const getToken = localStorage.getItem("token");
  const getProducts = () => {
    fetch("https://lab-api-bq.herokuapp.com/products", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${getToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const allDay = json.filter((item) => item.type === "all-day");
        setMenuAllDay(allDay);
        console.log(allDay);
      });
  };
  return (
    <div className="all-day">
      <section className="products">
        {menuAllDay &&
          menuAllDay.map((item) => (
            <div
              className="all-day"
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              flavor={item.flavor}
              price={item.price}
              complement={item.complement}
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={item.image} />
                  <h2>
                    {item.name} de {item.flavor}
                  </h2>
                  <h2>R$ {item.price},00</h2>
                  <h2>Adicionar Complemento: {item.complement}</h2>
                </CardActionArea>
              </Card>
            </div>
          ))}
      </section>
    </div>
  );
}

export default AllTimeMenu;
