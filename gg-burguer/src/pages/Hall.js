import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Breakfast from '../components/BreakfastMenu'
// to do:
// - criar pedidos
// - linkar número da mesa
// - nome do atendente
// - nome do cliente
function Hall() {
    const history = useHistory();
    return (
		<div className="hall-feed">
			<h1>Feed da cozinha</h1>
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
				<p>Os pedidos serão contabilizados aqui</p>
				<p>input ou select para adicionar o número da mesa</p>
				<p>input para adicionar o nome do cliente</p>
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

export default Hall

// onClick= {(event) => {
//     event.preventDefault()
//     console.log('fui clicado :D')
//     Breakfast();
// }
// } 