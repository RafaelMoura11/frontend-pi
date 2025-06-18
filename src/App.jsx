import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login';
import Protected from './Protected';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <Protected onLogout={handleLogout} />;
  }

  return (
    <div className="container">
      <h1 className="my-4 text-center">Análise de Imóveis</h1>
      {isRegistering ? (
        <Register onSwitchToLogin={() => setIsRegistering(false)} />
      ) : (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          <p className="mt-3 text-center">
            Ainda não tem conta?{' '}
            <button className="btn btn-link" onClick={() => setIsRegistering(true)}>
              Registrar
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
