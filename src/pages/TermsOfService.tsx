import { useEffect } from 'react';
import SEO from '../components/SEO';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-black min-h-screen pt-24 pb-12">
            <SEO
                title="Terms of Service"
                description="Terms of Service for Mobintix Infotech. Please read these terms carefully before using our services."
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-black">
                    Terms of Service
                </h1>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <p className="text-gray-500">Last updated: January 2026</p>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <p>
                            These Terms of Service ("Terms") govern your use of Mobintix Infotech's website and services. By accessing our website or engaging our services, you agree to these Terms.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">1. Services</h2>
                        <p className="mb-4">Mobintix Infotech provides:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Mobile App Development</li>
                            <li>Web Development</li>
                            <li>UI/UX Design</li>
                            <li>Backend & API Development</li>
                            <li>Automation, SaaS, and Lead Generation Solutions</li>
                        </ul>
                        <p>All services are provided based on agreed proposals, timelines, and payment terms.</p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">2. Client Responsibilities</h2>
                        <p className="mb-4">You agree to:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Provide accurate project requirements</li>
                            <li>Respond promptly to communications</li>
                            <li>Ensure you own or have rights to all materials shared with us</li>
                        </ul>
                        <p>Delays caused by missing information may affect timelines.</p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">3. Payments</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Payments must be made as per the agreed invoice or proposal</li>
                            <li>Advance payments are non-refundable unless stated otherwise</li>
                            <li>Late payments may result in project suspension</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">4. Intellectual Property</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Upon full payment, ownership of the final deliverables is transferred to the client unless otherwise agreed</li>
                            <li>Mobintix Infotech reserves the right to showcase completed projects in portfolios and marketing materials</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">5. Confidentiality</h2>
                        <p>
                            Both parties agree to keep all confidential information private unless disclosure is required by law.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">6. Limitation of Liability</h2>
                        <p className="mb-4">Mobintix Infotech shall not be liable for:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Indirect or consequential damages</li>
                            <li>Loss of data, profits, or business opportunities</li>
                        </ul>
                        <p>Our liability is limited to the amount paid for the specific service.</p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">7. Termination</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Either party may terminate a project with written notice.</li>
                            <li>Completed work up to the termination date must be paid for.</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">8. Third-Party Services</h2>
                        <p>
                            We are not responsible for issues arising from third-party services, APIs, hosting providers, or platforms used within the project.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">9. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and interpreted in accordance with the laws of India.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">10. Changes to Terms</h2>
                        <p>
                            We may update these Terms at any time. Continued use of our services constitutes acceptance of the updated Terms.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">11. Contact Information</h2>
                        <div className="space-y-2">
                            <p className="font-semibold text-xl text-blue-600">Mobintix Infotech</p>
                            <p>📧 Email: <a href="mailto:contact@mobintix.app" className="hover:text-blue-600 transition-colors">contact@mobintix.app</a></p>
                            <p>🌐 Website: <a href="https://www.mobintix.app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">https://www.mobintix.app</a></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
