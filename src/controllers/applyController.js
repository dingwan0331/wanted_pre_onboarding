const applyService = require("../services/applyService");
const { CreateError } = require("../utils/exceptions");

const postApply = async (req, res, next) => {
  try {
    const { jobPostingId } = req.body;

    console.log(jobPostingId);

    if (!jobPostingId) {
      throw new CreateError(400, "Key Error");
    }

    await applyService.postApply(req.body, req.user);

    res.status(201).json({ message: "Created" });
  } catch (err) {
    next(err);
  }
};

module.exports = { postApply };
