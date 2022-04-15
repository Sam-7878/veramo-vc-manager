import { VerifiableCredential } from '@veramo/core'

/**
 * An abstract class for the {@link @veramo/vc-manager#VCManager} identifier store
 * @public
 */
export abstract class AbstractVCStore {
  abstract import(args: VerifiableCredential): Promise<boolean>
  abstract get(args: { id: number }): Promise<VerifiableCredential | null>
  abstract delete(args: { id: number }): Promise<boolean>
  abstract list(): Promise<VerifiableCredential[]>
}
