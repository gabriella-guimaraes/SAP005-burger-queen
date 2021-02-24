import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Input, InputLabel, FormControl, Button, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

function Breakfast() {
	const useStyles = makeStyles((theme) => ({
		root: {
			maxWidth: 250,
			
		},
		media: {
			height: 140
		}
	}));

	const classes = useStyles();

	useEffect(() => {
		getProducts();
	}, []);
	const token = localStorage.getItem('token');
	const [ menuBreakfast, setMenubreakfast ] = useState('');
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

	const calculation = () => {
		let sum = 0
		order.forEach(item => {
			const number = Number(item.price)
			sum += number
		})
		setTotal(sum)
	}

	const getProducts = () => {
		fetch('https://lab-api-bq.herokuapp.com/products/', {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `${token}`
			}
		})
			.then((response) => response.json())
			.then((json) => {
				const breakfast = json.filter((item) => item.type === 'breakfast');
				console.log(breakfast);
				setMenubreakfast(breakfast);
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
		.catch(Error);{
			alert(Error)
		}
	}

	return (
		<div className="breakfast">
			<Grid container spacing={3} >
			<section className="products">
				{menuBreakfast &&
					menuBreakfast.map((item) => (
						<div
							className="breakfast"
							key={item.id}
							image={item.image}
							name={item.name}
							id={item.id}
							price={item.price}
						>
							<Grid container className={classes.root} spacing={3} direction='row' alignItems="flex-start">
							<Grid item md={12} >
							<Card className={classes.root} onClick={(event) => {
										console.log('clicou aqui mana')
									   const parent = event.target.parentNode;
									   const price = item.price;
									   const id = item.id;
									   const name = item.name;
									   
	   
									   const orderTemplate = {
										   id: id,
										   name: name,
										   price: price
	   
									   } 
									   console.log(orderTemplate)
									   addProduct(orderTemplate)
								   }}>
								<CardActionArea>
									<CardMedia
										className={classes.media}
										image={item.image}
									/>
									<h2>{item.name}</h2>
									<h2>R$ {item.price},00</h2>
								</CardActionArea>
							</Card>
							</Grid>
							</Grid>
						</div>
					))}
			</section>
			<div className="orders">
			<Paper elevation={3}>	
				<h1 className="orderItens">Efetuar um pedido</h1>
				<p className="orderItens">Faça seu pedido aqui</p>
				<FormControl>
				<InputLabel className="orderItens" required>Número da mesa</InputLabel>
				<Input
					className="orderItens"
					value={table}
					onChange={(event) => setTable(event.target.value)}
					/>
				</FormControl>

				<FormControl>
					<InputLabel className="orderItens" required>Nome do cliente</InputLabel>
					<Input className="orderItens" type="text" value={clientName} onChange={(event) => {setClientName(event.target.value);
					sessionStorage.setItem("clientName", clientName );
					sessionStorage.setItem("table", table);}} />
				</FormControl>

				{order.map((item, index) =>
				<div className="orderItens" key={Math.random()}>
					<p key={Math.random()}>{item.name}</p>
					<p key={Math.random()}>R$ {item.price},00</p>
					<Button 
						key={Math.random()} 
						variant="contained"
						onClick={removeProduct(index)}
					>
						X
					</Button>
				</div>)}
				<h2>Total: R$ {total},00</h2>
				<Button id="orderBtn" type="submit" variant="contained" color="primary" size="small"
				onClick={(event) => {
					console.log(order)
					console.log(total)
					const ordersCollection = [
						{ "order": order }
					]
					sessionStorage.setItem("order", JSON.stringify(ordersCollection));
					postOrder(event)
					
				}}>
					Preparar
				</Button>
				</Paper>	
			</div>
			</Grid>
		</div>
	);
}
export default Breakfast;
