import React, { useState, useEffect } from 'react'
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import ProjectsPage from './pages/ProjectsPage'
import { Layout } from './components/Layout'
import { ErrorModal } from './components/ErrorModal'

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [errorModal, setErrorModal] = useState({ isOpen: false, code: null, message: "" });

    useEffect(() => {
        const handleApiStatus = (e) => {
            const { code, message } = e.detail;
            setErrorModal({ isOpen: false, code: null, message: "" });
            setTimeout(() => {
                setErrorModal({ isOpen: true, code, message });
            }, 50);
        };
        window.addEventListener("apm:api_status", handleApiStatus);
        return () => window.removeEventListener("apm:api_status", handleApiStatus);
    }, []);

    const user = { name: "Ing. Wilber", role: "Engineering Lead" };

    const handleError = (code, msg) => {
        setErrorModal({ isOpen: true, code, message: msg });
    };

    return (
        <>
            <Layout user={user} activeTab={activeTab} setTab={setActiveTab}>
                {activeTab === 'dashboard' && <DashboardPage />}
                {activeTab === 'projects' && <ProjectsPage />}
                {activeTab === 'users' && <UsersPage onError={handleError} />}
                {activeTab === 'config' && (
                    <div className="flex h-[60vh] flex-col items-center justify-center opacity-30 italic">
                        <p className="tracking-[0.4em] uppercase text-xs font-black">Módulo de Configuración en fase de despliegue</p>
                    </div>
                )}
            </Layout>

            <ErrorModal
                isOpen={errorModal.isOpen}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                errorCode={errorModal.code}
                message={errorModal.message}
            />
        </>
    )
}

export default App
