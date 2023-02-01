import { Controller, Get, Param } from '@nestjs/common';
import { EthService } from './eth.service';
import { EthBlock } from './schemas/eth.block.schema';
import { EthTransaction } from './schemas/eth.transaction.schema';

@Controller('eth')
export class EthController {
  constructor(private readonly ethModelService: EthService) {}

  @Get('/block/:id')
  async findOneBlock(@Param('id') id: string): Promise<EthBlock> {
    return this.ethModelService.findOneBlock(id);
  }

  @Get('/transaction/:hash')
  async findOneTransaction(@Param('hash') hash: string): Promise<EthTransaction> {
    return this.ethModelService.findOneTransaction(hash);
  }
}