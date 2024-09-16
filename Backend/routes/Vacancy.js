const router = require("express").Router();
const { protect } = require("../middleware/authorization");

const {
  createVacancy,
  getVacancies,
  getVacancyById,
  updateVacancy,
  deleteVacancy,
  getProjVacancy,
} = require("../controllers/vacancyController");

// ADD VACANCY
router.post("/create", protect, createVacancy);

// GET VACANCY
router.get("/getVacancy", protect, getVacancies);

// GET VACANCY BY ID

router.get("/getVacancy/:id", protect, getVacancyById);

// GET VACANCY BY proj id

router.get("/getProjVacancy/:id", protect, getProjVacancy);

// UPDATE VACANCY DETAILS
router.put("/updateVacancy/:id", updateVacancy);

// DELETE VACANCY
router.delete("/deleteVacancy/:id", protect, deleteVacancy);

module.exports = router;
