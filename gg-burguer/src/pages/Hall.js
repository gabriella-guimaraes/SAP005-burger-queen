import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AllTimeMenu from '../components/All-TimeMenu';
import Breakfast from '../components/BreakfastMenu'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import Orders from '../components/Orders'

function Hall() {
	const useStyles = makeStyles((theme) => ({
		root: {
		  flexGrow: 1,
		},
		// paper: {
		//   height: 140,
		//   width: 100,
		// },
		// control: {
		//   padding: theme.spacing(2),
		// },
	  }));

	//   function SpacingGrid() {
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

    return (
		<div className="hall-feed">
			<h1>Feed do Salão</h1>
			<h2 className="intro">Bem vindo(a) {name}.</h2>
			<Button 
				variant={breakfastIsOpen ? "contained" : "outlined"} 
				color="primary" 
				onClick={openBreakfast} 
				size="small" 
			>
				Café da manhã
			</Button>
			<Button 
				variant={allTimeIsOpen ? "contained" : "outlined"} 
				color="primary" 
				onClick={openAllTime} 
				size="small"
			>
				Dia todo
			</Button>
			{/* <Grid container className={classes.root} spacing={2}>
				<Grid item xs={12}> */}
					{allTimeIsOpen && (<AllTimeMenu/>)}
					{breakfastIsOpen && (
						<div className="breakfast">
							<p>O menu do café da manhã vai aparecer aqui</p>
							<Breakfast />
						</div>
					)}
				{/* </Grid>
			</Grid> */}
					<p>----------------------</p>
					<h1>Lista de pedidos</h1>
					<p>Os pedidos aparecerão aqui</p>
			
		</div>
		
	);
}

export default Hall
