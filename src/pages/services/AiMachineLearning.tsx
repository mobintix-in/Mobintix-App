import ServicePage from '../../components/ServicePage';
import { Cpu, Brain, Activity, MessageSquare, Code, Zap } from 'lucide-react';

const AiMachineLearning = () => {
    return (
        <ServicePage
            seo={{
                title: "AI & Machine Learning Development | Custom AI Solutions",
                description: "Leverage the power of Artificial Intelligence. We build custom AI/ML models, chatbots, and predictive analytics solutions for businesses.",
                keywords: "ai development company, machine learning services, nlp solutions, computer vision, predictive analytics, custom ai models, openai integration",
                url: "/services/ai-ml",
                schema: {
                    name: "AI & Machine Learning Services",
                    description: "Custom Artificial Intelligence and Machine Learning development services."
                }
            }}
            hero={{
                title: <>Innovate with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Artificial Intelligence</span></>,
                description: "From automation to predictive insights. We help you integrate cutting-edge AI technologies to solve complex problems and gain a competitive edge.",
                primaryCta: "Discuss AI Project",
                secondaryCta: "Explore Use Cases"
            }}
            intro={{
                title: "Smart Solutions for Modern Problems",
                description: "AI is not just a buzzword. It's a tool to automate tasks, personalize experiences, and uncover hidden value in your data."
            }}
            features={[
                {
                    icon: <Brain size={24} />,
                    title: "Custom ML Models",
                    description: "Train specific models on your proprietary data to predict trends or classify information."
                },
                {
                    icon: <MessageSquare size={24} />,
                    title: "NLP & Chatbots",
                    description: "Intelligent conversational agents for customer support and internal knowledge retrieval."
                },
                {
                    icon: <Activity size={24} />,
                    title: "Predictive Analytics",
                    description: "Forecast sales, demand, or user churn based on historical data patterns."
                },
                {
                    icon: <Code size={24} />,
                    title: "Computer Vision",
                    description: "Image and video analysis for quality control, surveillance, or object detection."
                },
                {
                    icon: <Zap size={24} />,
                    title: "Process Automation",
                    description: "Intelligent RPA bots that can read documents and trigger complex workflows."
                },
                {
                    icon: <Cpu size={24} />,
                    title: "Generative AI",
                    description: "Integration with LLMs (GPT-4, Claude) for content generation and summarization."
                }
            ]}
            techStack={{
                title: "AI Frameworks",
                description: "We utilize powerful libraries and platforms to build intelligent systems.",
                benefits: [
                    "Scalable Inference",
                    "Custom Fine-Tuning",
                    "Ethical AI Practices"
                ],
                logos: [
                    { name: "Python", icon: <Code /> },
                    { name: "TensorFlow", icon: <Cpu /> },
                    { name: "PyTorch", icon: <Brain /> },
                    { name: "OpenAI", icon: <MessageSquare /> },
                    { name: "HuggingFace", icon: <Activity /> },
                    { name: "LangChain", icon: <Zap /> }
                ]
            }}
            cta={{
                title: "Future-Proof Your Business",
                description: "Discover how AI can reduce costs and drive innovation in your organization.",
                buttonText: "Consult AI Expert"
            }}
        />
    );
};

export default AiMachineLearning;
