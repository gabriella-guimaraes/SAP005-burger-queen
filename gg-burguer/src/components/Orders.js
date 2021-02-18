import React from 'react';
import { Button } from '@material-ui/core';

function Orders() {
    return(
        <div className="orders">
                <h1>Efetuar um pedido</h1>
				<p>Faça seu pedido aqui</p>
                <label required className="roleLabel">Número da mesa</label>
				<select required></select>
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
        </div>        

    )
}

export default Orders