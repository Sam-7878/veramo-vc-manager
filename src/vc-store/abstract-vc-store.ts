import { VerifiableCredential } from '@veramo/core'

/**
 * An abstract class for the {@link VCManager} VC store
 * @public
 */
export abstract class AbstractVCStore {
  abstract import(args: VerifiableCredential): Promise<boolean>
  abstract get(args: { id: number }): Promise<VerifiableCredential | null>
  abstract delete(args: { id: number }): Promise<boolean>
  abstract list(): Promise<VerifiableCredential[]>
}
