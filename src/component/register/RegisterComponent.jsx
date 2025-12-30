import React from "react";
import './animation.css';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Typography,
    Button,
    Divider,
} from "@mui/material";
import CommonButton from "../common/CommonButton";
import { useNavigate } from "react-router-dom";

export default function RegisterComponent({
    type = "register",
}) {

    const navigate = useNavigate()

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                overflow: "hidden",
            }}
        >
            {/* LEFT PANEL */}
            <Box
                sx={{
                    position: "relative",
                    width: "45%",
                    background: "linear-gradient(135deg, #1E2B5C, #27C4D6)",
                    color: "white",
                    px: 6,
                    py: 8,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {/* Pattern Overlay */}
                <Box
                    className="login-bg"
                />

                {/* Content */}
                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Typography sx={{ fontSize: 80, opacity: 0.4 }}>“</Typography>

                    <Typography sx={{ fontSize: 20, lineHeight: 1.6, mt: 4, fontFamily: "MyFont" }}>
                        We’ve decoded the hiring process. Our portal doesn't just host jobs; it
                        prepares you to win them. By instantly scanning job requirements and
                        scoring your resume’s compatibility, we give you the data-backed edge
                        you need to bypass the bots and get your resume into human hands.
                    </Typography>
                </Box>

                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>
                        Team HireLens
                    </Typography>
                    <Typography sx={{ opacity: 0.8 }}>
                        Ai-powered job tracker
                    </Typography>
                </Box>
            </Box>

            {/* RIGHT PANEL */}
            <Box
                sx={{
                    width: "55%",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Card
                    elevation={0}
                    sx={{
                        width: "100%",
                        maxWidth: 420,
                    }}
                >
                    <CardContent>
                        <Box
                            component="img"
                            src="/hr text+logo.png" // replace with your public folder image
                            alt="HireLens Logo"
                            sx={{
                                width: 120, // adjust as needed
                                height: "auto",
                                display: "block",
                                mx: "auto",
                                mb: -3,
                            }}
                        />
                        <Typography variant="h4" sx={{ mb: 3, fontFamily: "Heading", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {type === "login" ? "Login" : "Welcome"}
                        </Typography>

                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2, py: 1.2, borderRadius: 2 }}
                        >
                            Continue with Google
                        </Button>

                        <Divider sx={{ my: 2 }}>OR</Divider>

                        {type === "register" ?
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    sx: {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        : null}

                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                sx: {
                                    borderRadius: 2,
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                sx: {
                                    borderRadius: 2,
                                },
                            }}
                        />

                        <CommonButton text= {type === "register" ? "Register" : "Login"} color="#22678c" sx={{ width: "100%", marginTop: "5px" }} />

                        <Typography
                            sx={{
                                textAlign: "center",
                                mt: 3,
                                fontSize: 14,
                            }}
                        >
                            {type === "register" ? `Already have an account? ${" "}` : `Don't have an account? ${" "}`}
                            <span style={{ color: "#22678c", fontWeight: 600, cursor: "pointer" }} onClick={() => {type === "register" ? navigate("/login") : navigate("/register")}}>
                                {type === "register" ? "Login" : "Register"}
                            </span>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
