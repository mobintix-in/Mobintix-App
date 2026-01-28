import { useEffect } from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white text-black min-h-screen pt-24 pb-12">
            <SEO
                title="Privacy Policy"
                description="Privacy Policy for Mobintix Infotech. Learn how we collect, use, and protect your personal information."
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-black">
                    Privacy Policy
                </h1>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <p className="text-gray-500">Last updated: January 2026</p>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <p>
                            Mobintix Infotech ("we", "our", "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">1. Information We Collect</h2>
                        <p className="mb-4">We may collect the following information:</p>

                        <h3 className="text-xl font-medium mb-2 text-blue-600">a. Personal Information</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>Company name</li>
                            <li>Project or inquiry details</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 text-blue-600">b. Technical Information</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Device information</li>
                            <li>Pages visited and time spent on the website</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">2. How We Use Your Information</h2>
                        <p className="mb-4">We use the collected information to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Respond to inquiries and provide services</li>
                            <li>Communicate project updates and proposals</li>
                            <li>Improve our website and service quality</li>
                            <li>Send important notices, updates, or marketing communications (only if opted-in)</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">3. Cookies and Tracking Technologies</h2>
                        <p className="mb-4">We may use cookies and similar technologies to:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Analyze website traffic</li>
                            <li>Improve user experience</li>
                            <li>Understand user behavior</li>
                        </ul>
                        <p>You can disable cookies through your browser settings.</p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">4. Data Sharing and Disclosure</h2>
                        <p className="mb-4">We do not sell, rent, or trade your personal data.</p>
                        <p className="mb-4">We may share information only with:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Trusted service providers (hosting, analytics, email services)</li>
                            <li>Legal authorities when required by law</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">5. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational security measures to protect your data against unauthorized access, loss, or misuse.
                            However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">6. International Data Transfers</h2>
                        <p>
                            As we serve international clients, your data may be processed outside your country. We ensure appropriate safeguards are in place.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">7. Your Rights</h2>
                        <p className="mb-4">Depending on your jurisdiction, you may have the right to:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Access your data</li>
                            <li>Request correction or deletion</li>
                            <li>Withdraw consent</li>
                            <li>Object to data processing</li>
                        </ul>
                        <p>You can request this by contacting us.</p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">8. Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites. We are not responsible for their privacy practices.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">9. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. Updates will be posted on this page.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl font-semibold mb-4 text-black">10. Contact Us</h2>
                        <p className="mb-4">If you have questions about this Privacy Policy, contact us at:</p>
                        <div className="space-y-2">
                            <p className="font-semibold text-xl text-blue-600">Mobintix Infotech</p>
                            <p>📧 Email: <a href="mailto:contact@mobintix.app" className="hover:text-blue-600 transition-colors">contact@mobintix.app</a></p>
                            <p>🌐 Website: <a href="https://www.mobintix.app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">www.mobintix.app</a></p>
                            <p>📍 India</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
