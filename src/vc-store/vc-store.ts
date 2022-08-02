import { VerifiableCredential } from '@veramo/core'
import { AbstractVCStore } from './abstract-vc-store'

export class MemoryVCStore extends AbstractVCStore {
  private vcs: Record<number, VerifiableCredential> = {}

  async get({ id }: { id: string }): Promise<VerifiableCredential | null> {
    const vc = this.vcs[0]
    if (!vc) return null
    return vc
  }

  async delete({ id }: { id: string }) {
    //delete this.vcs[id]
    return true
  }

  async import(args: VerifiableCredential) {
    this.vcs[args.kid] = { ...args }
    return true
  }

  async list(args: { querry?: any }): Promise<VerifiableCredential[]> {
    const safeVCs = Object.values(this.vcs).map((key) => {
      const safeVC = key
      return safeVC
    })
    return safeVCs
  }
}
