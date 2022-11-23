import React from "react";
import "../App.css";
import {SideData} from "./SideData";

function Sidebar() {
    return (
        <div className="Sidebar">
            <lu className="SidebarList">
                {SideData.map((val,key) => {
                    return (
                        <li 
                        key={key}
                        className="row"
                        id={window.location.pathname == val.link ? "active" : "" }
                        onClick={() => {
                            window.location.pathname = val.link;
                            }}
                        >
                        <div>{val.icon}</div> <div>{val.title}</div>
                    </li>
                    );
                })}
            </lu>
        </div>
    );
}

export default Sidebar;