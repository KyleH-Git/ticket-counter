const express = require('express');
const router = express.Router();
const Character = require('../models/Character.js');
const User = require('../models/User.js');

router.post('/newchar', async (req, res) => {
    const newChar = await Character.create({charname: req.body.charname, owner: req.session.user._id});
    const user = await User.findById(req.session.user._id);
    user.characters.push(newChar._id.toString());
    user.save();
    res.redirect('/');
});

router.put('/addTickets', async (req, res) => {
    console.log(parseInt(req.body.addTickets))
    if(req.body.selectedPlayer === ''){
        return res.redirect('/');
    }
    const currentPlayer = await Character.findOne({charname: req.body.selectedPlayer});
    currentPlayer.tickets = parseInt(currentPlayer.tickets) + parseInt(req.body.addTickets);
    await currentPlayer.save();
    res.redirect('/');
});

router.put('/removeTicketsDmg', async (req, res) => {
    if(req.body.selectedPlayer === ''){
        return res.redirect('/');
    }
    console.log(req.body)
    const currentPlayer = await Character.findOne({charname: req.body.selectedPlayer});
    if(parseInt(currentPlayer.tickets) - parseInt(req.body.doDamage) >= 0){
        currentPlayer.tickets = parseInt(currentPlayer.tickets) - parseInt(req.body.doDamage);
        await currentPlayer.save();
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

router.put('/moveBackToken', async (req, res) => {
    if(req.body.selectedPlayer === ''){
        return res.redirect('/');
    }
    const currentPlayer = await Character.findOne({charname: req.body.selectedPlayer});
    const currentUser = await User.findOne({_id: req.session.user._id})
    if(parseInt(currentPlayer.tickets) - parseInt(currentUser.turnCost) >= 0){
        currentPlayer.tickets = parseInt(currentPlayer.tickets) - parseInt(currentUser.turnCost);
        currentPlayer.save()
        currentUser.turnCost += 20;
        currentUser.save();
        return res.redirect('/');
    } else {
        return res.redirect('/');
    }
});

router.put('/removeTickets/:ticketCost', async (req, res) => {
    if(req.body.selectedPlayer === ''){
        return res.redirect('/');
    }
    const currentPlayer = await Character.findOne({charname: req.body.selectedPlayer});
    if(parseInt(currentPlayer.tickets) - parseInt(req.params.ticketCost) >= 0){
        currentPlayer.tickets = parseInt(currentPlayer.tickets) - parseInt(req.params.ticketCost);
        await currentPlayer.save();
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});


module.exports = router;