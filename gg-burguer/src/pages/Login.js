import { FormControl, Input, InputLabel, Button } from "@material-ui/core";

const Login = () => {
  return (
    <div className="login">
      <p id="description"> Descrição do App </p>
      <FormControl className="login">
        <InputLabel>Informe seu Email:</InputLabel>
        <Input id="email-field" placeholder="exemplo@exemplo.com" required />
      </FormControl>
      <FormControl className="login">
        <InputLabel>Informe sua Senha:</InputLabel>
        <Input id="password-field" type="password" required />
        <Button id="button-signIn"variant="contained" color="primary" size="small">
          Entar
        </Button>
      </FormControl>
      <FormControl className="first-login">
        <p>É o seu primeiro Acesso ? </p>
        <Button id="button-register" variant="contained" color="secondary" size="small">
          Registrar-se      
        </Button>
      </FormControl>
    </div>
  );
};

export default Login;
