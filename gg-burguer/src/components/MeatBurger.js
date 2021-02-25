import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { Input, InputLabel, FormControl, Button, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

function MeatBurger() {
	const useStyles = makeStyles({
		root: {
			maxWidth: 250
		},
		media: {
			height: 140
		}
	});

	const classes = useStyles();

	const token = localStorage.getItem('token');
	const [ burger, setBurger ] = useState('');
    const [ order, setOrder ] = useState([]);
    const [ total, setTotal ] = useState(0);

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
				const meatFilter = json.filter((item) => item.flavor === 'carne');
				setBurger(meatFilter);
				console.log(meatFilter);
			});
	};

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

	function complementVerify(item) {
		if (item.complement !== null) {
			return ('Adicional: ' + item.complement).toUpperCase();
		}
	}

	useEffect(() => {
		getProducts();
	}, []);

	return (
        <div className="meatBurger">
            <h1>Hamburguers de carne</h1>
            <Grid container spacing={3} ></Grid>
            <section className="products">
                {burger && 
                burger.map((item) => (
                    <div
                    className="meatBurger"
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    flavor={item.flavor}
                    price={item.price}
                    complement={item.complement}>
                        <Grid container={classes.root} spacing={3} direction="row" alignItems="flex-start">
                            <Grid item xs={12}>
                                <Card className={classes.root}
                                onClick={(event) => {
                                    const parent = event.target.parentNode;
                                    const price = item.price;
                                    const id = item.id;
                                    const name = item.name;
                                    const flavor = item.flavor;
                                    const complement = item.complement;

                                    const orderTemplate = {
                                        id: id,
                                        name: name,
                                        flavor: flavor,
                                        complement: complement,
                                        price: price
                                    };
                                    addProduct(orderTemplate);
                                    
                                }}>
                                    <CardActionArea>
                                        <CardMedia className={classes.media} image={item.image} />
                                        <h2>{item.name} de {item.flavor}</h2>
                                        {complementVerify(item)}
                                        <h2>R$ {item.price},00</h2>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                        </Grid>
                    </div>
                ))}
            </section>
            
        </div>
    )
}

export default MeatBurger;
