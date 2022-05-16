import Employee from '../models/Employees';

const getAllEmployees = async (req, res) => {
    try {
      const allEmployees = await Employee.find(req.body);
      if (allEmployees.length === 0) {
        return res.status(404).json({
            msg: 'Employee not found'
        });
        } else {
            return res.status(200).json({
                msg:'Employee found',
                result: allEmployees
            });
        };
    }
    catch (error) {
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
      msg: error
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        msg: 'Employee not found'
      });
    }
    return res.status(200).json({
      msg: 'The employee has been deleted'
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error',
      error: error.message
    });
  }
};

export default {
  getAllEmployees,
  getEmployeesById,
  deleteEmployee
};

