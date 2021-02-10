//página de cadastro/primeiro acesso de usuários
// import './App.css';
import React, { useState, useEffect } from 'react';
import { FormControl, Input, InputLabel, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function Register() {
	const history = useHistory();

	const routerLogin = () => {
		history.push('/login');
	};

	// const handleSubmit = (event) => {
	// 	event.preventDefault;
	// 	console.log('chegou até aqui, muito bem');

	// 	fetch('https://lab-api-bq.herokuapp.com/users/', {
	// 		method: 'POST',
	// 		headers: {
	// 			accept: 'application/json',
	// 			'Content-Type': 'application/x-www-form-urlencoded'
	// 		},
	// 		body: `email=${email}.com&password=${password}&role=${role}&restaurant=GGBurger&name=${name}`
	// 	})
	// 		.then((response) => response.json())
	// 		.then((json) => console.log(json));
	// 		if(json.id !== null){
	// 			//rota para o feed
	// 			alert("Cadastro efetuado com sucesso! Bem vindo(a)")
	// 			routerLogin();
	// 		}
	// };

	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ role, setRole ] = useState('');
	return (
		<div className="register">
			<FormControl className="register">
				<InputLabel required>Nome completo</InputLabel>
				<Input type="text" value={name} onChange={(event) => setName(event.target.value)} />
			</FormControl>

			<FormControl className="register">
				<InputLabel required>Email</InputLabel>
				<Input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
			</FormControl>

			<FormControl className="register">
				<InputLabel required>Senha</InputLabel>
				<Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
			</FormControl>

			<FormControl className="register">
				<label required>Área de atendimento</label>
				<select value={role} type="text" required onChange={(event) => setRole(event.target.value)}>
					<option className="roleSelect">Salão</option>
					<option className="roleSelect">Cozinha</option>
				</select>
			</FormControl>
			<Button
				variant="contained"
				color="primary"
				id="finishRegister"
				type="submit"
				onClick={(event) => {
					event.preventDefault();
					console.log('chegou até aqui, muito bem');

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
							console.log(json);
							if (json.id !== null) {
								//rota para o feed
								alert('Cadastro efetuado com sucesso! Bem vindo(a)');
								routerLogin();
							}
						});
					
				}}
			>
				Finalizar cadastro
			</Button>
		</div>
	);
}
export default Register;
