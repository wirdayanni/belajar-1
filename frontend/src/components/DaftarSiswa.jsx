import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import useSWR, {useSWRConfig} from 'swr';

const fetcher = async () => {
  const response = await axios.get('http://localhost:8000', {
    headers: { Accept: 'application/json' }
  })
  return response.data
}

const DaftarSiswa = () => {
  const {mutate}=useSWRConfig()
  const { data, error } = useSWR('http://localhost:8000/', fetcher)
  if (error) return <h1>Gagal memuat data</h1>
  if (!data) return <h1>Loading...</h1>

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/${id}`);
      mutate('http://localhost:8000/');
    } catch (error) {
      console.error("Gagal menghapus data:", error.message);
    }
  };

  return (
    <div>
      <h1>DaftarSiswa</h1>
        <div>
	        <Link to="/tambah">Tambah Siswa</Link>
        </div>
          <table>
              <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Umur</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                  {data && data.map((siswa, index) =>(
                    <tr key={siswa.id}>
                      <td>{index+1}</td>
                      <td>{siswa.nama}</td>
                      <td>{siswa.umur}</td>
                      <td>
                        <Link to={`/edit/${siswa.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(siswa.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
    </div>
  )
}

export default DaftarSiswa;