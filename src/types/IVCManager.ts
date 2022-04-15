import { IPluginMethodMap, IAgentContext, IDIDManager, IResolver } from '@veramo/core'
import { VerifiableCredential } from '@veramo/core'
/**
 * My Agent Plugin description.
 *
 * This is the interface that describes what your plugin can do.
 * The methods listed here, will be directly available to the veramo agent where your plugin is going to be used.
 * Depending on the agent configuration, other agent plugins, as well as the application where the agent is used
 * will be able to call these methods.
 *
 * To build a schema for your plugin using standard tools, you must link to this file in package.json.
 * Example:
 * ```
 * "veramo": {
 *    "pluginInterfaces": {
 *      "IMyAgentPlugin": "./src/types/IMyAgentPlugin.ts"
 *    }
 *  },
 * ```
 *
 * @beta
 */
export interface IVCManager extends IPluginMethodMap {
  /**
   * Your plugin method description
   *
   * @param args - Input parameters for this method
   * @param context - The required context where this method can run.
   *   Declaring a context type here lets other developers know which other plugins
   *   need to also be installed for this method to work.
   */
  getVC(args: IVCManagerGetArgs): Promise<IVCManagerGetResult>
  saveVC(args: IVCManagerSaveArgs): Promise<boolean>
  deleteVC(args: IVCManagerDeleteArgs): Promise<boolean>
  listVCS(): Promise<IVCManagerListResult>
}

/**
 * Arguments needed for {@link VCManager.getVC}
 * To be able to export a plugin schema, your plugin methods should use an `args` parameter of a
 * named type or interface.
 *
 * @beta
 */
export interface IVCManagerGetArgs {
  /**
   * Id of VC
   */
  id: number
}
/**
 * Arguments needed for {@link VCManager.deleteVC}
 * To be able to export a plugin schema, your plugin methods should use an `args` parameter of a
 * named type or interface.
 *
 * @beta
 */
export interface IVCManagerDeleteArgs {
  /**
   * Id of VC
   */
  id: number
}
/**
 * Arguments needed for {@link VCManager.saveVC}
 * To be able to export a plugin schema, your plugin methods should use an `args` parameter of a
 * named type or interface.
 *
 * @beta
 */
export interface IVCManagerSaveArgs {
  /**
   * Id of VC
   */
  vc: VerifiableCredential
}

/**
 * Result of {@link VCManager.getVC}
 * To be able to export a plugin schema, your plugin return types need to be Promises of a
 * named type or interface.
 *
 * @beta
 */
export type IVCManagerGetResult = {
  vc: VerifiableCredential | null
}

/**
 * Result of {@link VCManager.listVCS}
 * To be able to export a plugin schema, your plugin return types need to be Promises of a
 * named type or interface.
 *
 * @beta
 */
export type IVCManagerListResult = {
  vcs: VerifiableCredential[]
}
