'use client'
import React, { useEffect, useState } from "react";
import SupportTicketChat from "@/componant/client/support-help/SupportTicketChat";
import { SupportRow } from "@/componant/client/support-help/SupportHelp";

const fetchTickets = async (page = 1, limit = 100): Promise<SupportRow[]> => {
  const res = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${limit}`, {
    headers: { 'x-api-key': 'reqres-free-v1' },
  });
  const data = await res.json();
  return data.data.map((user: any) => ({
    id: user.id,
    user: `#Tk12${100 + user.id}`,
    avatar: user.avatar,
    name: user.first_name,
    subject: "EIN Not Received",
    submitted: "Apr 15,2025",
    updated: "Apr 20,2025",
    assignee: user.first_name,
    status: ["In Progress", "Resolve"][user.id % 2],
    priority: ["High", "Medium", "Low"][user.id % 3],
  }));
};

const SupportTicketChatPage = ({ params }: { params: { ticketId: string } }) => {
  const [tickets, setTickets] = useState<SupportRow[]>([]);
  useEffect(() => {
    fetchTickets().then(setTickets);
  }, []);

  return (
    <SupportTicketChat tickets={tickets} initialTicketId={params.ticketId} />
  );
};

export default SupportTicketChatPage; 