import Members from '../models/Members';

const getMembers = async (req, res) => {
  try {
    const allMembers = await Members.find(req.body);
    if (allMembers.length === 0) {
      return res.status(404).json({
        message: 'Not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin found',
      data: allMembers,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'There has been an error',
      data: undefined,
      error: true,
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    const member = await Members.findById(req.params.id);
    if (member == null) {
      return res.status(404).json({
        message: 'Member not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member found',
      data: member,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const addMember = async (req, res) => {
  try {
    const member = new Members({
      employeeId: req.body.employeeId,
      role: req.body.role,
      rate: req.body.rate,
    });
    const result = await member.save();
    return res.status(201).json({
      message: 'Member created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Members.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Member not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Member updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const result = await Members.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Member not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member has been deleted',
      data: result,
      error: false,

    });
  } catch (error) {
    return res.json({
      message: error.message,
      data: undefined,
      error: true,

    });
  }
};

export default {
  getMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
