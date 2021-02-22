import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from '@material-ui/core';

function Breakfast() {
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

	const [ products, setProducts ] = useState('');
	const token = localStorage.getItem('token');

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
				const breakfastMenu = json.filter((item) => item.type === 'breakfast');
				console.log(breakfastMenu);
				setProducts(breakfastMenu);
			});
	};

	return (
		<div className="breakfast">
			<h1>Menu: Café da Manhã</h1>

			<section>
				{products &&
					products.map((item) => (
						<div
							className="products"
							key={item.id}
							image={item.image}
							name={item.name}
							id={item.id}
							price={item.price}
						>
							<Card className={classes.root} onClick={(event) => {
										console.log('clicou aqui mana')
									   const parent = event.target.parentNode;
									   const price = parent.getAttribute('price');
									   const id = parent.getAttribute('id');
									   const name = parent.getAttribute('name');
	   
									   const order = {
										   id: id,
										   name: name,
										   price: price
	   
									   } 
									   console.log(order)
								   }}>
								<CardActionArea>
									<CardMedia
										className={classes.media}
										image={item.image}
									/>
									<h2>{item.name}</h2>
									<h2>R$ {item.price},00</h2>
									<Button
									onClick={(event) => {
										console.log('clicou aqui mana')
									   const parent = event.target.parentNode;
									   const price = parent.getAttribute('price');
									   const id = parent.getAttribute('id');
									   const name = parent.getAttribute('name');
	   
									   const order = {
										   id: id,
										   name: name,
										   price: price
	   
									   } 
									   console.log(order)
								   }} className="orderArea"></Button>
								</CardActionArea>
							</Card>
						</div>
					))}
			</section>
		</div>
	);
}
export default Breakfast;
