import { MetadataKey } from '../metaplex'
import { Creator } from '@metaplex-foundation/js'
export type ENDPOINT_NAME = 'mainnet-beta' | 'testnet' | 'devnet' | 'localnet' | 'lending'

export type ParsedAccount = {
  mint: string
  updateAuthority: string
  data: { creators: Creator[]; name: string; symbol: string; uri: string; sellerFeeBasisPoints: number }
  key: MetadataKey
  primarySaleHappened: boolean
  isMutable: boolean
  editionNonce: number
  masterEdition?: string
  edition?: string
}

export interface PromiseFulfilledResult<T> {
  status: 'fulfilled'
  value: T
}

export interface PromiseRejectedResult {
  status: 'rejected'
  reason: any
}

export type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult
