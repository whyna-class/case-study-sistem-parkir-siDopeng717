import { Module } from '@nestjs/common';
import { ParkerService } from './parkiran.service';
import { ParkerController } from './parkiran.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ParkerController],
  providers: [ParkerService],
  exports: [ParkerService]
})
export class ParkerModule {}