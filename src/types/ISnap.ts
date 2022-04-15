import { IIdentifier, IKey } from '@veramo/core'
import { ManagedPrivateKey } from '@veramo/key-manager'
import { VerifiableCredential } from '@veramo/core'

export type MetamaskState = {
  didMethod: {
    privKey: string
    vcs: string[]
  }
}

export type MetamaskDIDRequest = any

export type FMethodCallback = (originString: string, requestObject: MetamaskDIDRequest) => Promise<unknown>

export const EmptyMetamaskState: () => MetamaskState = () => ({
  didMethod: {
    privKey: '',
    vcs: [],
  },
})

export interface Wallet {
  registerApiRequestHandler: (origin: unknown) => unknown
  registerRpcMessageHandler: (origin: unknown) => unknown
  request: (origin: any) => unknown
  send(options: { method: string; params: unknown[] }): unknown
  getAppKey(): Promise<string>
  updatePluginState(state: MetamaskState): void
  getPluginState(): MetamaskState
}

export interface State {
  [propName: string]: any
  //vcSnapState: VCState | undefined;
}

export interface VCState {
  [propName: string]: VCAccount
}

export type VCStateVeramo = VCState & {
  snapPrivateKeyStore: Record<string, ManagedPrivateKey>
  snapKeyStore: Record<string, IKey>
  identifiers: Record<string, IIdentifier>
}

export interface VCAccount {
  encPubKey: string
  encryptedData: string
}

export interface DecryptedVCData {
  pKey: string
  address: string
  vcs: Array<VerifiableCredential>
}

export interface Response {
  error?: string
  data?: any
}
