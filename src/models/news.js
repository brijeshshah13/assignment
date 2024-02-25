const mysql = require('../lib/mysql');

const getTourFromMatchId = async (params) => {
    const statement = 'select tours.id, tours.sportId from matches left join tours on matches.tourId = tours.id WHERE matches.id = ?';
    const parameters = [params.matchId];
    return await mysql.query(statement, parameters);
}

const getTourFromTourId = async (params) => {
    const statement = 'select * from tours where id = ?';
    const parameters = [params.tourId];
    return await mysql.query(statement, parameters);
}

const createNews = async (params) => {
    const statement = 'insert into news (title, description, matchId, tourId, sportId) values (?,?,?,?,?)';
    const parameters = [params.title, params.description, params.matchId, params.tourId, params.sportId];
    return await mysql.query(statement, parameters);
}

const getNewsByMatchId = async (params) => {
    const statement = 'select * from news where matchId = ?';
    const parameters = [params.matchId];
    return await mysql.query(statement, parameters);
}

const getNewsByTourId = async (params) => {
    const statement = 'select * from news where tourId = ?';
    const parameters = [params.tourId];
    return await mysql.query(statement, parameters);
}

const getNewsBySportId = async (params) => {
    const statement = 'select * from news where sportId = ?';
    const parameters = [params.sportId];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getTourFromMatchId,
    getTourFromTourId,
    createNews,
    getNewsByMatchId,
    getNewsByTourId,
    getNewsBySportId
}
