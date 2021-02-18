import React, { useState, useEffect } from 'react';

function AllTimeMenu () {
    useEffect(() => {
		getProducts()
	},[]); 
	const [menuAllDay,setMenuAllDay] = useState ("");
    const getToken = localStorage.getItem('token');
	const getProducts = () => {
		fetch('https://lab-api-bq.herokuapp.com/products', {
						method: 'GET',
						headers: {
							accept: 'application/json',
							Authorization: `${getToken}`									
						},
						})
							.then((response) => response.json())
							.then((json) => {
								const allDay = json.filter((item) => item.type === 'all-day');
								setMenuAllDay(allDay)
								console.log(allDay)
							});
	}
    return (
        <div className="all-day"> 
        <section className="products">
            { 
            menuAllDay && menuAllDay.map((item) => (
                <div className="all-day" 
                key={item.name}
                id= {item.id}
                name= {item.name}
                flavor= {item.flavor}
                price= {item.price}
                complement= {item.complement}
                >
                <h2>{item.name} de {item.flavor}</h2>
                <h2>R$ {item.price},00</h2>
                <h2>Adicionar Complemento: {item.complement}</h2>
                </div>
            ))
            }
        </section>
        </div>
    )
}

export default AllTimeMenu