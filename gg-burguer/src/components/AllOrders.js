import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

function AllOrders(){
    const history = useHistory();
    console.log('chamou a função AllOrders')
    return(
        <div className="AllOrders">
            <h1>Pedidos pendentes apareceram aqui</h1>
            {console.log('entrou no retorno')}
        </div>

    )
}

export default AllOrders;