const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);

  const newUser = new User({ email, avatarURL, verificationToken });

  newUser.setPassword(password);

  await newUser.save();

  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
