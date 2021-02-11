import React from 'react';
import { useHistory } from 'react-router-dom';

function Kitchen() {
    const history = useHistory();
    return(
        <div class="kitchen-feed">
            <h1>Feed da cozinha</h1>
        </div>
    );
}

export default Kitchen