import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [
    { id: '1', type: 'input', position: { x: 250, y: 5 }, data: { label: 'Input Node' } },
  ],
  edges: [],
};

const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    addNode: (state, action) => {
      const id = (state.nodes.length + 1).toString();
      const newNode = {
        id,
        type: 'custom',
       
        position: { x: Math.random() * 250, y: Math.random() * 250 },
        data: { label: action.payload },
      };
      state.nodes.push(newNode);
    },
    deleteNode: (state, action) => {
      const id = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== id);
      state.edges = state.edges.filter((edge) => edge.source !== id && edge.target !== id);
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    setDiagram: (state, action) => {
      state.nodes = action.payload.nodes || [];
      state.edges = action.payload.edges || [];
    },
  },
});

export const { addNode, deleteNode, addEdge, setDiagram } = diagramSlice.actions;
export default diagramSlice.reducer;
