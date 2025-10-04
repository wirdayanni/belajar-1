import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();  

// Get Semua Siswa
export const getAllSiswa = async (req, res) => {
    try {
        const response = await prisma.siswa.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

// Get Siswa By Id
export const getSiswaById = async (req, res) => {
    try {
        const response = await prisma.siswa.findUnique({
            where:{
                id : Number(req.params.id)
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

// Create Siswa
export const createSiswa = async (req, res) => {
    const {nama, umur} = req.body
    try {
        const response = await prisma.siswa.create({
            data: {
                nama,
                umur
            }
        })
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
};

// Update Siswa
export const updateSiswa = async (req, res) => {
    const {nama, umur} = req.body
    try {
        const response = await prisma.siswa.update({
            where:{
                id : Number(req.params.id)
            },
            data: {
                nama,
                umur
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
};

// Delete Siswa
export const deleteSiswa = async (req, res) => {
    try {
        const response = await prisma.siswa.delete({
            where:{
                id: Number(req.params.id)
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};