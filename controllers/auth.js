const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

router.post('/sign-in', async (req, res) => {
    const userExists = await User.findOne({username: req.body.username});
    if(!userExists){
        return res.redirect('/auth/sign-in');
    }

    const validPassword = bcrypt.compareSync(
        req.body.password,
        userExists.password
    );

    if(!validPassword){
        return res.redirect('/auth/sign-in');
    }

    req.session.user = {
        username: userExists.username,
        _id: userExists._id,
    }

    req.session.save(() => {
        return res.redirect('/');
    });
});

router.post('/sign-up', async (req, res) => {
    console.log(req.body)
    const userExists = await User.findOne({username: req.body.username});
    if(userExists){
        return res.redirect('/auth/sign-in');
    }

    if(req.body.password !== req.body.confirmPassword){
        return res.redirect('/auth/sign-in');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    
    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
    })

    req.session.user = {
        username: user.username,
        _id: user._id
    }

    req.session.save(() => {
        res.redirect('/');
    })
});

router.get('/sign-in', (req, res) => {
    res.render('sign-in.ejs');
});

router.get('/sign-up', (req, res) => {
    res.render('new-acc.ejs');
});

router.get('/sign-out', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
});

module.exports = router;