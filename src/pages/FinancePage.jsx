import { Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import './FinancePage.css'

const initialStudents = [
  {
    id: 'GVS-2526-0190',
    roll: 1,
    name: 'K. YADHYA NIVEDHA',
    surname: 'KOKKIRIPATI',
    father: 'K K GANGADHAR',
    campus: 'SCHOOL',
    medium: 'English',
    class: 'NURSERY',
    section: 'A',
    admNo: '107',
    smId: '190',
    remarks: 'na',
    concession: {
      admissionType: 'New',
      studentType: 'Day Scholar',
      transportReq: 'No',
      transportFrom: 'na',
    },
    fees: [
      { name: 'Admission Fee', paid: 1000, balance: 0 },
      { name: 'Computer Fee', paid: 0, balance: 0 },
      { name: 'Tuition fee-I', paid: 6000, balance: 0 },
      { name: 'Tuition fee-II', paid: 3000, balance: 0 },
      { name: 'Transport Fee-I', paid: 0, balance: 0 },
      { name: 'Transport Fee-II', paid: 0, balance: 0 },
      { name: 'Books Fee', paid: 1700, balance: 0 },
      { name: 'Exam Fee', paid: 0, balance: 0 },
      { name: 'Uniform Fee', paid: 0, balance: 0 },
      { name: 'Tuition fee-III', paid: 3000, balance: 0 },
      { name: 'Belt', paid: 0, balance: 0 },
    ],
    vouchers: [
      { no: '40', date: '10/06/2025', credit: 2700, mode: 'Cash', bill: '2/525', debit: 0 },
      { no: '100', date: '09/08/2025', credit: 6000, mode: 'Cash', bill: 'NA', debit: 0 },
      { no: '578', date: '23/01/2026', credit: 3000, mode: 'Cash', bill: '3/1140', debit: 0 },
      { no: '690', date: '18/02/2026', credit: 3000, mode: 'Cash', bill: '3/1174', debit: 0 },
    ]
  },
  {
      id: 'GVS-2526-0191',
      roll: 2,
      name: 'D. PARNIKA',
      surname: 'DODDA',
      father: 'D. RAMESH',
      campus: 'SCHOOL',
      medium: 'English',
      class: 'NURSERY',
      section: 'A',
      admNo: '108',
      smId: '191',
      remarks: '-',
      concession: {
        admissionType: 'New',
        studentType: 'Day Scholar',
        transportReq: 'No',
        transportFrom: 'na',
      },
      fees: [
        { name: 'Admission Fee', paid: 1000, balance: 0 },
        { name: 'Tuition fee-I', paid: 5000, balance: 1000 },
      ],
      vouchers: []
  }
]

export default function FinancePage() {
  const [students] = useState(initialStudents)
  const [selectedId, setSelectedId] = useState(initialStudents[0].id)
  const [searchTerm, setSearchTerm] = useState('')
  const [year, setYear] = useState('2025-2026')
  const [medium, setMedium] = useState('English')

  const selectedStudent = useMemo(() => 
    students.find(s => s.id === selectedId) || students[0]
  , [selectedId, students])

  const filteredStudents = useMemo(() => 
    initialStudents.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  , [searchTerm])

  const totalPaid = useMemo(() => 
    selectedStudent.fees.reduce((acc, f) => acc + f.paid, 0)
  , [selectedStudent])

  const totalBalance = useMemo(() => 
    selectedStudent.fees.reduce((acc, f) => acc + f.balance, 0)
  , [selectedStudent])

  const actualTotal = totalPaid + totalBalance

  return (
    <div className="finance-page">
      {/* Top Controls */}
      <header className="finance-header-tools">
        <div className="finance-tool-group">
          <label>Year :</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option>2025-2026</option>
            <option>2024-2025</option>
          </select>
        </div>
        <div className="finance-tool-group">
          <label>Medium :</label>
          <select value={medium} onChange={(e) => setMedium(e.target.value)}>
            <option>English</option>
            <option>Telugu</option>
            <option>Hindi</option>
          </select>
        </div>
        <div className="finance-tool-group">
          <button className="select-btn">SELECT</button>
        </div>
        
        <div className="finance-option-search">
           <Search size={16} color="#718096" />
           <input 
             type="text" 
             placeholder="Search Fee Payment Option..." 
             style={{ width: '250px' }}
           />
        </div>
      </header>

      <div className="finance-grid">
        {/* Main Content Area */}
        <div className="finance-content-main">
          
          {/* Student Details Section */}
          <section className="finance-section-box">
            <header className="finance-section-header">Student Details</header>
            <div className="student-info-grid">
              <div className="info-field">
                <label>Campus :</label>
                <span>{selectedStudent.campus}</span>
              </div>
              <div className="info-field">
                <label>Medium :</label>
                <span>{selectedStudent.medium}</span>
              </div>
              <div className="info-field id-highlight">
                <label>ID :</label>
                <span>{selectedStudent.id}</span>
              </div>
              <div className="info-field highlight">
                <label>Adm No :</label>
                <span>{selectedStudent.admNo}</span>
              </div>
              <div className="info-field highlight">
                <label>SM ID :</label>
                <span>{selectedStudent.smId}</span>
              </div>
              
              <div className="info-field">
                <label>Roll No :</label>
                <span>{selectedStudent.roll}</span>
              </div>
              <div className="info-field">
                <label>Class :</label>
                <span>{selectedStudent.class}</span>
              </div>
              <div className="info-field">
                <label>Section :</label>
                <span>{selectedStudent.section}</span>
              </div>
              
              <div className="name-banner">
                {selectedStudent.name}
              </div>
              
              <div className="info-field">
                <label>Sur Name :</label>
                <span>{selectedStudent.surname}</span>
              </div>
              <div className="info-field">
                <label>Father/Guardian :</label>
                <span>{selectedStudent.father}</span>
              </div>
            </div>
          </section>

          {/* Remarks and Fees Row */}
          <div className="remarks-fees-row">
             <div className="remarks-panel">
               <section className="finance-section-box">
                 <header className="finance-section-header">Remarks</header>
                 <div className="remarks-box" style={{ padding: '0.5rem' }}>
                   <textarea value={selectedStudent.remarks} readOnly />
                 </div>
               </section>
             </div>
             
             <div className="fees-table-panel">
               <section className="finance-section-box">
                 <header className="finance-section-header">Fees Details</header>
                 <div className="finance-table-wrap">
                   <table className="finance-table">
                     <thead>
                       <tr>
                         <th>FEES DETAILS</th>
                         <th style={{ textAlign: 'right' }}>Paid</th>
                         <th style={{ textAlign: 'right' }}>Balance</th>
                       </tr>
                     </thead>
                     <tbody>
                       {selectedStudent.fees.map((fee, idx) => (
                         <tr key={idx}>
                           <td>{fee.name}</td>
                           <td className="amount-col paid-col">{fee.paid}</td>
                           <td className="amount-col balance-col">{fee.balance}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </section>
             </div>
          </div>

          {/* Concession and Totals Row */}
          <div className="concession-summary-row">
             <div className="concession-panel">
                <section className="finance-section-box">
                  <header className="finance-section-header">Concession Details</header>
                  <div className="concession-details-grid">
                    <div>Admission Type :</div> <div>{selectedStudent.concession.admissionType}</div>
                    <div>Student Type :</div> <div>{selectedStudent.concession.studentType}</div>
                    <div>Transport Req :</div> <div>{selectedStudent.concession.transportReq}</div>
                    <div>Transport Location :</div> <div>{selectedStudent.concession.transportFrom}</div>
                  </div>
                </section>
             </div>
             
             <div className="totals-panel">
                <div className="totals-box">
                   <div className="total-row">
                      <span>Present Yr. Net Total =</span>
                      <div className="amount-box">{actualTotal}</div>
                   </div>
                   <div className="total-row">
                      <span>Old Dues :</span>
                      <div className="amount-box">0</div>
                   </div>
                   <div className="total-row">
                      <span>Personal Account :</span>
                      <div className="amount-box">0</div>
                   </div>
                   <hr style={{ border: 'none', borderTop: '1px solid #cbd5e0', width: '100%' }} />
                   <div className="total-row">
                      <span>Grand Net Total =</span>
                      <div className="amount-box grand">{actualTotal}</div>
                   </div>
                   <div className="total-row">
                      <span>Total Paid Amount =</span>
                      <div className="amount-box grand">{totalPaid}</div>
                   </div>
                   <div className="total-row">
                      <span>Total Balance Amount =</span>
                      <div className="amount-box balance">{totalBalance}</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Vouchers Section */}
          <section className="finance-section-box">
            <header className="finance-section-header">Fees Paid Voucher Details</header>
            <div className="finance-table-wrap">
              <table className="finance-table">
                <thead>
                  <tr>
                    <th>Voucher No</th>
                    <th>Paid Date</th>
                    <th style={{ textAlign: 'right' }}>Credit</th>
                    <th>Paid Mode</th>
                    <th>Bill No</th>
                    <th style={{ textAlign: 'right' }}>Debit</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudent.vouchers.map((v, idx) => (
                    <tr key={idx}>
                      <td>{v.no}</td>
                      <td>{v.date}</td>
                      <td className="amount-col">{v.credit}</td>
                      <td>{v.mode}</td>
                      <td>{v.bill}</td>
                      <td className="amount-col">{v.debit}</td>
                    </tr>
                  ))}
                  {selectedStudent.vouchers.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>No voucher records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer Actions */}
          <div className="finance-footer-actions">
            <button className="action-btn nav">First</button>
            <button className="action-btn nav">Previous</button>
            <button className="action-btn nav">Next</button>
            <button className="action-btn nav">Last</button>
            <button className="action-btn">Edit</button>
            <button className="action-btn" disabled>Update</button>
            <button className="action-btn print">Print Fee Details</button>
            <button className="action-btn raise">Raise Voucher for General Fee Payment</button>
            <button className="action-btn">Option for providing Concession</button>
            <button className="action-btn view-detail">View Student's details</button>
          </div>
        </div>

        {/* Right Sidebar Student List */}
        <aside className="student-lookup-sidebar">
          <div className="finance-tool-group">
             <input 
               type="text" 
               placeholder="Search..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <div className="list-toggle-btns">
            <button>View Fee Details</button>
            <button className="active">View Student List</button>
          </div>
          <div className="lookup-list">
             {filteredStudents.map(s => (
               <div 
                 key={s.id} 
                 className={`lookup-item ${selectedId === s.id ? 'selected' : ''}`}
                 onClick={() => setSelectedId(s.id)}
               >
                 <span className="roll">{String(s.roll).padStart(2, '0')}</span>
                 <span className="name">{s.name}</span>
               </div>
             ))}
          </div>
          <div className="total-student-badge">
             {students.length} :Total Students
          </div>
        </aside>
      </div>
    </div>
  )
}
