//página de cadastro/primeiro acesso de usuários
// import './App.css';
import React, { useState, useEffect } from 'react';
import { FormControl, Input, InputLabel, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function Register() {
	const history = useHistory();

	const routerConfirm = () => {
		history.push('/registro');
	};

	// const handleSubmit = (event) => {
	// 	event.preventDefault;
	// 	console.log("chegou até aqui, muito bem")

	// 	//fetch
	// }

	const [ name, setName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ role, setRole ] = useState("");
	return (
		<div className="register">
			<FormControl className="register">
					<InputLabel required>Nome completo</InputLabel>
					<Input
					type="text"
					value={name}
					onChange={(event) => setName(event.target.value)}
					>
					</Input>
			</FormControl>

			<FormControl className="register">
					<InputLabel required>Email</InputLabel>
					<Input
					type="text"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					>
					</Input>
			</FormControl>

			<FormControl className="register">
					<InputLabel required>Senha</InputLabel>
					<Input
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					>
					</Input>
			</FormControl>

			<FormControl className="register">
				<InputLabel required>Área de atendimento</InputLabel>
				<Input
				value={role}
				type="text"
				required
				onChange={(event) => setRole(event.target.value)}
				></Input>
			</FormControl>
				<Button
				 variant="contained"
				 color="primary"
				 id="finishRegister"
				 type="submit"
				 onClick={(event) =>  console.log("chegou até aqui, muito bem")}
				 >Finalizar cadastro</Button>
		</div>
	);
}
export default Register;
