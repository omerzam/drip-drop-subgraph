import { Address } from '@graphprotocol/graph-ts'
import { DR_Token } from '../../generated/DR_TokenFactory/DR_Token'
import { DR_Token as DRTokenTemplate } from '../../generated/templates'
import { Token, Transaction } from '../../generated/schema'

export function loadToken(address: Address, transaction: Transaction): Token {
  let token = Token.load(address.toHex())
  if (token === null) {
    DRTokenTemplate.create(address)
    const tokenContract = DR_Token.bind(address)
    token = new Token(address.toHex())
    const nameResult = tokenContract.try_name()
    if (!nameResult.reverted) {
      token.name = nameResult.value
    }

    const symbolResult = tokenContract.try_symbol()
    if (!symbolResult.reverted) {
      token.symbol = symbolResult.value
    }

    // const decimalsResult = tokenContract.try_decimals()
    // if (!decimalsResult.reverted) {
    //   token.decimals = decimalsResult.value
    // }

    const totalSupplyResult = tokenContract.try_totalSupply()
    if (!totalSupplyResult.reverted) {
      token.totalSupply = totalSupplyResult.value
    }

    token.createdAtTx = transaction.id.toString()
    if (!nameResult.reverted && !symbolResult.reverted && !totalSupplyResult.reverted) {
      token.save()
    }
  }

  token.updatedAtTx = transaction.id.toString()
  return token
}
