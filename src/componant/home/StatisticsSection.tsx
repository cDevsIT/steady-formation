export default function StatisticsSection() {
    return (
        <section className="w-full bg-white py-16 px-4">
            <div className="max-w-[1512px] mx-auto">
                <div className="flex flex-col lg:flex-row lg:flex lg:items-center justify-center  lg:gap-12">
                    {/* Stats Grid - Left Side */}
                    <div className="grid grid-cols-2 gap-6 flex-shrink-0">
                        {/* Nations Served */}
                        <div className="bg-[#EBE8FF] p-8 rounded-2xl">
                            <div className="text-4xl font-bold text-[#7856FC] mb-2">50+</div>
                            <div className="text-black font-medium leading-tight">
                                Nations We&apos;ve<br />Proudly Served
                            </div>
                        </div>

                        {/* Total Satisfied Customers */}
                        <div className="bg-[#ECFDFF] p-8 rounded-2xl">
                            <div className="text-4xl font-bold text-[#06AED4] mb-2">500+</div>
                            <div className="text-black font-medium leading-tight">
                                Total Satisfied<br />Customers Worldwide
                            </div>
                        </div>

                        {/* Companies Formed */}
                        <div className="bg-[#FEFBE8] p-8 rounded-2xl">
                            <div className="text-4xl font-bold text-[#EAAA08] mb-2">500+</div>
                            <div className="text-black font-medium leading-tight">
                                Companies We<br />Successfully Formed
                            </div>
                        </div>

                        {/* Success Rate */}
                        <div className="bg-[#EDFCF2] p-8 rounded-2xl">
                            <div className="text-4xl font-bold text-[#16B364] mb-2">99.9%</div>
                            <div className="text-black font-medium">Success Rate</div>
                        </div>
                    </div>

                    {/* Content - Right Side */}
                    <div className="flex-1 max-w-md">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Empowering Nationwide Entrepreneurs to Start and Scale U.S. Companies
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            At Clearly Formation, our philosophy is driven by a commitment to dismantling
                            barriers for global business owners. With over seven years of expertise in strategy,
                            taxation, and information law, we make U.S. company formation seamless and
                            enable entrepreneurs to flourish on a worldwide scale.
                        </p>
                    </div>
                </div>


            </div>
        </section>
    );
}