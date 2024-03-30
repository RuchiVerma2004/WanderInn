const express = require("express");
const router = express.Router();

// Index route for posts
router.get("/", (req, res)=>{
    res.send("GET for posts");
});

// Show route for a specific post
router.get("/:id", (req, res)=>{
    res.send("GET for show post");
});

// Create route for posts
router.post("/", (req, res)=>{
    res.send("POST for creating a post");
});

// Delete route for a specific post
router.delete("/:id", (req, res)=>{
    res.send("DELETE for deleting a post");
});

module.exports = router;
