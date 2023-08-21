import { useAppContext } from '../../../data/context/app-context';
import LinkComponent from '../LineComponent/LinkComponent';
import NodeComponent from '../NodeComponent/NodeComponent';

const CanvasEditor = () => {

  const { inet, links, onNodeMoved, updateNode } = useAppContext();
  

  return (
    <div className="canvas">
      {inet.nodes.map((n, idx) => <NodeComponent key={n.id} node={n} posx={n.x} posy={n.y} onMove={onNodeMoved} onNodeClicked={()=>{}} />)}
      {links.length > 0 && links.map(l => (
        <LinkComponent key={l.id} x1={l.source.x} y1={l.source.y} x2={l.target.x} y2={l.target.y} />
      ))}

      
    </div>
  )
}

export default CanvasEditor