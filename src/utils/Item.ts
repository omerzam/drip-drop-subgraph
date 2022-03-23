import { Address, BigInt } from '@graphprotocol/graph-ts'
import { ItemAdded as ItemAddedEvent } from '../../generated/DR_Sale/DR_Sale'
import { Item, Transaction } from '../../generated/schema'
import { loadUser } from './User'

export class ItemState {
  static New: string = 'New'
  static OnSale: string = 'OnSale'
  static OfferAccepted: string = 'OfferAccepted'
  static SaleRetracted: string = 'SaleRetracted'
  static Sold: string = 'Sold'
}

export function createItem(event: ItemAddedEvent, transaction: Transaction): Item {
  const owner = loadUser(event.params.owner, transaction)

  let item = new Item(event.params.token_address.toHex() + '-' + event.params.itemRef.toString())
  item.state = ItemState.New
  item.token = event.params.token_address.toHex()
  item.token_id = event.params.token_id
  item.owner = event.params.owner.toHex()
  item.uri = event.params.uri
  item.royalty = event.params.royalty
  item.createdAtTx = transaction.id.toString()
  item.updatedAtTx = transaction.id.toString()
  item.save()
  return item
}

export function loadItem(tokenAddress: Address, itemRef: BigInt): Item {
  const itemId = tokenAddress.toHex() + '-' + itemRef.toString()
  let item = Item.load(itemId)
  if (item == null) {
    item = new Item(itemId)
  }
  return item
}
