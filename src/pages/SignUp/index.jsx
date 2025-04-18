import { Button, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaRegEyeSlash, FaUserCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { TiHome } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import google from '../../assets/images/google.png';
import logo from '../../assets/images/logo1.png';

const SignUp = () => {
    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const focusInput = (index) => setInputIndex(index);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { name, email, password, confirmPassword } = formData;

        // Validate password match
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8085/signup', {
                name,
                email,
                password,
            });

            // Backend returns 201 for successful signup
            if (response.status === 201) {
                alert('Inscription réussie!');
                setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Clear form
                navigate('/login');
            } else {
                setError('Une erreur inattendue est survenue. Veuillez réessayer.');
            }
        } catch (err) {
            console.error("Erreur lors de l'envoi des données:", err);
            if (err.response && err.response.status === 409) {
                setError('Cet email est déjà utilisé. Veuillez en choisir un autre.');
            } else if (err.response && err.response.status === 400) {
                setError('Veuillez remplir tous les champs requis.');
            } else {
                setError('Erreur de connexion. Veuillez vérifier votre réseau ou réessayer plus tard.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        alert("L'inscription avec Google n'est pas encore implémentée.");
    };

    // Optional: Check email availability (uncomment and implement backend endpoint if needed)
    /*
    const checkEmailAvailability = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8085/check-email/${email}`);
            return response.data.available;
        } catch (err) {
            console.error('Error checking email availability:', err);
            return false;
        }
    };

    const handleEmailBlur = async (e) => {
        const email = e.target.value;
        if (email) {
            const isAvailable = await checkEmailAvailability(email);
            if (!isAvailable) {
                setError('Cet email est déjà utilisé.');
            }
        }
    };
    */

    return (
        <section className="loginSection signUpSection">
            <div className="row">
                <div className="col-md-7 d-flex align-items-center flex-column part1">
                    <h1>Dashboard d'évaluation des startups</h1>
                    <p>
                        Le Smart Tunisian Technoparks (S2T) est le premier technopark spécialisé en technologies de l'information et de la communication (TIC) en Tunisie. [...]
                    </p>
                    <div className="w-100 mt-4">
                        <Button className="btn-blue btn-lg btn-big" onClick={() => navigate('/')}>
                            <TiHome /> Go To Home
                        </Button>
                    </div>
                </div>
                <div className="col-md-5 d-flex align-items-start justify-content-end">
                    <div className="loginBox">
                        <div className="logo text-center">
                            <img src={logo} width="60px" alt="logo" />
                            <h5 className="font-weight-bold">Register a new account</h5>
                        </div>
                        <div className="wrapper mt-3 card border">
                            <form onSubmit={handleSubmit}>
                                <div className={`form-group position-relative ${inputIndex === 0 ? 'focus' : ''}`}>
                                    <span className="icon"><FaUserCircle /></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => focusInput(0)}
                                        onBlur={() => setInputIndex(null)}
                                        required
                                    />
                                </div>

                                <div className={`form-group position-relative ${inputIndex === 1 ? 'focus' : ''}`}>
                                    <span className="icon"><MdEmail /></span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => focusInput(1)}
                                        onBlur={() => setInputIndex(null)} // Replace with handleEmailBlur if using email check
                                        required
                                    />
                                </div>

                                <div className={`form-group position-relative ${inputIndex === 2 ? 'focus' : ''}`}>
                                    <span className="icon"><RiLockPasswordFill /></span>
                                    <input
                                        type={isShowPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onFocus={() => focusInput(2)}
                                        onBlur={() => setInputIndex(null)}
                                        required
                                    />
                                    <span className="toggleShowPassword" onClick={() => setIsShowPassword(!isShowPassword)}>
                                        {isShowPassword ? <FaEye /> : <FaRegEyeSlash />}
                                    </span>
                                </div>

                                <div className={`form-group position-relative ${inputIndex === 3 ? 'focus' : ''}`}>
                                    <span className="icon"><RiLockPasswordFill /></span>
                                    <input
                                        type={isShowConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Confirm your password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onFocus={() => focusInput(3)}
                                        onBlur={() => setInputIndex(null)}
                                        required
                                    />
                                    <span className="toggleShowPassword" onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                        {isShowConfirmPassword ? <FaEye /> : <FaRegEyeSlash />}
                                    </span>
                                </div>

                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="I agree with the Terms and Conditions"
                                />

                                {error && <div className="error text-danger">{error}</div>}

                                <Button type="submit" className="btn-blue w-100 mt-2" disabled={loading}>
                                    {loading ? 'Signing Up...' : 'Sign Up'}
                                </Button>
                            </form>

                            <div className="text-center mt-3">
                                <p>or sign up with</p>
                                <Button className="loginWithGoogle" onClick={handleGoogleSignUp} variant="outlined">
                                    <span className="d-flex align-items-center gap-2">
                                        <img src={google} width="20px" alt="google" />
                                        Sign Up with Google
                                    </span>
                                </Button>
                            </div>

                            <div className="text-center mt-3">
                                <p>Already have an account? <Link to="/login">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;