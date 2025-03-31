const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Account = require('../models/Account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connect, closeDatabase, clearDatabase } = require('./setup');

describe('User and Auth Endpoints', () => {
  let user, staff, admin, userToken, staffToken, adminToken;

  beforeAll(async () => await connect());
  afterAll(async () => await closeDatabase());
  afterEach(async () => await clearDatabase());

  beforeEach(async () => {
    user = new User({ 
      email: 'user@example.com',
      password: 'UserPass123!',
      firstName: 'Regular',
      lastName: 'User',
      type: 'client'
    });
    
    staff = new User({ 
      email: 'staff@example.com',
      password: 'StaffPass123!',
      firstName: 'Staff',
      lastName: 'Member',
      type: 'staff'
    });
    
    admin = new User({ 
      email: 'admin@example.com',
      password: 'AdminPass123!',
      firstName: 'Admin',
      lastName: 'User',
      type: 'staff',
      isAdmin: true
    });
    
    await Promise.all([user.save(), staff.save(), admin.save()]);
    
    userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    staffToken = jwt.sign({ id: staff._id }, process.env.JWT_SECRET);
    adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  });

  // AUTH TESTS
  describe('Auth Endpoints', () => {
    it('should signup a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'newuser@example.com',
          password: 'NewPass123!',
          firstName: 'New',
          lastName: 'User'
        });
        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty('token');
        expect(res.body.data.email).toEqual('newuser@example.com');
    });

    it('should return 400 for invalid email format', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'invalid-email',
          password: 'Pass123!',
          firstName: 'Test',
          lastName: 'User'
        });
      expect(res.status).toBe(400);
    });

    it('should return 400 for existing email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: user.email,
          password: 'Pass123!',
          firstName: 'Test',
          lastName: 'User'
        });
      expect(res.status).toBe(400);
    });

    it('should return 400 for missing first name', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'Pass123!',
          lastName: 'User'
        });
      expect(res.status).toBe(400);
    });

    it('should return 400 for missing last name', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'test@example.com',
          password: 'Pass123!',
          firstName: 'Test'
        });
      expect(res.status).toBe(400);
    });

    it('should return 400 for missing password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User'
        });
      expect(res.status).toBe(400);
    });

    it('should return 401 for missing email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signin')
        .send({
          password: 'Pass123!'
        });
      expect(res.status).toBe(401);
    });

    it('should fail signup with missing fields', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({}); // Empty payload
      expect(res.status).toBe(400);
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'user@example.com',
          password: 'UserPass123!',
        });
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.email).toEqual('user@example.com');
    });

    it('should return 401 for invalid password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: user.email,
          password: 'wrongpassword'
        });
      expect(res.status).toBe(401);
    });

    it('should return 401 for non-existent user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'nonexistent@example.com',
          password: 'Pass123!'
        });
      expect(res.status).toBe(401);
    });
  });

  // PASSWORD RESET TESTS
  describe('Password Reset', () => {
    it('should return 400 for invalid email in password reset request', async () => {
      const res = await request(app)
        .post('/api/v1/auth/reset-password') 
        .send({ email: 'invalid-email' });
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('Valid email is required');
    });

    it('should request password reset', async () => {

      const res = await request(app)
        .post('/api/v1/auth/reset-password') // Fix: Correct endpoint
        .send({ email: 'user@example.com' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.message).toEqual('Password reset instructions sent to your email');
    }, 10000);

    it('should return 400 for missing new password in reset confirmation', async () => {
      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const res = await request(app)
        .post(`/api/v1/auth/reset-password/${resetToken}`)
        .send({}); // No new password provided
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('Password must be at least 6 characters');
    });

    it('should reset password with valid token', async () => {

      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const res = await request(app)
        .post(`/api/v1/auth/reset-password/${resetToken}`)
        .send({ newPassword: 'newSecurePass123!' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.message).toEqual('Password successfully updated');
    }, 10000);

    it('should return 404 for non-existent user in reset confirmation', async () => {
      const resetToken = jwt.sign({ id: '60d0fe4f5311236168a109ca' }, process.env.JWT_SECRET);

      const res = await request(app)
        .post(`/api/v1/auth/reset-password/${resetToken}`)
        .send({ newPassword: 'newSecurePass123!' });
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('User not found');
    });

    it('should fail reset with invalid email', async () => {

      const res = await request(app)
        .post('/api/v1/auth/reset-password') 
        .send({ email: 'invalid@example.com' });
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('User not found'); 
    }, 10000);

    it('should fail reset with expired token', async () => {
      const expiredToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '-1h' });
      const res = await request(app)
        .post(`/api/v1/auth/reset-password/${expiredToken}`)
        .send({ newPassword: 'newPass123!' });
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Invalid or expired token');
    }, 10000);
  });

  // USER MODEL PASSWORD HASHING
  describe('User Model Password Hashing', () => {
    it('should hash password on creation', async () => {
      const newUser = new User({
        email: 'hash@example.com',
        password: 'OriginalPass123!',
        firstName: 'Hash',
        lastName: 'Test'
      });
      await newUser.save();
      expect(newUser.password).toMatch(/^\$2[ayb]\$.{56}$/);
      expect(await bcrypt.compare('OriginalPass123!', newUser.password)).toBe(true);
    });

    it('should not rehash password when updating other fields', async () => {
      const originalHash = user.password;
      user.firstName = 'Updated';
      await user.save();
      expect(user.password).toBe(originalHash);
    });

    it('should hash new password when updated', async () => {
      const originalHash = user.password;
      user.password = 'NewPass789!';
      await user.save();
      expect(user.password).not.toBe(originalHash);
      expect(await bcrypt.compare('NewPass789!', user.password)).toBe(true);
    });
  });

  // USER MANAGEMENT
  describe('User Endpoints', () => {
    it('should create staff user', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          email: 'newstaff@example.com',
          password: 'StaffPass123!',
          firstName: 'New',
          lastName: 'Staff',
          type: 'staff'
        });
      expect(res.status).toBe(201);
    });

    it('should get user accounts', async () => {
      const account = new Account({ 
        owner: user._id,
        accountNumber: 1234500000,
        balance: 1000 
      });
      await account.save();
      
      const res = await request(app)
        .get(`/api/v1/users/user@example.com/accounts`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.accounts.length).toBe(1);
     });

    it('should return 404 for invalid user email', async () => {
      const res = await request(app)
        .get('/api/v1/users/nonexistent@example.com/accounts')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(404);
    });

    it('should fail staff creation with invalid data', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          email: 'invalid-email',
          password: 'short'
        });
      expect(res.status).toBe(400);
    });
  });


  
// ROLE MIDDLEWARE TESTS
describe('Role Middleware', () => {
  it('should return 401 for missing token', async () => {
    const res = await request(app)
      .get('/api/v1/accounts') // Protected endpoint
      .send();
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Access denied');
  });

  it('should return 404 for invalid user in token', async () => {
    const fakeToken = jwt.sign({ id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET);
    const res = await request(app)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${fakeToken}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  it('should block non-admin from admin routes', async () => {
    const res = await request(app)
      .post('/api/v1/users') 
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        email: 'newstaff@example.com',
        password: 'Pass123!',
        firstName: 'New',
        lastName: 'User',
        type: 'client'

      });
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden');
  });

  it('should allow admin access to admin routes', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        email: 'newstaff@example.com',
        password: 'Pass123!',
        firstName: 'New',
        lastName: 'Staff'
      });
    expect(res.status).toBe(201);
  });

  it('should allow staff access to staff routes', async () => {
    const res = await request(app)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${staffToken}`);
    expect(res.status).toBe(200);
  });

  it('should deny access if token not provided', async () => {
    const res = await request(app)
      .get('/api/v1/accounts')
      .set('Authorization', '');
    expect(res.status).toBe(401);
  });

  it('should block client users from staff routes', async () => {
    const clientUser = new User({
      email: 'client@example.com',
      password: 'ClientPass123!',
      firstName: 'Client',
      lastName: 'User',
    });
    await clientUser.save();
    const clientToken = jwt.sign({ id: clientUser._id }, process.env.JWT_SECRET);
    
    const res = await request(app)
      .get('/api/v1/accounts')
      .set('Authorization', `Bearer ${clientToken}`);
    expect(res.status).toBe(403);
    expect(res.body.error).toBe('Forbidden')
  });
});

});