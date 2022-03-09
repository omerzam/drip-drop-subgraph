import { NewTokenIssued as NewTokenIssuedEvent } from "../generated/DR_TokenFactory/DR_TokenFactory"
import { NewTokenIssued } from "../generated/schema"

import { loadTransaction } from './utils/Transaction'

export function handleNewTokenIssued(event: NewTokenIssuedEvent): void {
  let entity = new NewTokenIssued(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.pos = event.params.pos
  entity.name = event.params.name
  entity.symbol = event.params.symbol
  entity.dr = event.params.dr
  entity.sale_address = event.params.sale_address
  entity.proxyregistry = event.params.proxyregistry
  entity.owner = event.params.owner
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}
