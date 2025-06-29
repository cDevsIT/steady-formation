import { useState } from "react";
import { ChildComponentProps } from "./SecondFunnel";

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

const SeventhFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [businessInfo, setBusinessInfo] = useState(initialBusinessInfo);
  const [ownerInfo, setOwnerInfo] = useState(initialOwnerInfo);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<any>({});

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
    setEditSection(null);
    setTempData({});
  };
  const handleCancel = () => {
    setEditSection(null);
    setTempData({});
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Personal Info */}
        <div className="bg-white rounded-lg shadow p-4 relative">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Personal Info</span>
            {editSection !== "personal" && (
              <button className="text-xs text-gray-500 hover:underline" onClick={() => handleEdit("personal", personalInfo)}>
                Edit
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
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2"><span>👤</span>{personalInfo.name}</div>
              <div className="flex items-center gap-2"><span>📧</span>{personalInfo.email}</div>
              <div className="flex items-center gap-2"><span>📞</span>{personalInfo.phone}</div>
            </div>
          )}
        </div>
        {/* Business Info */}
        <div className="bg-white rounded-lg shadow p-4 relative">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Business info</span>
            {editSection !== "business" && (
              <button className="text-xs text-gray-500 hover:underline" onClick={() => handleEdit("business", businessInfo)}>
                Edit
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
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2"><span>👤</span>{businessInfo.owner}</div>
              <div className="flex items-center gap-2"><span>📍</span>{businessInfo.state}</div>
              <div className="flex items-center gap-2"><span>🏷️</span>{businessInfo.type}</div>
              <div className="flex items-center gap-2"><span>👥</span>{businessInfo.members}</div>
            </div>
          )}
        </div>
      </div>
      {/* Owners Info */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Owners Info</span>
          {editSection !== "owner" && (
            <button className="text-xs text-gray-500 hover:underline" onClick={() => handleEdit("owner", ownerInfo)}>
              Edit
            </button>
          )}
        </div>
        {editSection === "owner" ? (
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
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2"><span>👤</span>{ownerInfo.name}</div>
            <div className="flex items-center gap-2"><span>📧</span>{ownerInfo.email}</div>
            <div className="flex items-center gap-2"><span>📞</span>{ownerInfo.phone}</div>
            <div className="flex items-center gap-2"><span>💯</span>{ownerInfo.percent}</div>
            <div className="flex items-center gap-2"><span>🌎</span>{ownerInfo.country}</div>
          </div>
        )}
      </div>
      {/* Fee Breakdown */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="divide-y">
          <div className="flex justify-between py-2">
            <div>
              <div className="font-medium">State Fee</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">🏛️ Idaho</div>
            </div>
            <div className="text-lg font-bold text-purple-600">$100</div>
          </div>
          <div className="flex justify-between py-2">
            <div>
              <div className="font-medium">Registered Agent Package</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">📦 Free</div>
            </div>
            <div className="font-bold text-purple-500">Free</div>
          </div>
          <div className="flex justify-between py-2">
            <div>
              <div className="font-medium">Business Address Package</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">📦 Free</div>
            </div>
            <div className="font-bold text-purple-500">Free</div>
          </div>
          <div className="flex justify-between py-2">
            <div>
              <div className="font-medium">Registered Agent</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">📦 Free</div>
            </div>
            <div className="font-bold text-purple-500">Free</div>
          </div>
          <div className="flex justify-between py-2">
            <div>
              <div className="font-medium">EIN</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">🆔 No</div>
            </div>
            <div className="font-bold text-purple-500">$0.00</div>
          </div>
          <div className="flex justify-between py-2">
            <div>
              <div className="font-medium">Operating Agreement / Bylaws</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">📝 No</div>
            </div>
            <div className="font-bold text-purple-500">$0.00</div>
          </div>
          <div className="flex justify-between py-2">
            <div>
              <div className="font-medium">Expedited Processing</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">⚡ No</div>
            </div>
            <div className="font-bold text-purple-500">$0.00</div>
          </div>
        </div>
      </div>
      {/* Continue Button */}
      <button className="w-full bg-purple-500 text-white py-2 rounded text-lg font-semibold mt-4">Continue</button>
    </div>
  );
};

export default SeventhFunnel;