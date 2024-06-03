import db from '../models/index.js';

// Get the current candidate profile
const getCandidateProfile = async (userId) => {
  try {
    const candidate = await db.Candidate.findOne({ where: { account_id: userId } });
    if (!candidate) {
      throw new Error('Candidate profile not found');
    }
    return candidate;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update the current candidate profile
const updateCandidateProfile = async (userId, candidateData) => {
  try {
    const candidate = await db.Candidate.findOne({ where: { account_id: userId } });
    if (!candidate) {
      throw new Error('Candidate profile not found');
    }
    await candidate.update(candidateData);
    return candidate;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Apply for a job
const applyJob = async (userId, jobId, applicationData) => {
  try {
    const newApplication = await db.Application.create({
      ...applicationData,
      account_id: userId,
      job_id: jobId,
      application_date: new Date()
    });
    return newApplication;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create and manage candidate CV
const createCandidateCV = async (userId, cvData) => {
  try {
    const newCV = await db.CandidateCV.create({
      ...cvData,
      candidate_id: userId,
      create_date: new Date(),
      last_edit_date: new Date()
    });
    return newCV;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCandidateCV = async (userId, cvId, cvData) => {
  try {
    const cv = await db.CandidateCV.findOne({ where: { id: cvId, candidate_id: userId } });
    if (!cv) {
      throw new Error('CV not found');
    }
    await cv.update({
      ...cvData,
      last_edit_date: new Date()
    });
    return cv;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCandidateCV = async (userId, cvId) => {
  try {
    const cv = await db.CandidateCV.findOne({ where: { id: cvId, candidate_id: userId } });
    if (!cv) {
      throw new Error('CV not found');
    }
    await cv.destroy();
    return { message: 'CV deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Manage candidate education
const createEducation = async (userId, educationData) => {
  try {
    const newEducation = await db.Education.create({
      ...educationData,
      candidate_id: userId
    });
    return newEducation;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateEducation = async (userId, educationId, educationData) => {
  try {
    const education = await db.Education.findOne({ where: { id: educationId, candidate_id: userId } });
    if (!education) {
      throw new Error('Education not found');
    }
    await education.update(educationData);
    return education;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteEducation = async (userId, educationId) => {
  try {
    const education = await db.Education.findOne({ where: { id: educationId, candidate_id: userId } });
    if (!education) {
      throw new Error('Education not found');
    }
    await education.destroy();
    return { message: 'Education deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Manage candidate work experience
const createWorkExperience = async (userId, workExperienceData) => {
  try {
    const newWorkExperience = await db.WorkExperience.create({
      ...workExperienceData,
      candidate_id: userId
    });
    return newWorkExperience;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateWorkExperience = async (userId, workExperienceId, workExperienceData) => {
  try {
    const workExperience = await db.WorkExperience.findOne({ where: { id: workExperienceId, candidate_id: userId } });
    if (!workExperience) {
      throw new Error('Work Experience not found');
    }
    await workExperience.update(workExperienceData);
    return workExperience;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteWorkExperience = async (userId, workExperienceId) => {
  try {
    const workExperience = await db.WorkExperience.findOne({ where: { id: workExperienceId, candidate_id: userId } });
    if (!workExperience) {
      throw new Error('Work Experience not found');
    }
    await workExperience.destroy();
    return { message: 'Work Experience deleted successfully' };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getCandidateProfile,
  updateCandidateProfile,
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
