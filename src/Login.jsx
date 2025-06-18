import React, { useState } from 'react';
import API from './api';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/login', null, {
        params: { email, password: senha }
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      onLoginSuccess();
    } catch (err) {
      setErro('Credenciais inválidas');
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        {erro && <div className="alert alert-danger">{erro}</div>}
        <form onSubmit={fazerLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
