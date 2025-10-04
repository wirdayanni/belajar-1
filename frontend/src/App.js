import {BrowserRouter, Routes, Route} from "react-router-dom";
import DaftarSiswa from "./components/DaftarSiswa.jsx";
import EditSiswa from "./components/EditSiswa.jsx";
import TambahSiswa from "./components/TambahSiswa.jsx";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DaftarSiswa/>}/>
          <Route path="/tambah" element={<TambahSiswa/>}/>
          <Route path="/edit/:id" element={<EditSiswa/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
