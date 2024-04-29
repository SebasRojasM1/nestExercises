import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../DTOs';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    //Verifica desde una peticion HTTP la propiedad "Email" si ya existe el email ingresado en la DB...

    //Sí ya existe el email en la DB... ¡ERROR!
    if (existingUser) {
      throw new HttpException(
        `User with email ${createUserDto.email} already exists`,
        HttpStatus.BAD_REQUEST, //Es un código de estado HTTP usado para indicar que la solicitud del cliente no pudo ser procesada debido a un error en la solicitud del cliente.
      );
    }

    //Si no, se creará un nuevo usuario
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }



  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }



  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }



  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }


  
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return updatedUser;
  }



  async remove(id: string): Promise<void> {
    const user = await this.userModel.findOneAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
