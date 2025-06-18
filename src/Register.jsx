import React, { useState } from 'react';
import axios from 'axios';

function Register({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-pi-59mq.onrender.com/register', null, {
        params: {
          name,
          email,
          password,
        },
      });
      setMensagem('Cadastro realizado com sucesso!');
      setTimeout(onSwitchToLogin, 2000);
    } catch (error) {
      console.error(error);
      setMensagem(error.response?.data?.detail || 'Erro ao registrar usuário');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 450, width: '100%' }}>
        <h3 className="text-center mb-4">Cadastro</h3>
        {mensagem && <div className="alert alert-info">{mensagem}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              placeholder="Seu nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="exemplo@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Crie uma senha segura"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Registrar</button>
        </form>

        <div className="text-center mt-3">
          Já tem uma conta?{' '}
          <button className="btn btn-link p-0" onClick={onSwitchToLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
