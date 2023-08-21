// Draggable.tsx
import React, { useState, useRef, ReactNode } from 'react';

interface DraggableProps {
    children?: ReactNode,
    x: number,
    y: number,
    onDrage?: (posX: number, posY: number) => any
    onDragEnd?: (posX: number, posY: number) => any
    onDragStart?: (posX: number, posY: number) => any
}

const Draggable = ({ children, x, y, onDragEnd, onDragStart,onDrage }: DraggableProps) => {
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x, y });
    const dragStartPos = useRef({ x, y });

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        const x = e.clientX - position.x;
        const y = e.clientY - position.y
        dragStartPos.current = { x, y };
        onDragStart && onDragStart(x, y);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (dragging) {
            setPosition({
                x: e.clientX - dragStartPos.current.x,
                y: e.clientY - dragStartPos.current.y,
            });
            onDrage && onDrage(e.clientX - dragStartPos.current.x,e.clientY - dragStartPos.current.y)
        }
        
    };

    const handleMouseUp = () => {
        setDragging(false);
        onDragEnd && onDragEnd(position.x, position.y)
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                cursor: 'grab',
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}>
            {children}
        </div>
    );
};

export default Draggable;
