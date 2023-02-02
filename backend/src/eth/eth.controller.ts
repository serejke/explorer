import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { EthService, LATEST_BLOCKS_LIMIT } from './eth.service';
import { EthBlockDto } from './dto/eth-block.dto';
import { EthTransactionDto } from './dto/eth.transaction.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { limitWith } from '../utils';

@ApiTags('eth')
@Controller('eth')
export class EthController {
  constructor(private readonly ethModelService: EthService) {}

  @Get('/blocks')
  @ApiNotFoundResponse({ description: `Latest blocks, limited to ` })
  async findLatestBlocks(@Query('limit') limit?: number): Promise<EthBlockDto[]> {
    const count = limitWith(limit, LATEST_BLOCKS_LIMIT);
    const blocks = await this.ethModelService.findLatestBlocks(count);
    if (!blocks) {
      throw new NotFoundException();
    }
    return blocks;
  }

  @Get('/block/:id')
  @ApiNotFoundResponse({ description: 'Block having the given ID is not found' })
  async findOneBlock(@Param('id') id: string): Promise<EthBlockDto> {
    const block = await this.ethModelService.findOneBlock(id);
    if (!block) {
      throw new NotFoundException();
    }
    return block;
  }

  @Get('/transaction/:hash')
  @ApiNotFoundResponse({ description: 'Transaction having the given hash is not found' })
  async findOneTransaction(@Param('hash') hash: string): Promise<EthTransactionDto> {
    const transaction = await this.ethModelService.findOneTransaction(hash);
    if (!transaction) {
      throw new NotFoundException();
    }
    return transaction;
  }
}