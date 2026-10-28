import { Test, TestingModule } from '@nestjs/testing';
import { EmergenciasController } from './emergencias.controller';
import { EmergenciasService } from './emergencias.service';

describe('EmergenciasController', () => {
  let controller: EmergenciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergenciasController],
      providers: [EmergenciasService],
    }).compile();

    controller = module.get<EmergenciasController>(EmergenciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
