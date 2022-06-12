const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  if (favorite) {
    const showFavorite = await Contact.find({ favorite: true });
    res.json({
      status: "success",
      code: 200,
      data: {
        showFavorite,
      },
    });
  } else {
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  }
};

module.exports = getAll;
