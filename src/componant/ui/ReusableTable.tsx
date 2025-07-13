"use client";
import React, { useEffect, useState, ReactNode } from 'react';
import Image from '@/componant/ui/Image';

// Type for a table row
export interface SupportRow {
  id: number;
  user: string;
  avatar: string;
  name: string;
  subject: string;
  submitted: string;
  updated: string;
  assignee: string;
  status: string;
  priority: string;
}

// Modal props type
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Simple Modal Component
const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        {children}
      </div>
    </div>
  );
};

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

const PAGE_SIZE = 8;

interface ReusableTableProps {
  apiEndpoint?: string;
  data?: SupportRow[];
}

const ReusableTable: React.FC<ReusableTableProps> = ({ apiEndpoint, data }) => {
  // State
  const [tableData, setTableData] = useState<SupportRow[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<SupportRow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

  // Fetch data (from prop or mock)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const source = data ?? MOCK_DATA;
      let filtered = source.filter(
        (row) =>
          row.user.toLowerCase().includes(search.toLowerCase()) ||
          row.name.toLowerCase().includes(search.toLowerCase()) ||
          row.subject.toLowerCase().includes(search.toLowerCase())
      );
      setTotal(filtered.length);
      const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      setTableData(paged);
      setLoading(false);
    }, 400);
  }, [search, page, data]);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleView = (row: SupportRow) => {
    setModalData(row);
    setModalOpen(true);
  };

  const handleEdit = (row: SupportRow) => {
    // For demo, just alert. In real use, route to edit page.
    alert(`Navigate to edit page for ID: ${row.id}`);
  };

  const handleDelete = (row: SupportRow) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      // For demo, just filter out locally
      setTableData((prev) => prev.filter((r) => r.id !== row.id));
    }
  };

  const handleCreate = () => {
    alert('Navigate to create page');
  };

  // Pagination
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold">Support</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="border border-gray-200 rounded-lg px-3 py-2 w-full md:w-64 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleCreate}
            className="bg-[#7856FC] hover:bg-[#5D3FC4] text-white font-semibold px-4 py-2 rounded-lg shadow text-sm"
          >
            Create Support ticket
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left whitespace-nowrap">User ID/Name</th>
              <th className="p-3 text-left whitespace-nowrap">Subject</th>
              <th className="p-3 text-left whitespace-nowrap">Submitted On</th>
              <th className="p-3 text-left whitespace-nowrap">Last Update</th>
              <th className="p-3 text-left whitespace-nowrap">Assignee</th>
              <th className="p-3 text-left whitespace-nowrap">Status</th>
              <th className="p-3 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-8">Loading...</td>
              </tr>
            ) : tableData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8">No data found.</td>
              </tr>
            ) : (
              tableData.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 flex items-center gap-2">
                    <Image url={row.avatar} alt={row.name} className="w-8 h-8 rounded-full object-cover" />
                    <span>{row.user}</span>
                  </td>
                  <td className="p-3 whitespace-nowrap">{row.subject}</td>
                  <td className="p-3 whitespace-nowrap">{row.submitted}</td>
                  <td className="p-3 whitespace-nowrap">{row.updated}</td>
                  <td className="p-3 whitespace-nowrap">{row.assignee}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mr-1 ${row.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{row.status}</span>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${row.priority === 'High' ? 'bg-red-100 text-red-700' : row.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-500'}`}>{row.priority}</span>
                  </td>
                  <td className="p-3 flex gap-2 items-center overflow-visible">
                    <button
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-xs"
                      onClick={() => handleView(row)}
                    >
                      View
                    </button>
                    <div className="relative group">
                      <button className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-xs flex items-center" tabIndex={0}>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="1.5"/><circle cx="9" cy="4" r="1.5"/><circle cx="9" cy="14" r="1.5"/></svg>
                      </button>
                      <div className="absolute right-0 top-8 z-30 min-w-[100px] w-28 hidden group-hover:block bg-white border border-gray-200 rounded shadow">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-xs" onClick={() => handleEdit(row)}>Edit</button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-xs text-red-600" onClick={() => handleDelete(row)}>Delete</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        <div className="text-sm text-gray-500">
          Showing {(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, total)} of {total}
        </div>
        <div className="flex gap-1">
          <button
            className="px-3 py-1 rounded border text-xs disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded border text-xs ${page === i + 1 ? 'bg-[#7856FC] text-white' : ''}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded border text-xs disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {/* Modal for View */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalData && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Support Ticket Details</h3>
            <div className="flex items-center gap-3 mb-4">
              <Image url={modalData.avatar} alt={modalData.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-medium">{modalData.name} <span className="text-gray-400 text-xs">({modalData.user})</span></div>
                <div className="text-xs text-gray-500">Assignee: {modalData.assignee}</div>
              </div>
            </div>
            <div className="mb-2"><span className="font-semibold">Subject:</span> {modalData.subject}</div>
            <div className="mb-2"><span className="font-semibold">Submitted:</span> {modalData.submitted}</div>
            <div className="mb-2"><span className="font-semibold">Last Update:</span> {modalData.updated}</div>
            <div className="mb-2"><span className="font-semibold">Status:</span> {modalData.status}</div>
            <div className="mb-2"><span className="font-semibold">Priority:</span> {modalData.priority}</div>
            <button className="mt-4 bg-[#7856FC] hover:bg-[#5D3FC4] text-white px-4 py-2 rounded" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReusableTable;