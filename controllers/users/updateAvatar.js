const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    jimp.read(tempUpload, (err, img) => {
      if (err) throw err;
      img
        .contain(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
        )
        .write(tempUpload);
    });

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
