import User from '../models/User.model';
import type { IUser } from '../types/user.types';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRole } from '../types/user.types';

class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = new User({
      ...createUserDto,
      role: createUserDto.role || UserRole.USER
    });
    
    await user.save();
    return user;
  }

  async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select('+password');
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  async promoteToAdmin(id: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      id,
      { role: UserRole.ADMIN },
      { new: true }
    );
  }

  async demoteToUser(id: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      id,
      { role: UserRole.USER },
      { new: true }
    );
  }
}

export default new UserService();