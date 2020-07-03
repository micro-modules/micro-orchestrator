import { interfaces } from 'inversify';

import { Dictionary, Constructor } from '../types';
import { MicroModule } from './micro-module';

/**
 * A MicroFeature is a set of services and injectable dependencies 
 * that can be provided by or depended on by MicroModules
 */
export type MicroFeature = Dictionary<interfaces.ServiceIdentifier<any>>;

/**
 * A FeatureProvider handles the binding of a MicroFeature in a particular way
 * 
 * The given container is where the MicroFeature should be bound to. 
 * When the provide function is executed, the container **must** have bound all services inside the MicroFeature definition.
 */
export interface FeatureProvider {
  feature: MicroFeature;
  dependsOn: Array<MicroFeature | Constructor<MicroModule>>;
  provide: (container: interfaces.Container) => void;
}
