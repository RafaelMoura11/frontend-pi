import React, { useState } from 'react';
import API from './api';

function Protected() {
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [graficoBase64, setGraficoBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const gerarGrafico = async () => {
    setLoading(true);
    try {
      const response = await API.get('/grafico-preco', {
        params: { cidade, estado },
      });
      setGraficoBase64(response.data.image);
    } catch (error) {
      alert('Erro ao gerar gráfico');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Análise de Imóveis</h1>
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
      <button onClick={gerarGrafico} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar Gráfico'}
      </button>
      {graficoBase64 && (
        <img
          src={`data:image/png;base64,${graficoBase64}`}
          alt="Gráfico"
          style={{ marginTop: 20, maxWidth: '100%' }}
        />
      )}
    </div>
  );
}

export default Protected;
