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
        <div className={`flex justify-center items-center bg-white ${maxWidth && 'max-w-[450px]'}  p-[35px] rounded-b-[24px] rounded-t-[24px]  ${radius && 'lg:rounded-t-[24px] lg:rounded-b-[0px]'} ${className}`}>
            <Image
                className="w-[35px]"
                url='/icons/leaf_left.svg'
                alt='rating-leaf-left'
                width={40}
                height={100}
            />
            <h2 className="text-[72px] leading-[90px]"> 4.8 </h2>

            <div className="ml-[6px]">
                <span className="text-[17px] leading-[26px]">Reviews Base on <br/>1000+ Satisfied Clients</span>
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