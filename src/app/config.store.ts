import { Template } from './v1/template';
import { ComponentStore } from "@ngrx/component-store";

export interface ConfigState{
  config:any;
  template:Template|null
}

export class ConfigStore extends  ComponentStore<ConfigState> {
  constructor(){
    super({config:null,template:null});
  }

  // readonly addConfig = this.updater((state,config))
}
