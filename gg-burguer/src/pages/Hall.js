import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import AllTimeMenu from "../components/All-TimeMenu";
import Breakfast from "../components/BreakfastMenu";
import { makeStyles } from "@material-ui/core/styles";

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
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  fetch(`https://lab-api-bq.herokuapp.com/users/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      setName(json.name);
    });

  const openBreakfast = () => {
    setBreakfastIsOpen(true);
    setAllTimeIsOpen(false);
  };
  const openAllTime = () => {
    setBreakfastIsOpen(false);
    setAllTimeIsOpen(true);
  };
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    history.push("/");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button id="logoutBtn" size="small" onClick={(event) => logout(event)}>
          Sair
        </Button>
        <h2 className="intro">Bem vindo(a) {name}.</h2>
      </Grid>
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} spacing="2" direction="row">
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
