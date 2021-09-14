/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');
const sinon = require('sinon');

const {
    expect
} = require('chai');

const {
    connection
} = require('../../src/db.js');

const session = require('supertest-session');

const app = require('../../src/app.js');

const {
    TEST_DB_NAME
} = process.env;

const {
    conn,
    Videogame
} = connection(TEST_DB_NAME);

const agent = session(app);

const data = {
    valid: {
        id: '96c1ee7d-cc4c-4155-bab7-ff0f7777ed5c',
        name: 'Super Mario Bros',
        createdInDB: true,
        image: "https://media.rawg.io/media/games/a8b/a8bf6f31bfbdaf7d4b86c1953c62cee0.jpg",
        description: "hola que tal1",
        released: "1994-07-04",
        rating: 5.2,
        platforms: "PC",
    },
    invalid: {

    }
}

const rawgResponse = {
    data: {
        count: 612416,
        next: "",
        previous: null,
        results: []
    }
}


describe('Videogame routes', () => {
    let stub;

    before(() => {
        conn.authenticate()
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            })
    });

    beforeEach(() => {
        Videogame.sync({
                force: true
            })
            .then(() => Videogame.create(data.valid))
        stub = sinon.stub(axios, 'get').returns(Promise.resolve(rawgResponse));
    });

    afterEach(() => {
        stub.restore();
    })

    describe('GET /videogames', () => {
        it('should get 200', async() => {
            const res = await agent.get('/videogames');
            expect(res.status).to.equal(200);
            sinon.assert.callCount(stub, 5);
        });
    });
});