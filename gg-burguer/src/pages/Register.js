//página de cadastro/primeiro acesso de usuários
// import './App.css';
import React, {useState} from 'react';
import { FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select } from '@material-ui/core';

const Register = () => {
	const [ role, setRole ] = React.useState('');
	const [ restaurant, setRestaurant ] = React.useState('');
	const handleChange = (event) => {
		setRole(event.target.value);
		setRestaurant(event.target.value);
	};

	return (
		<div className="register">
			<FormControl className="register">
				<div>
					<TextField required id="standard-required" label="Nome completo" />
					<TextField required id="standard-required" label="Email" placeholder="exemple@exemple.com" />
					<TextField id="standard-password-input" label="Senha" type="password" />
					<TextField id="standard-password-input" label="Confirmar senha" type="password" />
				</div>
			</FormControl>
			<FormControl className="register">
				<InputLabel required id="standard-required">Área de atendimento</InputLabel>
				<Select
                 onChange={handleChange}
                 value={role}
                 required id="standard-required">
					<option value="kitchen">Cozinha</option>
					<option value="hall">Salão</option>
				</Select>
			</FormControl>
			<FormControl className="register">
				<InputLabel required id="standard-required">Unidade</InputLabel>
				<Select 
                 onChange={handleChange}
                 value={restaurant}
                 required id="standard-required">
					<option value="paulista">GG Burger Unidade Paulista</option>
				</Select>
			</FormControl>
		</div>
	);
};
export default Register;
