import Image from "../ui/Image";
interface CustomeRatingProps {
  className?: string;
    radius?: boolean;
    maxWidth?:boolean;
}


const Rating: React.FC<CustomeRatingProps> = ({
    className = '',
    radius = false,
    maxWidth = true
}) => {
    return (
        <div className={`flex justify-center items-center bg-white ${maxWidth && 'max-w-[413px]'}  p-[35px] rounded-b-[24px] rounded-t-[24px]  ${radius && 'lg:rounded-t-[24px] lg:rounded-b-[0px]'} ${className}`}>
            <Image
                className="w-[35px]"
                url='/icons/leaf_left.svg'
                alt='rating-leaf-left'
                width={40}
                height={100}
            />
            <h2 className="text-[72px] leading-[90px]"> 4.8 </h2>

            <div className="ml-[6px]">
                <Image
                    className="w-[121px]"
                    url='/icons/rating_stars.svg'
                    alt='Rating Stars'
                    width={130}
                    height={25}
                />
                <span className="text-[17px] leading-[26px]">502 reviews</span>
            </div>

            <Image
                className="w-[35px]"
                url='/icons/leaf_right.svg'
                alt='rating-leaf-right'
                width={40}
                height={100}
            />
        </div>
    );
};

export default Rating;