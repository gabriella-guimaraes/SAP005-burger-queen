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
                <>
                <h2 className="intro">Bem vindo(a) {name}.</h2>
                </>
            )
        }
    }

    return(
        <div className ="header">
            <header className="header">
            <img src="./images/gg-burger-header2.jpg" alt="Logo GG Burger" class="logoImg"/>
            </header>
            <Grid container spacing={2}>
                <Button
                    id="logoutBtn"
                    size="medium"
                    onClick={(event) => logout(event)}
                >
                    Logout
                </Button>
                <Grid item xs={12}>
                {userVerify()}
                </Grid>
          </Grid>

        </div>
    )
};
export default Header;
