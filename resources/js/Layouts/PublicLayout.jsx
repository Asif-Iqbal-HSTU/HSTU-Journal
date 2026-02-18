import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900 antialiased selection:bg-primary-500 selection:text-white">
            <Navbar />

            <main className="flex-grow pt-16">
                {children}
            </main>

            <Footer />
        </div>
    );
}
