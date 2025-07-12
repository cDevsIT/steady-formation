import React from "react";
import ReusableTable, { SupportRow } from "@/componant/ui/ReusableTable";



// Mock data for demonstration
const MOCK_DATA: SupportRow[] = Array.from({ length: 42 }).map((_, i) => ({
    id: i + 1,
    user: `#Tk12${100 + i}`,
    avatar: `https://randomuser.me/api/portraits/men/${i % 10}.jpg`,
    name: ["Nasir", "Alex", "Sam", "John", "Jane", "Sara"][i % 6],
    subject: "EIN Not Received",
    submitted: "Apr 15,2025",
    updated: "Apr 20,2025",
    assignee: "Nasir",
    status: ["In Progress", "Resolve"][i % 2],
    priority: ["High", "Medium", "Low"][i % 3],
}));

const SupportHelp = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
          <ReusableTable data={MOCK_DATA} />
    </div>
  );
};

export default SupportHelp;