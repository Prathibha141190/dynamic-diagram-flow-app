import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #333', borderRadius: '5px', backgroundColor: '#fff' }}>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ background: '#555' }}
      />
      <div>{data.label}</div>
      <Handle
        type="target"
        position="left"
        id="b"
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CustomNode;

