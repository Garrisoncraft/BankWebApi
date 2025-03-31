require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { connect, closeDatabase, clearDatabase } = require('./setup');

describe('Account and Transaction Endpoints', () => {
  let user, staff, admin, userToken, staffToken, adminToken;

  beforeAll(async () => await connect());
  afterAll(async () => await closeDatabase());
  afterEach(async () => await clearDatabase());

  beforeEach(async () => {
    user = new User({ email: 'user@example.com', password: 'password123', firstName: 'Client', lastName: 'Test', type: 'client' });
    staff = new User({ email: 'staff@example.com', password: 'staff123', firstName: 'Staff', lastName: 'Test',  type: 'staff' });
    admin = new User({ email: 'admin@example.com', password: 'admin123', firstName: 'Admin', lastName: 'Test', type: 'staff',  isAdmin: true });
    
    await Promise.all([user.save(), staff.save(), admin.save()]);
    
    userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    staffToken = jwt.sign({ id: staff._id }, process.env.JWT_SECRET);
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  }, 30000);

  // ACCOUNT ENDPOINTS
  describe('Account Endpoints', () => {
    describe('POST /api/v1/accounts', () => {
      it('should create new account', async () => {
        const res = await request(app)
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${userToken}`)
          .send({ type: 'savings', balance: 1000 });
        expect(res.status).toBe(201);
        expect(res.body.data.accountNumber).toBeDefined();
      });

      it('should fail with invalid type', async () => {
        const res = await request(app)
          .post('/api/v1/accounts')
          .set('Authorization', `Bearer ${userToken}`)
          .send({ type: 'invalid' });
        expect(res.status).toBe(400);
      });
    }, 30000);

    describe('PATCH /api/v1/accounts/:accountNumber', () => {
      it('should update account status', async () => {
        const account = new Account({ owner: user._id, status: 'active' });
        await account.save();
        
        const res = await request(app)
          .patch(`/api/v1/accounts/${account.accountNumber}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ status: 'dormant' });
        expect(res.status).toBe(200);
        expect(res.body.data.status).toBe('dormant');
      });

    it('should fail update with invalid status', async () => {
      const res = await request(app)
        .patch('/api/v1/accounts/1000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'invalid-status' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Status must be active or dormant');
    });

      it('should fail for non-admin', async () => {
        const account = new Account({ owner: user._id, status: 'active' });
        await account.save();
        
        const res = await request(app)
          .patch(`/api/v1/accounts/${account.accountNumber}`)
          .set('Authorization', `Bearer ${userToken}`)
          .send({ status: 'dormant' });
        expect(res.status).toBe(403);
      });

      it('should return 404 for non-existent account', async () => {
        const res = await request(app)
          .patch('/api/v1/accounts/9999999999')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ status: 'dormant' });
          
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Account not found');
      });
    }, 30000);

    describe('DELETE /api/v1/accounts/:accountNumber', () => {
      it('should delete account', async () => {
        const account = new Account({ owner: user._id });
        await account.save();
        
        const res = await request(app)
          .delete(`/api/v1/accounts/${account.accountNumber}`)
          .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
      });

      it('should fail delete non-existent account', async () => {
        const res = await request(app)
          .delete('/api/v1/accounts/9999999999')
          .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(404);
      });
    }, 30000);

    describe('GET /api/v1/accounts', () => {
      it('should get all accounts', async () => {
        const account1 = new Account({ owner: user._id, accountNumber: 1234567890, type: 'savings' });
        const account2 = new Account({ owner: user._id, accountNumber: 1234567891, type: 'current', status: 'dormant' });
        await Promise.all([account1.save(), account2.save()]);
  
        const res = await request(app)
          .get('/api/v1/accounts')
          .set('Authorization', `Bearer ${staffToken}`);
  
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(2);
      }, 30000);
      
        it('should get specific accounts', async () => {
          const account = new Account({ owner: user._id, accountNumber: 2000000000,
          });
          await Promise.all([account.save()]);
    
          const res = await request(app)
            .get(`/api/v1/accounts/${account.accountNumber}`)
            .set('Authorization', `Bearer ${staffToken}`);
    
            expect(res.status).toBe(200);
          }, 30000);

          it('should return 404 for non-existent account', async () => {
            const res = await request(app)
              .get('/api/v1/accounts/9999999999')
              .set('Authorization', `Bearer ${staffToken}`);
              
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('Account not found');
          });
      
    it('should filter by status', async () => {
      const account1 = new Account({ owner: user._id, accountNumber: 1234567893, type: 'savings' });
      const account2 = new Account({ owner: user._id, accountNumber: 1234567894, type: 'current', status: 'dormant' });

      await Promise.all([account1.save(), account2.save()]);

      const res = await request(app)
        .get('/api/v1/accounts?status=dormant')
        .set('Authorization', `Bearer ${staffToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });

    it('should validate status query parameter', async () => {
      const res = await request(app)
        .get('/api/v1/accounts?status=invalid')
        .set('Authorization', `Bearer ${staffToken}`);
        
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Status must be active or dormant');
    });
   });
  }, 30000);


  // TRANSACTION ENDPOINTS
  describe('Transaction Endpoints', () => {
    let activeAccount;

    beforeEach(async () => {
      activeAccount = new Account({
        owner: user._id,
        accountNumber: 1000000000,
        balance: 1000,
        status: 'active'
      });
      await activeAccount.save();
    });

    describe('POST /:accountNumber/debit', () => {
      it('should debit account', async () => {
        const res = await request(app)
          .post(`/api/v1/transactions/${activeAccount.accountNumber}/debit`)
          .set('Authorization', `Bearer ${staffToken}`)
          .send({ amount: 500 });
        expect(res.status).toBe(201);
        expect(res.body.data.accountBalance).toBe(500);
      });

      it('should fail debit inactive account', async () => {
        const inactiveAccount = new Account({
          owner: user._id,
          accountNumber: 1000000001,
          status: 'dormant',
          balance: 1000
        });
        await inactiveAccount.save();
        
        const res = await request(app)
          .post(`/api/v1/transactions/${inactiveAccount.accountNumber}/debit`)
          .set('Authorization', `Bearer ${staffToken}`)
          .send({ amount: 500 });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Account not active');
      });
      
      it('should fail debit with negative amount', async () => {
        const res = await request(app)
          .post(`/api/v1/transactions/${1000000000}/debit`)
          .set('Authorization', `Bearer ${staffToken}`)
          .send({ amount: -100 });
        expect(res.status).toBe(400);
      });

      it('should fail insufficient funds', async () => {
        const res = await request(app)
          .post(`/api/v1/transactions/${activeAccount.accountNumber}/debit`)
          .set('Authorization', `Bearer ${staffToken}`)
          .send({ amount: 1500 });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Insufficient funds');
      });
    });

    describe('POST /:accountNumber/credit', () => {
      it('should credit account', async () => {
        const res = await request(app)
          .post(`/api/v1/transactions/${activeAccount.accountNumber}/credit`)
          .set('Authorization', `Bearer ${staffToken}`)
          .send({ amount: 500 });
        expect(res.status).toBe(201);
        expect(res.body.data.accountBalance).toBe(1500);
      });

      it('should fail credit inactive account', async () => {
        const inactiveAccount = new Account({
          owner: user._id,
          accountNumber: 1000000001,
          status: 'dormant',
          balance: 1000
        });
        await inactiveAccount.save();
        
        const res = await request(app)
          .post(`/api/v1/transactions/${inactiveAccount.accountNumber}/credit`)
          .set('Authorization', `Bearer ${staffToken}`)
          .send({ amount: 500 });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Account not active');
      });
    });

    describe('GET /:accountNumber/transactions', () => {
      it('should get transaction history', async () => {
        const transaction = new Transaction({
          accountNumber: activeAccount.accountNumber,
          type: 'debit',
          amount: 500,
          cashier: staff._id,
          oldBalance: 1000,
          newBalance: 500
        });
        await transaction.save();
        
        const res = await request(app)
          .get(`/api/v1/transactions/${activeAccount.accountNumber}/transactions`)
          .set('Authorization', `Bearer ${userToken}`);
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBe(1);
      });

      it('should return 404 for non-existent account', async () => {
        const res = await request(app)
          .get('/api/v1/transactions/9999999999/transactions')
          .set('Authorization', `Bearer ${staffToken}`);
        expect(res.status).toBe(404);
      });
    });

    describe('GET /transactions/:transactionId', () => {
      it('should return specific transaction', async () => {
        const transaction = new Transaction({
          accountNumber: activeAccount.accountNumber,
          type: 'debit',
          amount: 400,
          cashier: staff._id,
          oldBalance: 1000,
          newBalance: 600
        });
        await transaction.save();
        
        const res = await request(app)
          .get(`/api/v1/transactions/${transaction._id}`)
          .set('Authorization', `Bearer ${staffToken}`);
        expect(res.status).toBe(200);
      });

      it('should return 404 for invalid transaction ID', async () => {
        const res = await request(app)
          .get('/api/v1/transactions/64f0c5d2c9d8d70012345678')
          .set('Authorization', `Bearer ${staffToken}`);
        expect(res.status).toBe(404);
      });
    });
  }, 30000);
});