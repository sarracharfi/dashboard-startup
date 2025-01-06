import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { FaEye, FaRegEyeSlash, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
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

    const focusInput = (index) => {
        setInputIndex(index);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        const { name, email, password, confirmPassword } = formData;
    
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            setLoading(false);
            return;
        }
    
        try {
            console.log('Données envoyées:', { name, email, password });
    
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
    
            if (response.ok) {
                alert('Inscription réussie!');
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Quelque chose a mal tourné. Veuillez réessayer.');
            }
        } catch (err) {
            console.error('Erreur lors de l\'envoi des données:', err); 
            setError('Erreur de connexion. Veuillez vérifier votre réseau ou réessayer plus tard.');
        } finally {
            setLoading(false);
        }
    };
    

    const handleGoogleSignUp = () => {
        // Logic for signing up with Google (e.g., OAuth flow)
        alert("L'inscription avec Google n'est pas encore implémentée.");
    };

    return (
        <section className="loginSection signUpSection">
            <div className="row">
                <div className="col-md-7 d-flex align-items-center flex-column part1">
                    <h1>Dashboard d'évaluation des startups</h1>
                    <p>
                        Le Smart Tunisian Technoparks (S2T) est le premier technopark spécialisé en technologies de l'information et de la communication (TIC) en Tunisie. Sa création s'inscrit dans le cadre d'une stratégie nationale visant à promouvoir la recherche scientifique, l'innovation et la production à haute valeur ajoutée. S2T fournit un environnement intégré adapté au développement des startups, des petites et moyennes entreprises (PME), ainsi que des multinationales actives dans le secteur des TIC. Il joue un rôle essentiel en accueillant et en soutenant les activités axées sur la haute technologie et la valeur ajoutée. En tant qu'acteur clé de l'écosystème local de l'entrepreneuriat et de l'innovation, S2T offre un cadre propice pour accélérer le développement des affaires et des startups. Il favorise la synergie entre les différents acteurs du technopark à travers divers mécanismes tels que la fertilisation croisée, le transfert de technologie des multinationales vers les startups et les PME locales, le partage des ressources, la collaboration université-entreprise, et la participation à des événements thématiques.
                    </p>
                    <div className='w-100 mt-4'>
                        <Button className='btn-blue btn-lg btn-big' onClick={() => navigate('/')}>
                            <TiHome /> Go To Home
                        </Button>
                    </div>
                </div>
                <div className="col-md-5 d-flex align-items-start justify-content-end">
                    <div className="loginBox">
                        <div className='logo text-center'>
                            <img src={logo} width="60px" alt="logo" />
                            <h5 className='font-weight-bold'>Register a new account</h5>
                        </div>
                        <div className='wrapper mt-3 card border'>
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
                                        onBlur={() => setInputIndex(null)}
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

                                <div className="d-flex align-items-center">
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="I agree with the Terms and Conditions"
                                    />
                                </div>

                                {error && <div className="error">{error}</div>}

                                <Button type="submit" className="btn-blue w-100" disabled={loading}>
                                    {loading ? 'Signing Up...' : 'Sign Up'}
                                </Button>
                            </form>

                            <div className="text-center mt-3">
                                <p>or sign up with</p>
                                <Button className="loginWithGoogle" onClick={handleGoogleSignUp}>
                                    <img src={google} width="20px" alt="google" /> Sign Up with Google
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
