import recruiterService from '../services/recruiterService.js';

const createRecruiterProfile = async (req, res) => {
    try {
        const email = req.user.email; // Get email from the request body or from session/authentication
        // console.log(res)
        let newRecruiter = await recruiterService.createRecruiterProfile(email, req.body);
        return res.status(201).json(newRecruiter);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const postJob = async (req, res) => {
   try {
        const email = req.user.email; // Get email from the request body or from session/authentication
        // console.log(res)
        console.log("Email:", email);
        let newJob = await recruiterService.postJob(email, req.body);
        return res.status(201).json(newJob);
    } catch (e) {
        return res.status(500).json({message: e.message });
    }
};


const updateCompanyProfile = async (req, res) => {
    const result = await recruiterService.updateCompanyProfile(req.params.recruiterId, req.body);
    if (result.status === 'success') {
        res.status(200).json(result.profile);
    } else {
        res.status(500).json({ message: result.message });
    }
};

const getCandidateProfile = async (req, res) => {
    const result = await recruiterService.getCandidateProfile(req.params.candidateId);
    if (result.status === 'success') {
        res.status(200).json(result.profile);
    } else {
        res.status(404).json({ message: result.message });
    }
};



const updateJob = async (req, res) => {
    const result = await recruiterService.updateJob(req.params.jobId, req.body);
    if (result.status === 'success') {
        res.status(200).json(result.job);
    } else {
        res.status(500).json({ message: result.message });
    }
};

const deleteJob = async (req, res) => {
    const result = await recruiterService.deleteJob(req.params.jobId);
    if (result.status === 'success') {
        res.status(200).json({ message: result.message });
    } else {
        res.status(404).json({ message: result.message });
    }
};

const getAppliedCandidates = async (req, res) => {
    const result = await recruiterService.getAppliedCandidates(req.params.jobId);
    if (result.status === 'success') {
        res.status(200).json(result.candidates);
    } else {
        res.status(500).json({ message: result.message });
    }
};

const getAllCandidates = async (req, res) => {
    const result = await recruiterService.getAllCandidates();
    if (result.status === 'success') {
        res.status(200).json(result.candidates);
    } else {
        res.status(500).json({ message: result.message });
    }
};



export default {
    createRecruiterProfile,
    updateCompanyProfile,
    postJob,
    updateJob,
    deleteJob,
    getAppliedCandidates,
    getAllCandidates,
    getCandidateProfile
};
