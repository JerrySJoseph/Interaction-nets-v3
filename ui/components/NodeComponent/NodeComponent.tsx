import React, { useCallback, useEffect, useState } from 'react'
import Node, { INode } from '../../../data/models/node'
import Draggable from '../Draggable/Draggable';
import LinkComponent from '../LineComponent/LinkComponent';

interface NodeComponentProps {
    node: INode,
    dragDisabled?: boolean,
    thumbnail?: boolean
    onMove?: (posX: number, posY: number, nodeId: string) => any
}

const NodeComponent = (props: NodeComponentProps) => {

    const { node, onMove = () => { }, dragDisabled = false, thumbnail = false } = props;

    const getClass = () => {
        if (node.type === 'Constant')
            return 'node-constant';
        else if (node.type === 'Operator')
            return 'node-operator';
        else if (node.type === 'Result')
            return 'node-result'
        else
            return '';
    }

    if(thumbnail){
        return <div className={`node ${getClass()} node-thumbnail`} id={node.id}>
                {node.value && node.value}
            </div>
    }

    return (
        <Draggable x={node.x} y={node.y} onDrag={(x, y) => onMove(x, y, props.node.id)} dragDisabled={dragDisabled || thumbnail}>
            <div className={`node ${getClass()}`} id={node.id}>
                {node.value && node.value}
            </div>
        </Draggable>

    );
}

export default NodeComponent