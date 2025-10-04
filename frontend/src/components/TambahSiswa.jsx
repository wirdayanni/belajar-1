import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const TambahSiswa = () => {
  const [nama, setNama] = useState('');
  const [umur, setUmur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:8000',
        { nama: nama, umur: parseInt(umur) },
        { headers: { 'Content-Type': 'application/json' } }
      );

      navigate('/');
    } catch (error) {
      console.error('Gagal menambah siswa:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Tambah Siswa
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input Nama */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            placeholder="Masukkan nama siswa"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Input Umur */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Umur</label>
          <input
            type="number"
            value={umur}
            onChange={(e) => setUmur(e.target.value)}
            required
            placeholder="Masukkan umur siswa"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Tombol Simpan */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-all duration-200"
          >
            Kembali
          </Link>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahSiswa;
