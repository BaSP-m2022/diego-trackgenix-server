import Admin from '../models/admin';

const getAdmin = async (req, res) => {
    try {
        const allAdmins = await Admin.find (req.body);
        if (allAdmins.length === 0) {
            return res.status(404).json({
                msg: 'Admin not found',
            });
        }
        return res.status(200).json({
            msg: 'Admin found',
            data: allAdmins,
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'There has been an error',
        });
    }
};   

const getAdminById = async (req, res) => {
    try {
        if (req.params.id) {
            const admin = await Admin.findById(req.params.id);
            return res.status(200).json({
              message: 'Request done',
              data: admin,
              error: false,
            });
        }
        return res.status(400).json({
            msg: 'Please enter an id',
        });
    } catch (error) {
        return res.json({
            msg: error,
        });
    }
};

const createAdmin = async (req, res) =>  {
    try {
        const newAdmin = new Admin ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            active: req.body.active,
        });
        const result = await newAdmin.save();
        return res.status(201).json(result);
    } catch (error) {
        return res.json({
            msg: 'There has been an error',
        });
    }
};


const updateAdmin = async (req, res) => {
    try {
        if (!req.params) {
            res.status(400).json({
                msg: 'Please enter an id',
            });
        }
        const result = await Admin.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true},
        );
        if (!result) {
            return res.status(404).json({
                msg: 'Admin not found',
            });
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.json({
            msg: 'There has been an error',
        });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const result = await Admin.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({
                msg: 'Admin not found'
            });
        }
        return res.status(200).json({
            msg: 'Admin deleted',
        });
    } catch (error) {
        return res.json({
            msg: 'Theres has been an error',
        });
    }

};

export default {
    getAdmin,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin, 
};