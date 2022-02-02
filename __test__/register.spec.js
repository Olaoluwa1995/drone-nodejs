const request = require('supertest');
const app = require('../app');
const db = require('../config/database');
const Drone = require('../models/drone-model');

const existingTestCase = {
    droneId: "03326fa2-32a9-4b5e-878f-2e8defb93a3",
    serialNumber: "FVHIUAIDN",
    model: "Middleweight",
    weight: 500,
    batteryCapacity: 100
}

const validationTestCase = {
    droneId: "03326fa2-32a9-4b5e-878f-2e8defb93a3",
    serialNumber: "jsdfaiudfadkcnaiducnaiudifaudfjadfadfadfadf",
    model: "Middleweight",
    weight: 600,
    batteryCapacity: 200
}


const newTestCase = {
    droneId: "03326fa2-32a9-4b5e-878f-2e8defb93a4",
    serialNumber: "OADJFKAJFIACNDJAS",
    model: "Lightweight",
    weight: 200,
    batteryCapacity: 100
}

beforeAll(async () => {
    await db.connect();
    await Drone.create(existingTestCase);
});


afterAll(async () => {
    try {
        await Drone.deleteMany({});
        await db.disconnect();
    } catch (error) {
        console.log(error)
    }
})

describe('--- Register Drone Test ---', () => {
    it('should return status 422', async () => {
        const response = await request(app)
            .post('/drone')
            .send(validationTestCase);
        expect(response.statusCode).toEqual(422);
        expect(response.body.status).toEqual('error');
    });

    it('should return status 409', async () => {
        const response = await request(app)
            .post('/drone')
            .send(existingTestCase);
        expect(response.statusCode).toEqual(409);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toEqual('Drone already exist');
    });

    it('should return status 201', async () => {
        const response = await request(app)
            .post('/drone')
            .send(newTestCase);
        expect(response.statusCode).toEqual(201);
        expect(response.body.status).toEqual('success');
    });
});
