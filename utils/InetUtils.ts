import { cloneDeep } from "lodash";
import { ResultNode } from "../data/models/arithmeticNodes";
import { INet } from "../data/models/InteractionNet";
import { ILink } from "../data/models/link";
import { INode } from "../data/models/node";

export function reduceInet(iNet: INet): [INet,string[],string[]] {
    const iNetClone = cloneDeep(iNet);

    console.log('calling reduce')
    const nodestoremove: string[] = [];
    const linkstoremove: string[] = [];

    for (let node of iNetClone.nodes) {

        //if we find any operator node in the interactio net
        if (node.type === 'Operator') {
           // console.log('operator', node.value)
            //gather all the parameter nodes first if it is a constant (number node)
            const params: number[] = [];
            let index = 0;
            for (let link of node.links) {
               // console.log('link', link.source.value, link.target.value)
                if (link.target.type === 'Constant') {
                    params.push(link.target.value as number);
                    //remove this link from this nodes llnks
                    linkstoremove.push(link.id);
                    nodestoremove.push(link.target.id);
                    ++index;
                    if (index >= node.links.length)
                        nodestoremove.push(node.id);
                }
            }

            if (params.length > 0) {
                //compute results according to the operation
                const result = params.reduce((acc, curr) => {
                    if (node.value === '+')
                        return acc + curr;
                    else if (node.value === '*')
                        return acc * curr;
                    else if (node.value === '-')
                        return acc - curr;
                    else if (node.value === '/')
                        return acc / curr;
                    else if (node.value === '%')
                        return acc % curr;
                    return acc;
                })

                //Debug
                console.log('Operator', node.value)
                console.log('params', params);
                console.log('reduced result:', result)

                //create a result node
                const resultNode = new ResultNode(result);
                iNetClone.nodes.push(resultNode);

            }

            iNetClone.nodes = iNetClone.nodes.filter((item) => !nodestoremove.includes(item.id))
        }
    }
    return [iNetClone,linkstoremove,nodestoremove];
}
