import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditSiswa = () => {
  const [nama, setNama] = useState('');
  const [umur, setUmur] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSiswaById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/${id}`);
        setNama(response.data.nama);
        setUmur(response.data.umur);
      } catch (error) {
        console.error('Gagal mengambil data siswa:', error);
      }
    };
    getSiswaById();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/${id}`,
        {
          nama: nama,
          umur: parseInt(umur),
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      navigate('/');
    } catch (error) {
      console.error('Gagal memperbarui siswa:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Edit Data Siswa
      </h2>
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama:
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Umur:
          </label>
          <input
            type="number"
            value={umur}
            onChange={(e) => setUmur(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSiswa;
