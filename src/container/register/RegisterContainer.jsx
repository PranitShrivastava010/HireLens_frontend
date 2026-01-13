import React, { useState } from "react";
import RegisterComponent from "../../component/register/RegisterComponent";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation, useVerifyOtpMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

export default function RegisterContainer() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [register, { isLoading: registerIsLoading, error: registerIsError }] = useRegisterMutation()
    const [verifyOtp, { isLoading: verifyIsLoading, error: verifyIsError }] = useVerifyOtpMutation()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState("");

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleRegister = async () => {
        try {
            const res = await register(formData).unwrap();

            // Save refresh token if needed in cookies
            dispatch(setCredentials({
                user: res.user,
                accessToken: res.accessToken,
            }));

            setStep(2); // move to OTP verification
        } catch (err) {
            console.error(err);
        }
    };

    const handleVerifyOtp = async (otpCode) => {
        try {
            const res = await verifyOtp({ email: formData.email, otp: otpCode }).unwrap();

            dispatch(setCredentials({
                user: res.Result.sendUser,
                accessToken: res.Result.accessToken,
            }));

            navigate("/jobs"); // success → redirect
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <RegisterComponent
            formData={formData}
            onChange={handleChange}
            onSubmit={handleRegister}
            onVerifyOtp={handleVerifyOtp}
            loading={step === 1 ? registerIsLoading : verifyIsLoading}
            error={step === 1 ? registerIsError : verifyIsError}
            step={step}
            otp={otp}
            setOtp={setOtp}
        />
    )
}