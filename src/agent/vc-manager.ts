import { IAgentPlugin } from '@veramo/core'
import {
  IVCManager,
  IVCManagerDeleteArgs,
  IVCManagerGetArgs,
  IVCManagerSaveArgs,
  IVCManagerGetResult,
  IVCManagerListResult,
  IVCManagerListArgs,
} from '../types/IVCManager'
import { schema } from '../index'
import { AbstractVCStore } from '../vc-store/abstract-vc-store'
import { isSubset } from '../util/subset'

/**
 * {@inheritDoc IVCManager}
 * @beta
 */

export class VCManager implements IAgentPlugin {
  readonly schema = schema.IVCManager

  readonly methods: IVCManager = {
    getVC: this.getVC.bind(this),
    deleteVC: this.deleteVC.bind(this),
    listVCS: this.listVCS.bind(this),
    saveVC: this.saveVC.bind(this),
  }

  private store: AbstractVCStore

  constructor(options: { store: AbstractVCStore }) {
    this.store = options.store
  }

  public async getVC(args: IVCManagerGetArgs): Promise<IVCManagerGetResult> {
    const vc = await this.store.get({ id: args.id })
    return { vc: vc }
  }
  public async saveVC(args: IVCManagerSaveArgs): Promise<boolean> {
    const res = await this.store.import(args.vc)
    return res
  }
  public async deleteVC(args: IVCManagerDeleteArgs): Promise<boolean> {
    const res = await this.store.delete({ id: args.id })
    return res
  }
  public async listVCS(args: IVCManagerListArgs): Promise<IVCManagerListResult> {
    let vcs = await this.store.list()
    if (args.query) {
      console.log('VCS:', vcs, 'Filtering: ', args.query)
      vcs = vcs.filter((i) => {
        return isSubset(i, args.query as object)
      })
    }
    return { vcs: vcs }
  }
}
