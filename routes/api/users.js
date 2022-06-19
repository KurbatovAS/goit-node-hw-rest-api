const express = require("express");

const { user, validation, upload, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const {
  joiSignupSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiSignupSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.post("/logout", user, ctrlWrapper(ctrl.logout));

router.get("/current", user, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  user,
  upload.single("avatars"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.patch(
  "/:id/subscription",
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateUserSubscription)
);

module.exports = router;
