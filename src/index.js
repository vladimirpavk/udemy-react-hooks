import React from 'react';
import ReactDOM from 'react-dom';

import AuthProvider from './components/context/auth-context';

import './index.css';
import App from './App';

const MainApp = (props)=>(
    <AuthProvider>
        <App />
    </AuthProvider>
)

ReactDOM.render(<MainApp />, document.getElementById('root'));
