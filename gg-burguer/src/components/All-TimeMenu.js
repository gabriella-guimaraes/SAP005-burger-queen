import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Input, InputLabel, FormControl, Button, Paper } from '@material-ui/core';
//import DeleteIcon from '@material-ui/icons/Delete'; ver como usar 

function AllTimeMenu() {
	const useStyles = makeStyles({
		root: {
			maxWidth: 300
		},
		media: {
			height: 140
		}
	});

	const classes = useStyles();

	useEffect(() => {
		getProducts();
	}, []);

  const token = localStorage.getItem('token');

	const [ menuAllDay, setMenuAllDay ] = useState('');
	const [ table, setTable ] = useState('');
	const [ clientName, setClientName ] = useState('');
	const [ total, setTotal ] = useState(0);
  	const [ order, setOrder ] = useState([]);

  const addProduct = (item) => {
    const newArray = order
    newArray.push(item)
    setOrder(newArray)
	calculation();
}

const removeProduct = index => () => {
  const newArray = order
  newArray.splice(index,1)
  setOrder(newArray)
  calculation();
}

  // const calculation = () => {
	//   order.forEach(item => {
	// 	  const number = Number(item.price)
	// 	  setTotal( number + total)
	//   })
  // }

  const calculation = () => {
		let sum = 0
		order.forEach(item => {
			const number = Number(item.price)
			sum += number
		})
		setTotal(sum)
	}


	const getProducts = () => {
		fetch('https://lab-api-bq.herokuapp.com/products', {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `${token}`
			}
		})
			.then((response) => response.json())
			.then((json) => {
				const allDay = json.filter((item) => item.type === 'all-day');
				setMenuAllDay(allDay);
				console.log(allDay);
			});
	};

	const postOrder = () => {
		fetch('https://lab-api-bq.herokuapp.com/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'accept': 'application/json',
				'Authorization': `${token}`
			},
			body: JSON.stringify({
				'client': clientName,
				'table': table,
				'products': order.map((item) => (
					{
						'id': `${item.id}`,
						'qtd': 1
					}
				))
			})
		}).then((response) => response.json())
		.then((json) => {
			console.log('pedido efetuado')
			console.log(postOrder)
		})
	}

	return (
		<div className="all-day">
			<section className="products">
				{menuAllDay &&
					menuAllDay.map((item) => (
						<div
							className="all-day"
							key={item.id}
							id={item.id}
							image={item.image}
							name={item.name}
							flavor={item.flavor}
							price={item.price}
							complement={item.complement}
						>
							<Card
								className={classes.root}
								onClick={(event) => {
									console.log('clicou aqui mana');
									const parent = event.target.parentNode;
									const price = item.price;
									const id = item.id;
									const name = item.name;

									const orderTemplate = {
										id: id,
										name: name,
										price: price
									};
									console.log(orderTemplate);
									addProduct(orderTemplate)
								}}
							>
								<CardActionArea>
									<CardMedia className={classes.media} image={item.image} />
									<h2>
										{item.name} de {item.flavor}
									</h2>
									<h2>R$ {item.price},00</h2>
									<h2>Adicionar Complemento: {item.complement}</h2>
								</CardActionArea>
							</Card>
						</div>
					))}
			</section>
      
			<div className="orders">
			<Paper elevation={3}>	
				<h1>Efetuar um pedido</h1>
				<p>Faça seu pedido aqui</p>
				<FormControl>
					<label className="roleLabel">
						Selecione o número da mesa
					</label>
					<select value={table} type="text" onChange={(event) => setTable(event.target.value)}>
						{/* <option disabled value="">
							Mesa número:
						</option> */}
						<option value="1">1</option>
						<option value="1">2</option>
						<option value="1">3</option>
						<option value="1">4</option>
						<option value="1">5</option>
						<option value="1">6</option>
						<option value="1">7</option>
					</select>
				</FormControl>

				<FormControl>
					<InputLabel required>Nome do cliente</InputLabel>
					<Input type="text" value={clientName} onChange={(event) => {setClientName(event.target.value); 
					sessionStorage.setItem("clientName", clientName );
					sessionStorage.setItem("table", table);}} />
				</FormControl>


        {/* AVISAR A GABI E VER O QUE ELA ACHA MELHOR -- coloquei o <p> antes do Button) */}
				{order && order.map((item, index) =>
				<div className="currentOrder" key={Math.random()}>
          <p key={Math.random()}>{item.name}</p>   
					<p key={Math.random()}>R$ {item.price},00</p>
          <Button 
						key={Math.random()} 
						variant="contained"
						onClick={removeProduct(index)}
					>
						X
					</Button>
					{/* <p key={Math.random()}>{item.name}</p>
					<p key={Math.random()}>R$ {item.price},00</p> */}
				</div>)}
				<h2>Total: R$ {total},00</h2>
				<Button type="submit" variant="contained" color="primary" size="small"
				onClick={(event) => {
					console.log(order)
					console.log(total)

					const ordersCollection = [
						{ "order": order }
					]
					sessionStorage.setItem("order", JSON.stringify(ordersCollection));
					postOrder(event)
					// sessionStorage.setItem("pedidos", JSON.stringify(objPedidos));
				}}>
					Preparar
				</Button>
				</Paper>	
			</div>
			
		</div>
	);
}

export default AllTimeMenu;
