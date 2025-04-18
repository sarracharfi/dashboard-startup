import { Button } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    useEffect(() => {
        context.setisHideSidebarAndHeader(true);
        return () => context.setisHideSidebarAndHeader(false); // Cleanup on unmount
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

        // Basic client-side validation
        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Veuillez entrer un email valide.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8085/login', {
                email,
                password,
            });

            // Backend returns 200 for successful login
            if (response.status === 200) {
                alert('Connexion réussie!');
                // Store user data or token if provided by backend
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setFormData({ email: '', password: '' }); // Clear form
                navigate('/dashboard'); // Navigate to dashboard
            } else {
                setError('Une erreur inattendue est survenue. Veuillez réessayer.');
            }
        } catch (err) {
            console.error('Erreur lors de la connexion:', err);
            if (err.response && err.response.status === 401) {
                setError('Email ou mot de passe incorrect.');
            } else if (err.response && err.response.status === 400) {
                setError('Veuillez remplir tous les champs requis.');
            } else {
                setError('Erreur de connexion. Veuillez vérifier votre réseau ou réessayer plus tard.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        alert("La connexion avec Google n'est pas encore implémentée.");
    };

    return (
        <section className="loginSection">
            <div className="loginBox">
                <div className="logo text-center">
                    <img src={logo} width="100px" alt="logo" />
                    <h5 className="font-weight-bold">Login</h5>
                </div>
                <div className="wrapper mt-4 card border">
                    <form onSubmit={handleSubmit}>
                        <div className={`form-group position-relative ${inputIndex === 0 ? 'focus' : ''}`}>
                            <span className="icon"><MdEmail /></span>
                            <input
                                type="email" // Changed to type="email" for better validation
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
                                type={isShowPassword ? 'text' : 'password'}
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

                        {error && <div className="error text-danger">{error}</div>}

                        <div className="form-group">
                            <Button
                                type="submit"
                                className="btn-blue btn-lg w-100 btn-big"
                                disabled={loading}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </div>

                        <div className="form-group text-center mb-0">
                            <Link to="/forgot-password" className="link">
                                FORGOT PASSWORD
                            </Link>
                            <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                                <span className="line"></span>
                                <span className="txt">or</span>
                                <span className="line"></span>
                            </div>
                            <Button
                                variant="outlined"
                                className="w-100 btn-lg btn-big loginWithGoogle"
                                onClick={handleGoogleSignIn}
                            >
                                <img src={google} width="25px" alt="google" /> Sign In with Google
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="wrapper mt-3 card border footer p-0 d-flex justify-content-center align-items-center">
                    <span className="text-center">Don't have an account?</span>
                    <Link to="/signUp" className="link color ml-2">
                        Register
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Login;