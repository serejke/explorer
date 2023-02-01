import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EthController } from './eth.controller';
import { EthService } from './eth.service';
import { EthBlock, EthBlockSchema } from './schemas/eth.block.schema';
import { EthTransaction, EthTransactionSchema } from './schemas/eth.transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: EthBlock.name, schema: EthBlockSchema },
    { name: EthTransaction.name, schema: EthTransactionSchema }
  ])],
  controllers: [EthController],
  providers: [EthService],
  exports: [EthService]
})
export class EthModule {}