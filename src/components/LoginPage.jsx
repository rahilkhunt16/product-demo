import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { UserLogin } from "../features/products/productSlice"
import "./login.css"

const LoginPage = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let loginData = useSelector((state) => state.product?.loginData)
    // console.log(loginData);
    let formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: (values) => {
            let err = {}
            if (!values.username) {
                err.username = '*Please Enter Username!'
            }
            if (!values.password) {
                err.password = '*Please Enter Password!'
            }
            return err
        },
        onSubmit: (values) => {
            try {
                dispatch(UserLogin(values))
                if (loginData) {
                    localStorage.getItem('token')
                    navigate('/')
                } else {
                    alert('Check your Login Detial')
                }
            } catch (error) {
                console.error(error)
            }
        }
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <section class="container">
                    <div class="login-container">
                        <div class="circle circle-one"></div>
                        <div class="form-container">
                            <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" />
                            <h1 class="opacity">LOGIN</h1>
                            <form>
                                <input type="text" onChange={formik.handleChange} placeholder="Enter Username...."
                                    name="username" value={formik.values.username}></input>
                                {formik.errors.username && <p>{formik.errors.username}</p>}
                                <input type="password" onChange={formik.handleChange} placeholder="Enter Password...."
                                    name="password" value={formik.values.password}></input>
                                {formik.errors.password && <p>{formik.errors.password}</p>}
                            </form>
                            <div>
                                <button type="submit" style={{ padding: '3px 10px' }}>LOGIN</button>
                            </div>
                            <div class="register-forget opacity">
                                <a href="">REGISTER</a>
                                <a href="">FORGOT PASSWORD</a>
                            </div>
                        </div>
                        <div class="circle circle-two"></div>
                    </div>
                    <div class="theme-btn-container"></div>
                </section>

            </form>
        </>
    )
}

export default LoginPage


   