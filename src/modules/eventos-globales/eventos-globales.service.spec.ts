import { Test, TestingModule } from '@nestjs/testing';
import { EventosGlobalesService } from './eventos-globales.service';

describe('EventosGlobalesService', () => {
  let service: EventosGlobalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosGlobalesService],
    }).compile();

    service = module.get<EventosGlobalesService>(EventosGlobalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
