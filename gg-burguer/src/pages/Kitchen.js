import React from 'react';
import { useHistory } from 'react-router-dom';
// import { Button } from '@material-ui/core';

function Kitchen() {
	// const token = localStorage.getItem("token", token)
	// console.log(token)
	const history = useHistory();
	return (
		<div className="kitchen-feed">
			<h1>Feed da cozinha</h1>
                <p>Os pedidos aparecerão aqui</p>
		</div>
	);
}

export default Kitchen;
