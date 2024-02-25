const News = require('../models/news');

const createNews = async (body) => {
    let {title, description, matchId, tourId} = body;

    // Validate provided data
    if (!title || !description) {
        throw new Error('Missing required fields: title, description');
    }

    if (matchId && tourId) {
        throw new Error('Cannot specify both matchId and tourId');
    }

    // Handle data retrieval and population based on provided fields
    let sportId;
    if (matchId) {
        // Retrieve associated tour and sport IDs
        const [tour] = await News.getTourFromMatchId({matchId});
        if (!tour) {
            throw new Error('Invalid match ID');
        }
        tourId = tour.id;
        sportId = tour.sportId;
    } else if (tourId) {
        // Find tour and retrieve associated sport ID
        const [tour] = await News.getTourFromTourId({tourId});
        if (!tour) {
            throw new Error('Invalid tour ID');
        }
        sportId = tour.sportId;
    } else {
        throw new Error('Either matchId or tourId is required');
    }
    const insertResult = await News.createNews({title, description, matchId, tourId, sportId});
    if (insertResult.affectedRows === 0) {
        throw new Error('Unable to create news');
    }
    return {id: insertResult.insertId};
}

const getNewsByMatchId = async (matchId) => {
    // Validate match ID
    if (!matchId) {
        throw new Error('Missing required fields: matchId');
    }
    return await News.getNewsByMatchId({matchId});
}

const getNewsByTourId = async (tourId) => {
    // Validate tour ID
    if (!tourId) {
        throw new Error('Missing required fields: tourId');
    }
    return await News.getNewsByTourId({tourId});
}

const getNewsBySportId = async (sportId) => {
    // Validate sport ID
    if (!sportId) {
        throw new Error('Missing required fields: sportId');
    }
    return await News.getNewsBySportId({sportId});
}

module.exports = {
    createNews,
    getNewsByMatchId,
    getNewsByTourId,
    getNewsBySportId
}
