interface PageHeaderProps {
    page:string;
    title: string;
    subTitle: string
}

const PageHeader = ({title, subTitle,page}:PageHeaderProps) => {
  return (
      <div className="w-full bg-[#F4F3FF] pt-[65px]">
          <div className="w-full max-w-[360px] md:max-w-[1280px] mx-auto py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-[16px] md:text-[16px] font-semibold text-[#7856FC] mb-[16px] font-inter leading-[20px] md:leading-[24px] text-center">{page}</p>
              <h1 className="text-[30px] md:text-[48px] font-semibold mb-4 font-inter leading-[38px] md:leading-[60px] tracking-[-0.02em] text-center">
                  {title}
              </h1>
              <p className="text-[16px] md:text-[20px] text-[#475467] font-normal font-inter leading-[24px] md:leading-[30px] text-center">
                  {subTitle}
              </p>
          </div>
      </div>
  );
};

export default PageHeader;