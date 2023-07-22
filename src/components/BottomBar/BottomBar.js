import { Link } from 'react-router-dom';
import React from 'react';
import './BottomBar.css'
import { AiOutlineHome, AiOutlineHistory, AiOutlineUser } from 'react-icons/ai'

function BottomBar() {
    return (
        <div id="BottomBar">
            <Link to={"/"}><AiOutlineHome /></Link>
            <Link to={"/recently-viewed"}><AiOutlineHistory /></Link>
            {/* <AiOutlineUser /> */}
        </div>
    )
}

export default BottomBar;