// import React, { useState } from 'react';
// import { Button } from '@material-ui/core';
// import { Input, InputLabel, FormControl } from '@material-ui/core';

// function Orders() {
// 	const [ table, setTable ] = useState('');
// 	const [ clientName, setClientName ] = useState('');
//     return(
//         <div className="orders">
//                 <h1>Efetuar um pedido</h1>
// 				<p>Faça seu pedido aqui</p>
// 				<FormControl>
// 					<label required className="roleLabel">Selecione o número da mesa</label>
// 					<select value={table} type="text" required onChange={(event) => setTable(event.target.value)}>
// 						<option disabled value=''>Mesa número:</option>
// 						<option value='1'>1</option>
// 						<option value='1'>2</option>
// 						<option value='1'>3</option>
// 						<option value='1'>4</option>
// 						<option value='1'>5</option>
// 						<option value='1'>6</option>
// 						<option value='1'>7</option>
// 					</select>
// 				</FormControl>
				
// 				<FormControl>
// 					<InputLabel required>Nome do cliente</InputLabel>
// 					<Input type="text" value={clientName} onChange={(event) => setClientName(event.target.value)} />
// 				</FormControl>

// 				<li>item</li>
// 				<Button>Deletar item</Button>
// 				<li>item</li>
// 				<Button>Deletar item</Button>
// 				<li>item</li>
// 				<Button>Deletar item</Button>
// 				<p>Total: $$</p>
// 				<Button
//                  type="submit"
//                  variant="contained"
//                  color="primary" size="small">
// 					Preparar
// 				</Button>
//         </div>        

//     )
// }

// export default Orders