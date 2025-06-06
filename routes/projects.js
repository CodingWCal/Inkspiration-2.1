const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectsController = require("../controllers/projects");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, projectsController.getProject);

router.get("/editProject/:id", projectsController.getEditProject);

router.post("/createProject", upload.single("file"), projectsController.createProject);

router.put("/likeProject/:id", projectsController.likeProject);

router.put("/editProject/:id", upload.single("file"), projectsController.editProject);

router.delete("/deleteProject/:id", projectsController.deleteProject);

module.exports = router;
