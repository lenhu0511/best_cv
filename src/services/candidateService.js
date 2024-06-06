import db from '../models/index.js';

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
            full_name: fullName,
            dob: dob,
            gender: gender,
            job_position: jobPosition,
            phone_number: phoneNumber,
            address: address,
            work_status: workStatus,
            description: description,
            interests: interests,
            avatar_img_url: avatarImgUrl,
            account_id: data.account_id
        });
        resolveInclude(newCandidate);
    } catch (e) {
        reject(e);
    }
    });
}

const manageProfile = async (candidateId, data, action) => {
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
    manageProfile,
    addWorkExperience,
    getWorkExperiences,
    updateWorkExperience,
    deleteWorkExperience,
    manageEducation,
    applyForJob
};
