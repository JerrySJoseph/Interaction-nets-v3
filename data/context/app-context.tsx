import { LoadingOverlay } from "@mantine/core";
import { uniqueId } from "lodash";
import { number } from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import AppLayout from "../../ui/layouts/applayout/AppLayout";
import { reduceInet } from "../../utils/InetUtils";
import { AdditionNode, DivisionnNode, ModuloNode, MultiplicationNode, NumberNode, SubtractionNode } from "../models/arithmeticNodes";
import { INet } from "../models/InteractionNet";
import Link, { generateNewLink, ILink } from "../models/link";
import Node, { generateNewNode, INode } from "../models/node";


interface AppContextProps {
    inet: INet,
    resultInet:INet,
    links:ILink[];
    resultlinks:ILink[];
    currentInetIndex: number,
    updateNode:(newNode:INode)=>any,
    addNode:(node:INode)=>any,
    reduceCurrentInet: () => any
    onNodeMoved:(newPosX:number,newPosY:number,nodeId:string)=>any
}

const defaultAppContext: AppContextProps = {
    inet: { nodes: [] },
    links: [],
    currentInetIndex: -1,
    reduceCurrentInet: function () {
        throw new Error("Function not implemented.");
    },
    onNodeMoved: function (newPosX: number, newPosY: number, nodeId: string): () => any {
        throw new Error("Function not implemented.");
    },
    addNode: function (node: INode) {
        throw new Error("Function not implemented.");
    },
    resultInet: { nodes: [] },
    resultlinks: [],
    updateNode: function (newNode: INode) {
        throw new Error("Function not implemented.");
    }
}

export const AppContext = createContext<AppContextProps>(defaultAppContext)

export const useAppContext = () => useContext(AppContext)

interface AppContextProviderProps {
    children?: React.ReactNode
}



export const AppContextProvider = ({ children }: AppContextProviderProps) => {


    const [loading, setLoading] = useState<boolean>(false);
    const [inet, setInet] = useState<INet>({nodes:[]});
    const [resultInet, setResultInet] = useState<INet>({nodes:[]});
    const [currentIdx, setCurrentIdx] = useState<number>(-1);
    const [links,setLinks]=useState<ILink[]>([]);
    const [resultLinks,setResultLinks]=useState<ILink[]>([]);


    useEffect(() => {

        const additionNode=generateNewNode('Operator','+');
        const num1=generateNewNode('Constant',1);
        const num2=generateNewNode('Constant',7);

        const multiplicationNode=generateNewNode('Operator','*');
        const num3=generateNewNode('Constant',34);
        //const num4=generateNewNode('Constant',56);

        const link1=generateNewLink(additionNode,num1);
        const link2=generateNewLink(additionNode,num2);

        const link3=generateNewLink(multiplicationNode,num3);
       // const link4=generateNewLink(multiplicationNode,num4);


        

        setLinks([link1,link2,link3]);
        additionNode.links.push(link1,link2);
        multiplicationNode.links.push(link3);


        setInet({
            nodes:[
                additionNode,
                num1,
                num2,
                multiplicationNode,
                num3,
                
            ]
        })
       // resetLink(additionNode.x,additionNode.y,additionNode.id)
        
    }, [])

    
   
    function resetLink(newPosX:number,newPosY:number,nodeId:string){
        const newLinks=links.map(l=>{

            const xoffset=0;
            const yoffset=0;
            if(l.source.id===nodeId){
                l.source.x=newPosX+xoffset;
                l.source.y=newPosY+yoffset;
                
            }
            if(l.target.id===nodeId){
                l.target.x=newPosX+xoffset;
                l.target.y=newPosY+yoffset;
            }
            return l;
        })
        setLinks(newLinks);
    }


    function updateNode(newNode:INode){
        setInet({
            nodes:inet.nodes.map(currentNode=>currentNode.id===newNode.id?newNode:currentNode)
        })
    }

    function onNodeMoved(newPosX:number,newPosY:number,nodeId:string){
        let newInet:INet={nodes:[]};
        newInet.nodes=inet.nodes.map(n=>{
            if(n.id===nodeId){
                //console.log(nodeId,newPosX,newPosY)
                return {
                    ...n,
                    x:newPosX,
                    y:newPosY
                }
            }
            return n;
        })
        
        resetLink(newPosX,newPosY,nodeId);
        setInet(newInet);
    }
    

    function addNode(node:INode){
        setInet({
            ...inet,
            nodes:[
                ...inet.nodes,
                node
            ]
        })
    }

    function reduceCurrentInet() {
        const[newInet,linksToremove]=reduceInet(inet);
        setResultInet({...newInet});
        setResultLinks([...links.filter(l=>!linksToremove.includes(l.id))])
    }

    const value: AppContextProps = {
        inet,
        links,
        currentInetIndex: currentIdx,
        reduceCurrentInet,
        onNodeMoved: onNodeMoved,
        addNode,
        resultInet,
        updateNode,
        resultlinks: resultLinks
    };



    return <AppContext.Provider value={value}>
        {loading ? <LoadingOverlay visible /> :
            <AppLayout>
                {children}
            </AppLayout>}
    </AppContext.Provider>
}
