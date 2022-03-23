import {
  Admin as AdminEvent,
  Minter as MinterEvent,
  Operator as OperatorEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from '../generated/DR_Registry/DR_Registry'
import { Admin, Minter, Operator, OwnershipTransferred, User } from '../generated/schema'

import { loadTransaction } from './utils/Transaction'
import { loadUser } from './utils/User'

export function handleAdmin(event: AdminEvent): void {
  let entity = new Admin(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.isAdmin = event.params.isAdmin
  entity.userAddress = event.params.userAddress
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()

  const user = loadUser(event.params.userAddress, transaction)
  user.isAdmin = event.params.isAdmin
  user.save()
}

export function handleMinter(event: MinterEvent): void {
  let entity = new Minter(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.isMinter = event.params.isMinter
  entity.userAddress = event.params.userAddress
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()

  const user = loadUser(event.params.userAddress, transaction)
  user.isMinter = event.params.isMinter
  user.save()
}

export function handleOperator(event: OperatorEvent): void {
  let entity = new Operator(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.isOperator = event.params.isOperator
  entity.userAddress = event.params.userAddress
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()

  const user = loadUser(event.params.userAddress, transaction)
  user.isOperator = event.params.isOperator
  user.save()
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
