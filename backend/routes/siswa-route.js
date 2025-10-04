import express from "express";
import {
    getAllSiswa,
    getSiswaById,
    createSiswa,
    updateSiswa,
    deleteSiswa
} from "../controllers/siswa-controller.js";

const router = express.Router();

router.post('/', createSiswa);
router.get('/', getAllSiswa);
router.get('/:id', getSiswaById);
router.put('/:id', updateSiswa);
router.delete('/:id', deleteSiswa);

export default router;