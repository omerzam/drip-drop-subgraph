import { Address } from '@graphprotocol/graph-ts'
import { User } from '../../generated/schema'

export function loadUser(address: Address): User {
  let userEntity = User.load(address.toHex())

  if (userEntity == null) {
    userEntity = new User(address.toHex())
    userEntity.isAdmin = false
    userEntity.isMinter = false
    userEntity.isOperator = false
  }

  userEntity.save()
  return userEntity
}
