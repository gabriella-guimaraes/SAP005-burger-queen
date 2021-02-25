import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Input, InputLabel, FormControl, Button, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MeatBurger from './MeatBurger';
import Orders from './Orders';

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

	function chickenBurgerVerify(item){
		if(item.flavor === 'frango'){
			return(
				<>
				<CardMedia className={classes.media} image={item.image} />
				<h2>{item.name} de {item.flavor}</h2>
				<h2>{complementVerify(item)}</h2>
				<h2>R$ {item.price},00</h2>
				</>
			)
		}else if(item.flavor === 'frango'){
			<>
				<CardMedia className={classes.media} image={item.image} />
				<h2>{item.name} sabor {item.flavor}</h2>
				<h2>{complementVerify(item)}</h2>
				<h2>R$ {item.price},00</h2>
				</>
		}
	}

	function meatBurgerVerify(item){
		if(item.flavor === 'carne'){
			return(
				<>
				<CardMedia className={classes.media} image={item.image} />
				<h2>{item.name} de {item.flavor}</h2>
				<h2>{complementVerify(item)}</h2>
				<h2>R$ {item.price},00</h2>
				</>
			)
		}
	}


	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className="all-day">
			<h1>Hamburguer de </h1>
			<MeatBurger/>
			<Orders />
			
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
