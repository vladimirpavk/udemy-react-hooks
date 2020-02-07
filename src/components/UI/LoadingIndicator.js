import React from 'react';

import './LoadingIndicator.css';

const LoadingIndicator = (props) => (
  <div className="lds-ring">
    <div>
      { props.children }
    </div>
  </div>
);

export default LoadingIndicator;
