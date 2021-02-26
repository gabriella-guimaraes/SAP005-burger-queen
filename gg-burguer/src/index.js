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

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/login" component={Login} />
      <Route path="/registro" component={Register} />
      <PrivateRoute path="/cozinha" component={Kitchen} />
      <PrivateRoute path="/salao" component={Hall} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
