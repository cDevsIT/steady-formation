'use client'
import React, { useState, useEffect } from "react";
import Image from "@/componant/ui/Image";
import { SupportRow } from "./SupportHelp";
import { useRouter, usePathname, useParams } from "next/navigation";

interface SupportTicketChatProps {
  tickets: SupportRow[];
  initialTicketId?: string | number;
}

const SupportTicketChat: React.FC<SupportTicketChatProps> = ({ tickets }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  let ticketIdFromUrl = params?.ticketId;
  if (Array.isArray(ticketIdFromUrl)) {
    ticketIdFromUrl = ticketIdFromUrl[0];
  }

  const [activeTicketId, setActiveTicketId] = useState<string | number | null>(ticketIdFromUrl ?? (tickets[0]?.id ?? null));

  // Always select the ticket matching the ticketId in the URL
  useEffect(() => {
    if (ticketIdFromUrl !== undefined && ticketIdFromUrl !== null) {
      setActiveTicketId(ticketIdFromUrl);
    }
  }, [ticketIdFromUrl]);

  // If tickets change and the current activeTicketId is not present, select the first ticket
  useEffect(() => {
    if (tickets.length > 0 && !tickets.some(t => t.id == activeTicketId)) {
      setActiveTicketId(ticketIdFromUrl ?? tickets[0].id);
    }
  }, [tickets, activeTicketId, ticketIdFromUrl]);

  const ticket = tickets.find((t) => t.id == activeTicketId);

  const handleSidebarClick = (id: string | number) => {
    if (id !== activeTicketId) {
      router.push(`/client/support-help/${id}`);
      // setActiveTicketId(id); // Not needed, will be set by URL change
    }
  };

  return (
    <div className="flex w-full h-[80vh] bg-white rounded-2xl border border-gray-200 overflow-hidden text-[#222]">
      {/* Ticket List */}
      <div className="w-1/4 min-w-[180px] border-r border-gray-100 bg-[#fafbfc] p-4 flex flex-col gap-2 overflow-y-auto max-h-[80vh]">
        <div className="font-semibold mb-2">All</div>
        {tickets.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${t.id == ticket?.id ? "bg-[#f3f0ff]" : "hover:bg-gray-50"}`}
            onClick={() => handleSidebarClick(t.id)}
          >
            <Image url={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
            <div>
              <div className="font-medium text-sm">{t.subject}</div>
              <div className="text-xs text-gray-400">{t.user}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Chat Area */}
      <div className="flex-1 flex flex-col border-r border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{ticket?.subject}</span>
            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${ticket?.priority === 'High' ? 'bg-red-100 text-red-700' : ticket?.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-500'}`}>{ticket?.priority}</span>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-white">
          {/* Example: Replace with real messages if available */}
          <div className="flex justify-end">
            <div className="max-w-[60%] px-4 py-2 rounded-lg bg-[#f3f0ff] text-right">
              <div className="text-sm mb-1">Hi, I would like to talk about why my EIN not received</div>
              <div className="text-xs text-gray-400">12:05 Am</div>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[60%] px-4 py-2 rounded-lg bg-gray-100">
              <div className="text-sm mb-1">Thanks For your message, our team a way to reach you</div>
              <div className="text-xs text-gray-400">12:05 Am</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-6 py-4 border-t border-gray-100">
          <input
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
            placeholder="Type Here"
            // value={input}
            // onChange={(e) => setInput(e.target.value)}
          />
          <button className="p-2 bg-[#7856FC] rounded-full hover:bg-[#5D3FC4]">
            <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg>
          </button>
        </div>
      </div>
      {/* Details */}
      <div className="w-1/4 min-w-[200px] bg-[#fafbfc] p-6 flex flex-col gap-2">
        <div className="font-semibold mb-2">Details</div>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between"><span>Ticket Id</span><span className="font-medium">#{ticket?.user}</span></div>
          <div className="flex justify-between"><span>Submitted</span><span>{ticket?.submitted}</span></div>
          <div className="flex justify-between"><span>Last Update</span><span>{ticket?.updated}</span></div>
          <div className="flex justify-between"><span>Assignee</span><span>{ticket?.assignee}</span></div>
          <div className="flex justify-between"><span>Status</span><span className={`px-2 py-0.5 rounded text-xs font-medium ${ticket?.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{ticket?.status}</span></div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketChat; 