import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 300px;
  background-color: #343a40;
  color: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid #dee2e6;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 8px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  margin: 8px 0;
  padding: 8px;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

function Sidebar({ addNode, deleteNode, nodes, saveDiagram, loadDiagram }) {
  const handleAddNode = () => {
    const label = prompt('Enter node label:');
    if (label) {
      addNode(label);
    }
  };

  const handleDeleteNode = () => {
    const id = prompt('Enter node ID to delete:');
    if (id) {
      deleteNode(id);
    }
  };

  return (
    <SidebarContainer>
      <Button onClick={handleAddNode}>Add Node</Button>
      <Button onClick={handleDeleteNode}>Delete Node</Button>
      <Button onClick={saveDiagram}>Save Diagram</Button>
      <Input type="file" accept=".json" onChange={loadDiagram} />
    </SidebarContainer>
  );
}

export default Sidebar;
