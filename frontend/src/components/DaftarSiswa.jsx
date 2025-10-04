import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = async () => {
  const response = await axios.get('http://localhost:8000', {
    headers: { Accept: 'application/json' },
  });
  return response.data;
};

const DaftarSiswa = () => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR('http://localhost:8000/', fetcher);
  if (error) return <h1 className="text-red-600 text-center mt-10">Gagal memuat data</h1>;
  if (!data) return <h1 className="text-gray-500 text-center mt-10">Loading...</h1>;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus data ini?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/${id}`);
      mutate('http://localhost:8000/');
    } catch (error) {
      console.error('Gagal menghapus data:', error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Daftar Siswa</h1>
        <Link
          to="/tambah"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
        >
          + Tambah Siswa
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b text-left">No</th>
              <th className="py-3 px-4 border-b text-left">Nama</th>
              <th className="py-3 px-4 border-b text-left">Umur</th>
              <th className="py-3 px-4 border-b text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((siswa, index) => (
                <tr
                  key={siswa.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{siswa.nama}</td>
                  <td className="py-2 px-4 border-b">{siswa.umur}</td>
                  <td className="py-2 px-4 border-b text-center space-x-2">
                    <Link
                      to={`/edit/${siswa.id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(siswa.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarSiswa;
