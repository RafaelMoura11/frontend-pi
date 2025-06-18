import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import estadosCidades from './estadosCidades'; // você criará esse arquivo

function App() {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [bedMin, setBedMin] = useState('');
  const [bathMin, setBathMin] = useState('');
  const [graficoBase64, setGraficoBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const gerarGrafico = async () => {
    setLoading(true);

    try {
      const response = await axios.get('https://backend-pi-59mq.onrender.com/grafico-preco', {
        params: {
          cidade,
          estado,
          price_min: priceMin,
          price_max: priceMax,
          bed_min: bedMin,
          bath_min: bathMin,
        },
      });

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
        <select value={estado} onChange={(e) => {
          setEstado(e.target.value);
          setCidade(''); // reseta cidade ao mudar estado
        }}>
          <option value="">Selecione um estado</option>
          {Object.keys(estadosCidades).sort().map((uf) => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </select>

        <select value={cidade} onChange={(e) => setCidade(e.target.value)} disabled={!estado}>
          <option value="">Selecione uma cidade</option>
          {estado && estadosCidades[estado].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input type="number" placeholder="Preço mínimo" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
        <input type="number" placeholder="Preço máximo" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
        <input type="number" placeholder="Quartos mínimos" value={bedMin} onChange={(e) => setBedMin(e.target.value)} />
        <input type="number" placeholder="Banheiros mínimos" value={bathMin} onChange={(e) => setBathMin(e.target.value)} />
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
