const request = require('supertest');
const app = require('../app');
const db = require('../config/database');
const { Drone } = require('../models');

const droneTestCase = [
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e82750f",
        serialNumber: "OADJFKAJFIACNDJAS",
        model: "Lightweight",
        weight: 200,
        state: 'IDLE',
        batteryCapacity: 50
    },
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e827503",
        serialNumber: "OADJFKAJFIACNDJAS",
        model: "Lightweight",
        weight: 500,
        state: 'LOADING',
        batteryCapacity: 20
    },
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e827503",
        serialNumber: "OADJFKAJFIACNDJAS",
        model: "Lightweight",
        weight: 500,
        state: 'LOADING',
        batteryCapacity: 66
    }
]

beforeAll(async () => {
    await db.connect();
    await Drone.insertMany(droneTestCase);
});


afterAll(async () => {
    try {
        await Drone.deleteMany({});
        await db.disconnect();
    } catch (error) {
        console.log(error)
    }
})

describe('--- Get Drone Battery Level ---', () => {
    droneTestCase.forEach((test) => {
        it('should return status 200', async () => {
            const response = await request(app)
                .get(`/drone/${test.droneId}/battery`);
                
            expect(response.statusCode).toEqual(200);
            expect(response.body.status).toEqual('success');
        });
    });
});
