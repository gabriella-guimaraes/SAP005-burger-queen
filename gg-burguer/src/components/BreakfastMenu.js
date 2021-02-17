import React, { useEffect, useState } from 'react';

function Breakfast() {

    useEffect(() => {
        getProducts()
      },[])

    const [products, setProducts] = useState('');
    const token=localStorage.getItem("token")

    const getProducts = () =>{
        fetch('https://lab-api-bq.herokuapp.com/products/', {
            method: 'GET',
            headers:{ 
                "accept": "application/json",
              "Authorization":`${token}`},
            
        })
        .then((response) => response.json())
        .then((json) =>{
            const breakfastMenu = json.filter(item => item.type === 'breakfast')
            console.log(getProducts)
            setProducts(breakfastMenu)
        })

    }

    return(
        <div className="breakfast">
            <h1>Menu: Café da Manhã</h1>
            <section>
                {
                    products && products.map((item) =>
                    <div className="products" key={item.name} name={item.name} id={item.id} price={item.price} >
                     {/* <h2 className="divName">{item.image}</h2>    */}
                    <h2>{item.name}</h2>
                    <h2>R$ {item.price},00</h2>
                    </div>
                    
                    )}
            </section>
        </div>
    )
}
export default Breakfast;