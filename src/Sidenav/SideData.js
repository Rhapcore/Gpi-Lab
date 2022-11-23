import React from "react";
import GroupIcon from '@mui/icons-material/Group';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Divider from '@mui/material/Divider';

export const SideData = [
    {
        title: "Dashboard",
        icon: <LeaderboardIcon/>,
        path: "/Dashboard"
    },
    {
        title: "Cuentas Usuarios",
        icon: <GroupIcon/>,
        path: "/Usuarios"
    },
    {
        title: "Opciones",
        icon: <SettingsIcon/>,
        link: "/Opciones"
    },
    {
        title: "Cerrar Session",
        icon: <PersonOffIcon/>,
        link: "/Cerrar Session"
    },
]   