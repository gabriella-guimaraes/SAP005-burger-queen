import React, { useState } from 'react';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import Footer from "../components/Footer";
// import Header from "../components/Header"

function Login() {
	const history = useHistory();

	const routerHall = () => {
		history.push('/salao');
	};
	const routerKitchen = () => {
		history.push('/cozinha');
	};
	const routerRegister = () => {
		history.push('/registro');
	};

	// const handleSignIn = (event) => {
		// event.preventDefault();
		// console.log('login efetuado');
		// fetch("https://lab-api-bq.herokuapp.com/auth/", {
		//             method: "POST",
		//             headers: {
		//             accept: "application/json",
		//             "Content-Type": "application/x-www-form-urlencoded",// json ?
		//           },
		//           body: `email=${email}.com&password=${password}&restaurant=GGBurger&name`,
		//           })
		//           .then((response) => response.json())
		//           .then((json) => {
		//             console.log(json);
		//             const token = localStorage.setItem("token", token)
		//             if (json.role === "hall") {
		//               routerHall();
		//             }else if (json.role === "kitchen") {
		//               routerKitchen();
		//             }
		//             });
	// };

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<div className="login">
			{/* <Header></Header> */}
			<p id="description"> Descrição do App </p>

			<FormControl className="login">
				<InputLabel>Informe seu Email:</InputLabel>
				<Input
					type="text"
					id="email-field"
					value={email}
					placeholder="exemplo@exemplo.com"
					required
					onChange={(event) => setEmail(event.target.value)}
				/>
			</FormControl>

			<FormControl className="login">
				<InputLabel>Informe sua Senha:</InputLabel>
				<Input
					id="password-field"
					type="password"
					required
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Button
					id="button-signIn"
					type="submit"
					variant="contained"
					color="primary"
					size="small"
					onClick={(event) => {
						event.preventDefault();
						console.log('login efetuado');
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
							});
					}}
				>
					Entar
				</Button>
			</FormControl>

			<FormControl className="first-login">
				<p>É o seu primeiro Acesso ? </p>
				<Button
					id="button-register"
					type="submit"
					variant="contained"
					color="secondary"
					size="small"
					onClick={routerRegister}
				>
					{' '}
					Registrar-se
				</Button>
			</FormControl>
			{/* <Footer></Footer> */}
		</div>
	);
}

export default Login;
