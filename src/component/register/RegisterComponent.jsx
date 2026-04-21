import React, { useRef } from "react";
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
    formData,
    onChange,
    onSubmit,
    onVerifyOtp,
    error,
    step,
    otp,
    setOtp,
}) {

    const navigate = useNavigate()
    const otpRefs = useRef([]);

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = otp.split("");
        newOtp[index] = value;
        setOtp(newOtp.join(""));

        if (value && index < 5) {
            otpRefs.current[index + 1].focus();
        }
    };

    const heading =
        type === "login"
            ? "Login"
            : step === 1
                ? "Welcome"
                : "Verify OTP";

    const buttonText =
        type === "login"
            ? "Login"
            : step === 1
                ? "Register"
                : "Verify OTP";

    const buttonAction =
        type === "login"
            ? onSubmit
            : step === 1
                ? onSubmit
                : () => onVerifyOtp(otp);

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
                            {heading}
                        </Typography>

                        {(type === "login" || (type === "register" && step === 1)) && (
                            <>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mb: 2, py: 1.2, borderRadius: 2 }}
                                >
                                    Continue with Google
                                </Button>
                                <Divider sx={{ my: 2 }}>OR</Divider>
                            </>
                        )}



                        {type === "register" && step === 1 && (
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                value={formData.name}
                                onChange={(e) => onChange("name", e.target.value)}
                                InputProps={{
                                    sx: {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        )}

                        {(type === "login" || (type === "register" && step === 1)) && (
                            <>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    value={formData.email}
                                    onChange={(e) => onChange("email", e.target.value)}
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
                                    value={formData.password}
                                    onChange={(e) => onChange("password", e.target.value)}
                                    InputProps={{
                                        sx: {
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                            </>
                        )}

                        {type === "register" && step === 2 && (
                            <>
                                <Typography align="center" mb={2}>
                                    Enter the 6-digit OTP sent to your email
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 1,
                                        mb: 2,
                                    }}
                                >
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <TextField
                                            key={index}
                                            inputRef={(el) => (otpRefs.current[index] = el)}
                                            value={otp[index] || ""}
                                            onChange={(e) =>
                                                handleOtpChange(index, e.target.value)
                                            }
                                            inputProps={{
                                                maxLength: 1,
                                                style: {
                                                    textAlign: "center",
                                                    fontSize: 20,
                                                    padding: "12px",
                                                },
                                            }}
                                            sx={{ width: 48 }}
                                        />
                                    ))}
                                </Box>
                            </>
                        )}

                        <CommonButton
                            text={buttonText}
                            color="#22678c"
                            onClick={buttonAction}
                            disabled={type === "register" && step == 2 && otp.length !== 6}
                            sx={{
                                width: "100%",
                                marginTop: "5px"
                            }}
                        />

                        {error && (
                            <Typography color="error" sx={{ mt: 1, fontSize: 13 }}>
                                {error?.data?.message || "Something went wrong"}
                            </Typography>
                        )}

                        {step === 1 && (
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    mt: 3,
                                    fontSize: 14,
                                }}
                            >
                                {type === "register" ? `Already have an account? ${" "}` : `Don't have an account? ${" "}`}
                                <span style={{ color: "#22678c", fontWeight: 600, cursor: "pointer" }} onClick={() => { type === "register" ? navigate("/login") : navigate("/register") }}>
                                    {type === "register" ? "Login" : "Register"}
                                </span>
                            </Typography>
                        )}

                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
