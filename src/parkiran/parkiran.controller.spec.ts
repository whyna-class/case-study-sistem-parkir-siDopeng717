import { Test, TestingModule } from '@nestjs/testing';
import { ParkerController } from './parkiran.controller';
import { ParkerService } from './parkiran.service';

describe('ParkiranController', () => {
  let controller: ParkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkerController],
      providers: [ParkerService],
    }).compile();

    controller = module.get<ParkerController>(ParkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
