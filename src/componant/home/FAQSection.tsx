import Accordion, { FAQItem } from "../ui/Accordion";
import Image from "../ui/Image";

const faqData: FAQItem[] = [
    {
        id: 1,
        question: "Is it legal for non-residents to open a business in the U.S.?",
        answer: "Yes, non-residents can legally form and own a U.S. company, including an LLC or corporation, without needing U.S. citizenship."
    },
    {
        id: 2,
        question: "How do taxes work for a newly formed LLC?",
        answer: "A newly formed LLC is typically taxed as a pass-through entity by default, meaning profits and losses pass through to the owners' personal tax returns. However, LLCs can elect different tax treatments including corporate taxation if beneficial."
    },
    {
        id: 3,
        question: "How fast can my company be formed?",
        answer: "Company formation speed varies by state. Some states like Delaware and Wyoming can process formations within 1-2 business days, while others may take 1-2 weeks. Expedited processing is often available for an additional fee."
    },
    {
        id: 4,
        question: "Is any physical address needed?",
        answer: "Yes, most states require a registered agent with a physical address in the state of formation. This can be your own address if you live in that state, or you can use a registered agent service."
    },
    {
        id: 5,
        question: "Do I need a U.S. bank account?",
        answer: "While not legally required for business formation, having a U.S. bank account is highly recommended for business operations, tax compliance, and maintaining good corporate records. Some banks may require an EIN and business documentation."
    },
    {
        id: 6,
        question: "How do you provide support?",
        answer: "We provide comprehensive support through multiple channels including email support, live chat during business hours, detailed documentation, and phone consultations for complex matters. Our team of business formation experts is available to guide you through every step."
    }
];

const FAQSection = () => {
    return (
        <section className="pb-20 px-4 bg-white">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 justify-items-center items-center">
                <div className="flex flex-col justify-between">
                   <div className="mx-auto">
                        <h2 className="text-[30px] lg:text-[48px] leading-[38px] lg:leading-[60px] font-bold text-gray-900 mb-6  text-center lg:text-start max-w-[807px] ">Frequently asked questions</h2>
                        <p className="text-[16px] leading-[24px] max-w-[692px] text-center lg:text-start text-[#475467]">Once you register your U.S. company, you`ll gain access to your personalized dashboard—designed to make managing your business effortless from anywhere in the world.</p>
                   </div>
                    <Image
                        className="w-[401px] hidden lg:block"
                        url='/homepage/faq_section.png'
                        alt='FAQ Section'
                        width={400}
                        height={400}
                    />
                </div>
                <Accordion className='lg:col-span-2' accordion={faqData}/>
            </div>

        </section>
    );
};

export default FAQSection;