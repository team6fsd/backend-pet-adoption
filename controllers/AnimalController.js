import Animal from "../models/AnimalModel.js";

// Get all animals with status 'publish'
export const getAnimal = async (req, res) => {
    try {
        const response = await Animal.findAll({
            where: {
                status_adoption: 'publish',
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

// Get all animals with status 'proses'
export const getAnimalProses = async (req, res) => {
    try {
        const response = await Animal.findAll({
            where: {
                status_adoption: 'proses',
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};


// Get all animals with status 'approved'
export const getAnimalApprove = async (req, res) => {
    try {
        const response = await Animal.findAll({
            where: {
                status_adoption: 'approve',
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

// create animal news
export const createAnimal = async (req, res) => {
    console.log("Received data:", req.body); // Tambahkan baris ini untuk mencetak data yang diterima
    try {
        await Animal.create(req.body);
        res.status(201).json({ msg: "Animal Created" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Show animal by ID
export const getAnimalById = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = await Animal.findByPk(animalId);
        if (!animal) {
            return res.status(404).json({ msg: "Data tidak ditemukan." });
        }

        // Check if the animal is already in the adoption process
        if (animal.status === 'proses') {
            return res.status(400).json({ msg: 'Animal adoption is already in process. Cannot adopt again.' });
        }

        res.status(200).json(animal);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};


//update animal
export const updateAnimal = async(req, res) =>{
    try {
        await Animal.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Animal Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

// update status publish
export const handleStatusPublish = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = await Animal.findOne({
            where: {
                id: animalId
            }
        });

        if (!animal) {
            return res.status(404).json({ error: 'Hewan tidak ditemukan' });
        }

        await Animal.update(
            { status_adoption: 'publish' 
             },{
                where: {
                    id: animalId
                }
            }
        );

        res.status(200).json({
            msg: "Animal Berhasil dipublish", 
            status: 200
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};


//update status proses
export const handleStatusProses = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = await Animal.findOne({
            where: {
                id: animalId
            }
        });

        if (!animal) {
            return res.status(404).json({ error: 'Hewan tidak ditemukan' });
        }

        await Animal.update(
            { status_adoption: 'proses' },
            {
                where: {
                    id: animalId
                }
            }
        );

        res.status(200).json({msg: "Animal Sedang Diproses"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

//update status approve
export const handleStatusApprove = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = await Animal.findOne({
            where: {
                id: animalId
            }
        });

        if (!animal) {
            return res.status(404).json({ error: 'Hewan tidak ditemukan' });
        }

        await Animal.update(
            { status_adoption: 'approve' },
            {
                where: {
                    id: animalId
                }
            }
        );

        res.status(200).json({msg: "Animal Disetujui diadopsi"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};


// Delete animal
export const deleteAnimal = async (req, res) => {
    try {
        const animalId = req.params.id;
        const existingAnimal = await Animal.findByPk(animalId);

        if (!existingAnimal) {
            return res.status(404).json({ msg: "Data tidak ditemukan. Tidak ada yang dihapus." });
        }
        await Animal.destroy({
            where: {
                id: animalId
            }
        });
        res.status(200).json({ msg: "Animal successfully deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};
