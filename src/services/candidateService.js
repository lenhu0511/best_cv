import db from '../models/index.js';
import accountService from './accountService.js';

// Manage Candidate Profile
let createCandidateProfile = (email, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const accountInfo = await accountService.getAccountInfo(email);
            if (accountInfo.status !== 'success') {
                throw new Error(accountInfo.message); // Handle the case where the account is not found
            }
            data.account_id = accountInfo.account.id;

        let newCandidate = await db.Candidate.create({
            full_name: data.full_name,
            dob: data.dob,
            gender: data.gender,
            job_position: data.job_position,
            phone_number: data.phone_number,
            address: data.address,
            work_status: 'Available',
            description: data.description,
            interests: data.interests,
            avatar_img_url: data.avatarImgUrl,
            account_id: data.account_id
        });
        resolve(newCandidate);
    } catch (e) {
        reject(e);
    }
    });
}

const manageCandidateProfile = async (candidateId, data, action) => {
    const candidate = await db.Candidate.findByPk(candidateId);
    if (!candidate) return { status: 'error', message: 'Candidate not found' };

    switch (action) {
        case 'update':
            await candidate.update(data);
            return { status: 'success', data: candidate };
        case 'get':  
            return { status: 'success', data: candidate };
        default:
            return { status: 'error', message: 'Invalid action' };
    }
};

// Work Experience
const addWorkExperience = async (candidateId, experience) => {
    experience.candidate_id = candidateId;
    const newExperience = await db.WorkExperience.create(experience);
    return { status: 'success', data: newExperience };
};

const getWorkExperiences = async (candidateId) => {
    const experiences = await db.WorkExperience.findAll({
        where: { candidate_id: candidateId }
    });
    return { status: 'success', data: experiences };
};

const updateWorkExperience = async (id, data) => {
    const experience = await db.WorkExperience.findByPk(id);
    if (!experience) return { status: 'error', message: 'Work experience not found' };
    await experience.update(data);
    return { status: 'success', data: experience };
};

const deleteWorkExperience = async (id) => {
    const experience = await db.WorkExperience.findByPk(id);
    if (!experience) return { status: 'error', message: 'Work experience not found' };
    await experience.destroy();
    return { status: 'success', message: 'Deleted successfully' };
};

// Education
const manageEducation = async (candidateId, educationData, action) => {
    switch (action) {
        case 'add':
            educationData.candidate_id = candidateId;
            const newEducation = await db.Education.create(educationData);
            return { status: 'success', data: newEducation };
        case 'get':
            const educations = await db.Education.findAll({
                where: { candidate_id: candidateId }
            });
            return { status: 'success', data: educations };
        case 'update':
            const education = await db.Education.findByPk(educationData.id);
            if (!education) return { status: 'error', message: 'Education not found' };
            await education.update(educationData);
            return { status: 'success', data: education };
        case 'delete':
            const educationToDelete = await db.Education.findByPk(educationData.id);
            if (!educationToDelete) return { status: 'error', message: 'Education not found' };
            await educationToDelete.destroy();
            return { status: 'success', message: 'Deleted successfully' };
    }
};

// Apply for a Job
const applyForJob = async (jobId, candidateId) => {
    const application = await db.Application.create({
        job_id: jobId,
        account_id: candidateId,  // Assuming the account_id here refers to the candidate_id
        status: 'Applied'
    });
    return { status: 'success', data: application };
};

export default {
    createCandidateProfile,
    manageCandidateProfile,
    addWorkExperience,
    getWorkExperiences,
    updateWorkExperience,
    deleteWorkExperience,
    manageEducation,
    applyForJob
};
