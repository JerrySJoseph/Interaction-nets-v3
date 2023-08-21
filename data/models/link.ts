import { uniqueId } from "lodash";
import Node, { INode } from "./node";


export interface ILink{
    id:string,
    source:INode,
    target:INode
}


export function generateNewLink(source:INode,target:INode):ILink{
    return {
        id:uniqueId(),
        source,
        target
    }
}

export default class Link {
    public id:string='';

    constructor(public source: Node, public target: Node) {
        source.links.push(this);
        target.links.push(this);
        this.id=uniqueId();
    }
}