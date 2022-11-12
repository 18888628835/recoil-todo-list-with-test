import React from 'react';

const Save = () => {
  const onSave = async () => {
    await fetch('/xxx');
  };
  return <button onClick={onSave}>Save</button>;
};

export default Save;
