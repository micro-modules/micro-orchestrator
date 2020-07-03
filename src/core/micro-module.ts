import { interfaces } from 'inversify';
import { MicroFeature, FeatureProvider } from './micro-feature';
import { Constructor } from '../types';
import { flatten } from '../utils';

/**
 * Basic building block for MicroOrchestrator applications
 *
 * MicroModules can provide and depend on MicroFeatures, or be composed from other MicroModules,
 * to form a hierarchical and scoped dependency injection application
 */
export abstract class MicroModule {
  /**
   * Features to be bound in the local container
   * These features will only be accessible by this module and all its children
   */
  internalFeatures: Array<FeatureProvider> = [];

  /**
   * External features to be registered in one of the parents module in the hierarchy
   * You can assume that these features will be bound when this module's `onLoad` is run
   * 
   * in order to include this module as a submodule,
   * the parent module must either bind them or redeclare them as external,
   * 
   */
  externalFeatures: Array<FeatureProvider> = [];

  /**
   * Specify dependencies to other MicroFeatures or MicroModules
   * This module will only begin to load when all their dependencies are present and loaded
   */
  dependencies: Array<Constructor<MicroModule> | MicroFeature> = [];

  /**
   * Submodules of this module, which will be loaded before this module
   * Use this to compose different modules into one big module
   */
  submodules: Array<MicroModule> = [];

  /**
   * Loading callback for the module to load, receiving the local container with all dependencies already loaded
   *
   * When this method is called, you can assume:
   *  - All feature providers for this module and its dependencies have been executed
   *  - All dependencies will be available and loaded
   *  - All submodules will be loaded
   * @param container the scoped container for this module. From this container, you can access the features provided by this module and all parents.
   */
  abstract async onLoad(container: interfaces.Container): Promise<void>;

  /** Helper methods */

  /**
   * Returns all external features from all submodules of this module
   */
  protected getExternalFeaturesFromAllSubmodules(): FeatureProvider[] {
    return flatten(Object.values(this.submodules).map((s) => Object.values(s.externalFeatures)))
  }
}
