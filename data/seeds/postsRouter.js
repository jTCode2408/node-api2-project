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


//GET SINGLE POST by id(apo/posts/:id)
router.get("/:id", (req,res)=>{
Posts.findById(req.params.id)
.then(post =>{
    if(post){
        res.status(200).json(post)
    }else{
        res.status(404).json({ error: "The post with specified ID does not exist" })
    }
})

.catch(err=>{
    console.log(err)
    res.status(500).json({errorMessage: "The post information could not be retrieved."})
})
})

//create COMMENT for post w/id(api/posts/:id/comments. req.body)
router.post("/:id/comments")

//GET ALL COMMENTS on posts by id(api/posts/:id/comments)
//DELETE POST by id(should RETURN DELETED OBJECT)(api/posts/:id)
//UPDATES POST by id. returns NEW post(api/posts/:id) req.body












module.exports=router;