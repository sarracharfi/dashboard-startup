import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { Mycontext } from '../../App';
import google from '../../assets/images/google.png';
import logo from '../../assets/images/logo1.png';

const Login = () => {
    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const context = useContext(Mycontext);

    useEffect(() => {
        context.setisHideSidebarAndHeader(true);
    }, [context]);

    const focusInput = (index) => setInputIndex(index);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { email, password } = formData;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login successful!');
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard'; 
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="loginSection">
            <div className="loginBox">
                <div className='logo text-center'>
                    <img src={logo} width="100px" alt="logo" />
                    <h5 className='font-weight-bold'>Login</h5>
                </div>
                <div className='wrapper mt-4 card border '>
                    <form onSubmit={handleSubmit}>
                        <div className={`form-group position-relative ${inputIndex === 0 ? 'focus' : ''}`}>
                            <span className="icon"><MdEmail /></span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => focusInput(0)}
                                onBlur={() => setInputIndex(null)}
                                autoFocus
                                required
                            />
                        </div>

                        <div className={`form-group position-relative ${inputIndex === 1 ? 'focus' : ''}`}>
                            <span className="icon"><RiLockPasswordFill /></span>
                            <input
                                type={isShowPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => focusInput(1)}
                                onBlur={() => setInputIndex(null)}
                                required
                            />
                            <span className="toggleShowPassword" onClick={() => setIsShowPassword(!isShowPassword)}>
                                {isShowPassword ? <FaEye /> : <FaRegEyeSlash />}
                            </span>
                        </div>

                        {error && <div className="error">{error}</div>}

                        <div className='form-group'>
                            <Button type="submit" className='btn-blue btn-lg w-100 btn-big' disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </div>

                        <div className="form-group text-center mb-0">
                            <Link to="/forgot-password" className="link">FORGOT PASSWORD</Link>
                            <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
                                <span className='line'></span>
                                <span className='txt'>or</span>
                                <span className='line'></span>
                            </div>
                            <Button variant='outlined' className='w-100 btn-lg btn-big loginWithGoogle'>
                                <img src={google} width="25px" alt="google" /> &nbsp; Sign In with Google
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="wrapper mt-3 card border footer p-0 d-flex justify-content-center align-items-center">
                    <span className='text-center'>Don't have an account?</span>
                    <Link to="/signUp" className="link color ml-2">Register</Link>
                </div>
            </div>
        </section>
    );
};

export default Login;
