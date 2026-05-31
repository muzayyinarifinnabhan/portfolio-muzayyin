import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BsEnvelopeFill, BsTrash, BsCheckCircleFill, BsClockFill,
    BsSearch, BsArrowLeft, BsPeopleFill, BsFunnelFill,
    BsBoxArrowRight, BsXCircleFill, BsArrowClockwise,
    BsEnvelopeOpenFill, BsCalendarFill, BsStar, BsStarFill,
    BsChevronDown, BsChevronUp
} from 'react-icons/bs';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const STATUS_CONFIG = {
    unread:  { label: 'Belum Dibaca', color: 'text-amber-400',   bg: 'bg-amber-400/15 border-amber-400/30',   dot: 'bg-amber-400' },
    read:    { label: 'Sudah Dibaca', color: 'text-blue-400',    bg: 'bg-blue-400/15 border-blue-400/30',     dot: 'bg-blue-400' },
    replied: { label: 'Sudah Dibalas', color: 'text-green-400', bg: 'bg-green-400/15 border-green-400/30',   dot: 'bg-green-400' },
    spam:    { label: 'Spam',          color: 'text-red-400',    bg: 'bg-red-400/15 border-red-400/30',       dot: 'bg-red-400' },
};

const FILTERS = ['all', 'unread', 'read', 'replied', 'spam', 'starred'];

/* ───────── Stat Card ───────── */
const StatCard = ({ icon, label, value, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-200/60 backdrop-blur border border-light-300/10 rounded-2xl p-5 flex items-center gap-4"
    >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
        <div>
            <p className="text-light-100/50 text-xs font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-light-100">{value}</p>
        </div>
    </motion.div>
);

/* ───────── Message Row ───────── */
const MessageRow = ({ msg, onClick, onStar, onDelete, selected }) => {
    const status = STATUS_CONFIG[msg.status] || STATUS_CONFIG.unread;
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            onClick={() => onClick(msg)}
            className={`group flex items-start gap-4 px-5 py-4 cursor-pointer border-b border-light-300/5 transition-all hover:bg-white/5
                ${selected ? 'bg-accent/10 border-l-2 border-l-accent' : 'border-l-2 border-l-transparent'}
                ${msg.status === 'unread' ? 'bg-white/3' : ''}`}
        >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/70 to-primary/70 flex items-center justify-center text-light-100 font-bold text-sm shrink-0">
                {msg.name?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <span className={`font-semibold text-sm truncate ${msg.status === 'unread' ? 'text-light-100' : 'text-light-100/70'}`}>
                        {msg.name}
                    </span>
                    <span className="text-light-100/30 text-xs shrink-0">
                        {new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                </div>
                <p className="text-light-100/50 text-xs truncate">{msg.email}</p>
                <p className="text-light-100/40 text-xs truncate mt-0.5">{msg.message}</p>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${status.bg} ${status.color}`}>
                    {status.label}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={e => { e.stopPropagation(); onStar(msg); }}
                        className="p-1 text-light-100/30 hover:text-amber-400 transition-colors"
                        title="Tandai bintang"
                    >
                        {msg.starred ? <BsStarFill size={13} className="text-amber-400" /> : <BsStar size={13} />}
                    </button>
                    <button
                        onClick={e => { e.stopPropagation(); onDelete(msg.id); }}
                        className="p-1 text-light-100/30 hover:text-red-400 transition-colors"
                        title="Hapus"
                    >
                        <BsTrash size={13} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

/* ───────── Detail Panel ───────── */
const DetailPanel = ({ msg, onClose, onStatusChange, onStar }) => {
    const status = STATUS_CONFIG[msg.status] || STATUS_CONFIG.unread;
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="flex flex-col h-full bg-dark-200/80 backdrop-blur border-l border-light-300/10"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-light-300/10">
                <button onClick={onClose} className="flex items-center gap-2 text-light-100/50 hover:text-accent transition-colors text-sm">
                    <BsArrowLeft size={16} /> Kembali
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onStar(msg)}
                        className={`p-2 rounded-lg transition-colors ${msg.starred ? 'text-amber-400 bg-amber-400/10' : 'text-light-100/30 hover:text-amber-400'}`}
                        title="Bintang"
                    >
                        {msg.starred ? <BsStarFill size={16} /> : <BsStar size={16} />}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Sender info */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/70 to-primary/70 flex items-center justify-center text-light-100 font-bold text-xl">
                        {msg.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-light-100">{msg.name}</h2>
                        <a href={`mailto:${msg.email}`} className="text-accent text-sm hover:underline">{msg.email}</a>
                    </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-3">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${status.bg} ${status.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                    </span>
                    <span className="text-xs text-light-100/40 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-light-300/10">
                        <BsCalendarFill size={11} />
                        {new Date(msg.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                    </span>
                </div>

                {/* Message bubble */}
                <div className="bg-dark-300/60 border border-light-300/10 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-wider text-light-100/30 font-semibold mb-3 flex items-center gap-2">
                        <BsEnvelopeOpenFill size={12} /> Pesan
                    </p>
                    <p className="text-light-100/85 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>

                {/* Quick Reply button */}
                <a
                    href={`mailto:${msg.email}?subject=Re: Pesan dari Portfolio Muzayyin`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-accent/15 border border-accent/30 text-accent font-semibold rounded-xl hover:bg-accent hover:text-light-100 transition-all text-sm"
                >
                    <BsEnvelopeFill size={15} /> Balas via Email
                </a>
            </div>

            {/* Status Actions */}
            <div className="p-5 border-t border-light-300/10 space-y-2">
                <p className="text-xs uppercase tracking-wider text-light-100/30 font-semibold mb-3">Ubah Status</p>
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                        <button
                            key={key}
                            onClick={() => onStatusChange(msg.id, key)}
                            disabled={msg.status === key}
                            className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5
                                ${msg.status === key
                                    ? `${cfg.bg} ${cfg.color} opacity-100`
                                    : 'bg-transparent border-light-300/10 text-light-100/40 hover:border-light-300/30 hover:text-light-100/70'}`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/* ───────── Main Dashboard ───────── */
const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    /* ── Fetch ── */
    const fetchMessages = useCallback(async () => {
        setLoading(true);
        setError('');
        const { data, error: err } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });
        if (err) setError(err.message);
        else setMessages(data || []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchMessages(); }, [fetchMessages]);

    /* ── Real-time ── */
    useEffect(() => {
        const channel = supabase
            .channel('contact_messages_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, fetchMessages)
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [fetchMessages]);

    /* ── Mark as read on select ── */
    const handleSelect = async (msg) => {
        setSelected(msg);
        if (msg.status === 'unread') {
            await supabase.from('contact_messages').update({ status: 'read' }).eq('id', msg.id);
            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'read' } : m));
            setSelected(prev => prev?.id === msg.id ? { ...prev, status: 'read' } : prev);
        }
    };

    /* ── Status change ── */
    const handleStatusChange = async (id, status) => {
        await supabase.from('contact_messages').update({ status }).eq('id', id);
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
        setSelected(prev => prev?.id === id ? { ...prev, status } : prev);
    };

    /* ── Star ── */
    const handleStar = async (msg) => {
        const starred = !msg.starred;
        await supabase.from('contact_messages').update({ starred }).eq('id', msg.id);
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, starred } : m));
        setSelected(prev => prev?.id === msg.id ? { ...prev, starred } : prev);
    };

    /* ── Delete ── */
    const handleDelete = async (id) => {
        await supabase.from('contact_messages').delete().eq('id', id);
        setMessages(prev => prev.filter(m => m.id !== id));
        if (selected?.id === id) setSelected(null);
        setDeleteConfirm(null);
    };

    /* ── Stats ── */
    const stats = {
        total: messages.length,
        unread: messages.filter(m => m.status === 'unread').length,
        replied: messages.filter(m => m.status === 'replied').length,
        starred: messages.filter(m => m.starred).length,
    };

    /* ── Filtered list ── */
    const filtered = messages.filter(m => {
        const matchFilter = filter === 'all' ? true
            : filter === 'starred' ? m.starred
            : m.status === filter;
        const matchSearch = !search || [m.name, m.email, m.message].some(f =>
            f?.toLowerCase().includes(search.toLowerCase())
        );
        return matchFilter && matchSearch;
    });

    const handleLogout = () => { logout(); navigate('/admin'); };

    return (
        <div className="min-h-screen bg-dark-300 flex flex-col font-sans">
            {/* Navbar */}
            <header className="bg-dark-200/80 backdrop-blur border-b border-light-300/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/20 border border-accent/30 rounded-lg flex items-center justify-center">
                        <BsEnvelopeFill size={14} className="text-accent" />
                    </div>
                    <div>
                        <h1 className="text-light-100 font-bold text-sm leading-none">Admin Dashboard</h1>
                        <p className="text-light-100/30 text-xs mt-0.5">Kelola pesan masuk</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchMessages}
                        className="p-2 rounded-lg text-light-100/40 hover:text-accent hover:bg-accent/10 transition-all"
                        title="Refresh"
                    >
                        <BsArrowClockwise size={16} />
                    </button>
                    <a href="/" className="text-xs text-light-100/40 hover:text-accent transition-colors hidden md:block">
                        ← Portfolio
                    </a>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs text-light-100/40 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-400/10 border border-transparent hover:border-red-400/20"
                    >
                        <BsBoxArrowRight size={14} /> Keluar
                    </button>
                </div>
            </header>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Stats */}
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-light-300/5">
                    <StatCard icon={<BsEnvelopeFill size={20} className="text-blue-400" />}   label="Total Pesan"    value={stats.total}   color="bg-blue-400/15" />
                    <StatCard icon={<BsClockFill size={20} className="text-amber-400" />}     label="Belum Dibaca"  value={stats.unread}  color="bg-amber-400/15" />
                    <StatCard icon={<BsCheckCircleFill size={20} className="text-green-400" />} label="Sudah Dibalas" value={stats.replied} color="bg-green-400/15" />
                    <StatCard icon={<BsStarFill size={20} className="text-yellow-400" />}     label="Dibintangi"    value={stats.starred} color="bg-yellow-400/15" />
                </div>

                {/* Body */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar list */}
                    <div className={`flex flex-col border-r border-light-300/10 overflow-hidden transition-all ${selected ? 'hidden md:flex md:w-96' : 'w-full'}`}>
                        {/* Search + Filter */}
                        <div className="p-4 space-y-3 border-b border-light-300/10">
                            <div className="relative">
                                <BsSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-100/30" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Cari nama, email, pesan..."
                                    className="w-full pl-9 pr-4 py-2.5 bg-dark-300/60 border border-light-300/10 rounded-xl text-light-100 text-sm placeholder-light-100/25 focus:outline-none focus:border-accent/50 transition-all"
                                />
                            </div>
                            <div className="flex gap-1.5 flex-wrap">
                                {FILTERS.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all capitalize border
                                            ${filter === f
                                                ? 'bg-accent text-light-100 border-accent shadow-[0_0_12px_rgba(196,90,26,0.3)]'
                                                : 'bg-transparent text-light-100/40 border-light-300/10 hover:text-light-100/70 hover:border-light-300/20'}`}
                                    >
                                        {f === 'all' ? 'Semua' : f === 'starred' ? '⭐ Bintang' : STATUS_CONFIG[f]?.label}
                                        {f === 'unread' && stats.unread > 0 && (
                                            <span className="ml-1.5 bg-amber-400 text-dark-300 rounded-full px-1.5 text-[10px] font-bold">
                                                {stats.unread}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto">
                            {loading ? (
                                <div className="flex items-center justify-center h-40 gap-3 text-light-100/40">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-light-100/10 border-t-accent rounded-full" />
                                    Memuat pesan...
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center h-40 gap-3 text-red-400 px-6 text-center">
                                    <BsXCircleFill size={32} />
                                    <p className="text-sm font-semibold">Gagal memuat</p>
                                    <p className="text-xs text-red-400/70">{error}</p>
                                    <button onClick={fetchMessages} className="text-xs px-4 py-2 bg-red-400/10 border border-red-400/20 rounded-lg hover:bg-red-400/20 transition-colors">
                                        Coba Lagi
                                    </button>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 gap-3 text-light-100/30 px-6 text-center">
                                    <BsPeopleFill size={32} />
                                    <p className="text-sm">Tidak ada pesan ditemukan</p>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {filtered.map(msg => (
                                        <MessageRow
                                            key={msg.id}
                                            msg={msg}
                                            selected={selected?.id === msg.id}
                                            onClick={handleSelect}
                                            onStar={handleStar}
                                            onDelete={id => setDeleteConfirm(id)}
                                        />
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>

                    {/* Detail panel */}
                    <div className="flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                            {selected ? (
                                <DetailPanel
                                    key={selected.id}
                                    msg={selected}
                                    onClose={() => setSelected(null)}
                                    onStatusChange={handleStatusChange}
                                    onStar={handleStar}
                                />
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hidden md:flex flex-col items-center justify-center h-full gap-4 text-light-100/20"
                                >
                                    <BsEnvelopeOpenFill size={48} />
                                    <p className="text-sm">Pilih pesan untuk melihat detail</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Delete confirm modal */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
                        onClick={() => setDeleteConfirm(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-dark-200 border border-light-300/15 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                        >
                            <div className="w-12 h-12 bg-red-500/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <BsTrash size={22} className="text-red-400" />
                            </div>
                            <h3 className="text-light-100 font-bold text-center mb-2">Hapus Pesan?</h3>
                            <p className="text-light-100/50 text-sm text-center mb-6">Tindakan ini tidak bisa dibatalkan.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-light-300/15 rounded-xl text-light-100/60 text-sm hover:border-light-300/30 transition-colors">
                                    Batal
                                </button>
                                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 rounded-xl text-light-100 text-sm font-bold hover:bg-red-600 transition-colors">
                                    Hapus
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
