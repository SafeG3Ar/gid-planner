import React from 'react';

export default class Refresh extends React.Component {
  render() {
    const refreshPage = () => {
      window.location.reload();
    };

    return (
      <div>
        <h1>{Math.random()}</h1>
        <button onClick={refreshPage}>Refresh</button>
      </div>
    );
  }
}
