import React from "react";
import { CgProfile } from "react-icons/cg";

function Header() {
    return(
        <div class="header">
            <h1 class="leave-icon">LEAVE MANAGEMENT</h1>
            <div class="header-links">
                <a href="/">HOME</a>
                <a href="/create-leave">CREATE LEAVE</a>
                <a href="/manage-leave">MANAGE LEAVE</a>
                <a href="/data-analysis">DATA ANALYSIS</a>
            </div>
            <a class="profile-icon" href="/profile"><CgProfile /></a>
        </div>
    );
}

export default Header;