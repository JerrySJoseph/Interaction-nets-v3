import { IWire } from "./wire"

export type AgentTypes='SUCC'|'ADD'|'MUL'|'ZERO';

export interface IAgent {
    id: string,
    label: string,
    posX: number,
    posY: number,
    type:AgentTypes
    principalPort?:IWire
    auxilaryPorts:IWire[]
}