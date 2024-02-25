const News = require('../controllers/news');

module.exports = function (app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            return res.status(201).json(await News.createNews(req.body));
        } catch (err) {
            return next(err);
        }
    });
    app.get('/news/matches/:matchId', async (req, res) => {
        const {matchId} = req.params;
        return res.json(await News.getNewsByMatchId(matchId));
    });
    app.get('/news/tours/:tourId', async (req, res) => {
        const {tourId} = req.params;
        return res.json(await News.getNewsByTourId(tourId));
    });
    app.get('/news/sports/:sportId', async (req, res) => {
        const {sportId} = req.params;
        return res.json(await News.getNewsBySportId(sportId));
    });
}
