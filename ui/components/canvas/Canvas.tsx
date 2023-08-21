import { useEffect, useState } from 'react';
import { useAppContext } from '../../../data/context/app-context';
import LinkComponent from '../LineComponent/LinkComponent';
import NodeComponent from '../NodeComponent/NodeComponent';

const Canvas = () => {

    const {inet,links,onNodeMoved}=useAppContext();
    const [viewBox, setViewBox] = useState({ minX: 0, minY: 0, width: 800, height: 800 });


    // useEffect(()=>{
    //     console.log('New Inet',inet)
    // },[inet])

    

  return (
    <div className="canvas">
        {inet.nodes.map((n,idx)=><NodeComponent key={n.id} node={n} onMove={onNodeMoved}/>)}
        {links.length>0 && links.map(l=>(
                <LinkComponent key={l.id} x1={l.source.x} y1={l.source.y} x2={l.target.x} y2={l.target.y}/>
            ))}
    </div>
  )
}

export default Canvas