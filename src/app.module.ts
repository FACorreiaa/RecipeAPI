import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RecipeModule } from './recipe/recipe.module';
import { MacrosModule } from './macros/macros.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5295o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    RecipeModule,
    MacrosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
