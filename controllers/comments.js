const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
    console.log('we made it: adding new comment to project')

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
        project: req.params.id
      });
      console.log("Comment has been added!");
      res.redirect(`/project/${req.params.id}`); // redirects to project
      // res.redirect("/post/"+req.params.rainbowUnicorn);
    } catch (err) {
      console.log("Error w creating comments:", err);
      res.redirect("back"); //redirect back a page if error
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect("back"); // goes back after addin like to comment
      // res.redirect(`/project/${req.params.id}`);
    } catch (err) {
      console.log("Error w liking comment:", err);
      res.redirect("back"); //redirect back a page if error
    }
  },
  deleteComment: async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).lean();
    // Only can be deleted by commentor or project owner
    if (
      comment.user.toString() === req.user._id.toString()
    ) {
      await Comment.findByIdAndDelete(req.params.id);
      console.log("Comment deleted");
      return res.redirect(req.get("Referrer") || "/");    
    }
  } catch (err) {
    console.log(err);
    return res.redirect(req.get("Referrer") || "/");
  }
}

//   deletePost: async (req, res) => {
//     try {
//       // Find post by id
//       let post = await Post.findById({ _id: req.params.id });
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(post.cloudinaryId);
//       // Delete post from db
//       await Post.remove({ _id: req.params.id });
//       console.log("Deleted Post");
//       res.redirect("/profile");
//     } catch (err) {
//       res.redirect("/profile");
//     }
//   },
};
