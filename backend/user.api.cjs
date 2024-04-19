const express = require('express');
const router = express.Router();
const UserModel = require('./db/user.model.cjs')

//http://localhost:8000/api/user
router.post('/register', async function(req, res) {
    const requestBody = req.body;

    if(!requestBody.username || !requestBody.password || !requestBody.firstName || !requestBody.lastName || !requestBody.email) {
        res.status(400);
        return res.send("Information is missing")
    }

    const newUser = {
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
        email: requestBody.email,
        username: requestBody.username,
        password: requestBody.password,
    }

    try {
        const response = await UserModel.insertUser(newUser);
        res.cookie('username', requestBody.username)
        return res.send(response);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }

})

//http://localhost:8000/api/user/temp
router.get('/:username', async function(req, res) {
    const username = req.params.username;
    try {
        const getUserResponse = await UserModel.getUserByUsername(username);
        return res.send(getUserResponse);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }
})

router.post('/login', async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    try{
        const response = await UserModel.getUserByUsername(username);
        if(!response[0]){
            res.status(400);
            return res.send('No user found');
        }
        if(password !== response[0].password){
            res.status(400);
            return res.send('Wrong password');
        }
        res.cookie('username', username);
        return res.send('Logged in');
    }catch(error){
        res.status(400);
        return res.send('Failed to login: ' + error);
    }
})

router.post('/logout', function(request, response){
    response.clearCookie('username');
    return response.send('Logged Out')
});

router.get('/', async function(req, res){
    const username = req.cookies.username;
    if(username){
        return res.send({username: username})
    }else{
        res.status(400);
        return res.send('Not logged in');
    }
})

//http://localhost:8000/api/user/661dff7a0b956cf1bed86100
router.delete('/:userId', async function(req, res) {
    const userId = req.params.userId;

    try {
        const deleteUserResponse = await UserModel.deleteUser(userId);
        return res.send(deleteUserResponse);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }
})


module.exports = router;