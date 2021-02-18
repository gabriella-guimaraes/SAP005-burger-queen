import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AllTimeMenu from '../components/All-TimeMenu';




function Hall() {
	const history = useHistory();
	return (
		<div className="hall-feed">
			<h1>Feed do salão</h1>
			<Button variant="contained" color="primary" size="small">
				Café da manhã
			</Button>
			<Button
				id="button-all-day"
				type="submit"
				variant="contained"
				color="primary"
				size="small"
				// onClick={(event) => {
				// 	event.preventDefault();
				// 	}
				>Dia todo
				</Button>
				<AllTimeMenu/>
			<div className="breakfast">
				<p>O menu do café da manhã vai aparecer aqui</p>
			</div>
			<div className="allDay">
				<p>O menu do dia todo vai aparecer aqui</p>
			</div>
			<div className="orders">
				<p>Os pedidos serão contabilizados aqui</p>
				<li>item</li>
				<Button>Deletar item</Button>
				<li>item</li>
				<Button>Deletar item</Button>
				<li>item</li>
				<Button>Deletar item</Button>
				<p>Total: $$</p>
				<Button
                	type="submit"
                	variant="contained"
                	color="primary" size="small">
					Preparar
				</Button>
                <p>----------------------</p>
                <h1>Lista de pedidos</h1>
                <p>Os pedidos aparecerão aqui</p>
			</div>
			<div>
				
			</div>
		</div>
	);
}

export default Hall