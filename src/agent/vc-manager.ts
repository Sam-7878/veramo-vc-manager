import { IAgentPlugin } from '@veramo/core'
import {
  IVCManager,
  IVCManagerDeleteArgs,
  IVCManagerGetArgs,
  IVCManagerSaveArgs,
  IVCManagerGetResult,
  IVCManagerListResult,
} from '../types/IVCManager'
import { VerifiableCredential } from '@veramo/core'
import { schema } from '../index'
import { AbstractVCStore } from '../vc-store/abstract-vc-store'

/**
 * {@inheritDoc IVCManager}
 * @beta
 */
export class VCManager implements IAgentPlugin {
  readonly schema = schema.IVCManager

  // map the methods your plugin is declaring to their implementation
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
  // // list the event types that this plugin cares about.
  // // When the agent emits an event of these types, `MyAgentPlugin.onEvent()` will get called.
  // readonly eventTypes = ['validatedMessage']

  // // the event handler for the types listed in `eventTypes`
  // public async onEvent(event: { type: string; data: any }, context: IRequiredContext) {
  //   // you can emit other events
  //   await context.agent.emit('my-event', { foo: event.data.id })
  //   // or call other agent methods that are declared in the context
  //   const allDIDs = await context.agent.didManagerFind()
  // }

  // /** {@inheritDoc IMyAgentPlugin.myPluginFoo} */
  // private async myPluginFoo(args: IMyAgentPluginFooArgs, context: IRequiredContext): Promise<IMyAgentPluginFooResult> {
  //   // you can call other agent methods (that are declared in the `IRequiredContext`)
  //   const didDoc = await context.agent.resolveDid({ didUrl: args.did })
  //   // or emit some events
  //   await context.agent.emit('my-other-event', { foo: 'hello' })
  //   return { foobar: args.bar }
  // }

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
  public async listVCS(): Promise<IVCManagerListResult> {
    const vcs = await this.store.list()
    return { vcs: vcs }
  }
}
