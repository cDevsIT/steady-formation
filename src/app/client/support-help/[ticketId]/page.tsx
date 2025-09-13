'use client'
import React, { useEffect, useState } from "react";
import SupportTicketChat from "@/componant/client/support-help/SupportTicketChat";
import { SupportRow } from "@/componant/client/support-help/SupportHelp";
import { ticketsService } from "@/lib/ticketsService";

const SupportTicketChatPage = ({ params }: { params: Promise<{ ticketId: string }> }) => {
  const [tickets, setTickets] = useState<SupportRow[]>([]);
  const [ticketId, setTicketId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the ticketId from params
        const { ticketId: paramTicketId } = await params;
        setTicketId(paramTicketId);
        
        // Fetch user's tickets
        const response = await ticketsService.getUserTickets({
          page: 1,
          per_page: 100, // Get all tickets for the sidebar
        });

        if (response.status === 'success' && response.data) {
          setTickets(response.data.tickets);
        } else {
          setError(response.message || 'Failed to fetch tickets');
        }
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return (
      <div className="flex w-full h-[80vh] bg-white rounded-2xl border border-gray-200 overflow-hidden text-[#222] items-center justify-center">
        <div className="text-gray-500">Loading tickets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-[80vh] bg-white rounded-2xl border border-gray-200 overflow-hidden text-[#222] items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <SupportTicketChat tickets={tickets} initialTicketId={ticketId} />
  );
};

export default SupportTicketChatPage; 