import { uniqueId } from "lodash";

import Link from "./link";
import {ILink} from './link';


export type NodeType = 'Constant' | 'Operator' | 'Result';
export type Operator = '+' | '-' | '*' | '/' | '%';

export interface INode{
    x:number,
    y:number,
    id:string
    type:NodeType,
    links:ILink[],
    value:number|Operator
}


export function generateNewNode(type:NodeType,value:Operator|number):INode{
    return{
        x:Math.random()*500,
        y:Math.random()*500,
        id:uniqueId(),
        type,
        value,
        links:[]
    }
}

export default abstract class Node {
    public x = Math.floor(Math.random()*600);
    public y = Math.floor(Math.random()*600);
    public id:string='';

    constructor(public type: NodeType, public links: Link[] = [], public value: number | Operator = 0) {
        this.id=uniqueId();
    }

    public setCordinates(x:number,y:number){
        this.x=x;
        this.y=y;
    }
}