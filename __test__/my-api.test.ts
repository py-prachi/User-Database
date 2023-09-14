// Import necessary dependencies and modules

import request from 'supertest';
import { exit } from 'process';

import { app } from '../src/index'; 
import { AppDataSource } from "../src/data-source";
import { response } from 'express';


describe('User API', () => {
  it('should get all users', async () => {
    await AppDataSource.initialize();
    const response = await request(app).get('/users'); 

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    
    await AppDataSource.destroy();
    // console.log('Stopping Jest on completion of test');
    // process.exit(1); // Exit with status code 0 (Success)
    
  });
});
// similar tests for other endpoints (POST, PUT, DELETE)