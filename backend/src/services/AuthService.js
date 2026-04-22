const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepository');
const UserFactory = require('../factory/UserFactory');

class AuthService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async register(userData) {
    const { username, email, password, role } = userData;
    
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const prismaUser = await this.userRepo.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'USER'
    });

    return UserFactory.createUser(prismaUser);
  }

  async login(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { user: UserFactory.createUser(user).toJSON(), token };
  }
}

module.exports = new AuthService(userRepository);
