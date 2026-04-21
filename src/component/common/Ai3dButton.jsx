import { Tooltip, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Ai3dModel from "../common/Ai3dModel";

export default function Ai3dButton({ onClick, title }) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        // Hide the initial tooltip after 1.5s
        const timer = setTimeout(() => setOpen(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Tooltip
            title={title}
            arrow
            disableInteractive={true} // allows hover to take over later
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: "black",
                        color: "white",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        borderRadius: "8px",
                    }
                },
                arrow: {
                    sx: {
                        color: "black",
                    }
                }
            }}
            open={open}
            onOpen={() => setOpen(true)}   // show on hover
            onClose={() => setOpen(false)}
        >
            <Box
                onClick={onClick}
                sx={{
                    width: 72,
                    height: 72,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Ai3dModel />

            </Box>
        </Tooltip>
    );
}
