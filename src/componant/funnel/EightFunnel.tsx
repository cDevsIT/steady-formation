import { useEffect, useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";
import { FunnelHeading } from "../ui/FunnelHeading";
import Image from "../ui/Image";
import OwnersInfoBlock from "./Comp/OwnersInfoBlock";
import { dataState } from "./Funnel";

const initialPersonalInfo = {
  name: "Nasir Uddin",
  email: "nasir@gmail.com",
  phone: "+88016100000",
};
const initialBusinessInfo = {
  owner: "Nasir Uddin",
  state: "Idaho",
  type: "SAAS",
  members: "1",
};
const initialOwnerInfo = {
  name: "Nasir Uddin",
  email: "nasir@gmail.com",
  phone: "+88016100000",
  percent: "100%",
  country: "United States of America",
};

const initialOwnerInfoTwo = {
  name: "Nasir Uddin",
  email: "nasir@gmail.com",
  phone: "+88016100000",
  percent: "100%",
  country: "United States of America",
};

const feeData = [
  {
    id: 1,
    title: "State Fee",
    subtitle: "Idaho",
    icon: "/icons/overview-company.svg",
    price: "$100"
  },
  {
    id: 2,
    title: "Registered Agent Package",
    subtitle: "Free",
    icon: "/icons/overview-free.svg",
    price: "Free"
  },
  {
    id: 3,
    title: "Business Address Package",
    subtitle: "Free",
    icon: "/icons/overview-free.svg",
    price: "Free"
  },
  {
    id: 4,
    title: "Registered Agent",
    subtitle: "Free",
    icon: "/icons/overview-free.svg",
    price: "Free"
  },
  {
    id: 5,
    title: "EIN",
    subtitle: "No",
    icon: "/icons/overview-ein.svg",
    price: "$0.00"
  },
  {
    id: 6,
    title: "Operating Agreement / Bylaws",
    subtitle: "No",
    icon: "/icons/overview-aggrement.svg",
    price: "$0.00"
  },
  {
    id: 7,
    title: "Expedited Processing",
    subtitle: "No",
    icon: "/icons/overview-processing.svg",
    price: "$0.00"
  }

];

const EightFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
  const [data, setData] = useState<dataState>({});
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [businessInfo, setBusinessInfo] = useState(initialBusinessInfo);
  const [ownerInfo, setOwnerInfo] = useState(initialOwnerInfo);
  const [ownerInfoTwo, setOwnerInfoTwo] = useState(initialOwnerInfoTwo)
  const [editSection, setEditSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>({});




  // Load initial data from localStorage
  useEffect(() => {
    const localData = localStorage.getItem('companyData');
    if (localData) {
      const parsedData = JSON.parse(localData);
      setData(parsedData);
    }
  }, []);

  const singleLLc = data?.businessType === 'llc' && data?.stepTwo?.llcType === 'singleLLC' || data?.businessType === 's_corp'

  const directorInfo = data?.businessType === 'non_profit'

  // Handlers for edit/save/cancel
  const handleEdit = (section: string, data: any) => {
    setEditSection(section);
    setTempData(data);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    if (editSection === "personal") setPersonalInfo(tempData);
    if (editSection === "business") setBusinessInfo(tempData);
    if (editSection === "owner") setOwnerInfo(tempData);
    if (editSection === "ownerTwo") setOwnerInfoTwo(tempData);
    setEditSection(null);
    setTempData({});
  };
  const handleCancel = () => {
    setEditSection(null);
    setTempData({});
  };

  const handleContinue = () => {
    if (handleFormSubmit) handleFormSubmit({ stepEight: { personalInfo, businessInfo, ownerInfo } });
  };

  return (
    <div className="max-w-[728px] w-full">
      <FunnelHeading>
        Overview
      </FunnelHeading>
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Personal Info */}
        <div className="bg-white rounded-lg border border-gray-200 px-[23px] py-[18px] relative max-w-[355px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base text-black font-semibold">Personal Info</span>
            {editSection !== "personal" && (
              <button className=" hover:underline flex items-center gap-1" onClick={() => handleEdit("personal", personalInfo)}>
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
          {editSection === "personal" ? (
            <div className="space-y-2">
              <input name="name" value={tempData.name} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
              <input name="email" value={tempData.email} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
              <input name="phone" value={tempData.phone} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
                <button className="bg-gray-200 px-3 py-1 rounded" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Image
                  className="h-[16px]"
                  url='/icons/overview-person.svg'
                  alt='overview-person'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{personalInfo.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  className="h-[16px]"
                  url='/icons/overview-mail.svg'
                  alt='overview-mail'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  className="h-[16px]"
                  url='/icons/overview-phone.svg'
                  alt='overview-phone'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{personalInfo.phone}</span>
              </div>
            </div>
          )}
        </div>
        {/* Business Info */}
        <div className="bg-white rounded-lg border border-gray-200 px-[23px] py-[18px] relative max-w-[355px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base text-black font-semibold">Business info</span>
            {editSection !== "business" && (
              <button className=" hover:underline flex items-center gap-1" onClick={() => handleEdit("business", businessInfo)}>
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
          {editSection === "business" ? (
            <div className="space-y-2">
              <input name="owner" value={tempData.owner} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
              <input name="state" value={tempData.state} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
              <input name="type" value={tempData.type} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
              <input name="members" value={tempData.members} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
                <button className="bg-gray-200 px-3 py-1 rounded" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Image
                  className="w-[20px]"
                  url='/icons/overview-business-name.svg'
                  alt='overview-business-name'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{businessInfo.owner}</span>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  className="w-[20px]"
                  url='/icons/overview-map.svg'
                  alt='overview-map'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{businessInfo.state}</span>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  className="w-[20px]"
                  url='/icons/overview-company.svg'
                  alt='overview-company'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{businessInfo.type}</span>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  className="w-[20px]"
                  url='/icons/overview-people.svg'
                  alt='overview-people'
                  width={16}
                  height={16}
                />
                <span className="text-sm text-gray-600 mt-1">{businessInfo.members}</span>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Owners Info */}

      {singleLLc && <OwnersInfoBlock
        data={ownerInfo}
        handleEdit={handleEdit}
        editSection={editSection}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        tempData={tempData}
        editSectionName='owner'
        title="Owners Info"
      />}

      {directorInfo && <>
        <OwnersInfoBlock
          data={ownerInfo}
          handleEdit={handleEdit}
          editSection={editSection}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          tempData={tempData}
          editSectionName='owner'
          title="Director info 01"
        />

        <OwnersInfoBlock
          data={ownerInfoTwo}
          handleEdit={handleEdit}
          editSection={editSection}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          tempData={tempData}
          editSectionName='ownerTwo'
          title="Director info 02"
        />
      </>}

      {!singleLLc && !directorInfo && <>
        <OwnersInfoBlock
          data={ownerInfo}
          handleEdit={handleEdit}
          editSection={editSection}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          tempData={tempData}
          editSectionName='owner'
          title="Owners Info 01"
        />

        <OwnersInfoBlock
          data={ownerInfoTwo}
          handleEdit={handleEdit}
          editSection={editSection}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          tempData={tempData}
          editSectionName='ownerTwo'
          title="Owners Info 02"
        />
      </>}




      {/* Owners Info Two */}
      {/* <div className="bg-white rounded-lg border border-gray-200 px-[23px] py-[18px] relative max-w-[728px] mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-base text-black font-semibold">Owners Info</span>

          {editSection !== "ownerTwo" && (
            <button className=" hover:underline flex items-center gap-1" onClick={() => handleEdit("owner", ownerInfo)}>
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
        {editSection === "ownerTwo" ? (
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
              <span className="text-sm text-gray-600 mt-1">{ownerInfoTwo.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                className="w-[16px]"
                url='/icons/overview-mail.svg'
                alt='overview-mail'
                width={16}
                height={16}
              />
              <span className="text-sm text-gray-600 mt-1">{ownerInfoTwo.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                className="w-[16px]"
                url='/icons/overview-phone.svg'
                alt='overview-phone'
                width={16}
                height={16}
              />
              <span className="text-sm text-gray-600 mt-1">{ownerInfoTwo.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                className="w-[16px]"
                url='/icons/overview-percent.svg'
                alt='overview-percent'
                width={16}
                height={16}
              />
              <span className="text-sm text-gray-600 mt-1">{ownerInfoTwo.percent}</span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                className="w-[16px]"
                url='/icons/overview-map.svg'
                alt='overview-map'
                width={16}
                height={16}
              />
              <span className="text-sm text-gray-600 mt-1">{ownerInfoTwo.country}</span>
            </div>
          </div>
        )}
      </div> */}
      {/* Fee Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 relative max-w-[728px]">
        <div className="divide-y divide-gray-200">
          {feeData.map((fee, index) => (
            <div
              key={fee.id}
              className={`flex justify-between items-center px-5 py-3 ${index === 0 ? 'pt-4' : ''}  ${index === feeData.length - 1 ? 'pb-4' : ''}`}
            >
              <div>
                <div className="font-base font-semibold text-black">{fee.title}</div>
                <div className="flex items-center gap-3">
                  <Image
                    className="w-[20px]"
                    url={fee.icon}
                    alt='overview-company'
                    width={50}
                    height={50}
                  />
                  <span className="text-sm text-gray-600 mt-1">{fee.subtitle}</span>
                </div>
              </div>
              <div className="text-xl font-bold text-[#7856FC]">
                {fee.price}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Continue Button */}
      <button
        type="button"
        onClick={handleContinue}
        className="mt-6 w-full bg-[#7856FC] hover:bg-[#5D3FC4] text-white font-semibold py-3 rounded-xl shadow transition-all text-lg"
      >
        Continue
      </button>
    </div>
  );
};

export default EightFunnel;