import { useState } from "react";
import RegisterComponent from "../../component/register/RegisterComponent";
import { useLoginMutation } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginContainer() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading, error }] = useLoginMutation()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleLogin = async () => {
        try {
            const res = await login(formData).unwrap()


            dispatch(setCredentials({
                user: res.Result.sendUser,
                accessToken: res.Result.accessToken
            }))
            console.log("login res", res)

            if (res.Result.sendUser.hasCompletedPref) {
                navigate("/jobs", { replace: true });
            } else {
                navigate("/jobs", { replace: true }); 
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <RegisterComponent
            type="login"
            formData={formData}
            onChange={handleChange}
            onSubmit={handleLogin}
            loading={isLoading}
            error={error}
        />
    )
}