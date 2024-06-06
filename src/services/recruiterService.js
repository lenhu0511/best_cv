import db from '../models/index.js';
import accountService from './accountService.js';

// Service to create a new recruiter profile
// Refactored function to create a new recruiter profile using direct data fields
let createRecruiterProfile = (email, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const accountInfo = await accountService.getAccountInfo(email);
            if (accountInfo.status !== 'success') {
                throw new Error(accountInfo.message); // Handle the case where the account is not found
            }
            data.account_id = accountInfo.account.id; // Set the account_id from the fetched account

            let newRecruiter = await db.Recruiter.create({
                company_name: data.companyName,
                company_description: data.companyDescription,
                contact_person: data.contactPerson,
                email: data.email,
                phone_number: data.phonenumber,
                address: data.address,
                account_id: data.account_id // Include the account ID
            });
            resolve(newRecruiter);
        } catch (e) {
            reject(e);
        }
    });
}

const getAccountInfo = async (email) => {
  try {
    const account = await db.Account.findOne({
      where: { email: email },
      include: [ ]
    });

    if (!account) {
      return { status: 'error', message: 'Account not found' };
    }

    const profileData = account.role_id === 'candidate' ? account.Candidate : account.Recruiter;

    const response = {
      status: 'success',
      account: {
        id: account.id,
        username: account.username,
        email: account.email,
        fullName: account.full_name,
        phoneNumber: account.phone_number,
        role_id: account.role_id
      },
      profile: profileData
    };

    return response;
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

// Service to update company (recruiter) profile
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
const postJob = async (email, jobData) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Job Data:", jobData);
            console.log("Email:", email);
            const accountInfo = await accountService.getAccountInfo(email);
            if (accountInfo.status !== 'success') {
                throw new Error(accountInfo.message); // Handle the case where the account is not found
            }
            jobData.account_id = accountInfo.account.id; // Set the account_id from the fetched account
            let newJob = await db.Job.create({
            job_title: jobData.jobTitle,
            job_type: jobData.jobType,
            job_description: jobData.jobDescription,
            job_requirements: jobData.jobRequirements,
            location: jobData.location,
            salary: jobData.salary,
            post_date: new Date(),
            account_id: jobData.account_id,  // Assuming this is passed in jobData
            status: 'open'  // Default status
        });
            resolve(newJob);
        } catch (e) {
            reject(e);
        }
    });
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
    createRecruiterProfile,
    updateCompanyProfile,
    postJob,
    updateJob,
    deleteJob,
    getAppliedCandidates,
    getCandidateProfile,
    getAllCandidates
    // getRecruiterByUserEmail
};
