import { Dictionary, Constructor } from 'src/types';
import { interfaces, Container } from 'inversify';
import { moduleConnect } from 'src/elements/module-connect.mixin';
import { LitElement } from 'lit-element';
import { MicroModule } from 'src/orchestrator/micro.module';

export const ApolloFeature = {Client: 'client'}


export type MicroFeature = Dictionary<interfaces.ServiceIdentifier<any>>;

export interface FeatureProvider {
  feature: MicroFeature;
  requires: Array<MicroFeature>;
  provider: (container: interfaces.Container) => void;
}

export const gqlSchemaFeature = {Schema: FeatureProvider}

export const ApolloProvider: FeatureProvider = {
  feature: ApolloFeature,
  requires: [gqlSchemaFeature],
  provider: (container: interfaces.Container) => {
    container.bind(FeatureProvider).toConstantValue(3);
    
  }
}

class MyModule extends MicroModule {
  requires = [ApolloProvider]
  provides = []

  async onLoad(container: interfaces.Container) {
    
  }

}

function d() {
  let m: MicroModule = undefined;

  return m
}

d()