import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  MetaTransactionExecuted as MetaTransactionExecutedEvent,
  OperatorSet as OperatorSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent,
} from '../generated/DR_Token/DR_Token'
import {
  Approval,
  ApprovalForAll,
  MetaTransactionExecuted,
  OperatorSet,
  OwnershipTransferred,
  Transfer,
} from '../generated/schema'

import { loadTransaction } from './utils/Transaction'

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
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

export function handleOperatorSet(event: OperatorSetEvent): void {
  let entity = new OperatorSet(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.operator = event.params.operator
  entity.enabled = event.params.enabled
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

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(event.transaction.hash.toHex() + '-' + event.logIndex.toString())
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  let transaction = loadTransaction(event)
  entity.transaction = transaction.id
  entity.timestamp = transaction.timestamp
  entity.emittedBy = event.address
  entity.save()
}
