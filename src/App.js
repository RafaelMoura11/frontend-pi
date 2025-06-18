import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [graficoBase64, setGraficoBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const gerarGrafico = async () => {
    setLoading(true);

    try {
      const response = await axios.get('https://backend-pi-59mq.onrender.com/grafico-preco', {
        params: {
          cidade,
          estado
        }
      });

      console.log("Resposta da API:", response.data);
      setGraficoBase64(response.data.image);

    } catch (error) {
      console.error('Erro ao gerar gráfico:', error.response?.data || error.message);
      alert('Erro ao gerar gráfico. Ver console para detalhes.');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Análise de Imóveis</h1>

      <div className="filtros">
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
      </div>

      <button onClick={gerarGrafico} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar Gráfico'}
      </button>

      {graficoBase64 && (
        <img
          src={`data:image/png;base64,${graficoBase64}`}
          alt="Gráfico de Preços"
          style={{ marginTop: '20px', maxWidth: '90%' }}
        />
      )}
    </div>
  );
}

export default App;
