//base serrver file
const express = require("express");
const server = express();
const postsRouter = require("./data/seeds/postsRouter");


server.use(express.json()); //to read req body as json

server.get("/", (req,res)=>{
res.json({start:"initial server test"})

})

server.use("/api/posts", postsRouter);






const port = 5000;
server.listen(port, ()=>{
    console.log(`\n***Server running on port ${port}***\n`);
})