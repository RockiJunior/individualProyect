const {
    connection
} = require('../../src/db.js');
const {
    expect
} = require('chai');
const {
    TEST_DB_NAME
} = process.env;

const {
    conn,
    Videogame
} = connection(TEST_DB_NAME);

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

describe('Videogame model', () => {
    before(() => {

        conn.authenticate()
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            })
    });

    describe('Validators', () => {
        beforeEach(() => Videogame.sync({
            force: true
        }));

        it('should throw an error if data is invalid', (done) => {
            Videogame.create(data.invalid)
                .then(() => done(new Error('It requires a valid data')))
                .catch(() => done());
        });

        it('should create to videogame when its a valid data', async() => {
            await Videogame.create(data.valid);
            const videogame = await Videogame.findAll({
                where: {
                    id: '96c1ee7d-cc4c-4155-bab7-ff0f7777ed5c'
                }
            });
            expect(videogame.length).to.equal(1);
        });

    });
});