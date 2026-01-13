import ServicePage from '../../components/ServicePage';
import { ShoppingCart, CreditCard, Truck, BarChart, Globe, Package, Zap, Award } from 'lucide-react';

const Ecommerce = () => {
    return (
        <ServicePage
            seo={{
                title: "E-Commerce Development | Shopify & Custom Stores",
                description: "Launch your customized e-commerce store with Mobintix. We build high-converting online shops using Shopify, WooCommerce, and custom MERN stack solutions.",
                keywords: "ecommerce development company, shopify experts, custom online store, woocommerce developers, payment gateway integration, secure shopping cart",
                url: "/services/ecommerce",
                schema: {
                    name: "E-Commerce Development",
                    description: "Custom e-commerce website design and development services."
                }
            }}
            hero={{
                title: <>Build High-Converting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Online Stores</span></>,
                description: "From custom storefronts to seamless checkout flows. We engineer e-commerce platforms that drive sales and retain customers.",
                primaryCta: "Launch Your Store",
                secondaryCta: "View Examples"
            }}
            intro={{
                title: "Sell Everywhere",
                description: "In highly competitive markets, your store needs to be fast, beautiful, and frictionless. We build shopping experiences that sell."
            }}
            features={[
                {
                    icon: <ShoppingCart size={24} />,
                    title: "Custom Storefronts",
                    description: "Unique designs tailored to your brand identity, moving beyond generic templates."
                },
                {
                    icon: <CreditCard size={24} />,
                    title: "Secure Payments",
                    description: "Integration with Stripe, PayPal, Razorpay, and global gateways for secure transactions."
                },
                {
                    icon: <Package size={24} />,
                    title: "Inventory Management",
                    description: "Sync stock across multiple channels and automate order processing workflows."
                },
                {
                    icon: <Truck size={24} />,
                    title: "Shipping Logistics",
                    description: "Real-time shipping rates and tracking integration for FedEx, DHL, and local couriers."
                },
                {
                    icon: <BarChart size={24} />,
                    title: "Sales Analytics",
                    description: "Deep insights into customer behavior, abandoned carts, and revenue trends."
                },
                {
                    icon: <Zap size={24} />,
                    title: "Speed Optimization",
                    description: "Lightning-fast page loads to maximize conversion rates and SEO rankings."
                }
            ]}
            techStack={{
                title: "E-Commerce Tech",
                description: "We fit the right technology to your business size, from startup to enterprise.",
                benefits: [
                    "PCI Compliant Security",
                    "Mobile-Optimized Checkout",
                    "SEO-Ready Structure"
                ],
                logos: [
                    { name: "Shopify", icon: <ShoppingCart /> },
                    { name: "WooCommerce", icon: <Globe /> },
                    { name: "Magento", icon: <Award /> },
                    { name: "Stripe", icon: <CreditCard /> },
                    { name: "Next.js", icon: <Zap /> },
                    { name: "Node.js", icon: <Globe /> }
                ]
            }}
            cta={{
                title: "Start Selling Online",
                description: "Get a custom e-commerce strategy tailored to your products and audience.",
                buttonText: "Get E-Commerce Quote"
            }}
        />
    );
};

export default Ecommerce;
