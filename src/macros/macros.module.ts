import { HttpModule, Module } from '@nestjs/common';
import { MacrosService } from './macros.service';
import { MacrosController } from './macros.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MacroSchema } from 'src/schemas/macros.schema';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    MongooseModule.forFeature([{ name: 'Macro', schema: MacroSchema }]),
  ],
  controllers: [MacrosController],
  providers: [MacrosService, ConfigService],
  exports: [MacrosService],
})
export class MacrosModule {}
