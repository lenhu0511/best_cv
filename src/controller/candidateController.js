import candidateService from '../services/candidateService.js';

const manageCandidateProfile = async (req, res) => {
    const { candidateId } = req.params;  // Ensure candidateId is passed correctly
    const data = req.body;
    const action = req.method === 'GET' ? 'get' : 'update';

    const result = await candidateService.manageProfile(candidateId, data, action);
    res.status(result.status === 'success' ? 200 : 500).json(result);
};

const handleWorkExperience = async (req, res) => {
    const { candidateId } = req.params;
    const experience = req.body;
    let result;

    switch (req.method) {
        case 'POST':
            result = await candidateService.addWorkExperience(candidateId, experience);
            break;
        case 'GET':
            result = await candidateService.getWorkExperiences(candidateId);
            break;
        case 'PUT':
            result = await candidateService.updateWorkExperience(experience.id, experience);
            break;
        case 'DELETE':
            result = await candidateService.deleteWorkExperience(experience.id);
            break;
        default:
            result = { status: 'error', message: 'Invalid method' };
    }

    res.status(result.status === 'success' ? 200 : 500).json(result);
};

const manageEducation = async (req, res) => {
    const { candidateId } = req.params;
    const educationData = req.body;
    const action = req.query.action || 'get';  // Action could be 'add', 'update', 'delete'

    const result = await candidateService.manageEducation(candidateId, educationData, action);
    res.status(result.status === 'success' ? 200 : 500).json(result);
};

const applyJob = async (req, res) => {
    const { jobId, candidateId } = req.params;

    const result = await candidateService.applyForJob(jobId, candidateId);
    res.status(result.status === 'success' ? 200 : 500).json(result);
};

export default {
    manageCandidateProfile,
    handleWorkExperience,
    manageEducation,
    applyJob
};
