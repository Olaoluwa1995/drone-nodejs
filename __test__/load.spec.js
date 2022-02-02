const request = require('supertest');

const fs = require('fs');
const path = require('path');
const app = require('../app');
const db = require('../config/database');
const Drone = require('../models/drone-model');
const Medication = require('../models/medication-model');
const testImage = `${__dirname}/assets/test-image.png`

const testDrone = [
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e82750f",
        serialNumber: "FVHIUAIDN",
        model: "Middleweight",
        weight: 500,
        batteryCapacity: 100
    },
    {
        droneId: "5d137184-ba1f-4071-a8bd-f4968e827506",
        serialNumber: "FVHIUAIDNADJADF",
        model: "Middleweight",
        weight: 500,
        batteryCapacity: 24
    }
]

const testCase1 = {
    name: "Paracetamol",
    weight: 90,
    code: "HGHGYDYFCsdfsdfG78"
}

const testCase2 = {
    name: "Paracetamol",
    weight: 90,
    code: "HGHGYDYFCG78"
}

beforeAll(async () => {
    await db.connect();
    await Drone.insertMany(testDrone);
});


afterAll(async () => {
    try {
        await Drone.deleteMany({});
        await Medication.deleteMany({});
        await db.disconnect();
        const directory = `${__dirname}/../uploads/test`;
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
              });
            }
          });
    } catch (error) {
        console.log(error)
    }
})

describe('--- Load Drone Test ---', () => {
    it('should return status 422', async () => {
        const response = await request(app)
            .post(`/drone/${testDrone[0].droneId}/load`)
            .send(testCase1);
        expect(response.statusCode).toEqual(422);
        expect(response.body.status).toEqual('error');
    });

    it('should return status 404', async () => {
        const invalidDroneId = '5d137184-ba1f-4071-a8bd-f4968e827508'
        const response = await request(app)
            .post(`/drone/${invalidDroneId}/load`)
            .attach("image",testImage,{ contentType: 'application/octet-stream' })
            .field('name', testCase2.name)
            .field('weight', testCase2.weight)
            .field('code', testCase2.code)

        expect(response.statusCode).toEqual(404);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toEqual('Invalid drone id');
    });

    it('should return status 400', async () => {
        const response = await request(app)
            .post(`/drone/${testDrone[1].droneId}/load`)
            .attach("image",testImage,{ contentType: 'application/octet-stream' })
            .field('name', testCase2.name)
            .field('weight', testCase2.weight)
            .field('code', testCase2.code)

        expect(response.statusCode).toEqual(400);
        expect(response.body.status).toEqual('error');
    });

    it('should return status 201', async () => {
        const response = await request(app)
            .post(`/drone/${testDrone[0].droneId}/load`)
            .attach("image",testImage,{ contentType: 'application/octet-stream' })
            .field('name', testCase2.name)
            .field('weight', testCase2.weight)
            .field('code', testCase2.code)

        expect(response.statusCode).toEqual(201);
        expect(response.body.status).toEqual('success');
        expect(response.body.message).toEqual('Successfully loaded drone with medication');
    });

    it('should return status 409', async () => {
        const response = await request(app)
            .post(`/drone/${testDrone[0].droneId}/load`)
            .attach("image",testImage,{ contentType: 'application/octet-stream' })
            .field('name', testCase2.name)
            .field('weight', 9000)
            .field('code', testCase2.code)

        expect(response.statusCode).toEqual(409);
        expect(response.body.status).toEqual('error');
    });

    // it('should return status 201', async () => {
    //     const response = await request(app)
    //         .post('/drone')
    //         .send(newTestCase);
    //     expect(response.statusCode).toEqual(201);
    //     expect(response.body.status).toEqual('success');
    // });
});
