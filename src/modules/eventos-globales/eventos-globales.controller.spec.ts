import { Test, TestingModule } from '@nestjs/testing';
import { EventosGlobalesController } from './eventos-globales.controller';
import { EventosGlobalesService } from './eventos-globales.service';

describe('EventosGlobalesController', () => {
  let controller: EventosGlobalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventosGlobalesController],
      providers: [EventosGlobalesService],
    }).compile();

    controller = module.get<EventosGlobalesController>(EventosGlobalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
