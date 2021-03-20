import React, { useState } from 'react';
import { FormControl, Input, InputLabel, Button, Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import Footer from "../components/Footer";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function Login() {

	const history = useHistory();
	const [openAlert, setOpenAlert] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenAlert(false);
	};

	const routerHall = () => {
		history.push('/salao');
	};
	const routerKitchen = () => {
		history.push('/cozinha');
	};
	const routerRegister = () => {
		history.push('/registro');
	};


	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<div className="login-page">
		{/* <Header /> */}
		<Grid container spacing={1} direction="row">
		<Grid item xs={6} justify='center'>
			<img src='./images/gg-burger-icon.jpg' alt='GG Burguer logo image' className="iconImg" />
		</Grid>
		<Grid item xs={4} >
		<Paper elevation={3}>
			<Grid item xs={10} >
			
				<FormControl className="login">
					<InputLabel className="login">Informe seu Email:</InputLabel>
					<Input
						type="text"
						id="email-field"
						value={email}
						placeholder="exemplo@exemplo.com"
						required
						className="login"
						fullWidth
						onChange={(event) => setEmail(event.target.value)}
					/>
				</FormControl>
			</Grid>
			<Grid item xs={10}>
				<FormControl className="login">
					<InputLabel className="login">Informe sua Senha:</InputLabel>
					<Input
						id="password-field"
						type="password"
						required
						value={password}
						className="login"
						fullWidth
						onChange={(event) => setPassword(event.target.value)}
					/>
				</FormControl>
			</Grid>
			<Grid item xs={9}>		
					<Button
						id="button-signIn"
						type="submit"
						variant="contained"
						color="primary"
						size="small"
						className="login"
						fullWidth
						onClick={(event) => {
							event.preventDefault();
							fetch('https://lab-api-bq.herokuapp.com/auth/', {
								method: 'POST',
								headers: {
									accept: 'application/json',
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								body: `email=${email}.com&password=${password}&restaurant=GGBurger&name`
							})
								.then((response) => response.json())
								.then((json) => {
									console.log(json);
									const token = json.token
									const id = json.id
									const setToken = localStorage.setItem('token', token);
									const setId = localStorage.setItem('id', id);
									if (json.role === 'hall') {
										routerHall();
									} else if (json.role === 'kitchen') {
										routerKitchen();
									} 
									else {
										// localStorage.removeItem('token')
										setOpenAlert(true);
										setEmail('');
										setPassword('');
									}
								})
						}}
					>Entrar
					</Button>
			 </Grid>	
			
					<Grid item xs={10}>
					<p className="login">É o seu primeiro Acesso ? </p>
					</Grid>
					<Grid item xs={9}>
					<Button
						id="button-register"
						type="submit"
						variant="contained"
						color="secondary"
						size="small"
						className="login"
						fullWidth
						onClick={routerRegister}
					>Registrar-se
					</Button>
					</Grid>
				
		</Paper>
		</Grid>
		</Grid>
		<Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Ops! Preencha os campos corretamente.
        </Alert>
      </Snackbar>
		</div>
	);
}
{/* <Paper elevation={3}></Paper> */}
export default Login;
