var express = require('express');
var leaderRouter  = express.Router();

leaderRouter.route('/')
.get(function (req, res, next) {
    Dishes.find({}, function (err, leaders) {
        if (err) throw err;
        res.json(leaders);
    });
})

.post(function (req, res, next) {
    Dishes.create(req.body, function (err, leader) {
        if (err) throw err;
        console.log('leader created!');
        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leader with id: ' + id);
    });
})
.delete(function (req, res, next) {
    Dishes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')
.get(function (req, res, next) {
    Dishes.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.put(function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete(function (req, res, next) {
    Dishes.findByIdAndRemove(req.params.leaderId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});
module.exports = leaderRouter;