import db from '../models/index.js';

// Service to update company profile
const updateCompanyProfile = async (recruiterId, profileData) => {
    try {
        const recruiter = await db.Recruiter.findByPk(recruiterId);
        if (recruiter) {
            const updatedProfile = await recruiter.update(profileData);
            return { status: 'success', profile: updatedProfile };
        }
        return { status: 'error', message: 'Recruiter not found' };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};

// Service to post a new job
const postJob = async (jobData) => {
    try {
        const job = await db.Job.create(jobData);
        return { status: 'success', job };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};

// Service to update a job
const updateJob = async (jobId, updateData) => {
    try {
        const job = await db.Job.findByPk(jobId);
        if (job) {
            const updatedJob = await job.update(updateData);
            return { status: 'success', job: updatedJob };
        }
        return { status: 'error', message: 'Job not found' };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};

// Service to delete a job
const deleteJob = async (jobId) => {
    try {
        const job = await db.Job.findByPk(jobId);
        if (job) {
            await job.destroy();
            return { status: 'success', message: 'Job deleted successfully' };
        }
        return { status: 'error', message: 'Job not found' };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};

// Service to get a list of candidates who have applied for a specific job
const getAppliedCandidates = async (jobId) => {
    try {
        const candidates = await db.Application.findAll({
            where: { job_id: jobId },
            include: [{ model: db.Candidate }]
        });
        return { status: 'success', candidates };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};

// Service to get a specific candidate's profile
const getCandidateProfile = async (candidateId) => {
    try {
        const profile = await db.Candidate.findByPk(candidateId);
        if (profile) {
            return { status: 'success', profile };
        }
        return { status: 'error', message: 'Candidate not found' };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};

// Service to get a list of all candidates
const getAllCandidates = async () => {
    try {
        const candidates = await db.Candidate.findAll();
        return { status: 'success', candidates };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};

export default {
    updateCompanyProfile,
    postJob,
    updateJob,
    deleteJob,
    getAppliedCandidates,
    getCandidateProfile,
    getAllCandidates
};
