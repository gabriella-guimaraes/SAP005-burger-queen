import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AllTimeMenu from '../components/All-TimeMenu';
import Breakfast from '../components/BreakfastMenu'
import AllOrders from '../components/AllOrders';
import { makeStyles } from '@material-ui/core/styles';
// import Orders from '../components/Orders'

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
	const [breakfastIsOpen, setBreakfastIsOpen] = useState(false)
	const [allTimeIsOpen, setAllTimeIsOpen] = useState(true)
	const [ name, setName ] = useState('');
	const token = localStorage.getItem('token');
	const id = localStorage.getItem('id');

	fetch(`https://lab-api-bq.herokuapp.com/users/${id}`,{
    	headers:{ 
     	 "accept": "application/json",
    	 "Authorization":`${token}`},    

  		})
			.then((response) => response.json())
			.then((json) => {  
			setName(json.name)
 	 	}) 

	const openBreakfast = () => {
		setBreakfastIsOpen(true)
		setAllTimeIsOpen(false)
	}
	const openAllTime = () => {
		setBreakfastIsOpen(false)
		setAllTimeIsOpen(true)
	}

	const logout = (event) => {
		event.preventDefault();
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		history.push('/');
	  }

	  const routerAllOrders = (event) => {
		event.preventDefault();
		history.push('/allorders')
	  }  

    return (
		<div className="hall-feed">
			<Button
			id="logoutBtn"
			size="small"
			onClick={(event) => logout(event)}
			>Logout
			</Button>
			
			<h1 className="intro">Feed do Salão</h1>
			<h2 className="intro">Bem vindo(a) {name}.</h2>
			<Button 
				id="hallBtn1"
				variant={breakfastIsOpen ? "contained" : "outlined"} 
				color="primary" 
				onClick={openBreakfast} 
				size="medium" 
				
			>
				Café da manhã
			</Button>
			<Button 
				id="hallBtn"
				variant={allTimeIsOpen ? "contained" : "outlined"} 
				color="primary" 
				onClick={openAllTime} 
				size="medium"
				
			>
				Dia todo
			</Button>
					{allTimeIsOpen && (<AllTimeMenu/>)}
					{breakfastIsOpen && (
						<div className="breakfast">
							<Breakfast />
						</div>
					)}
					<p>----------------------</p>
					<h1>Lista de pedidos</h1>
					<Button color="primary" size="medium" onClick={(event)=> routerAllOrders(event)}
					>Ver pedidos pendentes</Button>
			
		</div>
		
	);
}

export default Hall
