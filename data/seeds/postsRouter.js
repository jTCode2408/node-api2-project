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
    if(!newPost.title || !newPost.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post." })
    } else{
    Posts.insert(newPost)
    .then(adding =>{
        res.status(201).json(newPost);

    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
}
})


//GET SINGLE POST by id(apo/posts/:id)
router.get("/:id", (req,res)=>{
Posts.findById(req.params.id)
.then(post =>{
    if(post.length===0){
        res.status(404).json({ error: "The post with specified ID does not exist" })
    }else{
        res.status(200).json(post)
    }
})

.catch(err=>{
    console.log(err)
    res.status(500).json({errorMessage: "The post information could not be retrieved."})
})
})
//GET ALL COMMENTS on posts by id(api/posts/:id/comments)
router.get("/:id/comments", (req,res)=>{
    Posts.findById(req.params.id)
    .then(commentsID =>{
        if(commentsID.length===0){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else{
            Posts.findPostComments(req.params.id)
            .then(comments=>{
                res.status(200).json(comments)
            })
            .catch(err=>{
                res.status(500).json({errorMessage: "the comment information could not be retrieved"})
            })
        }
    })  
  .catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage: "The post information could not be retrieved."})
        
    })
})

//create COMMENT for post w/id(api/posts/:id/comments. req.body)
router.post("/:id/comments", (req,res)=>{
    const newComment = req.body
    const {id} = req.params
    Posts.findById(id)
    .then(commentID=>{
        if(!commentID){
            res.status(404).json({ error: "The post with specified ID does not exist" })
            res.status(200).json(commentID)
        }else if (!newComment.text){
            res.status(400).json({errorMessage: "Please provide text for comment." })
        } else{//find id of post first, if there & w/ text then add comment
    Posts.insertComment(newComment) 
    .then(comment =>{
            res.status(201).json(newComment);
        
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage: "The comments information could not be retrieved."})
    })
}
}) 
.catch(error => {
    console.log(err)
    res.status(500).json({ error: "The post information could not be retrieved." });
})
})

//DELETE POST by id(should RETURN DELETED OBJECT)(api/posts/:id)
router.delete("/:id", (req,res)=>{
    const deletedPost =req.body
    const {id}=req.params;
    Posts.findById(id)
    .then(deleteID=>{
        if(!deleteID){
            res.status(404).json({ error: "The post with specified ID does not exist" })
            res.status(200).json(deleteID)
        }else{
            Posts.remove(id)
            .then(deleted=>{
                res.status(200).json(deletedPost)
            })
            .catch(error => {
                res.status(500).json({ error: "The post could not be removed." })
            })
        }
    })

})


//UPDATES POST by id. returns NEW post(api/posts/:id) req.body
router.put("/:id", (req, res)=>{
const update = req.body
const {id} = req.params
Posts.findById(id)
.then(edit=>{
    if (edit.length===0){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }else if(!update.title || !update.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for post."})
    }else {

            Posts.update(id, update)
            .then(editedPost=>{
                res.status(200).json(update)
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({ message: "The user information could not be modified."})

            })
        } 
})

})

module.exports=router;