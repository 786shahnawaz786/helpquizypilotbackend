import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const valid = await this.usersService.validatePassword(user, password);
    if (!valid) throw new UnauthorizedException('Invalid email or password');
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user._id.toString(), email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException();
    const valid = await this.usersService.validatePassword(user, currentPassword);
    if (!valid) throw new UnauthorizedException('Current password is incorrect');
    await this.usersService.updatePassword(userId, newPassword);
    return { message: 'Password updated successfully' };
  }
}
