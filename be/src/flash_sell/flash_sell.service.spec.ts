import { Test, TestingModule } from '@nestjs/testing';
import { FlashSellService } from './flash_sell.service';

describe('FlashSellService', () => {
  let service: FlashSellService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashSellService],
    }).compile();

    service = module.get<FlashSellService>(FlashSellService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
