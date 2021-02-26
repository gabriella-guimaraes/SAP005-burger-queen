import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Button } from '@material-ui/core';

function Kitchen() {
	const token = localStorage.getItem('token');
	const id = localStorage.getItem('id');
	const history = useHistory();
	const [ orders, setOrders ] = useState('');
	const [ name, setName ] = useState('');

	fetch(`https://lab-api-bq.herokuapp.com/users/${id}`,{
    	headers:{ 
     	 "accept": "application/json",
    	 "Authorization":`${token}`},    

  		})
			.then((response) => response.json())
			.then((json) => {  
			setName(json.name)
 	 	}) 

// fazer os status dos pedidos e printar na tela
	const getOrders = () => {
		fetch("https://lab-api-bq.herokuapp.com/orders", {
		  method: 'GET',
		  headers: {
			"accept": "application/json",
			"Authorization": `${token}`
		  },
	
		})
		  .then((response) => response.json())
		  .then((json) => {
			const order = json.filter(item => item.clientName && item.id)
			setOrders(order)
			console.log(getOrders)
		   
		  })
	
	
	  }
	return (
		<div className="kitchen-feed">
			<h1>Feed da cozinha</h1>
			<h2 className="intro">Bem vindo(a) {name}.</h2>
                <p>Os pedidos aparecerão aqui</p>
				{orders && orders.map((item) =>(
					<div key={Math.random()}>
						<p key={Math.random()}>{item.clientName}</p>
						<p key={Math.random()}>{item.id}</p>
						{/* <p key={Math.random()}></p> */}
					</div>
				))}
		</div>
	);
}

export default Kitchen;
