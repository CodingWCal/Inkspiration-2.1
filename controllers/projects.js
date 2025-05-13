const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");
const Project = require('../models/Project');

module.exports = { //get user n all projects
  getProfile: async (req, res) => {
    try {
        const projects = await Project.find({user: req.user._id })
          res.render('profile.ejs', {
          user: req.user,
          projects: projects, 
        })
    } catch (err) {
      console.log(err);
      return res.send(err)
    }
  },

  getFeed: async (req, res) => {
    try {
      const projects = await Project.find({ private: false }) //finds public projects
        .populate('user') 
        .sort({ createdAt: "desc" })
        .lean();

      const comments = await Comment.find()
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean(); 

      res.render("feed.ejs", { user: req.user, projects, comments });
      //old yoinked getFeed code from quickpound/binaryupload, changed posts to pub projects
    } catch (err) {
      console.log(err);
    }
  },

  getProject: async (req, res) => { //get single project page n comments, shows user info
    try {
      const project = await Project.findById(req.params.id).populate('user').lean();

      const comments = await Comment.find({ project: req.params.id }) //match schema for comments that match project
      .populate("user")
      .sort({ createdAt: -1 })
      .lean();       

      res.render("project.ejs", { project: project, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
      res.redirect("/feed");
    }
  },

  createProject: async (req, res) => {
    try {
      // Upload image to cloudinary
        console.log('path', req.file);

    let image = "";
    let cloudinaryId = "";
    if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
        image = result.secure_url;
        cloudinaryId = result.public_id;
        }

     const newProject = await Project.create({
        title: req.body.title,
        image: image,
        cloudinaryId: cloudinaryId,
        content: req.body.content,
        // likes: 0,
        user: req.user.id,
        medium: req.body.medium,
        theme: req.body.theme,
        mood: req.body.mood,
        colorPalette: req.body.colorPalette?.split(',') || [], //for comma separated color palette
        goals: req.body.goals?.split(',') || [],
        currentStage: req.body.currentStage,
        private: Boolean(req.body.private), //added private true or false, public projects added to feed
      });
      console.log("Project has been added!");
      res.redirect("/profile"); // redirects to Profile 
    } catch (err) {
      console.log(err);
      res.redirect("/feed");
    }
  },

  likeProject: async (req, res) => {
    try {
      await Project.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/project/${req.params.id}`); // Redirects to project 
    } catch (err) {
      console.log(err);
      res.redirect("/feed");
    }
  },

    getEditProject: async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        console.log('project:', project)
       res.render('editProject.ejs', {
          user: req.user,
          project: project, 
        });
    } catch (err) {
      console.log(err);
      return res.send(err)
    }
  },

    editProject: async (req, res) => {
      try {
        const project = await Project.findById(req.params.id);
      
        // add new pic upload if file is added optional, can replace pic
        if (req.file) {
          // Delete old pic from Cloudinary if in sys
          if (project.cloudinaryId) {
            await cloudinary.uploader.destroy(project.cloudinaryId);
          }
        
          // Upload new pic to Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path);
        
          // Update pic 
          project.image = result.secure_url;
          project.cloudinaryId = result.public_id;
        }
      
        // Update fields regardless of pics
        project.title = req.body.title;
        project.content = req.body.content;
        project.medium = req.body.medium;
        project.theme = req.body.theme;
        project.mood = req.body.mood;
        project.colorPalette = req.body.colorPalette?.split(',') || [];
        project.goals = req.body.goals?.split(',') || [];
        project.currentStage = req.body.currentStage;
        project.private = Boolean(req.body.private), //added private true or false, public projects added to feed
      
        await project.save();
        console.log("Project updated correctly:", project.title);
        res.redirect('/profile');
      } catch (err) {
        console.error("Error w updating project:", err);
        res.redirect('/profile');
      }
    },

  deleteProject: async (req, res) => {
    try {
      // Find post by id
      let project = await Project.findById(req.params.id); //took out remove method since its now deprecated
      // Delete image from cloudinary
    if (project.cloudinaryId !== "") {
       await cloudinary.uploader.destroy(project.cloudinaryId);
        }
      // Delete post from db
      await Project.findByIdAndDelete(req.params.id);
      console.log("Deleted Project");
      res.redirect("/profile");
    } catch (err) {
        console.log(err);
      res.redirect("/profile");
    }
  },
};

//Old DEMO Project Routes Code, will need to convert to async await!
