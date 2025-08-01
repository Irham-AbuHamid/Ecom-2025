const express = require("express")
const router = express.Router()
// import controller
const { create, list, remove } = require("../controllers/category")
const { authCheck, adminCheck } = require("../middlewares/authCheck")

// @ENDPOINT http://localhost:3000/api/category
router.post("/category", authCheck, adminCheck, create)
router.get("/category", list)
router.delete("/category/:id", authCheck, adminCheck, remove)

module.exports = router
