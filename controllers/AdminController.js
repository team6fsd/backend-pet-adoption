import bcrypt from 'bcrypt';
import Admin from '../models/AdminModel.js';

export const getAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAdmin = async (req, res) => {
  try {
    await Admin.create(req.body);
    res.status(201).json({ msg: 'Admin Created' });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginAdmin = async (req, res) => {
    console.log(req)
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({
      where: { username },
    });

    if (!admin) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    res.status(200).json({ msg: 'Admin successfully logged in' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};
