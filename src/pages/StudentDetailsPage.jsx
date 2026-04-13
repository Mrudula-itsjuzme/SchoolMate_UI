import {
  BadgeInfo,
  BusFront,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Filter,
  GraduationCap,
  HeartHandshake,
  MapPinHouse,
  Plus,
  Pencil,
  Printer,
  Search,
  ShieldAlert,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const baseStudent = {
  className: 'NURSERY',
  section: 'A',
  medium: 'English',
  active: true,
  family: {
    fatherName: 'K. Gangadhar',
    motherName: 'K. Karuna',
    fatherOccupation: 'IT',
    motherOccupation: '-',
    parentContactPrimary: '994023192457',
    parentContactSecondary: '994023192458',
  },
  personal: {
    dateOfBirth: '20 Apr 2022',
    gender: 'Female',
    bloodGroup: '-',
    nationality: 'Indian',
    religion: 'Hindu',
  },
  academic: {
    admissionType: 'New Admission',
    joinDate: '19 Jun 2025',
    category: 'BC-A',
    studentType: 'Day Scholar',
    remarks: '-',
  },
  transport: {
    transportRequired: 'No',
    routeNumber: '-',
    vehicleNumber: '-',
    pickupLocation: '-',
  },
  additional: {
    aadhaarNumber: '-',
    fatherAadhaar: '-',
    motherAadhaar: '-',
    shortName: 'NIVEDHA',
    motherAccountNumber: '-',
  },
  address: {
    houseNo: '12-45/3',
    street: 'MIG Colony',
    area: 'Madhapur',
    city: 'Hyderabad',
    pinCode: '500081',
  },
  behavior: {
    misbehaviorRecords: '0',
    dropoutStatus: 'Not Dropped Out',
    attendance: '-',
  },
  fees: {
    total: 24500,
    paid: 18200,
    pending: 6300,
    breakdown: [
      { label: 'Tuition', amount: 12000 },
      { label: 'Transport', amount: 4500 },
      { label: 'Activities', amount: 8000 },
    ],
  },
  payments: [
    {
      date: '15 Jun 2025',
      receiptNo: 'RCPT-001234',
      amount: 10000,
      paymentMode: 'UPI',
      status: 'Paid',
    },
    {
      date: '19 May 2025',
      receiptNo: 'RCPT-001133',
      amount: 8200,
      paymentMode: 'Cash',
      status: 'Paid',
    },
    {
      date: '11 Apr 2025',
      receiptNo: 'RCPT-001027',
      amount: 3500,
      paymentMode: 'Net Banking',
      status: 'Paid',
    },
  ],
  academicReports: [
    { title: 'Term 1 Progress Report', status: 'Published' },
    { title: 'Language Skill Evaluation', status: 'Published' },
    { title: 'Classroom Participation', status: 'In Review' },
  ],
  weeklyTests: [
    { title: 'Alphabet Recognition', status: 'Completed' },
    { title: 'Number Tracing', status: 'Completed' },
    { title: 'Color Matching', status: 'Scheduled' },
  ],
  documents: [
    { title: 'Birth Certificate', status: 'Verified' },
    { title: 'Address Proof', status: 'Verified' },
    { title: 'Previous School Record', status: 'Pending' },
  ],
}

const makeStudent = (overrides) => ({
  ...baseStudent,
  ...overrides,
  family: { ...baseStudent.family, ...overrides.family },
  personal: { ...baseStudent.personal, ...overrides.personal },
  academic: { ...baseStudent.academic, ...overrides.academic },
  transport: { ...baseStudent.transport, ...overrides.transport },
  additional: { ...baseStudent.additional, ...overrides.additional },
  address: { ...baseStudent.address, ...overrides.address },
  behavior: { ...baseStudent.behavior, ...overrides.behavior },
  fees: { ...baseStudent.fees, ...overrides.fees },
  payments: overrides.payments || baseStudent.payments,
  academicReports: overrides.academicReports || baseStudent.academicReports,
  weeklyTests: overrides.weeklyTests || baseStudent.weeklyTests,
  documents: overrides.documents || baseStudent.documents,
})

const initialStudents = [
  makeStudent({ name: 'K. Yadhya Nivedha', id: 'GVS-2526-0190', roll: 1 }),
  makeStudent({ name: 'D. Parnika', id: 'GVS-2526-0191', roll: 2 }),
  makeStudent({ name: 'A. Sanvi Sri', id: 'GVS-2526-0192', roll: 3 }),
  makeStudent({ name: 'Y. Rithika Satya', id: 'GVS-2526-0193', roll: 4 }),
  makeStudent({ name: 'K. Tapaswini', id: 'GVS-2526-0194', roll: 5 }),
  makeStudent({ name: 'N. Jaswitha', id: 'GVS-2526-0195', roll: 6 }),
  makeStudent({ name: 'T. Parnika Sri Mathili', id: 'GVS-2526-0196', roll: 7 }),
  makeStudent({
    name: 'M. Karthikeya',
    id: 'GVS-2526-0197',
    roll: 8,
    section: 'B',
    personal: { gender: 'Male' },
    additional: { shortName: 'KARTHIK' },
  }),
  makeStudent({
    name: 'S. Deeksha',
    id: 'GVS-2526-0198',
    roll: 9,
    className: 'LKG',
    section: 'A',
    personal: { dateOfBirth: '19 Sep 2021' },
    academic: { category: 'OC' },
  }),
  makeStudent({
    name: 'P. Vihaan',
    id: 'GVS-2526-0199',
    roll: 10,
    className: 'LKG',
    section: 'B',
    personal: { gender: 'Male', dateOfBirth: '03 Nov 2021' },
  }),
  makeStudent({
    name: 'R. Nitya',
    id: 'GVS-2526-0200',
    roll: 11,
    className: 'UKG',
    section: 'A',
    behavior: { attendance: '95%' },
  }),
  makeStudent({
    name: 'V. Hrithik',
    id: 'GVS-2526-0201',
    roll: 12,
    className: 'UKG',
    section: 'B',
    active: false,
    behavior: { dropoutStatus: 'Monitoring', attendance: '89%' },
  }),
]

const tabs = [
  { id: 'fees', label: 'Fee Payments' },
  { id: 'reports', label: 'Academic Reports' },
  { id: 'tests', label: 'Weekly Tests' },
  { id: 'documents', label: 'Documents' },
]

const classFlow = ['NURSERY', 'LKG', 'UKG', 'GRADE 1']

const formatRupee = (amount) => `₹ ${new Intl.NumberFormat('en-IN').format(amount)}`

const initials = (name) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((token) => token[0])
    .join('')
    .toUpperCase()

const nextClass = (currentClass) => {
  const currentIndex = classFlow.indexOf(currentClass)

  if (currentIndex < 0 || currentIndex === classFlow.length - 1) {
    return currentClass
  }

  return classFlow[currentIndex + 1]
}

const buildPageControls = (totalPages, currentPage) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis', currentPage, currentPage + 1, 'ellipsis', totalPages]
}

function StudentDetailsPage() {
  const [students, setStudents] = useState(initialStudents)
  const [searchValue, setSearchValue] = useState('')
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const [selectedClass, setSelectedClass] = useState('ALL')
  const [selectedSection, setSelectedSection] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudents[0].id)
  const [activeTab, setActiveTab] = useState('fees')
  const [showAllPayments, setShowAllPayments] = useState(false)
  const [showFeeDetails, setShowFeeDetails] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileDraft, setProfileDraft] = useState({ name: '', medium: 'English' })
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [photoTone, setPhotoTone] = useState(0)
  const [toastMessage, setToastMessage] = useState('')

  const moreMenuRef = useRef(null)

  const classOptions = useMemo(
    () => ['ALL', ...new Set(students.map((student) => student.className))],
    [students],
  )

  const sectionOptions = useMemo(() => {
    const source =
      selectedClass === 'ALL'
        ? students
        : students.filter((student) => student.className === selectedClass)

    return ['ALL', ...new Set(source.map((student) => student.section))]
  }, [selectedClass, students])

  const filteredStudents = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()

    return students.filter((student) => {
      const classMatch =
        !isFilterVisible || selectedClass === 'ALL' || student.className === selectedClass
      const sectionMatch =
        !isFilterVisible || selectedSection === 'ALL' || student.section === selectedSection
      const searchMatch =
        normalizedSearch.length === 0 ||
        student.name.toLowerCase().includes(normalizedSearch) ||
        student.id.toLowerCase().includes(normalizedSearch)

      return classMatch && sectionMatch && searchMatch
    })
  }, [students, isFilterVisible, selectedClass, selectedSection, searchValue])

  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize))

  const paginatedStudents = useMemo(
    () => filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredStudents, currentPage],
  )

  const selectedStudent =
    students.find((student) => student.id === selectedStudentId) || students[0] || null

  const visiblePayments =
    selectedStudent && showAllPayments
      ? selectedStudent.payments
      : selectedStudent?.payments.slice(0, 2) || []

  const infoCards = useMemo(() => {
    if (!selectedStudent) {
      return []
    }

    return [
      {
        title: 'Family Details',
        className: 'family-card',
        icon: HeartHandshake,
        rows: [
          ['Father Name', selectedStudent.family.fatherName],
          ['Mother Name', selectedStudent.family.motherName],
          ['Father Occupation', selectedStudent.family.fatherOccupation],
          ['Mother Occupation', selectedStudent.family.motherOccupation],
          ['Parent Contact 1', selectedStudent.family.parentContactPrimary],
          ['Parent Contact 2', selectedStudent.family.parentContactSecondary],
        ],
      },
      {
        title: 'Personal Information',
        className: 'personal-card',
        icon: UserRound,
        rows: [
          ['Date of Birth', selectedStudent.personal.dateOfBirth],
          ['Gender', selectedStudent.personal.gender],
          ['Blood Group', selectedStudent.personal.bloodGroup],
          ['Nationality', selectedStudent.personal.nationality],
          ['Religion', selectedStudent.personal.religion],
        ],
      },
      {
        title: 'Academic Information',
        className: 'academic-card',
        icon: GraduationCap,
        rows: [
          ['Admission Type', selectedStudent.academic.admissionType],
          ['Join Date', selectedStudent.academic.joinDate],
          ['Category', selectedStudent.academic.category],
          ['Student Type', selectedStudent.academic.studentType],
          ['Remarks', selectedStudent.academic.remarks],
        ],
      },
      {
        title: 'Transport Information',
        className: 'transport-card',
        icon: BusFront,
        rows: [
          ['Transport Required', selectedStudent.transport.transportRequired],
          ['Route Number', selectedStudent.transport.routeNumber],
          ['Vehicle Number', selectedStudent.transport.vehicleNumber],
          ['Pickup Location', selectedStudent.transport.pickupLocation],
        ],
      },
      {
        title: 'Additional Information',
        className: 'additional-card',
        icon: BadgeInfo,
        rows: [
          ['Aadhaar Number', selectedStudent.additional.aadhaarNumber],
          ['Father Aadhaar', selectedStudent.additional.fatherAadhaar],
          ['Mother Aadhaar', selectedStudent.additional.motherAadhaar],
          ['Student Short Name', selectedStudent.additional.shortName],
          ['Mother A/C Number', selectedStudent.additional.motherAccountNumber],
        ],
      },
      {
        title: 'Address Information',
        className: 'address-card',
        icon: MapPinHouse,
        rows: [
          ['House No', selectedStudent.address.houseNo],
          ['Street', selectedStudent.address.street],
          ['Area', selectedStudent.address.area],
          ['City', selectedStudent.address.city],
          ['PIN Code', selectedStudent.address.pinCode],
        ],
      },
      {
        title: 'Behavior & Attendance',
        className: 'behavior-card',
        icon: ShieldAlert,
        rows: [
          ['Misbehavior Records', selectedStudent.behavior.misbehaviorRecords],
          ['Dropout Status', selectedStudent.behavior.dropoutStatus],
          ['Attendance', selectedStudent.behavior.attendance],
        ],
      },
    ]
  }, [selectedStudent])

  const listForTab =
    activeTab === 'reports'
      ? selectedStudent?.academicReports || []
      : activeTab === 'tests'
        ? selectedStudent?.weeklyTests || []
        : selectedStudent?.documents || []

  const pageControls = buildPageControls(totalPages, currentPage)

  useEffect(() => {
    setCurrentPage((value) => Math.min(Math.max(value, 1), totalPages))
  }, [totalPages])

  useEffect(() => {
    if (!selectedStudent) {
      return
    }

    setProfileDraft({ name: selectedStudent.name, medium: selectedStudent.medium })
  }, [selectedStudentId, selectedStudent])

  useEffect(() => {
    if (filteredStudents.length > 0 && !filteredStudents.some((item) => item.id === selectedStudentId)) {
      setSelectedStudentId(filteredStudents[0].id)
      setCurrentPage(1)
    }
  }, [filteredStudents, selectedStudentId])

  useEffect(() => {
    const closeMenu = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeMenu)
    return () => document.removeEventListener('pointerdown', closeMenu)
  }, [])

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setToastMessage(''), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  const handleSelectStudent = (student) => {
    setSelectedStudentId(student.id)
    setActiveTab('fees')
    setShowAllPayments(false)
    setShowFeeDetails(false)
    setIsEditingProfile(false)
  }

  const handleAddStudent = () => {
    const largestNumericId = Math.max(
      ...students.map((student) => Number(student.id.split('-').at(-1))),
    )

    const nextNumber = largestNumericId + 1
    const nextId = `GVS-2526-${String(nextNumber).padStart(4, '0')}`
    const nextRoll = students.length + 1

    const newStudent = makeStudent({
      name: `New Student ${nextRoll}`,
      id: nextId,
      roll: nextRoll,
      className: selectedClass === 'ALL' ? 'NURSERY' : selectedClass,
      section: selectedSection === 'ALL' ? 'A' : selectedSection,
      additional: { shortName: `STD${nextRoll}` },
      family: {
        fatherName: 'Parent Name',
        motherName: '-',
        parentContactPrimary: '9999999999',
        parentContactSecondary: '8888888888',
      },
    })

    setStudents((list) => [newStudent, ...list])
    setSelectedStudentId(nextId)
    setCurrentPage(1)
    setToastMessage('New demo student added')
  }

  const handleSaveProfile = () => {
    if (!selectedStudent) {
      return
    }

    setStudents((list) =>
      list.map((item) =>
        item.id === selectedStudent.id
          ? {
              ...item,
              name: profileDraft.name.trim() || item.name,
              medium: profileDraft.medium.trim() || item.medium,
              additional: {
                ...item.additional,
                shortName:
                  (profileDraft.name.trim() || item.name)
                    .split(' ')
                    .slice(-1)[0]
                    .toUpperCase() || item.additional.shortName,
              },
            }
          : item,
      ),
    )

    setIsEditingProfile(false)
    setToastMessage('Profile updated')
  }

  const handleMoreAction = (action) => {
    if (!selectedStudent) {
      return
    }

    if (action === 'promote') {
      setStudents((list) =>
        list.map((item) =>
          item.id === selectedStudent.id
            ? { ...item, className: nextClass(item.className) }
            : item,
        ),
      )
      setToastMessage('Student promoted to next class')
    }

    if (action === 'toggle-active') {
      setStudents((list) =>
        list.map((item) =>
          item.id === selectedStudent.id ? { ...item, active: !item.active } : item,
        ),
      )
      setToastMessage('Student status updated')
    }

    if (action === 'refresh-fees') {
      setStudents((list) =>
        list.map((item) =>
          item.id === selectedStudent.id
            ? {
                ...item,
                fees: {
                  ...item.fees,
                  pending: Math.max(item.fees.total - item.fees.paid, 0),
                },
              }
            : item,
        ),
      )
      setToastMessage('Fee summary recalculated')
    }

    setIsMoreMenuOpen(false)
  }

  return (
    <section className="students-page">
      <div className="students-header-row">
        <div>
          <h1>Students</h1>
          <p>Dashboard &gt; Students &gt; Student Profile</p>
        </div>

        <button type="button" className="add-student-btn" onClick={handleAddStudent}>
          <span>
            <Plus size={14} />
          </span>
          Add New Student
        </button>
      </div>

      <div className="students-layout-grid">
        <aside className="students-list-card">
          <div className="student-search-tools">
            <label className="search-input-wrap">
              <Search size={14} />
              <input
                type="text"
                value={searchValue}
                placeholder="Search students..."
                onChange={(event) => {
                  setSearchValue(event.target.value)
                  setCurrentPage(1)
                }}
              />
            </label>
            <button
              type="button"
              className={isFilterVisible ? 'filter-btn active' : 'filter-btn'}
              aria-label="Filter students"
              onClick={() => setIsFilterVisible((value) => !value)}
            >
              <Filter size={14} />
            </button>
          </div>

          {isFilterVisible ? (
            <div className="class-section-filters">
              <div>
                <label>Class</label>
                <select
                  value={selectedClass}
                  aria-label="Class filter"
                  onChange={(event) => {
                    setSelectedClass(event.target.value)
                    setSelectedSection('ALL')
                    setCurrentPage(1)
                  }}
                >
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Section</label>
                <select
                  value={selectedSection}
                  aria-label="Section filter"
                  onChange={(event) => {
                    setSelectedSection(event.target.value)
                    setCurrentPage(1)
                  }}
                >
                  {sectionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <p className="filter-hidden-note">Filters hidden. Click filter icon to show.</p>
          )}

          <p className="students-found-text">{filteredStudents.length} Students Found</p>

          <div className="students-scroll-list">
            {paginatedStudents.length === 0 && (
              <div className="student-empty-state">No students match current filters.</div>
            )}

            {paginatedStudents.map((student) => (
              <button
                type="button"
                key={student.id}
                className={
                  selectedStudentId === student.id
                    ? `student-list-item selected${student.active ? '' : ' inactive'}`
                    : `student-list-item${student.active ? '' : ' inactive'}`
                }
                onClick={() => handleSelectStudent(student)}
              >
                <div className="student-photo-thumb" aria-hidden="true">
                  <span>{initials(student.name)}</span>
                </div>

                <div className="student-list-meta">
                  <h3>{student.name}</h3>
                  <p>
                    {student.id} | Roll No: {student.roll}
                  </p>
                  <span>
                    {student.className} - {student.section}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="students-pagination">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setCurrentPage((value) => Math.max(value - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} />
            </button>

            {pageControls.map((item, index) =>
              item === 'ellipsis' ? (
                <span key={`ellipsis-${index}`}>...</span>
              ) : (
                <button
                  type="button"
                  key={`page-${item}`}
                  className={item === currentPage ? 'active' : ''}
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </button>
              ),
            )}

            <button
              type="button"
              aria-label="Next page"
              onClick={() => setCurrentPage((value) => Math.min(value + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </aside>

        <section className="student-details-wrapper">
          <div className="profile-top-actions" ref={moreMenuRef}>
            <button
              type="button"
              onClick={() => {
                setIsEditingProfile((value) => !value)
                setIsMoreMenuOpen(false)
              }}
            >
              <Pencil size={13} /> Edit
            </button>
            <button
              type="button"
              onClick={() => {
                setToastMessage('Print profile preview opened')
                setIsMoreMenuOpen(false)
              }}
            >
              <Printer size={13} /> Print Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMoreMenuOpen((value) => !value)
                setIsEditingProfile(false)
              }}
            >
              <EllipsisVertical size={13} /> More
            </button>

            {isMoreMenuOpen && (
              <div className="profile-more-menu">
                <button type="button" onClick={() => handleMoreAction('promote')}>
                  Promote To Next Class
                </button>
                <button type="button" onClick={() => handleMoreAction('toggle-active')}>
                  Toggle Active Status
                </button>
                <button type="button" onClick={() => handleMoreAction('refresh-fees')}>
                  Recalculate Fees
                </button>
              </div>
            )}
          </div>

          {selectedStudent && (
            <article className="student-hero-card">
            <div className="hero-photo-stack">
                <div className={`hero-photo tone-${photoTone}`}>{initials(selectedStudent.name)}</div>
                <button
                  type="button"
                  className="photo-cam-btn"
                  aria-label="Change photo"
                  onClick={() => setPhotoTone((value) => (value + 1) % 4)}
                >
                <Camera size={12} />
              </button>
            </div>

            <div className="hero-info">
                {!isEditingProfile ? (
                  <>
                    <h2>{selectedStudent.name}</h2>
                    <span
                      className={
                        selectedStudent.active
                          ? 'active-student-chip'
                          : 'active-student-chip inactive'
                      }
                    >
                      {selectedStudent.active ? 'Active Student' : 'Inactive Student'}
                    </span>
                  </>
                ) : (
                  <div className="inline-edit-form">
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        value={profileDraft.name}
                        onChange={(event) =>
                          setProfileDraft((data) => ({ ...data, name: event.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label>Medium</label>
                      <input
                        type="text"
                        value={profileDraft.medium}
                        onChange={(event) =>
                          setProfileDraft((data) => ({ ...data, medium: event.target.value }))
                        }
                      />
                    </div>

                    <div className="inline-edit-actions">
                      <button type="button" onClick={handleSaveProfile}>
                        <Check size={14} /> Save
                      </button>
                      <button
                        type="button"
                        className="ghost"
                        onClick={() => {
                          setIsEditingProfile(false)
                          setProfileDraft({ name: selectedStudent.name, medium: selectedStudent.medium })
                        }}
                      >
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                )}

              <div className="hero-fields-grid">
                <div>
                  <small>Student ID</small>
                    <p>{selectedStudent.id}</p>
                </div>
                <div>
                  <small>Roll Number</small>
                    <p>{selectedStudent.roll}</p>
                </div>
                <div>
                  <small>Class &amp; Section</small>
                    <p>
                      {selectedStudent.className} - {selectedStudent.section}
                    </p>
                </div>
                <div>
                  <small>Medium</small>
                    <p>{selectedStudent.medium}</p>
                </div>
              </div>
            </div>
            </article>
          )}

          <div className="detail-info-grid">
            {infoCards.map((card) => (
              <article key={card.title} className={`detail-info-card ${card.className}`}>
                <header>
                  <card.icon size={16} />
                  <h3>{card.title}</h3>
                </header>

                <dl>
                  {card.rows.map(([label, value]) => (
                    <div key={`${card.title}-${label}`}>
                      <dt>{label}</dt>
                      <dd className={value === 'Not Dropped Out' ? 'positive' : ''}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="records-tabs-row">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => {
                  setActiveTab(tab.id)
                  if (tab.id !== 'fees') {
                    setShowAllPayments(false)
                    setShowFeeDetails(false)
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'fees' && selectedStudent && (
            <div className="records-bottom-grid">
              <article className="fee-summary-card">
                <h3>Fee Summary</h3>
                <div className="fee-values-row">
                  <div>
                    <strong>{formatRupee(selectedStudent.fees.total)}</strong>
                    <span>Total Fees</span>
                  </div>
                  <div className="paid">
                    <strong>{formatRupee(selectedStudent.fees.paid)}</strong>
                    <span>Paid Amount</span>
                  </div>
                  <div className="pending">
                    <strong>{formatRupee(selectedStudent.fees.pending)}</strong>
                    <span>Pending Amount</span>
                  </div>
                </div>
                <button type="button" onClick={() => setShowFeeDetails((value) => !value)}>
                  {showFeeDetails ? 'Hide Fee Details' : 'View Fee Details'}
                </button>

                {showFeeDetails && (
                  <ul className="fee-breakdown-list">
                    {selectedStudent.fees.breakdown.map((line) => (
                      <li key={line.label}>
                        <span>{line.label}</span>
                        <strong>{formatRupee(line.amount)}</strong>
                      </li>
                    ))}
                  </ul>
                )}
              </article>

              <article className="recent-payments-card">
                <div className="payments-header-row">
                  <h3>Recent Payments</h3>
                  <button type="button" onClick={() => setShowAllPayments((value) => !value)}>
                    {showAllPayments ? 'View Recent Only' : 'View All Payments'}
                  </button>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Receipt No</th>
                      <th>Amount</th>
                      <th>Payment Mode</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiblePayments.map((payment) => (
                      <tr key={payment.receiptNo}>
                        <td>{payment.date}</td>
                        <td>{payment.receiptNo}</td>
                        <td>{formatRupee(payment.amount)}</td>
                        <td>{payment.paymentMode}</td>
                        <td>
                          <span className="status-paid">{payment.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </div>
          )}

          {activeTab !== 'fees' && (
            <article className="tab-panel-card">
              <header>
                <h3>{tabs.find((item) => item.id === activeTab)?.label}</h3>
                <button
                  type="button"
                  onClick={() => setToastMessage('Refreshed tab data from local state')}
                >
                  Refresh
                </button>
              </header>

              <ul>
                {listForTab.map((item) => (
                  <li key={`${item.title}-${item.status}`}>
                    <span>{item.title}</span>
                    <strong>{item.status}</strong>
                  </li>
                ))}
              </ul>
            </article>
          )}
        </section>
      </div>

      {toastMessage && <div className="ui-live-toast">{toastMessage}</div>}
    </section>
  )
}

export default StudentDetailsPage
