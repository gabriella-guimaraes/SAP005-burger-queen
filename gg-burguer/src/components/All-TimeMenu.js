import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import {
  Button,
  Box,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



function AllTimeMenu() {
  const useStyles = makeStyles({
    media: {
      height: 105,
    },
  });

  const classes = useStyles();

  const token = localStorage.getItem("token");

  const [menuAllDay, setMenuAllDay] = useState([]);
  const [table, setTable] = useState("");
  const [clientName, setClientName] = useState("");
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };


  const addProduct = (item) => {
    const newArray = order;
    newArray.push(item);
    setOrder(newArray);
    calculation();
  };

  const removeProduct = (index) => () => {
    const newArray = order;
    newArray.splice(index, 1);
    setOrder(newArray);
    calculation();
  };

  const calculation = () => {
    let sum = 0;
    order.forEach((item) => {
      const number = Number(item.price);
      sum += number;
    });
    setTotal(sum);
  };

  const getProducts = () => {
    fetch("https://lab-api-bq.herokuapp.com/products", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const allDay = json.filter((item) => item.type === "all-day");
        setMenuAllDay(allDay);
        console.log(allDay);
      });
  };

  const postOrder = () => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        client: clientName,
        table: table,
        products: order.map((item) => ({
          id: `${item.id}`,
          qtd: 1,
        })),
      }),
    })
      .then((response) => response.json())
      .then((json) => {

        setOpenAlert(true);
        setTable('');
        setClientName('');
        setOrder([]);
        setTotal(0);

        console.log("pedido efetuado");
        console.log(postOrder);
      });
  };

  function complementVerify(item) {
    if (item.complement !== null) {
      return ("Adicional: " + item.complement).toUpperCase();
    }
  }

  function flavorVerify(item) {
    if (item.flavor !== null && item.flavor !== "vegetariano") {
      return "de " + item.flavor;
    } else if (item.flavor === "vegetariano") {
      return "sabor " + item.flavor;
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="all-day">
      <Grid container spacing="2">
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {menuAllDay.map((item) => (
              <Grid item xs={4} key={item.id}>
                <Card
                  onClick={(event) => {
                    const orderTemplate = {
                      id: item.id,
                      name: item.name,
                      flavor: item.flavor,
                      complement: item.complement,
                      price: item.price,
                    };
                    addProduct(orderTemplate);
                  }}
                >
                  <CardActionArea>
                    <CardMedia className={classes.media} image={item.image} />
                    <h2>
                      {item.name} {flavorVerify(item)}
                    </h2>
                    <h2>{complementVerify(item)}</h2>
                    <h2>R$ {item.price},00</h2>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3}>
            <Box p={2}>
              <Grid container >
              <h2 className="orderItens"> Registrar Pedido </h2>
              </Grid>
              <FormControl fullWidth>
                <InputLabel className="orderItens" required>
                  NÚMERO DA MESA
                </InputLabel>
                <Input
                  className="orderItens"
                  value={table}
                  onChange={(event) => setTable(event.target.value)}
                />
              </FormControl>
              <FormControl  fullWidth>
                <InputLabel className="orderItens" required>
                  NOME DO CLIENTE
                </InputLabel>
                <Input
                  className="orderItens"
                  type="text"
                  value={clientName}
                  onChange={(event) => {
                    setClientName(event.target.value);
                    sessionStorage.setItem("clientName", clientName);
                    sessionStorage.setItem("table", table);
                  }}
                />
              </FormControl>
              <h5>*Obrigatório</h5>
              <Grid container spacing={2}>
                {order.map((item, index) => {
                  const { name, flavor, complement, price } = item;
                  const description = `${name} ${flavor} ${complement || ""}`;
                  return (
                    <Grid item key={description + index} xs={12}>
                      <Grid container>
                        <Grid item xs={7}>
                          <p>{description}</p>
                        </Grid>
                        <Grid item xs={3}>
                          <p>R$ {price},00</p>
                        </Grid>
                        <Grid item xs={2}>
                          <DeleteIcon
                            key={Math.random()}
                            onClick={removeProduct(index)}
                            size="medium"
                            color="primary"
                          ></DeleteIcon>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
                <h2 className="orderItens"> Total: R$ {total},00</h2>
              </Grid>
              <Button
                id="orderBtn"
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
                onClick={(event) => {
                  const ordersCollection = [{ order: order }];
                  sessionStorage.setItem(
                    "order",
                    JSON.stringify(ordersCollection)
                  );
                  postOrder(event);
                }}
              >
                Preparar
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Pedido efetuado com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AllTimeMenu;

//FILTROS SABOR E TIPO //

// const [ meatBurger, setMeatBurger ] = useState('');
// const [ chickenBurger, setchickenBurger ] = useState('');
// const [ veggieBurger, setVeggieburger ] = useState('');
// const [ side, setSideDish ] = useState('');
// const [ drink, setDrinks ] = useState('');

//const meat = json.filter((item) => item.flavor === 'carne');
// 				setMeatBurger(meat);
// 				console.log(meat)

// 				const chicken = json.filter((item) => item.flavor === 'frango');
// 				setchickenBurger(chicken);
// 				console.log(chicken)

// 				const veggie = json.filter((item) => item.flavor === 'vegetariano');
// 				setVeggieburger(veggie);
// 				console.log(veggie)

// 				const sideDish = json.filter((item) => item.sub_type === 'side');
// 				setSideDish(sideDish);
// 				console.log(sideDish)

// 				const drinks = json.filter((item) => item.sub_type === 'drinks');
// 				setDrinks(drinks);
// 				console.log(drinks)
