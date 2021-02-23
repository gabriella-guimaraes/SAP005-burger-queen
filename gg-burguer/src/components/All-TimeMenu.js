import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Input, InputLabel, FormControl, Button, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

function AllTimeMenu() {
	const useStyles = makeStyles({
		root: {
			maxWidth: 200,
			flexGrow: 1
		},
		media: {
			height: 140
		},
		// control: {
		// 	padding: theme.spacing(2),
		//   }
	});

	const classes = useStyles();

	const handleChange = (event) => {
		setSpacing(Number(event.target.value));
	  };

	useEffect(() => {
		getProducts();
	}, []);

  const token = localStorage.getItem('token');

	const [ menuAllDay, setMenuAllDay ] = useState('');
	const [ table, setTable ] = useState('');
	const [ clientName, setClientName ] = useState('');
	const [ total, setTotal ] = useState(0);
  	const [ order, setOrder ] = useState([]);
	const [spacing, setSpacing] = React.useState(2);

  const addProduct = (item) => {
    const newArray = order
    newArray.push(item)
    setOrder(newArray)
	calculation();

  }

  const calculation = () => {
	  order.forEach(item => {
		  const number = Number(item.price)
		  setTotal( number + total)
	  })
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
							<Grid container className={classes.root} spacing={2}>
							<Grid item xs={12}>
							{/* <Grid container justify="center" spacing={spacing}> */}
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
							{/* </Grid> */}
							</Grid>
							</Grid>
							
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
					</select>
				</FormControl>

				<FormControl>
					<InputLabel required>Nome do cliente</InputLabel>
					<Input type="text" value={clientName} onChange={(event) => {setClientName(event.target.value); 
					sessionStorage.setItem("clientName", clientName );
					sessionStorage.setItem("table", table);}} />
				</FormControl>

				{order && order.map((item) =>
				<div className="currentOrder" key={Math.random()}>
					<Button key={Math.random()} variant="contained"
					onClick={() => console.log('vai me deletar mesmo amore?')}>X</Button>
					<p key={Math.random()}>{item.name}</p>
					<p key={Math.random()}>R$ {item.price},00</p>
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
