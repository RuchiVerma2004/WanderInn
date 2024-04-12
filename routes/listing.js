const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
    console.log("validate");
    let { error } = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
        console.log("error in validate");
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Index Route
router.get(
    "/",
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
    })
);

// New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
router.get(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate("reviews");
        if(!listing){
            req.flash("error", "Listing you requested for does not exist!");
            req.redirect("/listings");
        }
        res.render("listings/show.ejs", { listing });
    })
);

// Create Route
router.post(
    "/",
    validateListing,
    wrapAsync(async (req, res, next) => {
        console.log("new listing is been created");
        const newListing = new Listing(req.body.listing);
        console.log(newListing);
        await newListing.save();
        req.flash("success", "New Listing Created!");
        console.log("new listing created");
        res.redirect("/listings");
    })
);

// Edit Route
router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            req.flash("error", "Listing you requested for does not exist!");
            req.redirect("/listings");
        }
        res.render("listings/edit.ejs", { listing });
    })
);

// Update Route
router.put(
    "/:id",
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing});
        req.flash("Success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    })
);

// Delete Route
router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
    })
);

module.exports = router;
