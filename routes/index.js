const { v4: uuidv4 } = require('uuid');
const { User, Domain } = require('../models');

const IndexRouteHandler = {
    signUpAccount: async function (req, res, next) {
        try {
            const user = await User.findOne({
                where: { id: req.user && req.user.id || null},
                include: { model: Domain },
            });
            res.render('login', {
                user,
                domains: user && user.Domains,
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    createDomainRecord: async function (req, res, next) {
        try {
            await Domain.create({
                UserId: req.user.id,
                host: req.body.host,
                type: req.body.type,
                clientSecret: uuidv4(),
            });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = IndexRouteHandler;