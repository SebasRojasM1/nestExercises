import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../utils/shared.module';
import { JwtStrategy } from './strategies/at.strategy';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    JwtModule.register({ //Registramos el Token
      secret: process.env.JWT_SECRET, //Se implementa el Token asignado de seguridad
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }, //Se asigna el tiempo de durabilidad del Token
    }),
    SharedModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}