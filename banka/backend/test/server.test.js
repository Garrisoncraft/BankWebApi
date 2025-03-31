const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

const { connect, closeDatabase, clearDatabase } = require('./setup');

// Developed by Garrison N. Sayor III (20209/2022)

let originalEnv;
let connectSpy;
let listenSpy;

beforeEach(() => {
  originalEnv = process.env.NODE_ENV;
  process.env.MONGODB = 'mongodb://localhost:27017/testdb'; // Mock MONGODB URI
  connectSpy = jest.spyOn(mongoose, 'connect').mockResolvedValue();
  listenSpy = jest.spyOn(app, 'listen').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress console logs
});

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await closeDatabase();
});

afterEach(async () => {
  await clearDatabase();
  process.env.NODE_ENV = originalEnv;
  delete process.env.MONGODB;
  connectSpy.mockRestore();
  listenSpy.mockRestore();
  console.log.mockRestore();
  jest.resetModules();
});


describe('Server Configuration', () => {

  it('should not connect/start in test mode', () => {
    process.env.NODE_ENV = 'test';
    
    jest.isolateModules(() => {
      require('../server');
    });

    expect(connectSpy).not.toHaveBeenCalled();
    expect(listenSpy).not.toHaveBeenCalled();
  });
  
  it('should connect/start if not in test mode', () => {
    process.env.NODE_ENV = 'production'; // Set to production for this test case
    console.log(`Current NODE_ENV: ${process.env.NODE_ENV}`); // Log the current environment

    jest.isolateModules(() => {
      require('../server');
    });

    expect(connectSpy);
    expect(listenSpy);
  });

  });
