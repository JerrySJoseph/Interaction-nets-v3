import { Card, Grid } from '@mantine/core';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useAppContext } from '../../../data/context/app-context';
import { generateNewNode, INode, NodeType } from '../../../data/models/node';
import ControlPanel from '../ControlPanel/ControlPanel';
import LinkComponent from '../LineComponent/LinkComponent';
import NodeComponent from '../NodeComponent/NodeComponent';
import ToolSet, { ToolType } from '../ToolSet/ToolSet';




const CanvasEditor = () => {

  const { inet, links, onNodeMoved, addNode } = useAppContext();
  const [selectedNode, setSelectedNode] = useState<INode>();
  const [selectedTool, setSelectedTool] = useState<number>(-1)

  useEffect(() => {
    if (selectedNode)
      console.log(selectedNode);

  }, [selectedNode])

  const getCursor = () => {
    if (selectedTool == ToolType.NUMBER || selectedTool == ToolType.OPERATOR)
      return 'crosshair';
    return 'default';
  }


  //event delegation
  function handleOnCanvasClick(e: React.MouseEvent<HTMLDivElement>) {

    //get tbe target element
    const targetElement = e.target as Element;
    const rect = targetElement.getBoundingClientRect();

    const x = e.clientX - rect.left - 20; // x position within the element
    const y = e.clientY - rect.top - 20;  // y position within the element


    console.log(targetElement)
    //if clicked on a node
    if (targetElement.classList.contains('node')) {
      const nodeId = targetElement.id;
      console.log('node clicked', nodeId);
    }
    else {
      if (selectedTool < 0)
        return;
      else if (selectedTool === 0)
        addNode(generateNewNode('Constant', 10, x, y))
    }



  }

  return (
    <Grid style={{ height: '100%' }}>
      <Grid.Col span={1}>
        <ToolSet currentTool={selectedTool} onToolChange={setSelectedTool} />
      </Grid.Col>
      <Grid.Col span={8}>
        <div className="canvas" style={{ cursor: getCursor() }} onClick={handleOnCanvasClick}>
          {inet.nodes.map((n, idx) => <NodeComponent key={n.id} node={n} onMove={onNodeMoved} />)}
          {links.length > 0 && links.map(l => (
            <LinkComponent key={l.id} x1={l.source.x} y1={l.source.y} x2={l.target.x} y2={l.target.y} />
          ))}
        </div>
      </Grid.Col>
      <Grid.Col span={3}>
        <ControlPanel/>
      </Grid.Col>
    </Grid>
  )
}

export default CanvasEditor