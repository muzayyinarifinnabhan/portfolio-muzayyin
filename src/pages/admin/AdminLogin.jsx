import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BsShieldLock, BsEye, BsEyeSlash } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        await new Promise(r => setTimeout(r, 600));
        const ok = login(password);
        if (ok) {
            navigate('/admin/dashboard');
        } else {
            setError('Password salah. Coba lagi.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-dark-300 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                {/* Card */}
                <div className="bg-dark-200/80 backdrop-blur-xl border border-light-300/10 rounded-2xl p-10 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-16 h-16 bg-accent/15 border border-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    >
                        <BsShieldLock size={28} className="text-accent" />
                    </motion.div>

                    <h1 className="text-2xl font-bold text-center text-light-100 mb-1">Admin Dashboard</h1>
                    <p className="text-center text-light-100/50 text-sm mb-8">Masukkan password untuk melanjutkan</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-light-100/60 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Masukkan password admin"
                                    required
                                    className="w-full px-4 py-3 pr-12 bg-dark-300/70 border border-light-300/10 rounded-xl text-light-100 placeholder-light-100/25 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-light-100/40 hover:text-accent transition-colors"
                                >
                                    {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-4"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 bg-accent text-light-100 font-bold rounded-xl hover:bg-[#c96228] transition-all shadow-[0_4px_20px_rgba(196,90,26,0.4)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                        className="w-4 h-4 border-2 border-light-100/30 border-t-light-100 rounded-full"
                                    />
                                    Memverifikasi...
                                </>
                            ) : 'Masuk'}
                        </motion.button>
                    </form>

                    <p className="text-center text-light-100/25 text-xs mt-6">
                        ← <a href="/" className="hover:text-accent transition-colors">Kembali ke Portfolio</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
