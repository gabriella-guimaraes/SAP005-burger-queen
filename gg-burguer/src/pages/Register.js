//página de cadastro/primeiro acesso de usuários
// import './App.css';
import React, { useState } from 'react';
import { FormControl, Input, InputLabel, Button, Grid, Paper } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function Register() {
	const history = useHistory();

	const routerKitchen = () => {
		history.push('/cozinha');
	};

	const routerHall = () => {
		history.push('/salao');
	};

	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ verifyPassword, setVerifyPassword ] = useState('')
	const [ role, setRole ] = useState('');
	const [openAlert, setOpenAlert] = useState(false);
	const [openAlertError, setOpenAlertError] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenAlert(false);
		setOpenAlertError(false);
	  };

	const handleSubmit = (event) => {
		event.preventDefault();
					fetch('https://lab-api-bq.herokuapp.com/users/', {
						method: 'POST',
						headers: {
							accept: 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						body: `email=${email}.com&password=${password}&role=${role}&restaurant=GGBurger&name=${name}`
					})
						.then((response) => response.json())
						.then((json) => {
							if(password !== verifyPassword){
								setOpenAlert(true);
								setPassword('');
								setVerifyPassword('');
								localStorage.removeItem('token');
								localStorage.removeItem('id');
							}else{
								const token = json.token
								const id = json.id
								const setToken = localStorage.setItem('token', token);
								const setId = localStorage.setItem('id', id);
								if (role === "hall") {
									routerHall();																
								}else if( role === "kitchen"){
									routerKitchen();
								}else{
									setOpenAlertError(true);
									localStorage.removeItem('token');
									localStorage.removeItem('id');
								}
								}
							
						})

	};

	// const formRegister = document.querySelector(".register");
	return (
		<div>
		<Header />	
		<Grid container spacing={2} direction="column" className="register">
		<Grid item xs={12}>
		<h1 id="registerIntro">Registre-se em nossa plataforma!</h1>
		</Grid>	
			<Grid item xs={4} >
			<Paper elevation={3}>
			<Grid item xs={10}>
			<FormControl className="register">
				<InputLabel required className="register">Nome completo</InputLabel>
				<Input type="text" className="register" value={name} onChange={(event) => setName(event.target.value)} />
			</FormControl>
			</Grid>

			<Grid item xs={10}>
			<FormControl className="register">
				<InputLabel required className="register">Email</InputLabel>
				<Input type="text" className="register" value={email} onChange={(event) => setEmail(event.target.value)} />
			</FormControl>
			</Grid>

			<Grid item xs={10}>
			<FormControl className="register">
				<InputLabel required className="register">Senha</InputLabel>
				<Input type="password" className="register" value={password} onChange={(event) => setPassword(event.target.value)} />
			</FormControl>
			</Grid>

			<Grid item xs={10}>
			<FormControl className="register">
				<InputLabel required className="register">Confirmar senha</InputLabel>
				<Input type="password" className="register" value={verifyPassword} onChange={(event) => setVerifyPassword(event.target.value) } />
			</FormControl>
			</Grid>

			<Grid item xs={10}>
			<FormControl className="register">
				<label required className="roleLabel">Área de atendimento</label>
				<select value={role} type="text" required className="selectRole" onChange={(event) => setRole(event.target.value)}>
					<option  className="roleSelect" disabled value=''>Área de atendimento</option>
					<option className="roleSelect" value="hall">Salão</option>
					<option className="roleSelect" value="kitchen">Cozinha</option>
				</select>
			</FormControl>
			</Grid>

			<Grid item xs={9}>
			<Button
				variant="contained"
				color="primary"
				id="button-register"
				className="register"
				type="submit"
				fullWidth
				size="small"
				onClick={(event) => { handleSubmit(event)
				}}
			>Finalizar cadastro
			</Button>
			</Grid>
			</Paper>
			</Grid>	
		</Grid>
		<Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="warning">
			Suas senhas devem ser idênticas!
			</Alert>
      	</Snackbar>

	  <Snackbar open={openAlertError} autoHideDuration={4000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="warning">
			Ops! Preencha os campos corretamente.
			</Alert>
      </Snackbar>
		</div>
	);
}
export default Register;


