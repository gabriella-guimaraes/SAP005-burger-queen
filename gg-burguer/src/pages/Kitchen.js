import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

function Kitchen() {
	// const token = localStorage.getItem("token", token)
	// console.log(token)
	const history = useHistory();
	return (
		<div className="kitchen-feed">
			<h1>Feed da cozinha</h1>
			<Button variant="contained" color="primary" size="small">
				Café da manhã
			</Button>
			<Button variant="contained" color="primary" size="small">
				Dia todo
			</Button>
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
		</div>
	);
}

export default Kitchen;
