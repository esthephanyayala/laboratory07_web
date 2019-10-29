
let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let uuidv4 = require('uuid/v4');

let app = express();
let jsonParser = bodyParser.json();


app.use(express.static('public'));//Say to my server were gonna user public directory

app.use(morgan("dev"));

let blogPost =[ {
    id: uuidv4(),
    title: "This is my first post",
    content: "This is the content of my first post",
    author: "Panchito",
    publishDate: new Date(2019,10,23)
},
{
id: uuidv4(),
title: "This is my second post",
content: "This is the content of my second post",
author: "Juan",
publishDate: new Date(2019,10,23)
}] ;


//request of all blog posts should go to /blog-posts
app.get("/blog-posts", (req, res, next) =>{
    res.statusMessage = "Succes!";

    return res.status(200).json(blogPost);
/*
    return res.status(200).json({
        message: "Success!",
        status: 200,
        blogs: blogPost

    });
    */

});

//GET by author requests should go to /blog-posta?uthor=value
app.get("/blog-post", (req,res,next) =>{
    let author = req.query.author;

    if (author == null){
        res.statusMessage = "missing author";
        return res.status(406).json({
            message: "author missing",
            status: 406
        })
    }
    
    for (let i= 0; i< blogPost.length; i++){
        if (blogPost[i].author == author){
            //console.log(blogPost[i]);
            res.statusMessage ="Succes!";
            return res.status(200).json({
                message:"success",
                status:200,
                blogs: blogPost[i]
        })
    } 
    res.statusMessage = "author not found";
    return res.status(404).json({
        message: "author not found",
        status: 404
    });
    
    }
});

//POST requests of a blog post should go to /blog-posts
app.post("/blog-posts",jsonParser,(req,res) =>{
   let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;
    let publishDate = req.body.publishDate;
    
    if (title == null || content == null || author == null || publishDate == null){
        res.statusMessage = "missing field";
        return res.status(406).json({
            message: "missing field",
            status: 406
        });
    }
    res.statusMessage = "success";
    let newBlog = {
        id: uuidv4(),
        title: title,
        content: content,
        author: author,
        publishDate: publishDate
    }

    blogPost.push(newBlog);

    return res.status(201).json({
        message: "success post!",
        status: 201,
        post : newBlog
    });

});

function exists(id){
    for (let i=0; i<blogPost.length; i++){
        if (id == blogPost[i].id){
            return true;
            
        }
    
        
    }
}

function deleteBlog(id){
    for (let i=0; i<blogPost.length; i++){
        if (id == blogPost[i].id){
            blogPost.splice(i,1);
        }
    }
}

//DELETE requests should go to /blog-posts/:id
app.delete("/blog-posts/:id", (req,res) =>{
let id = req.params.id;



if (exists(id)){
  //console.log("exists");
  deleteBlog(id);
  req.statusMessage = "success"
    return res.status(200).json({
    message: "id deleted!",
    status: 200,
    blog: blogPost
});

} else {
    req.statusMessage = "id doesn't exists";
    return res.status(404).json({
        message: "id doesn't exists",
        status: 404
    });
} //end else

});

//PUT requests should go to /blog-posts/:id
app.put("/blog-posts/:id", jsonParser , (req,res) =>{

    let id1= req.params.id;
    let id2= req.body.id;

    if(id1 != id2){
        res.statusMessage = "id doesnt match"
        return res.status(409).json({
            message: "id doesnt match",
            status: 406
        });
    }
    if (id2 == null || !exists(id2)){
        res.statusMessage = "There's no id in the body"
        return res.status(406).json({
            message: "there's no id in the body",
            status: 406
        });
    }

      /*You need to pass in the body an object with the updated content of the blog
post. This object may just contain 1 field, 2 fields, 3 fields or 4 fields (title,
    content, author, publishDate) Just update whatever is passed, the rest
    should stay the same. Send a 202 status with the updated object.*/
    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;
    let publishDate = req.body.publishDate;

    for (let i=0 ; i < blogPost.length ; i++){

        if (id1 == blogPost[i].id){
            if (title != null){
                blogPost[i].title = title;
            }
            if (content != null){
                blogPost[i].content = content;
            }
            if (author != null){
                blogPost[i].author = author;
            }
            if (publishDate != null){
                blogPost[i].publishDate = publishDate;
            }

        }
        
    }

    res.statusMessage = " blog updated!"
    return res.status(202).json({
        message: "blog  updated!",
        status: 202,
    
    });

    

});

app.listen("8080", () => {
    console.log("App is running on port 8080")
    
});