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
      setTimeout(onSwitchToLogin, 2000); // volta pro login depois de 2s
    } catch (error) {
      console.error(error);
      setMensagem(error.response?.data?.detail || 'Erro ao registrar usuário');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro</h2>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Nome</label>
          <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Senha</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      <p className="mt-3">
        Já tem uma conta? <button className="btn btn-link" onClick={onSwitchToLogin}>Login</button>
      </p>
    </div>
  );
}

export default Register;
