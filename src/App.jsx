import React, { useState, useEffect } from 'react';
import Login from './Login';
import Protected from './Protected';

function App() {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLogado(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogado(false);
  };

  return (
    <div className="App">
      {logado ? (
        <>
          <button onClick={handleLogout}>Sair</button>
          <Protected />
        </>
      ) : (
        <Login onLoginSuccess={() => setLogado(true)} />
      )}
    </div>
  );
}

export default App;
