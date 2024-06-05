import express from "express";
import accountController from "../controller/accountController.js";
import candidateController from "../controller/candidateController.js"; 
import recruiterController from "../controller/recruiterController.js";
import authenticateToken from '../middleware/authenticateToken.js'; 

let router = express.Router();

const initWebRoutes = (app) => {
    // Account Functions
    router.post('/api/signup', accountController.handleSignup);
    router.post('/api/login', accountController.handleLogin);
    router.post('/api/logout', accountController.handleLogout);
    // Apply middleware to profile routes
    router.get('/api/account/profile', authenticateToken, accountController.getAccountProfile); // To get the profile
    router.put('/api/account/profile', authenticateToken, accountController.updateAccountProfile); // To update the profile

    // Recruiter Functions
    router.post('/api/recruiters/jobs', recruiterController.postJob);
    router.put('/api/recruiters/jobs/:jobId', recruiterController.updateJob);
    router.delete('/api/recruiters/jobs/:jobId', recruiterController.deleteJob);
    router.put('/api/recruiters/profile/:recruiterId', recruiterController.updateCompanyProfile);
    router.get('/api/recruiters/jobs/:jobId/candidates', recruiterController.getAppliedCandidates);
    router.get('/api/recruiters/candidates', recruiterController.getAllCandidates);
    router.get('/api/recruiters/candidates/:candidateId', recruiterController.getCandidateProfile);

    // Candidate Functions
    router.get('/api/candidates/profile/:candidateId', candidateController.manageCandidateProfile);
    router.put('/api/candidates/profile/:candidateId', candidateController.manageCandidateProfile);
    router.post('/api/candidates/work-experience/:candidateId', candidateController.handleWorkExperience);
    router.get('/api/candidates/work-experience/:candidateId', candidateController.handleWorkExperience);
    router.put('/api/candidates/work-experience/:experienceId', candidateController.handleWorkExperience);
    router.delete('/api/candidates/work-experience/:experienceId', candidateController.handleWorkExperience);
    router.post('/api/candidates/education/:candidateId', candidateController.manageEducation);
    router.get('/api/candidates/education/:candidateId', candidateController.manageEducation);
    router.put('/api/candidates/education/:educationId', candidateController.manageEducation);
    router.delete('/api/candidates/education/:educationId', candidateController.manageEducation);
    router.post('/api/candidates/jobs/apply/:jobId/:candidateId', candidateController.applyJob);

    return app.use("/", router);
}

export default initWebRoutes;
