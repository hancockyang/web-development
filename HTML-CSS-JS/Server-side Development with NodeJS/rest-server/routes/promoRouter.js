var express = require('express');
var promoRouter  = express.Router();

promoRouter.route('/')
.get(function (req, res, next) {
    Promotions.find({}, function (err, promotions) {
        if (err) throw err;
        res.json(promotions);
    });
})

.post(function (req, res, next) {
    Promotions.create(req.body, function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the promotion');
    });
})
.delete(function (req, res, next) {
    Promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});



promoRouter.route('/:promoId')
.get(function (req, res, next) {
    Dishes.findById(req.params.promoId, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.put(function (req, res, next) {
    Dishes.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})

.delete(function (req, res, next) {
    Dishes.findByIdAndRemove(req.params.promoId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = promoRouter;