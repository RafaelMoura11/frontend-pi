import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import estadosCidades from './estadosCidades';

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
    const params = {};
    if (estado) params.estado = estado;
    if (cidade) params.cidade = cidade;
    if (priceMin) params.price_min = priceMin;
    if (priceMax) params.price_max = priceMax;
    if (bedMin) params.bed_min = bedMin;
    if (bathMin) params.bath_min = bathMin;

    try {
      const response = await axios.get('https://backend-pi-59mq.onrender.com/grafico-preco', { params });
      setGraficoBase64(response.data.image);
    } catch (error) {
      console.error('Erro ao gerar gráfico:', error.response?.data || error.message);
      alert('Erro ao gerar gráfico. Ver console para detalhes.');
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Análise de Imóveis</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Estado</label>
          <select className="form-select" value={estado} onChange={(e) => {
            setEstado(e.target.value);
            setCidade('');
          }}>
            <option value="">Selecione um estado</option>
            {Object.keys(estadosCidades).sort().map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Cidade</label>
          <select className="form-select" value={cidade} onChange={(e) => setCidade(e.target.value)} disabled={!estado}>
            <option value="">Selecione uma cidade</option>
            {estado && estadosCidades[estado].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Preço mínimo</label>
          <input type="number" className="form-control" placeholder="Ex: 50000" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Preço máximo</label>
          <input type="number" className="form-control" placeholder="Ex: 1000000" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Quartos mínimos</label>
          <input type="number" className="form-control" placeholder="Ex: 2" value={bedMin} onChange={(e) => setBedMin(e.target.value)} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Banheiros mínimos</label>
          <input type="number" className="form-control" placeholder="Ex: 1" value={bathMin} onChange={(e) => setBathMin(e.target.value)} />
        </div>
      </div>

      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={gerarGrafico} disabled={loading}>
          {loading ? 'Gerando...' : 'Gerar Gráfico'}
        </button>
      </div>

      {graficoBase64 && (
        <div className="text-center">
          <img
            src={`data:image/png;base64,${graficoBase64}`}
            alt="Gráfico de Preços"
            className="img-fluid"
          />
        </div>
      )}
    </div>
  );
}

export default App;
