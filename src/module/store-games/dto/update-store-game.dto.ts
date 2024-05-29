import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreGameDto } from './create-store-game.dto';

export class UpdateStoreGameDto extends PartialType(CreateStoreGameDto) {}
