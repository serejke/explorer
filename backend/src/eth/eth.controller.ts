import { BadRequestException, Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { EthService, BLOCKS_RANGE_LIMIT } from './eth.service';
import { EthBlockDto } from './dto/eth-block.dto';
import { EthTransactionDto } from './dto/eth.transaction.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { BlockchainStatusDto } from './dto/blockchain-status.dto';

@ApiTags('eth')
@Controller('eth')
export class EthController {
  constructor(private readonly ethModelService: EthService) {
  }

  @Get('/status')
  async getBlockchainStatus(): Promise<BlockchainStatusDto> {
    return await this.ethModelService.getBlockchainStatus();
  }

  @Get('/blocks')
  @ApiNotFoundResponse(
    { description: `Get 'limit' (<${BLOCKS_RANGE_LIMIT}) blocks starting from block #'from'` }
  )
  async findBlocks(
    @Query('from') from: number,
    @Query('limit') limit: number
  ): Promise<EthBlockDto[]> {
    if (limit > BLOCKS_RANGE_LIMIT) {
      throw new BadRequestException();
    }
    const blocks = await this.ethModelService.findBlocksFrom(from, limit);
    if (!blocks) {
      throw new NotFoundException();
    }
    return blocks;
  }

  @Get('/block/:id')
  @ApiNotFoundResponse({ description: 'Block having the given ID is not found' })
  async findOneBlock(@Param('id') id: string): Promise<EthBlockDto> {
    const hashOrNumber = id.startsWith('0x') ? id : parseInt(id);
    const block = await this.ethModelService.findOneBlock(hashOrNumber);
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

  @Get('/transaction/byBlock/:hash')
  @ApiNotFoundResponse({ description: 'Transactions of block having the given hash' })
  async findTransactionsOfBlock(@Param('hash') blockHash: string): Promise<EthTransactionDto[]> {
    return await this.ethModelService.findTransactionsByBlockHash(blockHash);
  }
}