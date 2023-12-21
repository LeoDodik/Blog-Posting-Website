import express from "express"
import bodyParser from "body-parser"
const port = 3000;
const app = express();

let blogs = []
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/" ,(req,res,next) =>{
res.render("index.ejs", {blogs});
next();
})

app.post("/submit-blog",(req,res,next) =>{
    const blogName = req.body.blogName;
    const blogText = req.body.blogContent;

    blogs.push({ name: blogName, content: blogText });

  res.redirect("/"); // Redirect back to the homepage
})

app.listen(port,() =>{
    console.log(`Server Running on Port ${port}`);
})


// ... (your existing code remains the same)

// Edit a blog
app.get("/edit-blog/:id", (req, res) => {
  const id = req.params.id;
  const blog = blogs[id];
  res.render("blog.ejs", { id, blog });
});

app.post("/edit-blog/:id", (req, res) => {
  const id = req.params.id;
  const updatedName = req.body.blogName;
  const updatedContent = req.body.blogContent;

  blogs[id] = { name: updatedName, content: updatedContent };
  res.redirect("/")
});

// Delete a blog
app.post("/delete-blog/:id", (req, res) => {
  const id = req.params.id;
  blogs.splice(id, 1);
  res.redirect("/");
});

// ... (rest of your existing code)
