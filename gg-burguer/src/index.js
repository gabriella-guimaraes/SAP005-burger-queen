import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import Kitchen from './pages/Kitchen';
import Hall from './pages/Hall';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import FinishedOrders from './components/FinishedOrders'
import DeliveredOrders from './components/DeliveredOrders'

const isAuthenticated = ()=> {
  const token = localStorage.getItem("token")
  if (token){
      return true
  }else {
     return false
  }
}

const PrivateRoute = ({component: Component, ...rest})=>(
  <Route 
    {...rest} 
    render ={props =>(
      isAuthenticated()? (
        <Component{...props}/>
      ) : (
        <Redirect to={{pathname: '/login', state:{ from: props.location}}} />
      )
      )      
    }
  />
);
{/* <Route path="/" component={App} exact /> */}

ReactDOM.render(
  <BrowserRouter>
    <Switch>

      <Route path="/" component={Login} exact />
      <Route path="/registro" component={Register} exact />
      <PrivateRoute path="/cozinha" component={Kitchen} exact />
      <PrivateRoute path="/salao" component={Hall} exact />
      <PrivateRoute path="/pedidosprontos" component={FinishedOrders} exact />
      <PrivateRoute path="/pedidosentregues" component={DeliveredOrders} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
