import { IAgent } from "./agent";

export interface IWire {
    id:string
    from: IAgent;
    to: IAgent;
}