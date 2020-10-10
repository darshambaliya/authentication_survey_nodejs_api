const express = require('express');
const router = express.Router();
const userService = require('./user.service');


// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);
router.post('/surveys', createSurvey);
router.get('/surveys/:title', takeSurvey);
router.get('/surveys', getResults);
module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function createSurvey(req, res, next){
    userService.createSurvey(req.body)
        .then(response => res.json(response))
        .catch(next);
}

function takeSurvey(req, res, next){
    userService.takeSurvey(req.params, req.body)
        .then(response => res.json(response))
        .catch(next);
}

function getResults(req, res, next) {
    userService.getResults()
        .then(response => res.json(response))
        .catch(next);
}
