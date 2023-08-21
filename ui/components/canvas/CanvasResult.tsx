import { node } from 'prop-types';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../data/context/app-context';
import LinkComponent from '../LineComponent/LinkComponent';
import NodeComponent from '../NodeComponent/NodeComponent';

const CanvasResult = () => {

    const {resultInet,resultlinks,onNodeMoved}=useAppContext();
    // useEffect(()=>{
    //     console.log('New Inet',inet)
    // },[inet])

    

  return (
    <div className="canvas">
        {resultInet.nodes.map((n,idx)=><NodeComponent key={n.id} node={n} posx={n.x} posy={n.y} onMove={onNodeMoved}/>)}
        {resultlinks.length>0 && resultlinks.map(l=>(
                <LinkComponent key={l.id} x1={l.source.x} y1={l.source.y} x2={l.target.x} y2={l.target.y}/>
            ))}
    </div>
  )
}

export default CanvasResult