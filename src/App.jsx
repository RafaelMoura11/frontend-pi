import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="container">
      <h1 className="my-4 text-center">Análise de Imóveis</h1>
      {isRegistering ? (
        <Register onSwitchToLogin={() => setIsRegistering(false)} />
      ) : (
        <div className="text-center">
          {/* Aqui você colocaria o seu componente de Login */}
          <p>Você ainda não tem uma conta?</p>
          <button className="btn btn-secondary" onClick={() => setIsRegistering(true)}>Criar Conta</button>
        </div>
      )}
    </div>
  );
}

export default App;
