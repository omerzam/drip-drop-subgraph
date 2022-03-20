import {
  BidIncreased as BidIncreasedEvent,
  BidReceived as BidReceivedEvent,
  ItemAdded as ItemAddedEvent,
  ItemOnSale as ItemOnSaleEvent,
  MetaTransactionExecuted as MetaTransactionExecutedEvent,
  NewOffer as NewOfferEvent,
  OfferAccepted as OfferAcceptedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Payment as PaymentEvent,
  Royalties as RoyaltiesEvent,
  SaleResubmitted as SaleResubmittedEvent,
  SaleRetracted as SaleRetractedEvent,
  SharesUpdated as SharesUpdatedEvent,
  WalletTransferred as WalletTransferredEvent,
} from '../generated/DR_Sale/DR_Sale'
import {
  BidIncreased,
  BidReceived,
  ItemAdded,
  ItemOnSale,
  MetaTransactionExecuted,
  NewOffer,
  OfferAccepted,
  OwnershipTransferred,
  Payment,
  Royalties,
  SaleResubmitted,
  SaleRetracted,
  SharesUpdated,
  WalletTransferred,
} from '../generated/schema'

import { loadTransaction } from './utils/Transaction'
import { loadUser } from './utils/User'

export function handleBidIncreased(event: BidIncreasedEvent): void {
  let entity = new BidIncreased(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.bidder = event.params.bidder
  entity.tokenId = event.params.tokenId
  entity.previous_bid = event.params.previous_bid
  entity.this_bid = event.params.this_bid
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleBidReceived(event: BidReceivedEvent): void {
  let entity = new BidReceived(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.bidder = event.params.bidder
  entity.tokenId = event.params.tokenId
  entity.bid = event.params.bid
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleItemAdded(event: ItemAddedEvent): void {
  let entity = new ItemAdded(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.itemRef = event.params.itemRef
  entity.token_address = event.params.token_address
  entity.token_id = event.params.token_id
  entity.owner = event.params.owner
  entity.uri = event.params.uri
  entity.royalty = event.params.royalty
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleItemOnSale(event: ItemOnSaleEvent): void {
  let entity = new ItemOnSale(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.itemRef = event.params.itemRef
  entity.contract_address = event.params.contract_address
  entity.tokenId = event.params.tokenId
  entity.asking_price = event.params.asking_price
  entity.payment_token = event.params.payment_token
  entity.uri = event.params.uri
  entity.royalty = event.params.royalty
  entity.owner = event.params.owner
  entity.resale = event.params.resale
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleMetaTransactionExecuted(event: MetaTransactionExecutedEvent): void {
  let entity = new MetaTransactionExecuted(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.userAddress = event.params.userAddress
  entity.relayerAddress = event.params.relayerAddress
  entity.functionSignature = event.params.functionSignature
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleNewOffer(event: NewOfferEvent): void {
  let entity = new NewOffer(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.tokenId = event.params.tokenId
  entity.owner = event.params.owner
  entity.price = event.params.price
  entity.hash = event.params.hash
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleOfferAccepted(event: OfferAcceptedEvent): void {
  let entity = new OfferAccepted(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.buyer = event.params.buyer
  entity.seller = event.params.seller
  entity.itemRef = event.params.itemRef
  entity.contract_address = event.params.contract_address
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price
  entity.payment_token = event.params.payment_token
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handlePayment(event: PaymentEvent): void {
  let entity = new Payment(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.wallet = event.params.wallet
  entity.creator = event.params.creator
  entity._owner = event.params._owner
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleRoyalties(event: RoyaltiesEvent): void {
  let entity = new Royalties(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  // entity.first_payees = event.params.first_payees
  // entity.first_shares = event.params.first_shares
  // entity.resale_payees = event.params.resale_payees
  // entity.resale_shares = event.params.resale_shares
  entity.itemRef = event.params.itemRef
  entity.tokenId = event.params.tokenId
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleSaleResubmitted(event: SaleResubmittedEvent): void {
  let entity = new SaleResubmitted(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleSaleRetracted(event: SaleRetractedEvent): void {
  let entity = new SaleRetracted(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.owner = event.params.owner
  entity.itemRef = event.params.itemRef
  entity.contract_address = event.params.contract_address
  entity.tokenId = event.params.tokenId
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleSharesUpdated(event: SharesUpdatedEvent): void {
  let entity = new SharesUpdated(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.ownerShare = event.params.ownerShare
  entity.creatorShare = event.params.creatorShare
  entity.divisor = event.params.divisor
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleWalletTransferred(event: WalletTransferredEvent): void {
  let entity = new WalletTransferred(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.previousWallet = event.params.previousWallet
  entity.newWallet = event.params.newWallet
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}
