const service = require('../services/mascota.service');

exports.getAll = async (req, res) =>{
    try {
        const data = await service.getAllMascotas();
        res.json(data);
    }catch (err){
        res.status(500).json({error: err.message});
    }
};

exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const mascota = await service.getMascotaById(id);
        if (!mascota) return res.status(404).json({ message: 'Mascota not found'});
        res.json(mascota);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        const newMascota = await service.createMascota(req.body);
        res.status(201).json(newMascota);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updated = await service.updateMascota(id, req.body);
        if (!updated) return res.status(404).json({ message: 'Mascota not found' });
        res.json(updated)
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        const deleted = await service.deleteMascota(id);
        if (!deleted) return res.status(404).json({ message: 'Mascota not found' });
        res.status(204).send();
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};