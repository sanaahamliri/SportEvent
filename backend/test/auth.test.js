const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { loginUser } = require('../controllers/authController');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../models/User');

describe('loginUser', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: { email: 'sanaa@gmail.com', password: 'password' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  it('should return a token and user id for valid credentials', async () => {
    User.findOne.mockResolvedValue({ _id: 'user_id', email: 'sanaa@gmail.com', password: 'hashedpassword' });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockedToken');

    await loginUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'sanaa@gmail.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'user_id' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken', user: { id: 'user_id' } });
  });

  it('should return 400 if user is not found', async () => {
    User.findOne.mockResolvedValue(null);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should return 400 for invalid credentials', async () => {
    User.findOne.mockResolvedValue({ _id: 'user_id', email: 'sanaa@gmail.com', password: 'hashedpassword' });
    bcrypt.compare.mockResolvedValue(false);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });
});
