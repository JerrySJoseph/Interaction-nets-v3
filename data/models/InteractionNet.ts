import { uniqueId } from "lodash";
import { ResultNode } from "./arithmeticNodes";
import Link from "./link";
import Node, { INode } from "./node";

export interface INet{
    nodes:INode[];
}

// export default class InteractionNet {
//     public nodes: Node[] = [];
//     public links: Link[] = [];
//     private linkMap: Record<string, string> = {}
//     private nodeMap: Record<string, Node> = {}

//     constructor(public id:string=uniqueId()){

//     }


//     private createLink(source: Node, target: Node) {
//     }

//     private calculateLinkCordinates() {

//     }

//     public addNode(node: Node) {
//         this.nodes.push(node);
//     }


//     public reduce() {

//         console.log('calling reduce')
//         const nodestoremove: string[] = [];
//         const linkstoremove: string[] = [];

//         for (let node of this.nodes) {

//             //if we find any operator node in the interactio net
//             if (node.type === 'Operator') {

//                 //gather all the parameter nodes first if it is a constant (number node)
//                 const params: number[] = [];
//                 let index = 0;
//                 for (let link of node.links) {
//                     if (link.target.type === 'Constant') {
//                         params.push(link.target.value as number);
//                         //remove this link from this nodes llnks
//                         linkstoremove.push(link.id);
//                         nodestoremove.push(link.target.id);
//                         ++index;
//                         if (index >= node.links.length)
//                             nodestoremove.push(node.id);
//                     }
//                 }

//                 if (params.length > 0) {
//                     //compute results according to the operation
//                     const result = params.reduce((acc, curr) => {
//                         if (node.value === '+')
//                             return acc + curr;
//                         else if (node.value === '*')
//                             return acc * curr;
//                         else if (node.value === '-')
//                             return acc - curr;
//                         else if (node.value === '/')
//                             return acc / curr;
//                         else if (node.value === '%')
//                             return acc % curr;
//                         return acc;
//                     })

//                     //Debug
//                     console.log('Operator',node.value)
//                     console.log('params',params);
//                     console.log('reduced result:',result)

//                     //create a result node
//                     const resultNode = new ResultNode(result);
//                     this.nodes.push(resultNode);
                    
//                 }

//                 this.nodes = this.nodes.filter((item) => !nodestoremove.includes(item.id))
//             }
//         }
//     }
// }



