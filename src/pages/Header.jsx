import React from "react";
import { SlLogout } from "react-icons/sl";

function Header() {
    return(
        <div class="header">
            <h1 class="leave-icon">LEAVE MANAGEMENT</h1>
            <div class="header-links">
                <a href="/create-leave">CREATE LEAVE</a>
                <a href="/manage-leave">MANAGE LEAVE</a>
                <a href="/data-analysis">DATA ANALYSIS</a>
            </div>
            <a class="logout-icon" href="/"><SlLogout /></a>
        </div>
    );
}

export default Header;