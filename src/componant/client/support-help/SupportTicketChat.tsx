'use client'
import React, { useState, useEffect } from "react";
import Image from "@/componant/ui/Image";
import { SupportRow } from "./SupportHelp";
import { useRouter, usePathname, useParams } from "next/navigation";
import { ticketsService, Ticket, Comment, AddCommentData } from "@/lib/ticketsService";

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
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  // Fetch ticket details when activeTicketId changes
  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (!activeTicketId) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await ticketsService.getTicket(Number(activeTicketId));
        if (response.status === 'success' && response.data) {
          setCurrentTicket(response.data);
          setComments(response.data.comments || []);
        } else {
          setError(response.message || 'Failed to fetch ticket details');
        }
      } catch (err) {
        console.error('Error fetching ticket details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch ticket details');
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [activeTicketId]);

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

  const handleSendComment = async () => {
    if (!newComment.trim() || !activeTicketId) return;

    try {
      setLoading(true);
      setError(null);

      const commentData: AddCommentData = {
        comment_text: newComment,
        attachment: attachment || undefined,
      };

      const response = await ticketsService.addComment(Number(activeTicketId), commentData);

      if (response.status === 'success' && response.data) {
        setComments(prev => [...prev, response.data!]);
        setNewComment('');
        setAttachment(null);
      } else {
        setError(response.message || 'Failed to send comment');
      }
    } catch (err) {
      console.error('Error sending comment:', err);
      setError(err instanceof Error ? err.message : 'Failed to send comment');
    } finally {
      setLoading(false);
    }
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
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
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading...</div>
            </div>
          )}

          {/* Original ticket message */}
          {currentTicket && (
            <div className="flex justify-end">
              <div className="max-w-[60%] px-4 py-2 rounded-lg bg-[#f3f0ff] text-right">
                <div 
                  className="text-sm mb-1"
                  dangerouslySetInnerHTML={{ 
                    __html: (currentTicket.content || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') 
                  }}
                />
                <div className="text-xs text-gray-400">
                  {currentTicket.created_at ? new Date(currentTicket.created_at).toLocaleTimeString() : ''}
                </div>
                {currentTicket.file_url && (
                  <div className="mt-2">
                    <a 
                      href={currentTicket.file_url} 
                      download={currentTicket.file_name}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      📎 {currentTicket.file_name}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Comments */}
          {comments.map((comment) => (
            <div key={comment.id} className={`flex ${comment.user.role === 1 ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[60%] px-4 py-2 rounded-lg ${comment.user.role === 1 ? 'bg-gray-100' : 'bg-[#f3f0ff] text-right'}`}>
                <div 
                  className="text-sm mb-1"
                  dangerouslySetInnerHTML={{ 
                    __html: (comment.comment_text || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') 
                  }}
                />
                <div className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleTimeString()}
                </div>
                {comment.file_url && (
                  <div className="mt-2">
                    <a 
                      href={comment.file_url} 
                      download={comment.file_name}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      📎 {comment.file_name}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <input
              type="file"
              id="attachment"
              className="hidden"
              onChange={handleAttachmentChange}
              accept=".jpeg,.png,.jpg,.gif,.pdf,.doc,.docx"
            />
            <label
              htmlFor="attachment"
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              title="Attach file"
            >
              📎
            </label>
            {attachment && (
              <span className="text-xs text-gray-600">
                {attachment.name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
              placeholder="Type your message here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
              disabled={loading}
            />
            <button 
              className="p-2 bg-[#7856FC] rounded-full hover:bg-[#5D3FC4] disabled:opacity-50"
              onClick={handleSendComment}
              disabled={loading || !newComment.trim()}
            >
              <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg>
            </button>
          </div>
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
          <div className="flex justify-between"><span>Status</span><span className={`px-2 py-0.5 rounded text-xs font-medium ${ticket?.status === 'Open' ? 'bg-green-100 text-green-700' : ticket?.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{ticket?.status}</span></div>
          {currentTicket?.user_info && (
            <>
              <div className="flex justify-between"><span>Customer</span><span>{currentTicket.user_info.name}</span></div>
              <div className="flex justify-between"><span>Email</span><span className="text-xs">{currentTicket.user_info.email}</span></div>
              {currentTicket.user_info.phone && (
                <div className="flex justify-between"><span>Phone</span><span className="text-xs">{currentTicket.user_info.phone}</span></div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportTicketChat; 