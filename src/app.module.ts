import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from './producto/producto.module';
import { Producto } from './producto/entities/producto.entity';
import { ConfigModule } from '@nestjs/config';
import { TiendaModule } from './tienda/tienda.module';
import { tienda } from './tienda/entities/tienda.entity';
import { TiendaProductoModule } from './tienda-producto/tienda-producto.module';

@Module({
  imports:
  [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env',
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Producto,tienda],
      synchronize: true,
    }),
    ProductoModule,
    TiendaModule,
    TiendaProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
