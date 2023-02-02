import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { EthService } from './eth.service';
import { EthBlockDto } from './dto/eth-block.dto';
import { EthTransactionDto } from './dto/eth.transaction.dto';

@Controller('eth')
export class EthController {
  constructor(private readonly ethModelService: EthService) {}

  @Get('/block/:id')
  async findOneBlock(@Param('id') id: string): Promise<EthBlockDto> {
    const block = await this.ethModelService.findOneBlock(id);
    if (!block) {
      throw new NotFoundException();
    }
    return block;
  }

  @Get('/transaction/:hash')
  async findOneTransaction(@Param('hash') hash: string): Promise<EthTransactionDto> {
    const transaction = await this.ethModelService.findOneTransaction(hash);
    if (!transaction) {
      throw new NotFoundException();
    }
    return transaction;
  }
}