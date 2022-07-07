import React from 'react';
import Sidebar from '../Sidebar';

const Layout = (props) => {
    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default Layout;