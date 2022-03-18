import { Address } from '@graphprotocol/graph-ts'
import { User } from '../../generated/schema'

export function createAndReturnUser(address: Address): User {
  let userEntity = User.load(address.toHex())

  if (userEntity == null) {
    userEntity = new User(address.toHex())
  }

  userEntity.save()
  return userEntity
}
