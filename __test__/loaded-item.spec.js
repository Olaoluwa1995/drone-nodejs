const request = require('supertest');
const app = require('../app');
const db = require('../config/database');
const { Medication, Drone } = require('../models');

const droneTestCase = [
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e82750f",
        serialNumber: "OADJFKAJFIACNDJAS",
        model: "Lightweight",
        weight: 200,
        batteryCapacity: 100
    },
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e827503",
        serialNumber: "OADJFKAJFIACNDJAS",
        model: "Lightweight",
        weight: 500,
        batteryCapacity: 100
    }
]

const loadedItem = [
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e82750f",
        name: "Biotics",
        weight: 90,
        image: "/test.png",
        code: "CJKJKJHJKG78"
    },
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e82750f",
        name: "Paracetamol",
        weight: 90,
        image: "/test.png",
        code: "HHHKYFCG798"
    },
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e827503",
        name: "Food",
        weight: 90,
        image: "/test.png",
        code: "HGHGYDY78ADF34"
    }
]

beforeAll(async () => {
    await db.connect();
    await Drone.insertMany(droneTestCase);
    await Medication.insertMany(loadedItem)
});


afterAll(async () => {
    try {
        await Drone.deleteMany({});
        await Medication.deleteMany({});
        await db.disconnect();
      
    } catch (error) {
        console.log(error)
    }
})

describe('--- Get Drone Item Test ---', () => {
    droneTestCase.forEach((test) => {
        it('should return status 200', async () => {
            const response = await request(app)
                .get(`/drone/${test.droneId}/med`);

            expect(response.statusCode).toEqual(200);
            expect(response.body.status).toEqual('success');
            expect(response.body.data[0].droneId).toEqual(test.droneId);
        });
    })
   
});
