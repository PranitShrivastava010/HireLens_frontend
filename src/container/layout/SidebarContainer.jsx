import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../component/layout/Sidebar";

export default function SidebarContainer() {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { label: "Home", icon: "home", path: "/dashboard" },
        { label: "Board", icon: "board", path: "/board" },
        { label: "Statistics", icon: "stats", path: "/stats" },
        { label: "Resume Builder", icon: "resume" },
        { label: "Score my Resume", icon: "score" },
        { label: "AI Answer Generator", icon: "ai" },
        { label: "Cover Letter Generator", icon: "cover" },
        { label: "LinkedIn Tools", icon: "linkedin" },
    ];

    return (
        <Sidebar
            menuItems={menuItems}
            activePath={location.pathname}
            onNavigate={navigate}
        />
    );
}
