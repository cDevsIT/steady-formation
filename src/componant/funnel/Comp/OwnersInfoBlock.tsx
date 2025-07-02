import Image from "@/componant/ui/Image";

interface OwnerData {
    name: string;
    email: string;
    phone: string;
    percent: string;
    country: string;
}

interface OwnersInfoBlockProps {
    editSection: string | null;
    tempData: OwnerData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCancel: () => void;
    handleSave: () => void;
    data: OwnerData;
    handleEdit: (section: string, data: OwnerData) => void;
    editSectionName: string;
    title: string;
}

const OwnersInfoBlock: React.FC<OwnersInfoBlockProps> = ({ title, editSectionName, editSection, tempData, handleInputChange, handleCancel, handleSave, data, handleEdit }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 px-[23px] py-[18px] relative max-w-[728px] mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-base text-black font-semibold">{title}</span>

                {editSection !== editSectionName && (
                    <button className=" hover:underline flex items-center gap-1" onClick={() => handleEdit("owner", data)}>
                        <Image
                            className="w-[16px]"
                            url='/icons/edit.svg'
                            alt='Edit'
                            width={16}
                            height={16}
                        />
                        <span className="text-sm text-gray-600 font-normal">Edit</span>
                    </button>
                )}
            </div>
            {editSection === editSectionName ? (
                <div className="space-y-2">
                    <input name="name" value={tempData.name} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
                    <input name="email" value={tempData.email} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
                    <input name="phone" value={tempData.phone} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
                    <input name="percent" value={tempData.percent} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
                    <input name="country" value={tempData.country} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
                    <div className="flex gap-2 mt-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
                        <button className="bg-gray-200 px-3 py-1 rounded" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Image
                            className="w-[16px]"
                            url='/icons/overview-person.svg'
                            alt='overview-person'
                            width={16}
                            height={16}
                        />
                        <span className="text-sm text-gray-600 mt-1">{data.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Image
                            className="w-[16px]"
                            url='/icons/overview-mail.svg'
                            alt='overview-mail'
                            width={16}
                            height={16}
                        />
                        <span className="text-sm text-gray-600 mt-1">{data.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Image
                            className="w-[16px]"
                            url='/icons/overview-phone.svg'
                            alt='overview-phone'
                            width={16}
                            height={16}
                        />
                        <span className="text-sm text-gray-600 mt-1">{data.phone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Image
                            className="w-[16px]"
                            url='/icons/overview-percent.svg'
                            alt='overview-percent'
                            width={16}
                            height={16}
                        />
                        <span className="text-sm text-gray-600 mt-1">{data.percent}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Image
                            className="w-[16px]"
                            url='/icons/overview-map.svg'
                            alt='overview-map'
                            width={16}
                            height={16}
                        />
                        <span className="text-sm text-gray-600 mt-1">{data.country}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnersInfoBlock;