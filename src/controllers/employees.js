import Employee from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    return res.status(200).json({
      allEmployees,
      msg: 'Employee found',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There has been an error',
    });
  }
};

const getEmployeesById = async (req, res) => {
  try {
    if (req.params.id) {
      const employee = await Employee.findById(req.params.id);
      return res.status(200).json(employee);
    }
    return res.status(400).json({
      msg: 'Missing id parameter',
    });
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

const getEmployeesByFilter = async (req, res) => {
  try {
    if (req.body.key) {
      const employee = await Employee.find(req.body.key);
      return res.status(200).json(employee);
    } else {
        return res.status(400).json({
        msg: 'Missing id parameter',
        });
    }
  } catch (error) {
    return res.json({
      msg: error,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee({
      first_Name: req.body.first_Name,
      last_Name: req.body.last_Name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const result = await employee.save();
    return res.status(201).json({
      result,
      msg: 'Employee created',
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error', error,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        msg: 'Missing id parameter',
      });
    }
    const result = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        msg: 'Employee not found',
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.json({
      msg: 'There has been an error',
      error: error.details[0].message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Employee not found',
      });
    }
    return res.status(200).json({
      msg: 'The employee has been deleted',
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error',
      error: error.details[0].message,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeesById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeesByFilter,
};
