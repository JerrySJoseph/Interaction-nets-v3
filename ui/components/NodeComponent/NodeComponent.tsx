import React, { useCallback, useEffect, useState } from 'react'
import Node, { INode } from '../../../data/models/node'
import Draggable from '../Draggable/Draggable';
import LinkComponent from '../LineComponent/LinkComponent';

interface NodeComponentProps {
    node: INode,
    onMove: (posX: number, posY: number,nodeId:string) => any
}

const NodeComponent = (props: NodeComponentProps) => {

    const { node, onMove } = props;
    const [x, setX] = useState<number>(node.x);
    const [y, setY] = useState<number>(node.y);

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });



    const handleMouseDown = useCallback((e: MouseEvent) => {
        setIsDragging(true);
        setDragOffset({ x: x - e.clientX, y: y - e.clientY });

        console.log(e.clientX, e.clientY)

    }, [x, y]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            const newX = e.clientX + dragOffset.x;
            const newY = e.clientY + dragOffset.y;
            setX(newX);
            setY(newY);
            onMove && onMove(newX - x, newY - y,props.node.id);
        }
    }, [isDragging, x, y, dragOffset, onMove]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);

    }, []);

    // Use useEffect to add global mousemove and mouseup event listeners
    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const getFillColor = () => {
        if (node.type === 'Constant')
            return 'lightblue';
        else if (node.type === 'Operator')
            return 'lightgreen';
        else
            return 'yellow';
    }

    return (
        <Draggable x={x} y={y} onDrage={(x,y)=>onMove(x, y,props.node.id)}>
            <div className="node" style={{backgroundColor:getFillColor()}}>
                {node.value && node.value}
            </div>
            
        </Draggable>

    );
}

export default NodeComponent