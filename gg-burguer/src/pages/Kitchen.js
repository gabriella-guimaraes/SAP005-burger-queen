import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
// import AllOrders from '../components/AllOrders'

function Kitchen() {
	const token = localStorage.getItem('token');
	const id = localStorage.getItem('id');
	const history = useHistory();
	const [ orders, setOrders ] = useState('');
	const [ name, setName ] = useState('');
	// const [ products, setProducts ] = useState('');

	function Cooking(event) {
		event.preventDefault();
		sessionStorage.setItem("status", "pending");
		sessionStorage.setItem("newStatus", "pronto");
		history.push('/alloders')
	  }

	function GetOrdersData(event){
		event.preventDefault();
		const data = sessionStorage.getItem('order')
		console.log(data);

	}  

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
        headers: {
          "accept": "application/json",
          "Authorization": `${token}`
        },

      })
        .then((response) => response.json())
        .then((json) => {
          const order = json.filter(item => item.status !== '')
          setOrders(order)
		//   setProducts(order)
          console.log(order)
        })
     
    //   fetch("https://lab-api-bq.herokuapp.com/orders", {
    //     headers: {
    //       "accept": "application/json",
    //       "Authorization": `${token}`
    //     },

    //   })
    //     .then((response) => response.json())
    //     .then((json) => {
    //       setOrders(json)
    //     })
    
  }
  console.log(getOrders);

//   function getItens(){
// 	  return(
// 		<div key={Math.random()}> 
// 		{ products && products.map((item) =>(
// 			<div 
// 			className="orders"
// 			key={Math.random()}>
// 			<p key={Math.random()}>{item.name}</p>
// 			<p key={Math.random()}>{item.flavor}</p>
// 			<p key={Math.random()}>{item.complement}</p>
// 			</div>
// 		))}</div>
// 	  )
//   }


	  const logout = (event) => {
		event.preventDefault();
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		history.push('/');
	  }

	  const routerAllOrders = (event) => {
		event.preventDefault();
		history.push('/allorders')
	  }

	  useEffect(() => {
		getOrders();
	}, []);

	return (
		<div className="kitchen-feed">
			<Button
			id="logoutBtn"
			size="small"
			onClick={(event) => logout(event)}
			>Logout
			</Button>
			<Button
			size="small"
			onClick={(event) => routerAllOrders(event)}>
				Todos os pedidos
			</Button>
			<h1 className="intro">Feed da cozinha</h1>
			<h2 className="intro">Bem vindo(a) {name}.</h2>
                <p>Os pedidos aparecerão aqui</p>
			<section className="orders">
			{orders && orders.map((products) =>(
					<div
					className="orders"
					key={Math.random()}
					>
						<h2 key={Math.random()}>Pedido número: {products.id}</h2>
						<h3 key={Math.random()}>Cliente: {products.client_name}</h3>
						{/* <>{getItens(products)}</> */}
						


					</div>
				))}
			</section>	
				
		</div>
	);
}

export default Kitchen;


// {orders && orders.map((item) =>(
// 	<div key={Math.random()}>
// 		<p key={Math.random()}>{item.clientName}</p>
// 		<p key={Math.random()}>{item.id}</p>
// 		{/* <p key={Math.random()}></p> */}
// 	</div>
// ))}
