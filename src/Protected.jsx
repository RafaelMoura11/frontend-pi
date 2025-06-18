import React, { useState } from 'react';
import API from './api';
import estadosCidades from './estadosCidades';

function Protected({ onLogout }) {
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
      const response = await API.get('/grafico-preco', { params });
      setGraficoBase64(response.data.image);
    } catch (error) {
      alert('Erro ao gerar gráfico');
      console.error(error);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Análise de Imóveis</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label>Estado</label>
          <select
            className="form-select"
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
              setCidade('');
            }}
          >
            <option value="">Selecione um estado</option>
            {Object.keys(estadosCidades).sort().map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Cidade</label>
          <select
            className="form-select"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            disabled={!estado}
          >
            <option value="">Selecione uma cidade</option>
            {estado && estadosCidades[estado].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <label>Preço Mínimo</label>
          <input
            type="number"
            className="form-control"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label>Preço Máximo</label>
          <input
            type="number"
            className="form-control"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label>Quartos Mín.</label>
          <input
            type="number"
            className="form-control"
            value={bedMin}
            onChange={(e) => setBedMin(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label>Banheiros Mín.</label>
          <input
            type="number"
            className="form-control"
            value={bathMin}
            onChange={(e) => setBathMin(e.target.value)}
          />
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
            style={{ maxHeight: '500px' }}
          />
        </div>
      )}
    </div>
  );
}

export default Protected;
