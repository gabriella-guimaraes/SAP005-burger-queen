import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Breakfast from '../components/BreakfastMenu'
import Orders from '../components/Orders'
// to do:
// - criar pedidos
// - linkar número da mesa
// - nome do atendente
// - nome do cliente
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
			<div className="breakfast">
				<p>O menu do café da manhã vai aparecer aqui</p>
                <Breakfast />
			</div>
			<div className="allDay">
				<p>O menu do dia todo vai aparecer aqui</p>
			</div>
			<div className="orders">
				<Orders />
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