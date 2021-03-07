//página de cadastro/primeiro acesso de usuários
// import './App.css';
import React, { useState, useEffect } from 'react';
import { FormControl, Input, InputLabel, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenAlert(false);
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
							}else{
								const token = json.token
								const id = json.id
								const setToken = localStorage.setItem('token', token);
								const setId = localStorage.setItem('id', id);
								if (role === "hall") {
									routerHall();																
								}else if( role === "kitchen"){
									routerKitchen();
								}
								}
							
						})

	};

	// const formRegister = document.querySelector(".register");
	return (
		<div>
		<Header />	
		<div className="register">
			<h1>Registre-se em nossa plataforma!</h1>
			<FormControl className="registe">
				<InputLabel required>Nome completo</InputLabel>
				<Input type="text" value={name} onChange={(event) => setName(event.target.value)} />
			</FormControl>

			<FormControl className="registe">
				<InputLabel required>Email</InputLabel>
				<Input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
			</FormControl>

			<FormControl className="registe">
				<InputLabel required>Senha</InputLabel>
				<Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
			</FormControl>

			<FormControl className="registe">
				<InputLabel required>Confirmar senha</InputLabel>
				<Input type="password" value={verifyPassword} onChange={(event) => setVerifyPassword(event.target.value) } />
			</FormControl>


			<FormControl className="registe">
				<label required className="roleLabel">Área de atendimento</label>
				<select value={role} type="text" required className="selectRole" onChange={(event) => setRole(event.target.value)}>
					<option  className="roleSelect" disabled value=''>Área de atendimento</option>
					<option className="roleSelect" value="hall">Salão</option>
					<option className="roleSelect" value="kitchen">Cozinha</option>
				</select>
			</FormControl>
			<Button
				variant="contained"
				color="primary"
				id="finishRegister"
				type="submit"
				onClick={(event) => { handleSubmit(event)
				}}
			>
				Finalizar cadastro
			</Button>
		</div>
		<Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Suas senhas devem ser idênticas!
        </Alert>
      </Snackbar>
		</div>
	);
}
export default Register;


