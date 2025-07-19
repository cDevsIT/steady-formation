'use client'
import React, { useEffect, useState } from "react";
import CustomPaginationTable, { CustomPaginationTableProps } from "@/componant/ui/CustomPaginationTable";
import { Column } from "react-table";
import Image from "@/componant/ui/Image";
import Modal from "@/componant/ui/Modal";
import { InputField, ReusableForm } from "@/componant/ui/ReusableFormTwo";
import { prioroty, serviceTypes } from "@/componant/funnel/funnel.type";

// SupportRow type
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

const PAGE_SIZE = 2;

const columns: Column<SupportRow>[] = [
  {
    Header: "User ID/Name",
    accessor: "user"
  },
  {
    Header: "Subject",
    accessor: "subject",
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image url={row.original.avatar} alt={row.original.name} className="w-8 h-8 rounded-full object-cover" />
        <span>{row.original.subject}</span>
      </div>
    ),
  },
  {
    Header: "Submitted On",
    accessor: "submitted",
  },
  {
    Header: "Last Update",
    accessor: "updated",
  },
  {
    Header: "Assignee",
    accessor: "assignee",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }) => (
      <div className="flex flex-col justify-center items-center gap-2">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium mr-1 ${row.original.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{row.original.status}</span>
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${row.original.priority === 'High' ? 'bg-red-100 text-red-700' : row.original.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-500'}`}>{row.original.priority}</span>
      </div>
    ),
  },
];

const SupportHelp = () => {
  const [data, setData] = useState<SupportRow[]>([]);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [createTicket, setCreateTicket] = useState(false);
  const [completeTicket, setCompleteTicket] = useState(false);
  const [modalData, setModalData] = useState<SupportRow | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [total, setTotal] = useState(0);

  // Fetch paginated demo data from reqres.in
  useEffect(() => {
    setLoading(true);
    fetch(`https://reqres.in/api/users?page=${paginationPage}&per_page=${limit}`, {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(`${res.status} ${res.statusText} — ${errMsg}`);
        }
        return res.json();
      })
      .then((res) => {
        // Map reqres users to SupportRow
        const mapped: SupportRow[] = res.data.map((user: any) => ({
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
        // Filter by search
        const filtered = search
          ? mapped.filter(
            (row) =>
              row.user.toLowerCase().includes(search.toLowerCase()) ||
              row.name.toLowerCase().includes(search.toLowerCase()) ||
              row.subject.toLowerCase().includes(search.toLowerCase())
          )
          : mapped;
        setData(filtered);
        setPageCount(res.total_pages);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paginationPage, limit, search]);

  // Handlers
  const handleView = (row: SupportRow) => {
    setModalData(row);
    setModalOpen(true);
  };
  const handleDelete = (id: string | number) => {
    setData((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEdit = (row: SupportRow) => {
    alert(`Navigate to edit page for ID: ${row.id}`);
  };
  const handleSearch = (value: string) => {
    setSearch((prev) => {
      if (prev !== value) {
        setPaginationPage(1);
        return value;
      }
      return prev;
    });
  };
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPaginationPage(1);
  };


  const handleNewTicketCreate = (data: any) => {
    console.log('Form Data:', data);
    setCreateTicket(false)
    setCompleteTicket(true);
  };

  return (
    <div className="max-w-[975px] mx-auto border border-gray-200 overflow-hidden rounded-3xl py-3">
      <CustomPaginationTable
        paginationPage={paginationPage}
        pageCount={pageCount}
        onPageChange={setPaginationPage}
        limit={limit}
        onLimitChange={handleLimitChange}
        columns={columns}
        data={data}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        // addNewButton={{ label: "Create Support Ticket" }}
        addNewButtonComponent={
          <button
            className="text-sm text-white bg-[#7856FC] hover:bg-[#6941C6] p-3 rounded-lg"
            onClick={() => setCreateTicket(true)}
          >
            Create Support Ticket
          </button>
        }
        showViewAction={true}
        showEditAction={true}
        showDeleteAction={true}
        handleView={handleView}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        editPath="/client/support-help/edit"
        onSearch={handleSearch}
        path="Support"
      />

      {/* Create New Ticket */}

      {createTicket && (
        <Modal open={createTicket} onClose={() => setCreateTicket(false)}>
          <ReusableForm onSubmit={handleNewTicketCreate} submitText="Create Support ticket" formTitle="Create ticket" isModal={true}>
            <InputField
              name="subject"
              label="Subject"
              type="text"
              inputClasss=''
              required
              className="col-span-2! "
            />
            <InputField
              name="department"
              label="Department"
              type="select"
              required
              placeholder="Select Department Name"
              options={serviceTypes}
              className="col-span-2! "
            />

            <InputField
              name="priority"
              label="Priority"
              type="select"
              required
              placeholder="Select Priority"
              options={prioroty}
              className="col-span-2! "
            />

            <InputField
              name="description"
              label="Description"
              type="text"
              inputClasss='h-[120px]'
              required
              className="col-span-2! "
            />

            <InputField
              name="upload_file"
              label="Upload File"
              type="file"
              required
              className="col-span-2! "
              supportingText='SVG, PNG, JPG or GIF (max 4MB. 800x400px)'
            />
          </ReusableForm>
        </Modal>
      )}

      {completeTicket && (
        <Modal open={completeTicket} onClose={() => setCompleteTicket(false)}>
          <div className="p-4">
            <div className="flex flex-col items-center gap-3 max-w-[407px] mx-auto">
              <Image className="w-[76px]" url="/icons/confirm.svg" width={76} height={76} alt="Confirm" />
              <h2 className="text-[24px] lg:text-[30px] font-semibold text-center mb-2">Ticket Submitted</h2>
              <p className="text-[#6B7280] text-center mb-4 text-base font-normal">We will review your application 2 or 3 business days after complete, we&apos;re will inform you</p>
              <button onClick={() => setCompleteTicket(false)} className="bg-[#7856FC] hover:bg-[#6156fc] text-white font-medium rounded-md px-6 py-2 mb-6 transition">Check Details </button>
            </div>
          </div>
        </Modal>
      )}
      {/* Modal for View */}
      {modalOpen && modalData && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="p-4">
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
        </Modal>
      )}
    </div>
  );
};

export default SupportHelp;