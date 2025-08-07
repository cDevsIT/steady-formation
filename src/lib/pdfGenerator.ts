import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoiceItem {
  item: string;
  price: string;
  qty: string;
  total: string;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  companyName: string;
  companyAddress: string;
  status: 'Paid' | 'Pending' | 'Failed';
  items: InvoiceItem[];
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  transactionId?: string;
  paymentMethod?: string;
  paymentGateway?: string;
  userEmail?: string;
  userId?: string;
  entityType?: string;
  billingName?: string;
  billingLocation?: string;
  billingCityState?: string;
  billingCountry?: string;
}

export const generateInvoicePDF = async (data: InvoiceData): Promise<void> => {
  // Create HTML content with proper CSS styling
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice ${data.invoiceNumber}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: white;
          color: #333;
          line-height: 1.4;
          padding: 0;
          margin: 0;
        }
        
        .invoice-container {
          width: 595px;
          height: 842px;
          margin: 0 auto;
          background: white;
          position: relative;
          overflow: hidden;
        }
        
        /* Header image */
        .header-image {
          width: 100%;
          display: block;
          object-fit: cover;
          background: linear-gradient(90deg, rgba(120, 86, 252, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
        }

        .header-logo {
         position: absolute;
         top: 100px;
         left: 45px;
         width: 100px;
        }
        
        /* Main content */
        .main-content {
          width: 523px;
          margin: 0 auto;
          padding: 20px 0;
          position: relative;
          z-index: 1;
        }
        
        /* Info section */
        .info-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          gap: 15px;
        }
        
        .info-column {
          max-width:140px;
        }
        
        .info-label {
          background: #E3EFFF;
          color: #2388FF;
          padding: 0px 8px 8px 8px;
          border-radius: 2px;
          font-size: 8px;
          font-weight: normal;
          display: inline-block;
          margin-bottom: 8px;
        }
        
        .info-value {
          font-size: 14px;
          font-weight: bold;
          color: #000;
          margin-bottom: 4px;
        }
        
        .info-detail {
          font-size: 10px;
          color: #666;
          margin-bottom: 2px;
        }
        
        .status-badge {
          display: inline-block;
          padding: 0px 8px 12px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          color: white;
          margin-top: 4px;
        }
        
        .status-paid { background: #22C55E; }
        .status-pending { background: #9CA3AF; }
        .status-failed { background: #EF4444; }
        
        /* Items table */
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
        }
        
        .items-table th {
          background: #F9FAFB;
          color: #667085;
          font-size: 10px;
          font-weight: bold;
          padding: 0px 8px 10px 8px;
          text-align: left;
        }
        
        .items-table td {
          padding: 5px 8px 15px 8px;
          font-size: 10px;
          color: #344054;
          border-bottom: 0.6px solid #F6F8FC;
        }
        
        .items-table thead tr {
          background: #F6F8FC;
        }
        .items-table tbody tr {
          background: #FFF;
        }
        
        .item-total, .item-title {
          font-weight: bold;
        }
        
        /* Bottom section */
        .bottom-section {
          display: flex;
          justify-content: space-between;
          gap: 30px;
        }
        
        .terms-section {
          flex: 1;
        }
        
        .terms-title {
          font-size: 12px;
          font-weight: bold;
          color: #000;
          margin-bottom: 8px;
        }
        
        .terms-text {
          font-size: 9px;
          color: #667085;
          line-height: 1.4;
          max-width: 250px;
        }
        
        .summary-section {
          flex: 1;
          text-align: right;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 10px;
        }
        
        .summary-label {
          color: #000;
        }
        
        .summary-value {
          color: #000;
          font-weight: normal;
        }
        
        .summary-tax {
          color: #3B82F6;
        }
        
        .total-section {
          background: #F9FAFB;
          padding: 12px 16px;
          border-radius: 3px;
          margin-top: 12px;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .total-label {
          font-size: 12px;
          font-weight: bold;
          color: #000;
        }
        
        .total-value {
          font-size: 12px;
          font-weight: bold;
          color: #000;
        }
        
        /* Footer image */
        .footer-image {
          width: 100%;
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          object-fit: cover;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(120, 86, 252, 0.1) 100%);
        }
        
        /* Spacer for footer */
        .footer-spacer {
          height: 80px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <!-- Header image -->
        <img src="/print/print_header_u.jpg" alt="Header" class="header-image" onerror="this.style.display='none'">
        <img src="/steady-formation-logo.png" alt="Logo" class="header-logo" onerror="this.style.display='none'">
        
        <!-- Main content -->
        <div class="main-content">
          <!-- Info section -->
          <div class="info-section">
            <div class="info-column">
              <div class="info-label">Invoice to:</div>
              <div class="info-value">${data.clientName}</div>
              <div class="info-detail">${data.clientEmail}</div>
              <div class="info-detail">${data.clientAddress}</div>
            </div>
            
            <div class="info-column">
              <div class="info-label">Date:</div>
              <div class="info-value">${data.date}</div>
              <div class="info-detail">${data.companyName}</div>
              <div class="info-detail">${data.companyAddress}</div>
            </div>
            
            <div class="info-column">
              <div class="info-label">Invoice number:</div>
              <div class="info-value">${data.invoiceNumber}</div>
              <div class="status-badge status-${data.status.toLowerCase()}">${data.status}</div>
            </div>
          </div>
          
          <!-- Items table -->
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${data.items.map(item => `
                <tr>
                  <td class="item-title">${item.item}</td>
                  <td>${item.price}</td>
                  <td>${item.qty}</td>
                  <td class="item-total">${item.total}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <!-- Bottom section -->
          <div class="bottom-section">
            <div class="terms-section">
              <div class="terms-title">Terms & Conditions:</div>
              <div class="terms-text">
                Fees and payment terms will be established in the contract or agreement prior to the commencement of the project. An initial deposit will be required before any design work begins. We reserve the right to suspend or halt work in the event of non-payment.
              </div>
            </div>
            
            <div class="summary-section">
              <div class="summary-row">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">${data.subtotal}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Discount (Special Offer)</span>
                <span class="summary-value">${data.discount}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label summary-tax">TAX:</span>
                <span class="summary-value summary-tax">${data.tax}</span>
              </div>
              
              <div class="total-section">
                <div class="total-row">
                  <span class="total-label">Invoice total</span>
                  <span class="total-value">${data.total}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer spacer -->
          <div class="footer-spacer"></div>
        </div>
        
        <!-- Footer image -->
        <img src="/print/print_footer.jpg" alt="Footer" class="footer-image" onerror="this.style.display='none'">
      </div>
    </body>
    </html>
  `;

  // Create a temporary iframe to render the HTML
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.left = '-9999px';
  iframe.style.top = '0';
  iframe.style.width = '595px';
  iframe.style.height = '842px';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  // Write HTML content to iframe
  iframe.contentDocument!.write(htmlContent);
  iframe.contentDocument!.close();

  try {
    // Wait for iframe to load
    iframe.onload = async () => {
      try {
        // Convert iframe content to canvas
        const canvas = await html2canvas(iframe.contentDocument!.body, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: 595,
          height: 842,
          scrollX: 0,
          scrollY: 0
        });

        // Convert canvas to PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', [595, 842]); // Use points to match pixel dimensions

        // Add the image to PDF (single page)
        pdf.addImage(imgData, 'PNG', 0, 0, 595, 842);

        // Save the PDF directly
        pdf.save(`invoice-${data.invoiceNumber}.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        // Clean up
        document.body.removeChild(iframe);
      }
    };
  } catch (error) {
    console.error('Error setting up iframe:', error);
    document.body.removeChild(iframe);
  }
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Helper function to format date
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}; 