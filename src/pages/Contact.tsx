import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

import { supabase } from "../lib/supabase";
import SEO from '../components/SEO';


const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // 1. Save to Supabase
      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          },
        ]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error('Failed to save message');
      }

      setSubmitMessage(
        "Thank you for your message! We will get back to you soon."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitMessage("");
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      content: "mobintix@gmail.com",
      link: "mailto:mobintix@gmail.com",
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      content: "+91 94093 83803",
      link: "tel:919409383803",
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      content: "95, Krishna Residency, Surat, Gujarat 394190",
      link: "https://share.google/pkt6dac9oU8Z76F5S",
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      content: "Mon - Fri: 9AM - 6PM",
      link: "https://share.google/pkt6dac9oU8Z76F5S",
    },
  ];

  return (
    <div className="bg-white">
      <SEO
        title="Contact Us"
        description="Get in touch with Mobintix Infotech. We are ready to discuss your next project and help you achieve your digital goals."
        url="/contact"
      />
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Have a project in mind? Let's discuss how we can help bring your
              vision to life.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="group bg-gray-50 p-6 hover:bg-black transition-all duration-500 text-center"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="inline-flex items-center justify-center text-black group-hover:text-white transition-colors duration-500 mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-black group-hover:text-white transition-colors duration-500 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-500 text-sm">
                  {info.content}
                </p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              className="space-y-6"
              style={{ animation: "fadeInLeft 0.8s ease-out both" }}
            >
              <h2 className="text-4xl font-bold text-black mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Fill out the form below and we'll get back to you as soon as
                possible. We're here to answer your questions and discuss your
                project needs.
              </p>

              <div className="bg-black text-white p-8">
                <h3 className="text-2xl font-bold mb-4">Why Work With Us?</h3>
                <ul className="space-y-3">
                  {[
                    "Fast response time within 24 hours",
                    "Experienced team of professionals",
                    "Transparent pricing and timelines",
                    "Dedicated project manager",
                    "Ongoing support and maintenance",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="bg-gray-50 p-8"
              style={{ animation: "fadeInRight 0.8s ease-out both" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="project">New Project</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={20} />
                    </>
                  )}
                </button>

                {submitMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm">
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Find Us Here</h2>
          <p className="text-gray-600 mb-8">
            Visit our office at Mobintix Infotech, Surat
          </p>

          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border">
            <iframe
              title="Mobintix Infotech Location"
              src="https://www.google.com/maps?q=Mobintix%20Infotech%20Surat&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: "grayscale(100%) contrast(1.1)" }}
            />
          </div>

          <a
            href="https://maps.app.goo.gl/6kx8gkDQSUka9UxY6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 bg-black text-white hover:bg-gray-800 transition"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
