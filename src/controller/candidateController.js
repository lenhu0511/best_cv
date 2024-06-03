import candidateService from '../services/candidateService.js';

// Handle getting the current candidate profile
const getCurrentCandidateProfile = async (req, res) => {
  try {
    const candidate = await candidateService.getCandidateProfile(req.user.id);
    res.status(200).json(candidate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Handle updating the current candidate profile
const updateCurrentCandidateProfile = async (req, res) => {
  try {
    const candidate = await candidateService.updateCandidateProfile(req.user.id, req.body);
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle applying for a job
const applyJob = async (req, res) => {
  try {
    const application = await candidateService.applyJob(req.user.id, req.body.jobId, req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle creating a new candidate CV
const createCandidateCV = async (req, res) => {
  try {
    const cv = await candidateService.createCandidateCV(req.user.id, req.body);
    res.status(201).json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle updating a candidate CV
const updateCandidateCV = async (req, res) => {
  try {
    const cv = await candidateService.updateCandidateCV(req.user.id, req.params.id, req.body);
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle deleting a candidate CV
const deleteCandidateCV = async (req, res) => {
  try {
    const message = await candidateService.deleteCandidateCV(req.user.id, req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle creating a new education entry
const createEducation = async (req, res) => {
  try {
    const education = await candidateService.createEducation(req.user.id, req.body);
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle updating an education entry
const updateEducation = async (req, res) => {
  try {
    const education = await candidateService.updateEducation(req.user.id, req.params.id, req.body);
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle deleting an education entry
const deleteEducation = async (req, res) => {
  try {
    const message = await candidateService.deleteEducation(req.user.id, req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle creating a new work experience entry
const createWorkExperience = async (req, res) => {
  try {
    const workExperience = await candidateService.createWorkExperience(req.user.id, req.body);
    res.status(201).json(workExperience);
  } catch (error) {
    res.status 500).json({ message: error.message });
  }
};

// Handle updating a work experience entry
const updateWorkExperience = async (req, res) => {
  try {
    const workExperience = await candidateService.updateWorkExperience(req.user.id, req.params.id, req.body);
    res.status(200).json(workExperience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle deleting a work experience entry
const deleteWorkExperience = async (req, res) => {
  try {
    const message = await candidateService.deleteWorkExperience(req.user.id, req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getCurrentCandidateProfile,
  updateCurrentCandidateProfile,
  applyJob,
  createCandidateCV,
  updateCandidateCV,
  deleteCandidateCV,
  createEducation,
  updateEducation,
  deleteEducation,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience
};
