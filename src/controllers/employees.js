import Employee from '../models/Employees';

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
      msg: 'Employee created',
      result,
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error',
      error,
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
      error: error.message,
    });
  }
};

export default {
  createEmployee,
  updateEmployee,
};
