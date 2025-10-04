import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TambahSiswa = () => {
  const [nama, setNama] = useState('');
  const [umur, setUmur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000', {
        nama: nama,
        umur: parseInt(umur)
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Setelah berhasil tambah data, kembali ke daftar
      navigate('/');
    } catch (error) {
      console.error('Gagal menambah siswa:', error);
    }
  };

  return (
    <div>
      <h2>Tambah Siswa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama: </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Umur: </label>
          <input
            type="number"
            value={umur}
            onChange={(e) => setUmur(e.target.value)}
            required
          />
        </div>

        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default TambahSiswa;