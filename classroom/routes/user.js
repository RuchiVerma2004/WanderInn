const express = require("express");
const router = express.Router();

//Index 
router.get("/", (req, res)=>{
    res.send("GET for users");
});

//Show - users
router.get("/:id", (req, res)=>{
    res.send("GET for show users");
});

//post - users
router.post("/", (req, res)=>{
    res.send("POST for users");
});

//Delete
router.delete("/:id", (req, res)=>{
    res.send("delete for users");
});

module.exports = router;