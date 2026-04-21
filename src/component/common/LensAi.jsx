import { useEffect, useState } from 'react';
import './LensAi.css';
import { Tooltip } from '@mui/material';

export function LensAILogo({ onClick, title }) {

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
            placement="top"
            PopperProps={{
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, -12],
                        },
                    },
                ],
            }}
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
            <div className="neo-neural-container" onClick={onClick}>
                <video autoPlay loop muted className="neo-neural" style={{ pointerEvents: 'none' }}>
                    <source src="/simple ai pulse.webm" type="video/webm" />
                </video>
            </div>
        </Tooltip>
    );
}
