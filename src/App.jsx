import React, { useCallback,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import defaultDiagram from './assets/diagram.json';
import ReactFlow, {
  addEdge as createEdge,
  Background,
  Controls,
  MiniMap,
} from 'react-flow-renderer';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import CustomNode from './components/CustomNode';
import { addNode, deleteNode, addEdge, setDiagram } from './utills/diagramSlice';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;


const DiagramArea = styled.div`
  flex: 1;
  display: flex;
  height: 100%; 
  width:100%;
  background-color: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  margin: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;


function App() {
  const nodes = useSelector((state) => state.diagram.nodes);
  const edges = useSelector((state) => state.diagram.edges);
  const dispatch = useDispatch();

  const onConnect = useCallback(
    (params) => {
      if (params.source && params.target) {
        dispatch(addEdge(createEdge(params)));
      } else {
        console.error('Invalid connection parameters:', params);
      }
    },
    [dispatch]
  );
  
  
  const nodeTypes = {
    custom: CustomNode, 
  }
  useEffect(() => {
    dispatch(setDiagram(defaultDiagram));
  }, [dispatch]);
  
  const saveDiagram = () => {
    const diagram = { nodes, edges };
    const diagramJSON = JSON.stringify(diagram, null, 2);
    const blob = new Blob([diagramJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagram.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadDiagram = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const diagram = JSON.parse(e.target.result);
        dispatch(setDiagram(diagram));
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container>
      <Sidebar
        addNode={(label) => dispatch(addNode(label))}
        deleteNode={(id) => dispatch(deleteNode(id))}
        nodes={nodes}
        saveDiagram={saveDiagram}
        loadDiagram={loadDiagram}
      />
      <DiagramArea>
      <ReactFlow
  nodes={nodes}
  edges={edges}
  onConnect={(params) => {
    if (params.source && params.target) {
      dispatch(addEdge(createEdge(params)));
    } else {
      console.error('Invalid connection parameters:', params);
    }
  }}
  fitView
  nodeTypes={nodeTypes}
>
  <Background variant="dots" gap={12} size={1} />
  <Controls />
  <MiniMap 
  nodeColor={(node) => {
    if (node.type === 'input') return 'blue';
    return '#ffcc00'; // Default color for other nodes
  }}
  zoomable
  pannable
  style={{ height: 120, width: 180 }} // Custom size
/>

</ReactFlow>

      </DiagramArea>
    </Container>
  );
}

export default App;
