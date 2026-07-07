import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../component/layout/Sidebar";
import { useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";

export default function SidebarContainer({onClose}) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();

    const menuItems = [
        { label: "Dashboard", icon: "home", path: "/dashboard" },
        { label: "Jobs", icon: "board", path: "/jobs", matchPaths: ["/jobs", "/job-preferences"] },
        { label: "Statistics", icon: "stats", path: "/stats" },
        { label: "Resume Builder", icon: "resume", path: "/resume" },
        { label: "Score my Resume", icon: "score", path: "/score" },
        { label: "AI Answer Generator", icon: "ai", path: "/ai" },
        { label: "Cover Letter Generator", icon: "cover", path: "/coverLetter" },
        { label: "LinkedIn Tools", icon: "linkedin", path: "/linkedin" },
    ];

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
        } catch (e) {
            console.error(e);
        } finally {
            dispatch(logout());
            navigate("/login", { replace: true });
        }
    };

    return (
        <Sidebar
            menuItems={menuItems}
            activePath={location.pathname}
            onNavigate={(path) => {
                navigate(path);
                if (onClose) onClose();
            }}
            onLogout={handleLogout}
        />
    );
}
