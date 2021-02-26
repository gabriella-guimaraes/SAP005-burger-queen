// import React, { useState, useEffect } from 'react';
// import { Input, InputLabel, FormControl, Button, Paper } from '@material-ui/core';

// function Orders(){

//     const [ table, setTable ] = useState('');
//     const [ clientName, setClientName ] = useState('');

//     const postOrder = () => {
// 		fetch('https://lab-api-bq.herokuapp.com/orders', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'accept': 'application/json',
// 				'Authorization': `${token}`
// 			},
// 			body: JSON.stringify({
// 				'client': clientName,
// 				'table': table,
// 				'products': order.map((item) => (
// 					{
// 						'id': `${item.id}`,
// 						'qtd': 1
// 					}
// 				))
// 			})
// 		}).then((response) => response.json())
// 		.then((json) => {
// 			console.log('pedido efetuado')
// 			console.log(postOrder)
// 		})
// 		.catch(Error);{
// 			alert(Error)
// 		}
// 	}
//     return(
//         <div className="orders">
//             <Paper elevation={3}>
//                 <h1 className="orderItens">Efetuar um pedido</h1>
//                 <p className="orderItens">Faça seu pedido aqui</p>
//             </Paper>
//             <FormControl>
//                 <Input className="orderItens" value={table} onChange={(event) => setTable(event.target.value)}></Input>
//             </FormControl>

//             <FormControl>
//                 <InputLabel className="orderItens" required>Nome do cliente</InputLabel>
//                 <Input className="orderItens" required type="text" value={clientName}
//                 onChange={(event) => {setClientName(event.target.value);
// 					sessionStorage.setItem("clientName", clientName );
// 					sessionStorage.setItem("table", table);}}></Input>
//             </FormControl>

//                     {order.map((item, index) =>
//                     <div className="orderItens" key={Math.random()}>
//                         <p key={Math.random()}>{item.name}</p>
//                         <p key={Math.random()}>R$ {item.price},00</p>
//                         <Button 
// 						key={Math.random()} 
// 						variant="contained"
// 						onClick={removeProduct(index)}
// 					>
// 						X
// 					</Button>
//                     </div>)}
//                     <h2>Total: R$ {total},00</h2>
//                     <Button id="orderBtn" type="submit" variant="contained" color="primary" size="small"
// 				onClick={(event) => {
// 					console.log(order)
// 					console.log(total)
// 					const ordersCollection = [
// 						{ "order": order }
// 					]
// 					sessionStorage.setItem("order", JSON.stringify(ordersCollection));
// 					postOrder(event)
					
// 				}}>
// 					Preparar
// 				</Button>
//         </div>

//     )
// }

// export default Orders