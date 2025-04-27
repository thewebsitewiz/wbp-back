export interface IConfig {
  __v: number;
  _id: string;
  name: string;
  value?: string;
  type: string;
  id: string;
}

export interface IConfigs extends Array<IConfig> {}
