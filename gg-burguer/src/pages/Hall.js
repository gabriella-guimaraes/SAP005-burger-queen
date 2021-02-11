import React from 'react';
import { useHistory } from 'react-router-dom';

function Hall() {
    const history = useHistory();
    return(
        <div class="hall-feed">
            <h1>Feed do Salão</h1>
        </div>
    );
}

export default Hall