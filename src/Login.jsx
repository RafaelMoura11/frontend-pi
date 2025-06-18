import React, { useState } from 'react';
import API from './api';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerLogin = async () => {
    try {
      const response = await API.post('/login', null, {
        params: { email, password: senha }
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      onLoginSuccess(); // chama função passada por App para redirecionar
    } catch (err) {
      setErro('Credenciais inválidas');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      /><br />
      <button onClick={fazerLogin}>Entrar</button>
    </div>
  );
}

export default Login;
