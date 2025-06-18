import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login'; // ✅ Importação do Login

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <p className="text-center mt-5">🎉 Login realizado com sucesso!</p>;
    // aqui depois você pode redirecionar para o conteúdo protegido ou dashboard
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
