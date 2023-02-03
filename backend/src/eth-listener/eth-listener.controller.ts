import { Controller, Post, Query } from '@nestjs/common';
import { EthLoaderService } from './eth-loader.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('eth-listener')
@Controller('eth-listener')
export class EthListenerController {
  constructor(
    private readonly ethLoaderService: EthLoaderService
  ) {
  }

  @Post('/load-block')
  async loadBlock(@Query('id') blockNumber: number) {
    await this.ethLoaderService.loadBlock(blockNumber);
  }
}