//router for posts paths
const express = require ("express");
const router = express.Router()
const Posts = require("../db.js"); //db access

//route handlers for posts (/api/posts/...)

//get ALL posts( /api/posts)
router.get("/", (req,res)=>{
    Posts.find()
    .then(posts=>{
        res.status(200).json(posts);
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

//create a post(POST. /api/posts. req.body)(title,contents)
router.post("/", (req,res)=>{
    const newPost = req.body;
    Posts.insert(newPost)
    .then(adding =>{
        if(newPost.title || newPost.contents){
        res.status(200).json(newPost);
    
} else{
    res.status(400).json({errorMessage: "Please provide title and contents for the post." })
}
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})


//create COMMENT for post w/id(api/posts/:id/comments. req.body)
//GET SINGLE POST by id(apo/posts/:id)
//GET ALL COMMENTS on posts by id(api/posts/:id/comments)
//DELETE POST by id(should RETURN DELETED OBJECT)(api/posts/:id)
//UPDATES POST by id. returns NEW post(api/posts/:id) req.body












module.exports=router;