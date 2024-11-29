const { loginUser } = require('../controllers/authController');
const User = require('../models/User');
jest.mock('../models/User.js')

describe('Auth', () => {
    it('should respond with user data if login is successful', async () => {
        // Mock request and response
        const req = {
          body: {
            email: 'test@gmail.com',
            password: 'test',
          },
        };
    
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
    
        // Mock User.findOne to return a user
        const mockUser = { _id: '123', email: req.body.email, password: 'hashed_password' };
        User.findOne = jest.fn().mockResolvedValue(mockUser);
    
        // Mock bcrypt.compare directly as true (bypassing actual implementation)
        const bcrypt = require('bcryptjs');
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    
        // Call the controller
        await loginUser(req, res);
    
        // Assertions
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
        expect(res.json).toHaveBeenCalledWith({
          token: expect.any(String), // Optional: Remove if not needed
          user: { id: mockUser._id },
        });
      });
})