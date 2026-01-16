import React, { useState } from "react";
import { Box } from "@mui/material";
import Stats from "../../component/stats/Stats";

export default function StatsContainer() {
    const [stats] = useState({
        wishlist: [
            { id: 1, title: "Microsoft", company: "Microsoft", location: "California, USA", icon: "💻" },
            { id: 2, title: "Google", company: "Google", location: "Mountain View, USA", icon: "🔍" },
        ],
        applied: [
            { id: 3, title: "Amazon", company: "Amazon", location: "Seattle, USA", icon: "📦" },
        ],
        interviewing: [
            { id: 4, title: "Meta", company: "Meta", location: "Menlo Park, USA", icon: "📱" },
            { id: 5, title: "Apple", company: "Apple", location: "Cupertino, USA", icon: "🍎" },
        ],
        offer: [
            { id: 6, title: "Netflix", company: "Netflix", location: "Los Gatos, USA", icon: "🎬" },
        ],
    });

    return (
        <Box sx={{ p: 3 }}>
            <Stats stats={stats} />
        </Box>
    );
}