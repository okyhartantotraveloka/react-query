import React from 'react';
import Link from 'next/link';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


const Sidebar = () => {
    return (
        <ProSidebar style={{
            height: '100%'
        }}>
            <Menu iconShape="square">
                <MenuItem>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/basic">
                        <a>Basic</a>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/core">
                        <a>Core</a>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/pagination">
                        <a>Pagination</a>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/infinite-scroll">
                        <a>Infinite scroll</a>
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link href="/auto-fetching">
                        <a>Auto Fetching</a>
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link href="/disabled-query">
                        <a>Disabled Query</a>
                    </Link>
                </MenuItem>
                {/* <SubMenu title="Components">
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu> */}
            </Menu>
        </ProSidebar>
    )
}

export default Sidebar;