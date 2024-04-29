import { Module } from '@nestjs/common';
import { HashService } from './services/hash.service';

/* Los servicios definidos en este array se inyectarán en este módulo y estarán disponibles para 
su uso en componentes dentro del mismo. */
const providers = [HashService];

@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}