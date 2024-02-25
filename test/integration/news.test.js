const request = require('supertest');
const { app } = require('../../index');
const mysql = require('../../src/lib/mysql');

beforeAll(async () => {
    console.log('clearing mysql tables');
    await mysql.query('delete from news;');
    await mysql.query('delete from matches;');
    await mysql.query('delete from tours;');
    await mysql.query('delete from sports;');
    console.log('inserting seed data');
    await mysql.query('insert into sports (id, name) values (?,?)', [1, 'dummy sport']);
    await mysql.query('insert into tours (id, name, sportId, startTime, endTime) values (?,?,?,?,?)', [1, 'dummy tour', 1, '2023-04-09 00:00:00', '2023-05-30 00:00:00']);
    await mysql.query('insert into matches (id, name, tourId, format, startTime, endTime) values (?,?,?,?,?,?)', [1, 'dummy match', 1, 'dummy format', '2023-04-09 18:00:00', '2023-04-09 23:00:00']);
    await mysql.query('insert into news (id, title, description, matchId, tourId, sportId) values (?,?,?,?,?,?)', [1, 'dummy title', 'dummy description', 1, 1, 1]);
});

afterAll(() => {
    mysql.end();
});

describe('POST /news', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should throw an error if title is missing', async () => {
        const body = {
            description: 'dummy description',
            matchId: 1
        }
        const response = await request(server).post('/news').send(body);
        expect(response.status).toBe(500);
    });
    it('should throw an error if description is missing', async () => {
        const body = {
            title: 'dummy title',
            matchId: 1
        }
        const response = await request(server).post('/news').send(body);
        expect(response.status).toBe(500);
    });
    it('should throw an error if both matchId & tourId are specified', async () => {
        const body = {
            title: 'dummy title',
            description: 'dummy description',
            matchId: 1,
            tourId: 1
        }
        const response = await request(server).post('/news').send(body);
        expect(response.status).toBe(500);
    });
    it('should throw an error if invalid matchId is specified', async () => {
        const body = {
            title: 'dummy title',
            description: 'dummy description',
            matchId: -1
        }
        const response = await request(server).post('/news').send(body);
        expect(response.status).toBe(500);
    });
    it('should throw an error if invalid tourId is specified', async () => {
        const body = {
            title: 'dummy title',
            description: 'dummy description',
            tourId: -1
        }
        const response = await request(server).post('/news').send(body);
        expect(response.status).toBe(500);
    });
    it('should successfully create a news record if valid matchId is specified', async () => {
        const body = {
            title: 'dummy title',
            description: 'dummy description',
            matchId: 1
        }
        const response = await request(server).post('/news').send(body);
        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
    });
    it('should successfully create a news record if valid tourId is specified', async () => {
        const body = {
            title: 'dummy title',
            description: 'dummy description',
            tourId: 1
        }
        const response = await request(server).post('/news').send(body);
        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
    });
});

describe('GET /news/matches/:matchId', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });
    
    it('should successfully return new records if valid matchId is specified', async () => {
        const matchId = 1;
        const response = await request(server).get(`/news/matches/${matchId}`);
        expect(response.status).toBe(200);
        const hasMatchId = response.body.some((item) => item.matchId === matchId);
        expect(hasMatchId).toBe(true);
    });
    it('should return an empty array for a non-existent matchId', async () => {
        const matchId = 1000000;
        const response = await request(app).get(`/news/matches/${matchId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    })
});

describe('GET /news/tours/:tourId', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });
    
    it('should successfully return new records if valid tourId is specified', async () => {
        const tourId = 1;
        const response = await request(server).get(`/news/tours/${tourId}`);
        expect(response.status).toBe(200);
        const hasTourId = response.body.some((item) => item.tourId === tourId);
        expect(hasTourId).toBe(true);
    });
    it('should return an empty array for a non-existent tourId', async () => {
        const tourId = 1000000;
        const response = await request(app).get(`/news/tours/${tourId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    })
});

describe('GET /news/sports/:sportId', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });
    
    it('should successfully return new records if valid sportId is specified', async () => {
        const sportId = 1;
        const response = await request(server).get(`/news/sports/${sportId}`);
        expect(response.status).toBe(200);
        const hasSportId = response.body.some((item) => item.sportId === sportId);
        expect(hasSportId).toBe(true);
    });
    it('should return an empty array for a non-existent sportId', async () => {
        const sportId = 1000000;
        const response = await request(app).get(`/news/sports/${sportId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    })
});
