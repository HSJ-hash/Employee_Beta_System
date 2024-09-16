const Vacancy = require("../models/Vacancy.model");

// CREATE VACANCY
const createVacancy = async (req, res) => {
  try {
    const { vacancy, project, country, description, skills } = req.body;

    // Check if the same vacancy exists
    const vacancyExists = await Vacancy.findOne({ vacancy });
    if (vacancyExists) {
      res.status(401).json({
        errorMessage: "Vacancy already exists! Please choose another name.",
        status: false,
      });
    } else {
      const newVacancy = await Vacancy.create({
        vacancy,
        project,
        country,
        description,
        skills,
      });

      if (newVacancy) {
        res.status(200).json({
          data: "Vacancy created successfully",
          status: true,
        });
      } else {
        res.status(401).json({
          errorMessage: "Failed to create the vacancy!",
          status: false,
        });
      }
    }
  } catch (error) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + error,
      status: false,
    });
  }
};

// GET ALL VACANCIES
const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find().populate({
      path: "project",
      select: "projectName company",
    });

    res.status(200).json(vacancies);
  } catch (error) {
    res.status(500).json({
      errorMessage: "Something went wrong!\n" + error,
      status: false,
    });
  }
};

// GET VACANCY BY ID
const getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id).populate({
      path: "project",
      select: "projectName company",
    });

    if (vacancy) {
      res.status(200).json(vacancy);
    } else {
      res.status(404).json({
        errorMessage: "Vacancy not found!",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Something went wrong!\n" + error,
      status: false,
    });
  }
};

// GET VACANCY BY PROJECT ID
const getProjVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.find({ project: req.params.id }).populate({
      path: "project",
      select: "projectName company",
    });

    if (vacancy) {
      res.status(200).json(vacancy);
    } else {
      res.status(404).json({
        errorMessage: "Vacancy not found!",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Something went wrong!\n" + error,
      status: false,
    });
  }
};

// UPDATE VACANCY
const updateVacancy = async (req, res) => {
  try {
    const { currentVacancy, vacancy, project, country, description, skills } =
      req.body;

    const update = await Vacancy.findByIdAndUpdate(req.params.id, {
      vacancy,
      project,
      country,
      description,
      skills,
    });

    if (update) {
      res.status(200).json({
        data: "Vacancy updated successfully",
        status: true,
      });
    } else {
      res.status(401).json({
        errorMessage: "Failed to update the vacancy!",
        status: false,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + error,
      status: false,
    });
  }
};

// DELETE VACANCY
const deleteVacancy = async (req, res) => {
  try {
    const deleted = await Vacancy.findByIdAndDelete(req.params.id);

    if (deleted) {
      res.status(200).json({
        data: "Vacancy deleted successfully",
        status: true,
      });
    } else {
      res.status(401).json({
        errorMessage: "Failed to delete the vacancy!",
        status: false,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + error,
      status: false,
    });
  }
};

module.exports = {
  createVacancy,
  getVacancies,
  getVacancyById,
  getProjVacancy,
  updateVacancy,
  deleteVacancy,
};
