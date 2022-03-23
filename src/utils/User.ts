import { Address } from '@graphprotocol/graph-ts'
import { Transaction, User } from '../../generated/schema'

export function loadUser(address: Address, transaction: Transaction): User {
  let userEntity = User.load(address.toHex())

  if (userEntity == null) {
    userEntity = new User(address.toHex())
    userEntity.isAdmin = false
    userEntity.isMinter = false
    userEntity.isOperator = false
    userEntity.createdAtTx = transaction.id.toString()
  }

  userEntity.updatedAtTx = transaction.id.toString()
  userEntity.save()
  return userEntity
}
