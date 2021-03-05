import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Paper } from '@material-ui/core';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import UpdateStatus from './UpdateStatus';
import Header from '../components/Header';

function Kitchen() {
	const history = useHistory();

	const routerFinishedOrders = (event) => {
		event.preventDefault();
		history.push('/pedidosprontos');
	};

	const routerDeliveredOrders = (event) => {
		event.preventDefault();
		history.push('/pedidosentregues');
	};

	return (
		<div className="kitchen-feed">
			<Header />
			<Grid container spacing={2}>
				{/* <Grid></Grid> */}
				<Grid item xs={6}>
					<Button id="finishedOrdersBtn" size="medium" onClick={(event) => routerFinishedOrders(event)}>
						Pedidos prontos
					</Button>
          </Grid>
					<Grid item xs={6}>
						<Button id="finishedOrdersBtn" size="medium" onClick={(event) => routerDeliveredOrders(event)}>
							Pedidos finalizados
						</Button>
					</Grid>
				
				<Grid item xs={12}>
					<h2>Preparar seguintes pedidos:</h2>
				</Grid>
				<UpdateStatus />
			</Grid>
		</div>
	);
}

export default Kitchen;
