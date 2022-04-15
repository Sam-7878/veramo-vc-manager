import { VerifiableCredential } from '@veramo/core'
import { AbstractVCStore } from './abstract-vc-store'

export class MemoryVCStore extends AbstractVCStore {
  private vcs: Record<number, VerifiableCredential> = {}

  async get({ id }: { id: number }): Promise<VerifiableCredential | null> {
    const vc = this.vcs[id]
    if (!vc) return null
    return vc
  }

  async delete({ id }: { id: number }) {
    delete this.vcs[id]
    return true
  }

  async import(args: VerifiableCredential) {
    this.vcs[args.kid] = { ...args }
    return true
  }

  async list(): Promise<VerifiableCredential[]> {
    const safeVCs = Object.values(this.vcs).map((key) => {
      const safeVC = key
      return safeVC
    })
    return safeVCs
  }
}
