# Explorer backend

Backend connects to Ethereum JSON-RPC node (`ETH_NODE_RPC_URL`), pulls the latest blocks along with transaction details, and saves them to MongoDB.

Backend provides REST API to fetch blocks and transactions.   

### Database
MongoDB is chosen as the NoSQL database, because blocks and transactions can be effectively stored as independent documents. 
Indexes on relevant fields allow for suitable search performance.

`eth-blocks` collection contains blocks' headers
```
eth-blocks {
  _id         // === hash
  number      // indexed field
  hash
  parentHash
  timestamp
  ...
}
```

`eth-transactions` collection contains transactions' details.
```
eth-transactions {
  _id
  hash
  blockHash    // indexed field
  ...
}
```

### API
```
BlockDto {
  number
  hash
  parentHash
  timestamp
  ...
}

TransactionDto {
  hash
  blockNumber
  blockHash
  from
  to
  value
  ...
}

GET /eth/block/:id
    = BlockDto

GET /eth/blocks?from=35&limit=50
    = BlockDto[]
    
GET /eth/transaction/:hash
    = TransactionDto
    
GET /eth/transaction/byBlock/:blockHash
    = TransactionDto[]

```