import React, { useState } from 'react';
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Header() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const [name, setName] = useState("");
    const history = useHistory();

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

    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        history.push("/");
    };

    function userVerify(){
        if(token !== null){
            return(
                <Grid container spacing={2}>
                <Grid item xs={10}>
                <h2 className="headerItem">Bem vindo(a) {name}.</h2>
                </Grid>
                <Grid item xs={2}>
                <Button
                    id="logoutBtn"
                    className="headerItem"
                    size="medium"
                    onClick={(event) => logout(event)}
                >Logout
                </Button>
            </Grid>
            </Grid>
            )
        }
    }

    return(
        <div className ="header">
            <header className="header">
            <img src="./images/gg-burger-header2.jpg" alt="Logo GG Burger" class="logoImg"/>
            </header>
            {userVerify()}

        </div>
    )
};
export default Header;
