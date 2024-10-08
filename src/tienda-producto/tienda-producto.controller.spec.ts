import { Test, TestingModule } from '@nestjs/testing';
import { TiendaProductoController } from './tienda-producto.controller';
import { TiendaProductoService } from './tienda-producto.service';

describe('TiendaProductoController', () => {
  let controller: TiendaProductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiendaProductoController],
      providers: [TiendaProductoService],
    }).compile();

    controller = module.get<TiendaProductoController>(TiendaProductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
