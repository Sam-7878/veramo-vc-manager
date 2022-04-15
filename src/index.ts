/**
 * @public
 */
const schema = require('../plugin.schema.json')
export { schema }
export { VCManager } from './agent/vc-manager'
export { MemoryVCStore } from './vc-store/vc-store'
export { SnapDIDStore, SnapKeyStore, SnapPrivateKeyStore, SnapVCStore } from './snap-store/snapDataStore'
export * from './types/IVCManager'
