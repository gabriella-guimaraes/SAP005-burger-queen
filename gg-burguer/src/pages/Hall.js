import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AllTimeMenu from '../components/All-TimeMenu';
import Breakfast from '../components/BreakfastMenu'
import Orders from '../components/Orders'

function Hall() {
    const history = useHistory();
    return (
		<div className="hall-feed">
			<h1>Feed do Salão</h1>
			<Button variant="contained" color="primary" size="small" >
				Café da manhã
			</Button>
			<Button variant="contained" color="primary" size="small">
				Dia todo
			</Button>
			<AllTimeMenu/>
			<div className="breakfast">
				<p>O menu do café da manhã vai aparecer aqui</p>
                <Breakfast />
			</div>
			<div className="allDay">
				<p>O menu do dia todo vai aparecer aqui</p>
			</div>
			<div className="orders">
				<p>Os pedidos serão contabilizados aqui</p>
				<Orders/>
                <p>----------------------</p>
                <h1>Lista de pedidos</h1>
                <p>Os pedidos aparecerão aqui</p>
			</div>
		</div>
	);
}

export default Hall

// onClick= {(event) => {
//     event.preventDefault()
//     console.log('fui clicado :D')
//     Breakfast();
// }
// } 