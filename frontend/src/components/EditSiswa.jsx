import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditSiswa = () => {
  const [nama, setNama] = useState('');
  const [umur, setUmur] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // ambil id dari URL

  // Ambil data siswa berdasarkan id saat halaman dimuat
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

  // Proses simpan perubahan data
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/${id}`, {
        nama: nama,
        umur: parseInt(umur)
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      navigate('/'); // Kembali ke daftar siswa
    } catch (error) {
      console.error('Gagal memperbarui siswa:', error);
    }
  };

  return (
    <div>
      <h2>Edit Siswa</h2>
      <form onSubmit={handleUpdate}>
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

        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditSiswa;
