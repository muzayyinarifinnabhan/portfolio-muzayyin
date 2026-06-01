import React, { createContext, useState, useContext } from 'react';

const translations = {
    ID: {
        nav: {
            home: "Beranda",
            about: "Tentang",
            skills: "Keahlian",
            education: "Pendidikan",
            projects: "Proyek",
            experience: "Pengalaman",
            contact: "Kontak"
        },
        hero: {
            greeting: "Halo, Saya Muzayyin Arifin Nabhan",
            roles: ["Frontend Developer", "Web Designer", "Tech Enthusiast"],
            description: "Saya adalah seorang Web Developer yang bersemangat dalam membangun antarmuka web yang indah dan responsif. Berbasis di Indonesia.",
            contactBtn: "Hubungi Saya",
            portfolioBtn: "Lihat Portofolio"
        },
        about: {
            title: "Tentang",
            titleHighlight: "Saya",
            p1: "Halo! Saya seorang pengembang perangkat lunak yang antusias dengan fokus pada pembuatan pengalaman web yang interaktif, responsif, dan dapat diakses.",
            p2: "Saya menyukai perpaduan antara desain dan pengembangan. Berbekal keahlian di lanskap React, Next.js, dan Tailwind CSS, saya selalu bersemangat mempelajari teknologi baru dan merancang solusi untuk masalah yang kompleks.",
            resumeBtn: "Unduh CV"
        },
        skills: {
            title: "Keahlian",
            titleHighlight: ""
        },
        education: {
            title: "Pendidikan",
            titleHighlight: "",
            list: [
                {
                    id: 1,
                    degree: "SMK Negeri 1 Jakarta",
                    school: "Rekayasa Perangkat Lunak",
                    period: "2024 - 2027",
                    description: "Siswa SMK jurusan Rekayasa Perangkat Lunak (RPL) yang memiliki semangat tinggi dalam mempelajari pengembangan web modern, teknologi frontend, dan desain pengalaman pengguna, serta terus mengembangkan keterampilan di bidang teknologi informasi."
                }
            ]
        },
        projects: {
            title: "Proyek",
            titleHighlight: "",
            viewAllBtn: "Lihat Semua Proyek",
            viewLessBtn: "Sembunyikan Proyek",
            list: [
                {
                    id: 1,
                    title: "SMPN 112 Jakarta",
                    description: "Website berbasis PWA untuk memudahkan siswa SMPN 112 Jakarta dalam mengakses informasi akademik dan kegiatan sekolah.",
                    tags: ["React.js", "Tailwind", "Prisma", "Stripe"]
                },
                {
                    id: 2,
                    title: "Antarmuka Chat AI",
                    description: "UI yang indah dan responsif untuk aplikasi chat AI dengan dukungan markdown dan riwayat percakapan.",
                    tags: ["React", "Framer Motion", "OpenAI API", "Vite"]
                },
                {
                    id: 3,
                    title: "Aplikasi Manajemen Tugas",
                    description: "Papan kanban seret dan lepas untuk mengelola tugas harian dengan sinkronisasi waktu nyata.",
                    tags: ["React", "Firebase", "TailwindCSS"]
                },
                {
                    id: 4,
                    title: "E-Commerce Restoran",
                    description: "Sistem pemesanan makanan online dengan pelacakan order real-time dan pembayaran digital.",
                    tags: ["Next.js", "MongoDB", "Tailwind"]
                },
                {
                    id: 5,
                    title: "Landing Page SaaS",
                    description: "Landing page modern untuk produk SaaS dengan animasi interaktif dan performa tinggi.",
                    tags: ["React", "Framer Motion", "Tailwind"]
                },
                {
                    id: 6,
                    title: "Aplikasi Cuaca Realtime",
                    description: "Aplikasi ramalan cuaca interaktif dengan integrasi API cuaca global dan visualisasi grafik.",
                    tags: ["JavaScript", "Chart.js", "Vite"]
                }
            ]
        },
        experience: {
            title: "Pengalaman",
            titleHighlight: "",
            list: [
                {
                    id: 1,
                    role: "Belum Ada Pengalaman Kerja",
                    company: "-",
                    period: "-",
                    description: "Saya adalah seorang lulusan baru yang aktif membangun proyek mandiri dan siap untuk memulai karier profesional di bidang web development."
                }
            ]
        },
        contact: {
            title: "Hubungi",
            titleHighlight: "",
            subtitle: "Baik Anda memiliki pertanyaan atau hanya ingin menyapa, saya akan mencoba yang terbaik untuk membalas Anda!",
            email: "Email",
            phone: "Telepon",
            location: "Lokasi",
            locationValue: "Jakarta, Indonesia",
            formName: "Nama Anda",
            formNamePlaceholder: "Budi Santoso",
            formEmail: "Email Anda",
            formEmailPlaceholder: "budi@example.com",
            formMessage: "Pesan",
            formMessagePlaceholder: "Ceritakan tentang proyek Anda...",
            submitBtn: "Kirim Pesan",
            successAlert: "Pesan terkirim! (Mock)"
        },
        footer: {
            copyright: "Hak cipta dilindungi."
        }
    },
    EN: {
        nav: {
            home: "Home",
            about: "About",
            skills: "Skills",
            education: "Education",
            projects: "Projects",
            experience: "Experience",
            contact: "Contact"
        },
        hero: {
            greeting: "Hi, I'm Muzayyin Arifin Nabhan",
            roles: ["Frontend Developer", "Web Designer", "Tech Enthusiast"],
            description: "I am a Web Developer passionate about building beautiful and responsive web interfaces. Based in Indonesia.",
            contactBtn: "Contact",
            portfolioBtn: "View Portfolio"
        },
        about: {
            title: "About",
            titleHighlight: "Me",
            p1: "Hello! I am an enthusiastic web developer focusing on creating engaging, responsive, and accessible web experiences.",
            p2: "I love the intersection of design and development. Armed with expertise in the React, Next.js, and Tailwind CSS ecosystem, I am always eager to learn new technologies and craft solutions for complex problems.",
            resumeBtn: "Download Resume"
        },
        skills: {
            titleHighlight: "Skills"
        },
        education: {
            titleHighlight: "Education",
            list: [
                {
                    id: 1,
                    degree: "State High School 1 Jakarta",
                    school: "Science Major",
                    period: "2013 - 2016",
                    description: "Active in the computer club and won several national programming competitions."
                }
            ]
        },
        projects: {
            title: "Projects",
            titleHighlight: "",
            viewAllBtn: "View All Projects",
            viewLessBtn: "Show Less",
            list: [
                {
                    id: 1,
                    title: "SMPN 112 Jakarta",
                    description: "PWA-based website to help students of SMPN 112 Jakarta access academic information and school activities.",
                    tags: ["React.js", "Tailwind", "Prisma", "Stripe"]
                },
                {
                    id: 2,
                    title: "AI Chat Interface",
                    description: "Beautiful and responsive UI for an AI chat app with markdown support and conversation history.",
                    tags: ["React", "Framer Motion", "OpenAI API", "Vite"]
                },
                {
                    id: 3,
                    title: "Task Management App",
                    description: "Drag-and-drop kanban board for managing daily tasks with real-time synchronization.",
                    tags: ["React", "Firebase", "TailwindCSS"]
                },
                {
                    id: 4,
                    title: "Restaurant E-Commerce",
                    description: "Online food ordering system with real-time order tracking and digital payment integration.",
                    tags: ["Next.js", "MongoDB", "Tailwind"]
                },
                {
                    id: 5,
                    title: "SaaS Landing Page",
                    description: "Modern landing page for a SaaS product with interactive animations and high performance.",
                    tags: ["React", "Framer Motion", "Tailwind"]
                },
                {
                    id: 6,
                    title: "Realtime Weather App",
                    description: "Interactive weather forecasting application with global weather API integration and charts.",
                    tags: ["JavaScript", "Chart.js", "Vite"]
                }
            ]
        },
        experience: {
            titleHighlight: "Experience",
            list: [
                {
                    id: 1,
                    role: "No Professional Experience Yet",
                    company: "-",
                    period: "-",
                    description: "I am a fresh graduate actively building personal projects and eager to kickstart my professional career in web development."
                }
            ]
        },
        contact: {
            title: "Contact",
            titleHighlight: "",
            subtitle: "Whether you have a question or just want to say hi, I'll try my best to get back to you!",
            email: "Email",
            phone: "Phone",
            location: "Location",
            locationValue: "Jakarta, Indonesia",
            formName: "Your Name",
            formNamePlaceholder: "John Doe",
            formEmail: "Your Email",
            formEmailPlaceholder: "john@example.com",
            formMessage: "Message",
            formMessagePlaceholder: "Tell me about your project...",
            submitBtn: "Send Message",
            successAlert: "Message sent! (Mock)"
        },
        footer: {
            copyright: "All rights reserved."
        }
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ID');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ID' ? 'EN' : 'ID');
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);