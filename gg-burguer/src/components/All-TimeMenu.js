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
			maxWidth: 250,
			
		},
		media: {
			height: 140
		}
	});

	const classes = useStyles();

	const token = localStorage.getItem('token');

	const [ menuAllDay, setMenuAllDay ] = useState('');
	const [ table, setTable ] = useState('');
	const [ clientName, setClientName ] = useState('');
	const [ total, setTotal ] = useState(0);
	const [ order, setOrder ] = useState([]);
;

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
				accept: 'application/json',
				Authorization: `${token}`
			},
			body: JSON.stringify({
				client: clientName,
				table: table,
				products: order.map((item) => ({
					id: `${item.id}`,
					qtd: 1
				}))
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('pedido efetuado');
				console.log(postOrder);
			});
	};

	function complementVerify(item){
		if(item.complement !== null){
			return('Adicional: ' + item.complement).toUpperCase()
		}
	}

	function flavorVerify(item){
		if(item.flavor !== null && item.flavor !== 'vegetariano'){
			return('de ' + item.flavor)
		}else if(item.flavor === 'vegetariano'){
			return('sabor '+ item.flavor)
		}
	}

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="all-day">
			<Grid container spacing={3} >
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
								<Grid container className={classes.root} spacing={3} direction='row' alignItems="flex-start">
									<Grid item xs={12} >
										<Card
											className={classes.root}
											onClick={(event) => {
												console.log('clicou aqui mana');
												const parent = event.target.parentNode;
												const price = item.price;
												const id = item.id;
												const name = item.name;
												const flavor = item.flavor;
												const complement = item.complement;
												// const complement = item.complement;

												const orderTemplate = {
													id: id,
													name: name,
													flavor: item.flavor,
													complement: item.complement,
													price: price
												};
												console.log(orderTemplate);
												addProduct(orderTemplate);
											}}
										>
											<CardActionArea>
												<CardMedia className={classes.media} image={item.image} />
												<h2>
													{item.name}  {flavorVerify(item)}
												</h2>
												<h2>{complementVerify(item)}</h2>
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
							<InputLabel className="orderItens" required>
								Número da mesa
							</InputLabel>
							<Input
								className="orderItens"
								value={table}
								onChange={(event) => setTable(event.target.value)}
							/>
						</FormControl>

						<FormControl>
							<InputLabel className="orderItens" required>
								Nome do cliente
							</InputLabel>
							<Input
								className="orderItens"
								type="text"
								value={clientName}
								onChange={(event) => {
									setClientName(event.target.value);
									sessionStorage.setItem('clientName', clientName);
									sessionStorage.setItem('table', table);
								}}
							/>
						</FormControl>

						{order &&
							order.map((item, index) => (
								<div className="orderItens" key={Math.random()}>
									<p key={Math.random()}>{item.name}</p>
									<p key={Math.random()}>{item.flavor}</p>
									<p key={Math.random()}>{item.complement}</p>
									<p key={Math.random()}>R$ {item.price},00</p>
									<Button className="orderItens" key={Math.random()} variant="contained" onClick={removeProduct(index)}>
										X
									</Button>
								</div>
							))}
						<h2 className="orderItens">Total: R$ {total},00</h2>
						<Button
							id="orderBtn"
							type="submit"
							variant="contained"
							color="primary"
							size="small"
							onClick={(event) => {
								console.log(order);
								console.log(total);

								const ordersCollection = [ { order: order } ];
								sessionStorage.setItem('order', JSON.stringify(ordersCollection));
								postOrder(event);
							}}
						>
							Preparar
						</Button>
					</Paper>
				</div>
			</Grid>
		</div>
	);
}

export default AllTimeMenu;

//FILTROS SABOR E TIPO // 

// const [ meatBurger, setMeatBurger ] = useState('');
// const [ chickenBurger, setchickenBurger ] = useState('');
// const [ veggieBurger, setVeggieburger ] = useState('');
// const [ side, setSideDish ] = useState('');
// const [ drink, setDrinks ] = useState('');

//const meat = json.filter((item) => item.flavor === 'carne');
// 				setMeatBurger(meat);
// 				console.log(meat)

// 				const chicken = json.filter((item) => item.flavor === 'frango');
// 				setchickenBurger(chicken);
// 				console.log(chicken)

// 				const veggie = json.filter((item) => item.flavor === 'vegetariano');
// 				setVeggieburger(veggie);
// 				console.log(veggie)

// 				const sideDish = json.filter((item) => item.sub_type === 'side');
// 				setSideDish(sideDish);
// 				console.log(sideDish)

// 				const drinks = json.filter((item) => item.sub_type === 'drinks');
// 				setDrinks(drinks);
// 				console.log(drinks)
