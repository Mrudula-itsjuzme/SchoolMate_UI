import {
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  LineChart,
  MoreHorizontal,
  Pencil,
  Printer,
  Search,
  SlidersHorizontal,
  Target,
  Trophy,
  UserRound,
  XCircle,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import './AcademicsHubPage.css'

const weeklyKeys = ['WT-01', 'WT-02', 'WT-03', 'WT-04']

const makeStudent = ({
  id,
  name,
  rollNo,
  className,
  section,
  medium,
  status,
  rank,
  attendance,
  overallResult,
  marks,
  weekly,
  reports,
  trend,
  rankTrend,
  remarks,
}) => {
  const totalMax = marks.reduce((sum, item) => sum + item.max, 0)
  const totalObtained = marks.reduce((sum, item) => sum + item.obtained, 0)

  return {
    id,
    name,
    rollNo,
    year: '2025-2026',
    campus: 'SCHOOL',
    className,
    section,
    medium,
    status,
    rank,
    attendance,
    overallResult,
    marks,
    weekly,
    reports,
    trend,
    rankTrend,
    remarks,
    totalMax,
    totalObtained,
    percentage: Number(((totalObtained / totalMax) * 100).toFixed(1)),
    previousGpa: Number(((totalObtained / totalMax) * 10 - 0.6).toFixed(2)),
  }
}

const initialStudents = [
  makeStudent({
    id: 'GVS-2526-0190',
    name: 'K. Yadhya Nivedha',
    rollNo: 1,
    className: 'NURSERY',
    section: 'A',
    medium: 'English',
    status: 'Active',
    rank: 3,
    attendance: 94,
    overallResult: 'Not Declared',
    marks: [
      { subject: 'TELUGU', max: 25, obtained: 20 },
      { subject: 'HINDI', max: 25, obtained: 19 },
      { subject: 'ENGLISH', max: 25, obtained: 23 },
      { subject: 'MATHS', max: 25, obtained: 21 },
      { subject: 'GEN.SCIENCE', max: 25, obtained: 18 },
      { subject: 'SOCIAL STUDIES', max: 25, obtained: 17 },
    ],
    weekly: [
      { subject: 'English', tests: { 'WT-01': 18, 'WT-02': 19, 'WT-03': 21, 'WT-04': 23 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Maths', tests: { 'WT-01': 17, 'WT-02': 18, 'WT-03': 20, 'WT-04': 22 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Science', tests: { 'WT-01': 16, 'WT-02': 18, 'WT-03': 19, 'WT-04': 20 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Rhymes', tests: { 'WT-01': 19, 'WT-02': 20, 'WT-03': 21, 'WT-04': 23 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'G.K', tests: { 'WT-01': 17, 'WT-02': 18, 'WT-03': 19, 'WT-04': 20 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Drawing', tests: { 'WT-01': 21, 'WT-02': 22, 'WT-03': 23, 'WT-04': 23 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
    ],
    reports: [
      { exam: 'Unit-I', eng: 18, math: 17, sci: 16, total: 51, percentage: 68.0, grade: 'B', rank: 8 },
      { exam: 'Unit-II', eng: 19, math: 18, sci: 17, total: 54, percentage: 72.0, grade: 'B+', rank: 6 },
      { exam: 'Unit-III', eng: 20, math: 19, sci: 18, total: 57, percentage: 76.0, grade: 'A-', rank: 5 },
      { exam: 'Unit-IV', eng: 22, math: 21, sci: 19, total: 62, percentage: 82.7, grade: 'A', rank: 4 },
      { exam: 'Quarterly', eng: 65, math: 61, sci: 58, total: 184, percentage: 81.8, grade: 'A', rank: 4 },
      { exam: 'Half Yearly', eng: 67, math: 63, sci: 60, total: 190, percentage: 84.4, grade: 'A', rank: 3 },
      { exam: 'Pre Final-I', eng: 69, math: 65, sci: 61, total: 195, percentage: 86.7, grade: 'A', rank: 3 },
      { exam: 'Pre Final-II', eng: 71, math: 66, sci: 63, total: 200, percentage: 88.9, grade: 'A+', rank: 3 },
      { exam: 'Annual', eng: 73, math: 68, sci: 65, total: 206, percentage: 91.6, grade: 'A+', rank: 3 },
    ],
    trend: [64, 69, 74, 80, 86, 89],
    rankTrend: [9, 7, 5, 4, 3],
    remarks: 'Shows strong reading improvement. Maintain focus on Science concept writing.',
  }),
  makeStudent({
    id: 'GVS-2526-0191',
    name: 'D. Parnika',
    rollNo: 2,
    className: 'NURSERY',
    section: 'A',
    medium: 'English',
    status: 'Active',
    rank: 6,
    attendance: 91,
    overallResult: 'Pass',
    marks: [
      { subject: 'TELUGU', max: 25, obtained: 17 },
      { subject: 'HINDI', max: 25, obtained: 16 },
      { subject: 'ENGLISH', max: 25, obtained: 19 },
      { subject: 'MATHS', max: 25, obtained: 18 },
      { subject: 'GEN.SCIENCE', max: 25, obtained: 15 },
      { subject: 'SOCIAL STUDIES', max: 25, obtained: 16 },
    ],
    weekly: [
      { subject: 'English', tests: { 'WT-01': 14, 'WT-02': 16, 'WT-03': 18, 'WT-04': 19 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Maths', tests: { 'WT-01': 15, 'WT-02': 17, 'WT-03': 18, 'WT-04': 18 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Science', tests: { 'WT-01': 13, 'WT-02': 15, 'WT-03': 16, 'WT-04': 17 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Rhymes', tests: { 'WT-01': 17, 'WT-02': 18, 'WT-03': 18, 'WT-04': 20 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'G.K', tests: { 'WT-01': 15, 'WT-02': 16, 'WT-03': 17, 'WT-04': 17 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Drawing', tests: { 'WT-01': 19, 'WT-02': 20, 'WT-03': 21, 'WT-04': 20 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
    ],
    reports: [
      { exam: 'Unit-I', eng: 14, math: 15, sci: 14, total: 43, percentage: 57.3, grade: 'C+', rank: 11 },
      { exam: 'Unit-II', eng: 16, math: 17, sci: 15, total: 48, percentage: 64.0, grade: 'B-', rank: 9 },
      { exam: 'Unit-III', eng: 17, math: 18, sci: 16, total: 51, percentage: 68.0, grade: 'B', rank: 8 },
      { exam: 'Unit-IV', eng: 19, math: 19, sci: 17, total: 55, percentage: 73.3, grade: 'B+', rank: 7 },
      { exam: 'Quarterly', eng: 58, math: 60, sci: 55, total: 173, percentage: 76.9, grade: 'A-', rank: 7 },
      { exam: 'Half Yearly', eng: 59, math: 62, sci: 57, total: 178, percentage: 79.1, grade: 'A-', rank: 6 },
      { exam: 'Pre Final-I', eng: 60, math: 63, sci: 58, total: 181, percentage: 80.4, grade: 'A', rank: 6 },
      { exam: 'Pre Final-II', eng: 61, math: 63, sci: 58, total: 182, percentage: 80.9, grade: 'A', rank: 6 },
      { exam: 'Annual', eng: 63, math: 64, sci: 60, total: 187, percentage: 83.1, grade: 'A', rank: 6 },
    ],
    trend: [52, 59, 64, 70, 76, 81],
    rankTrend: [13, 11, 9, 8, 6],
    remarks: 'Stable growth. Needs extra support in Science fundamentals.',
  }),
  makeStudent({
    id: 'GVS-2526-0192',
    name: 'A. Sanvi Sri',
    rollNo: 3,
    className: 'NURSERY',
    section: 'A',
    medium: 'English',
    status: 'Active',
    rank: 4,
    attendance: 96,
    overallResult: 'Pass',
    marks: [
      { subject: 'TELUGU', max: 25, obtained: 18 },
      { subject: 'HINDI', max: 25, obtained: 19 },
      { subject: 'ENGLISH', max: 25, obtained: 22 },
      { subject: 'MATHS', max: 25, obtained: 22 },
      { subject: 'GEN.SCIENCE', max: 25, obtained: 20 },
      { subject: 'SOCIAL STUDIES', max: 25, obtained: 19 },
    ],
    weekly: [
      { subject: 'English', tests: { 'WT-01': 17, 'WT-02': 19, 'WT-03': 21, 'WT-04': 22 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Maths', tests: { 'WT-01': 18, 'WT-02': 19, 'WT-03': 21, 'WT-04': 22 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Science', tests: { 'WT-01': 16, 'WT-02': 18, 'WT-03': 20, 'WT-04': 21 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Rhymes', tests: { 'WT-01': 19, 'WT-02': 20, 'WT-03': 22, 'WT-04': 22 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'G.K', tests: { 'WT-01': 16, 'WT-02': 18, 'WT-03': 19, 'WT-04': 20 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Drawing', tests: { 'WT-01': 20, 'WT-02': 21, 'WT-03': 23, 'WT-04': 23 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
    ],
    reports: [
      { exam: 'Unit-I', eng: 16, math: 17, sci: 16, total: 49, percentage: 65.3, grade: 'B-', rank: 10 },
      { exam: 'Unit-II', eng: 18, math: 18, sci: 17, total: 53, percentage: 70.7, grade: 'B+', rank: 7 },
      { exam: 'Unit-III', eng: 19, math: 20, sci: 19, total: 58, percentage: 77.3, grade: 'A-', rank: 5 },
      { exam: 'Unit-IV', eng: 21, math: 21, sci: 20, total: 62, percentage: 82.7, grade: 'A', rank: 4 },
      { exam: 'Quarterly', eng: 63, math: 64, sci: 61, total: 188, percentage: 83.6, grade: 'A', rank: 4 },
      { exam: 'Half Yearly', eng: 64, math: 65, sci: 62, total: 191, percentage: 84.9, grade: 'A', rank: 4 },
      { exam: 'Pre Final-I', eng: 65, math: 66, sci: 63, total: 194, percentage: 86.2, grade: 'A', rank: 4 },
      { exam: 'Pre Final-II', eng: 66, math: 67, sci: 64, total: 197, percentage: 87.6, grade: 'A+', rank: 4 },
      { exam: 'Annual', eng: 68, math: 68, sci: 66, total: 202, percentage: 89.8, grade: 'A+', rank: 4 },
    ],
    trend: [58, 66, 72, 78, 84, 88],
    rankTrend: [12, 9, 7, 5, 4],
    remarks: 'Consistent performer with strong improvement in Maths accuracy.',
  }),
  makeStudent({
    id: 'GVS-2526-0193',
    name: 'Y. Rithika Satya',
    rollNo: 4,
    className: 'NURSERY',
    section: 'A',
    medium: 'English',
    status: 'On Watch',
    rank: 11,
    attendance: 86,
    overallResult: 'Pass',
    marks: [
      { subject: 'TELUGU', max: 25, obtained: 14 },
      { subject: 'HINDI', max: 25, obtained: 13 },
      { subject: 'ENGLISH', max: 25, obtained: 16 },
      { subject: 'MATHS', max: 25, obtained: 14 },
      { subject: 'GEN.SCIENCE', max: 25, obtained: 12 },
      { subject: 'SOCIAL STUDIES', max: 25, obtained: 13 },
    ],
    weekly: [
      { subject: 'English', tests: { 'WT-01': 13, 'WT-02': 15, 'WT-03': 16, 'WT-04': 16 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Maths', tests: { 'WT-01': 10, 'WT-02': 12, 'WT-03': 13, 'WT-04': 14 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Science', tests: { 'WT-01': 9, 'WT-02': 11, 'WT-03': 12, 'WT-04': 12 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': false } },
      { subject: 'Rhymes', tests: { 'WT-01': 14, 'WT-02': 15, 'WT-03': 16, 'WT-04': 17 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'G.K', tests: { 'WT-01': 11, 'WT-02': 13, 'WT-03': 14, 'WT-04': 14 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
      { subject: 'Drawing', tests: { 'WT-01': 17, 'WT-02': 18, 'WT-03': 18, 'WT-04': 19 }, conducted: { 'WT-01': true, 'WT-02': true, 'WT-03': true, 'WT-04': true } },
    ],
    reports: [
      { exam: 'Unit-I', eng: 12, math: 10, sci: 9, total: 31, percentage: 41.3, grade: 'D', rank: 18 },
      { exam: 'Unit-II', eng: 13, math: 12, sci: 11, total: 36, percentage: 48.0, grade: 'D+', rank: 16 },
      { exam: 'Unit-III', eng: 15, math: 13, sci: 12, total: 40, percentage: 53.3, grade: 'C', rank: 14 },
      { exam: 'Unit-IV', eng: 16, math: 14, sci: 13, total: 43, percentage: 57.3, grade: 'C+', rank: 13 },
      { exam: 'Quarterly', eng: 50, math: 47, sci: 42, total: 139, percentage: 61.8, grade: 'B-', rank: 13 },
      { exam: 'Half Yearly', eng: 52, math: 48, sci: 44, total: 144, percentage: 64.0, grade: 'B-', rank: 12 },
      { exam: 'Pre Final-I', eng: 53, math: 49, sci: 45, total: 147, percentage: 65.3, grade: 'B-', rank: 12 },
      { exam: 'Pre Final-II', eng: 55, math: 50, sci: 47, total: 152, percentage: 67.6, grade: 'B', rank: 11 },
      { exam: 'Annual', eng: 56, math: 52, sci: 48, total: 156, percentage: 69.3, grade: 'B', rank: 11 },
    ],
    trend: [36, 42, 47, 55, 62, 67],
    rankTrend: [22, 19, 17, 14, 11],
    remarks: 'Needs focused support in foundational Maths and Science concepts.',
  }),
]

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'marks', label: 'Marks', icon: Pencil },
  { id: 'exams', label: 'Exams', icon: Target },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
]

const printOptionItems = [
  { key: 'gradePrint', label: 'Grade Print' },
  { key: 'pointsPrint', label: 'Points Print' },
  { key: 'attendancePrint', label: 'Attendance Print' },
  { key: 'percentagePrint', label: 'Percentage Print' },
  { key: 'obtainClassPrint', label: 'Obtain Class Print' },
  { key: 'printFeesDues', label: "Print 'Fees Dues' in Reports" },
  { key: 'printAddress', label: "Print 'Address'" },
]

const gradeByPercent = (percent) => {
  if (percent >= 90) return { grade: 'A+', point: 10 }
  if (percent >= 80) return { grade: 'A', point: 9 }
  if (percent >= 70) return { grade: 'B+', point: 8 }
  if (percent >= 60) return { grade: 'B', point: 7 }
  if (percent >= 50) return { grade: 'C', point: 6 }
  if (percent >= 35) return { grade: 'D', point: 5 }

  return { grade: 'F', point: 0 }
}

const initialFilter = {
  year: '2025-2026',
  campus: 'SCHOOL',
  className: 'ALL',
  section: 'ALL',
  medium: 'ALL',
  search: '',
}

const formatRupee = (amount) => `₹ ${new Intl.NumberFormat('en-IN').format(amount)}`

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token[0])
    .join('')
    .toUpperCase()

function AcademicsHubPage() {
  const [students, setStudents] = useState(initialStudents)
  const [filters, setFilters] = useState(initialFilter)
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudents[0].id)
  const [activeTab, setActiveTab] = useState('overview')
  const [editMode, setEditMode] = useState(false)
  const [editCell, setEditCell] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [remarks, setRemarks] = useState(initialStudents[0].remarks)
  const [presentWt, setPresentWt] = useState('WT-04')
  const [previousWt, setPreviousWt] = useState('WT-03')
  const [selectedExam, setSelectedExam] = useState('Annual')
  const [reportsStudentListOpen, setReportsStudentListOpen] = useState(true)
  const [printOptionsOpen, setPrintOptionsOpen] = useState(false)
  const [rankingConfigOpen, setRankingConfigOpen] = useState(false)
  const [actionMenuOpen, setActionMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [printScope, setPrintScope] = useState('print-all')
  const [printStyle, setPrintStyle] = useState('economy')
  const [printOptions, setPrintOptions] = useState({
    gradePrint: true,
    pointsPrint: true,
    attendancePrint: false,
    percentagePrint: true,
    obtainClassPrint: false,
    printFeesDues: false,
    printAddress: false,
  })

  const actionMenuRef = useRef(null)

  const yearOptions = useMemo(
    () => ['2025-2026', '2024-2025', '2023-2024'],
    [],
  )

  const classOptions = useMemo(
    () => ['ALL', ...new Set(students.map((student) => student.className))],
    [students],
  )

  const sectionOptions = useMemo(() => {
    const source =
      filters.className === 'ALL'
        ? students
        : students.filter((student) => student.className === filters.className)

    return ['ALL', ...new Set(source.map((student) => student.section))]
  }, [filters.className, students])

  const mediumOptions = useMemo(
    () => ['ALL', ...new Set(students.map((student) => student.medium))],
    [students],
  )

  const filteredStudents = useMemo(() => {
    const query = filters.search.trim().toLowerCase()

    return students.filter((student) => {
      const classMatch = filters.className === 'ALL' || student.className === filters.className
      const sectionMatch = filters.section === 'ALL' || student.section === filters.section
      const mediumMatch = filters.medium === 'ALL' || student.medium === filters.medium
      const searchMatch =
        query.length === 0 ||
        student.name.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query)

      return classMatch && sectionMatch && mediumMatch && searchMatch
    })
  }, [filters.className, filters.medium, filters.search, filters.section, students])

  const selectedStudent =
    students.find((student) => student.id === selectedStudentId) || filteredStudents[0] || null

  const subjectRows = selectedStudent?.marks || []

  const marksSummary = useMemo(() => {
    const totalMax = subjectRows.reduce((sum, row) => sum + row.max, 0)
    const obtained = subjectRows.reduce((sum, row) => sum + row.obtained, 0)
    const percentage = totalMax === 0 ? 0 : (obtained / totalMax) * 100

    const points =
      subjectRows.length === 0
        ? 0
        : subjectRows.reduce((sum, row) => {
            const rowPercent = (row.obtained / row.max) * 100
            return sum + gradeByPercent(rowPercent).point
          }, 0) / subjectRows.length

    return {
      totalMax,
      obtained,
      percentage: Number(percentage.toFixed(1)),
      gpa: Number(points.toFixed(2)),
      grade: gradeByPercent(percentage).grade,
    }
  }, [subjectRows])

  const weeklySummary = useMemo(() => {
    if (!selectedStudent) {
      return { maximum: 0, obtained: 0, percentage: 0, rank: 0 }
    }

    const maxPerSubject = 25
    const maximum = selectedStudent.weekly.reduce((sum, row) => {
      const isConducted = row.conducted[presentWt]
      return sum + (isConducted ? maxPerSubject : 0)
    }, 0)

    const obtained = selectedStudent.weekly.reduce((sum, row) => {
      const isConducted = row.conducted[presentWt]
      return sum + (isConducted ? row.tests[presentWt] : 0)
    }, 0)

    const percentage = maximum === 0 ? 0 : Number(((obtained / maximum) * 100).toFixed(1))

    return {
      maximum,
      obtained,
      percentage,
      rank: Math.max(1, Math.round(24 - percentage / 6)),
    }
  }, [presentWt, selectedStudent])

  const weakSubjects = useMemo(() => {
    return subjectRows
      .map((row) => ({
        ...row,
        percent: Number(((row.obtained / row.max) * 100).toFixed(1)),
      }))
      .filter((row) => row.percent < 70)
      .sort((a, b) => a.percent - b.percent)
  }, [subjectRows])

  useEffect(() => {
    if (!selectedStudent) {
      return
    }

    setRemarks(selectedStudent.remarks)
  }, [selectedStudentId, selectedStudent])

  useEffect(() => {
    if (filteredStudents.length === 0) {
      return
    }

    if (!filteredStudents.some((student) => student.id === selectedStudentId)) {
      setSelectedStudentId(filteredStudents[0].id)
    }
  }, [filteredStudents, selectedStudentId])

  useEffect(() => {
    const closeMenus = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActionMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeMenus)
    return () => document.removeEventListener('pointerdown', closeMenus)
  }, [])

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setToastMessage(''), 1700)
    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  const handleFilterChange = (key, value) => {
    setFilters((current) => {
      if (key === 'className') {
        return { ...current, className: value, section: 'ALL' }
      }

      return { ...current, [key]: value }
    })
  }

  const updateSelectedStudent = (transformer) => {
    if (!selectedStudent) {
      return
    }

    setStudents((current) =>
      current.map((student) =>
        student.id === selectedStudent.id ? transformer(student) : student,
      ),
    )
  }

  const startEditCell = (subject) => {
    if (!editMode) {
      return
    }

    const row = subjectRows.find((item) => item.subject === subject)

    if (!row) {
      return
    }

    setEditCell(subject)
    setEditValue(String(row.obtained))
  }

  const commitEditCell = () => {
    if (!selectedStudent || !editCell) {
      return
    }

    const parsed = Number(editValue)

    if (!Number.isFinite(parsed)) {
      setEditCell(null)
      return
    }

    updateSelectedStudent((student) => ({
      ...student,
      marks: student.marks.map((row) =>
        row.subject === editCell
          ? { ...row, obtained: Math.max(0, Math.min(row.max, parsed)) }
          : row,
      ),
    }))

    setEditCell(null)
    setToastMessage('Marks updated inline')
  }

  const toggleWeeklyConducted = (subject) => {
    if (!selectedStudent) {
      return
    }

    updateSelectedStudent((student) => ({
      ...student,
      weekly: student.weekly.map((row) =>
        row.subject === subject
          ? {
              ...row,
              conducted: {
                ...row.conducted,
                [presentWt]: !row.conducted[presentWt],
              },
            }
          : row,
      ),
    }))
  }

  const saveRemarks = () => {
    updateSelectedStudent((student) => ({ ...student, remarks }))
    setToastMessage('Remarks saved')
  }

  const handleAction = (action) => {
    if (action === 'edit') {
      setActiveTab('marks')
      setEditMode(true)
      setToastMessage('Inline editing enabled for marks')
      return
    }

    if (action === 'report') {
      setActiveTab('reports')
      setPrintOptionsOpen(true)
      setToastMessage('Report options opened')
      return
    }

    if (action === 'analyze') {
      setActiveTab('analytics')
      setToastMessage('Analytics view activated')
      return
    }

    if (action === 'reset') {
      setFilters(initialFilter)
      setPresentWt('WT-04')
      setPreviousWt('WT-03')
      setToastMessage('Filters and compares reset')
      return
    }

    if (action === 'student-list') {
      setReportsStudentListOpen((value) => !value)
      setToastMessage('Reports student list toggled')
      return
    }

    if (action === 'rank-config') {
      setRankingConfigOpen((value) => !value)
      setActiveTab('reports')
      setToastMessage('Ranking config toggled')
      return
    }

    if (action === 'mock-export') {
      setToastMessage('Mock export started (frontend only)')
    }
  }

  const selectedReport = selectedStudent?.reports.find((item) => item.exam === selectedExam)

  return (
    <section className="acad-hub">
      <div className="acad-filter-bar">
        <div className="acad-filter-grid">
          <label>
            <span>Year</span>
            <select
              value={filters.year}
              onChange={(event) => handleFilterChange('year', event.target.value)}
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Campus</span>
            <select
              value={filters.campus}
              onChange={(event) => handleFilterChange('campus', event.target.value)}
            >
              <option value="SCHOOL">SCHOOL</option>
              <option value="CITY CAMPUS">CITY CAMPUS</option>
            </select>
          </label>

          <label>
            <span>Class</span>
            <select
              value={filters.className}
              onChange={(event) => handleFilterChange('className', event.target.value)}
            >
              {classOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Section</span>
            <select
              value={filters.section}
              onChange={(event) => handleFilterChange('section', event.target.value)}
            >
              {sectionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Medium</span>
            <select
              value={filters.medium}
              onChange={(event) => handleFilterChange('medium', event.target.value)}
            >
              {mediumOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="acad-search-box">
            <Search size={15} />
            <input
              type="text"
              value={filters.search}
              onChange={(event) => handleFilterChange('search', event.target.value)}
              placeholder="Search Student"
            />
          </label>
        </div>
      </div>

      {selectedStudent && (
        <article className="acad-overview-card">
          <div className="acad-overview-left">
            <div className="acad-profile-avatar">{initials(selectedStudent.name)}</div>
            <div>
              <h1>{selectedStudent.name}</h1>
              <p>{selectedStudent.id}</p>
              <p>
                {selectedStudent.className} - {selectedStudent.section}
              </p>
            </div>
          </div>

          <div className="acad-overview-right">
            <div>
              <span>Roll No</span>
              <strong>{selectedStudent.rollNo}</strong>
            </div>
            <div>
              <span>Medium</span>
              <strong>{selectedStudent.medium}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong className={selectedStudent.status === 'Active' ? 'status-active' : 'status-watch'}>
                {selectedStudent.status}
              </strong>
            </div>
            <div>
              <span>Rank</span>
              <strong>#{selectedStudent.rank}</strong>
            </div>
          </div>

          <div className="acad-quick-stats">
            <div>
              <span>🎯 Avg Marks</span>
              <strong>{marksSummary.percentage}%</strong>
            </div>
            <div>
              <span>📊 Attendance</span>
              <strong>{selectedStudent.attendance}%</strong>
            </div>
            <div>
              <span>🏆 Rank</span>
              <strong>#{selectedStudent.rank}</strong>
            </div>
          </div>
        </article>
      )}

      <div className="acad-student-chip-row">
        {filteredStudents.map((student) => (
          <button
            type="button"
            key={student.id}
            className={selectedStudentId === student.id ? 'acad-student-chip active' : 'acad-student-chip'}
            onClick={() => setSelectedStudentId(student.id)}
          >
            <span>{student.rollNo}</span>
            {student.name}
          </button>
        ))}
      </div>

      <div className="acad-tabs-row">
        {tabs.map((tab) => {
          const Icon = tab.icon

          return (
            <button
              type="button"
              key={tab.id}
              className={activeTab === tab.id ? 'acad-tab-btn active' : 'acad-tab-btn'}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={14} /> {tab.label}
            </button>
          )
        })}
      </div>

      <div className="acad-tab-area">
        {activeTab === 'overview' && selectedStudent && (
          <div className="acad-overview-grid">
            <article className="acad-card acad-kpi-grid">
              <div>
                <span>Overall Result</span>
                <strong>{selectedStudent.overallResult}</strong>
              </div>
              <div>
                <span>Total Marks</span>
                <strong>
                  {marksSummary.obtained} / {marksSummary.totalMax}
                </strong>
              </div>
              <div>
                <span>Percentage</span>
                <strong>{marksSummary.percentage}%</strong>
              </div>
              <div>
                <span>Rank</span>
                <strong>#{selectedStudent.rank}</strong>
              </div>
            </article>

            <article className="acad-card">
              <header>
                <h3>Subject-wise Performance</h3>
              </header>
              <div className="acad-bars">
                {subjectRows.map((row) => {
                  const percent = Number(((row.obtained / row.max) * 100).toFixed(1))

                  return (
                    <div key={row.subject} className="acad-bar-row">
                      <span>{row.subject}</span>
                      <div>
                        <i style={{ width: `${Math.max(percent, 4)}%` }}></i>
                      </div>
                      <strong>{percent}%</strong>
                    </div>
                  )
                })}
              </div>
            </article>

            <article className="acad-card">
              <header>
                <h3>Trend (Weekly → Exams)</h3>
              </header>
              <div className="acad-trend-wrap">
                {selectedStudent.trend.map((value, index) => (
                  <div key={`trend-${value}-${index}`}>
                    <i style={{ height: `${value}%` }}></i>
                    <span>{index + 1}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        )}

        {activeTab === 'marks' && selectedStudent && (
          <div className="acad-marks-layout">
            <article className="acad-card">
              <header className="acad-card-head">
                <h3>Subject Marks (Mark Sheet CCE)</h3>
                <button
                  type="button"
                  className={editMode ? 'accent-btn active' : 'accent-btn'}
                  onClick={() => {
                    setEditMode((value) => !value)
                    setEditCell(null)
                  }}
                >
                  <Pencil size={13} /> {editMode ? 'Editing On' : 'Edit Inline'}
                </button>
              </header>

              <table className="acad-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Maximum Marks</th>
                    <th>Obtain Marks</th>
                    <th>Grade</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectRows.map((row) => {
                    const percent = (row.obtained / row.max) * 100
                    const gradeInfo = gradeByPercent(percent)

                    return (
                      <tr key={row.subject}>
                        <td>{row.subject}</td>
                        <td>{row.max}</td>
                        <td
                          className={editMode ? 'editable-cell' : ''}
                          onClick={() => startEditCell(row.subject)}
                        >
                          {editCell === row.subject ? (
                            <input
                              type="number"
                              min={0}
                              max={row.max}
                              value={editValue}
                              onChange={(event) => setEditValue(event.target.value)}
                              onBlur={commitEditCell}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  commitEditCell()
                                }

                                if (event.key === 'Escape') {
                                  setEditCell(null)
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            row.obtained
                          )}
                        </td>
                        <td>{gradeInfo.grade}</td>
                        <td>{gradeInfo.point}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="acad-remarks-row">
                <label htmlFor="exam-remark">Enter Exam Remark</label>
                <textarea
                  id="exam-remark"
                  value={remarks}
                  onChange={(event) => setRemarks(event.target.value)}
                  rows={3}
                ></textarea>
                <button type="button" className="accent-btn" onClick={saveRemarks}>
                  Save Remarks
                </button>
              </div>
            </article>

            <aside className="acad-card exam-result-card">
              <h3>Exam Result</h3>
              <ul>
                <li>
                  <span>Maximum Marks</span>
                  <strong>{marksSummary.totalMax}</strong>
                </li>
                <li>
                  <span>Obtained Marks</span>
                  <strong>{marksSummary.obtained}</strong>
                </li>
                <li>
                  <span>Grade</span>
                  <strong>{marksSummary.grade}</strong>
                </li>
                <li>
                  <span>Present GPA</span>
                  <strong>{marksSummary.gpa}</strong>
                </li>
                <li>
                  <span>Previous GPA</span>
                  <strong>{selectedStudent.previousGpa}</strong>
                </li>
              </ul>
            </aside>
          </div>
        )}

        {activeTab === 'exams' && selectedStudent && (
          <div className="acad-card">
            <header className="acad-card-head">
              <h3>Weekly Tests</h3>
              <div className="exam-compare-controls">
                <label>
                  Select Present Weekly Test
                  <select value={presentWt} onChange={(event) => setPresentWt(event.target.value)}>
                    {weeklyKeys.map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Select Previous WT To Compare
                  <select value={previousWt} onChange={(event) => setPreviousWt(event.target.value)}>
                    {weeklyKeys.map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </header>

            <table className="acad-table weekly-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  {weeklyKeys.map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Conducted</th>
                  <th>Δ Compare</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.weekly.map((row) => {
                  const currentValue = row.conducted[presentWt] ? row.tests[presentWt] : null
                  const previousValue = row.conducted[previousWt] ? row.tests[previousWt] : null
                  const diff =
                    currentValue === null || previousValue === null
                      ? null
                      : currentValue - previousValue

                  return (
                    <tr key={row.subject}>
                      <td>{row.subject}</td>
                      {weeklyKeys.map((key) => (
                        <td key={`${row.subject}-${key}`}>{row.conducted[key] ? row.tests[key] : '-'}</td>
                      ))}
                      <td>
                        <button
                          type="button"
                          className={row.conducted[presentWt] ? 'status-pill yes' : 'status-pill no'}
                          onClick={() => toggleWeeklyConducted(row.subject)}
                        >
                          {row.conducted[presentWt] ? (
                            <>
                              <CheckCircle2 size={12} /> Conducted
                            </>
                          ) : (
                            <>
                              <XCircle size={12} /> Not Conducted
                            </>
                          )}
                        </button>
                      </td>
                      <td>
                        {diff === null ? (
                          '--'
                        ) : diff >= 0 ? (
                          <span className="diff-up">+{diff}</span>
                        ) : (
                          <span className="diff-down">{diff}</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div className="weekly-footer">
              <span>Total: {weeklySummary.obtained} / {weeklySummary.maximum}</span>
              <span>Percentage: {weeklySummary.percentage}%</span>
              <span>Rank: #{weeklySummary.rank}</span>
            </div>
          </div>
        )}

        {activeTab === 'reports' && selectedStudent && (
          <div className="acad-reports-layout">
            <article className="acad-card">
              <header className="acad-card-head">
                <h3>Progress Report</h3>
                <div className="report-head-controls">
                  <button
                    type="button"
                    className="outline-btn"
                    onClick={() => setReportsStudentListOpen((value) => !value)}
                  >
                    {reportsStudentListOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    Student List
                  </button>
                  <button
                    type="button"
                    className="outline-btn"
                    onClick={() => setPrintOptionsOpen((value) => !value)}
                  >
                    <Printer size={14} /> Print Options
                  </button>
                </div>
              </header>

              <table className="acad-table report-table">
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Eng</th>
                    <th>Math</th>
                    <th>Sci</th>
                    <th>Total</th>
                    <th>%</th>
                    <th>Grade</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudent.reports.map((row) => (
                    <tr
                      key={row.exam}
                      className={selectedExam === row.exam ? 'selected-report-row' : ''}
                      onClick={() => setSelectedExam(row.exam)}
                    >
                      <td>{row.exam}</td>
                      <td>{row.eng}</td>
                      <td>{row.math}</td>
                      <td>{row.sci}</td>
                      <td>{row.total}</td>
                      <td>{row.percentage}%</td>
                      <td>{row.grade}</td>
                      <td>#{row.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="report-bottom-grid">
                <div className="acad-card subtle">
                  <h4>Result Based on</h4>
                  <p>
                    25% of all Unit tests total obtained marks + 25% of Quarterly and Half Yearly total
                    obtained + 50% of Annual total obtained marks.
                  </p>
                  {selectedReport && (
                    <p className="selected-exam-line">
                      Selected Exam: <strong>{selectedReport.exam}</strong> | Grade:{' '}
                      <strong>{selectedReport.grade}</strong> | Rank: <strong>#{selectedReport.rank}</strong>
                    </p>
                  )}
                </div>

                <div className="acad-card subtle">
                  <h4>Printing Purpose Only</h4>
                  <div className="print-style-row">
                    <span>Marklist Print Style</span>
                    <div>
                      <button
                        type="button"
                        className={printStyle === 'economy' ? 'mini-pill active' : 'mini-pill'}
                        onClick={() => setPrintStyle('economy')}
                      >
                        Economy
                      </button>
                      <button
                        type="button"
                        className={printStyle === 'pre-01' ? 'mini-pill active' : 'mini-pill'}
                        onClick={() => setPrintStyle('pre-01')}
                      >
                        Pre-01
                      </button>
                    </div>
                  </div>

                  <div className="print-style-row">
                    <span>Print</span>
                    <div>
                      <button
                        type="button"
                        className={printScope === 'only-selected' ? 'mini-pill active' : 'mini-pill'}
                        onClick={() => setPrintScope('only-selected')}
                      >
                        Only Selected
                      </button>
                      <button
                        type="button"
                        className={printScope === 'print-all' ? 'mini-pill active' : 'mini-pill'}
                        onClick={() => setPrintScope('print-all')}
                      >
                        Print All
                      </button>
                    </div>
                  </div>

                  {printOptionsOpen && (
                    <div className="print-options-toggle-grid">
                      {printOptionItems.map((item) => (
                        <button
                          type="button"
                          key={item.key}
                          className={printOptions[item.key] ? 'toggle-chip on' : 'toggle-chip'}
                          onClick={() =>
                            setPrintOptions((current) => ({
                              ...current,
                              [item.key]: !current[item.key],
                            }))
                          }
                        >
                          <span>{item.label}</span>
                          <i>{printOptions[item.key] ? 'ON' : 'OFF'}</i>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>

            {reportsStudentListOpen && (
              <aside className="acad-card report-student-list">
                <header>
                  <h4>Students List</h4>
                  <button type="button" onClick={() => setReportsStudentListOpen(false)}>
                    <ChevronRight size={14} />
                  </button>
                </header>

                <div>
                  {filteredStudents.map((student) => (
                    <button
                      type="button"
                      key={`report-list-${student.id}`}
                      className={student.id === selectedStudentId ? 'active' : ''}
                      onClick={() => setSelectedStudentId(student.id)}
                    >
                      {student.rollNo} - {student.name}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="outline-btn full"
                  onClick={() => setRankingConfigOpen((value) => !value)}
                >
                  <SlidersHorizontal size={14} /> Ranking Configs
                </button>

                {rankingConfigOpen && (
                  <div className="ranking-config-box">
                    <p>Ranking Basis: Percentage + Attendance (weighted)</p>
                    <p>Exclude Not Conducted Weekly Tests: Enabled</p>
                    <p>Tie Breaker: Subject GPA</p>
                  </div>
                )}
              </aside>
            )}
          </div>
        )}

        {activeTab === 'analytics' && selectedStudent && (
          <div className="acad-analytics-grid">
            <article className="acad-card">
              <h3>Performance Graph Over Time</h3>
              <div className="analytics-line-bars">
                {selectedStudent.trend.map((value, index) => (
                  <div key={`analytics-trend-${index}`}>
                    <i style={{ height: `${value}%` }}></i>
                    <span>T{index + 1}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="acad-card">
              <h3>Subject Comparison</h3>
              <div className="subject-compare-grid">
                {subjectRows.map((row) => {
                  const percent = Number(((row.obtained / row.max) * 100).toFixed(1))

                  return (
                    <div key={`compare-${row.subject}`}>
                      <span>{row.subject}</span>
                      <strong>{percent}%</strong>
                    </div>
                  )
                })}
              </div>
            </article>

            <article className="acad-card">
              <h3>Weak Subject Detection</h3>
              {weakSubjects.length === 0 ? (
                <p className="empty-note">No weak subjects detected. Keep it up.</p>
              ) : (
                <ul className="weak-list">
                  {weakSubjects.map((row) => (
                    <li key={`weak-${row.subject}`}>
                      <Brain size={14} />
                      <span>{row.subject}</span>
                      <strong>{row.percent}%</strong>
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <article className="acad-card">
              <h3>Rank Trend</h3>
              <div className="rank-trend-track">
                {selectedStudent.rankTrend.map((rank, index) => (
                  <div key={`rank-${rank}-${index}`}>
                    <span>Term {index + 1}</span>
                    <strong>#{rank}</strong>
                  </div>
                ))}
              </div>
            </article>
          </div>
        )}
      </div>

      <div className="acad-action-panel" ref={actionMenuRef}>
        <button type="button" className="accent-btn" onClick={() => handleAction('edit')}>
          <Pencil size={14} /> Edit Marks
        </button>
        <button type="button" className="accent-btn" onClick={() => handleAction('report')}>
          <Printer size={14} /> Generate Report
        </button>
        <button type="button" className="accent-btn" onClick={() => handleAction('analyze')}>
          <BarChart3 size={14} /> Analyze
        </button>
        <button
          type="button"
          className={actionMenuOpen ? 'accent-btn active' : 'accent-btn'}
          onClick={() => setActionMenuOpen((value) => !value)}
        >
          <MoreHorizontal size={14} /> More
        </button>

        {actionMenuOpen && (
          <div className="acad-action-menu">
            <button type="button" onClick={() => handleAction('reset')}>
              Reset Filters
            </button>
            <button type="button" onClick={() => handleAction('student-list')}>
              Toggle Student List
            </button>
            <button type="button" onClick={() => handleAction('rank-config')}>
              Ranking Config
            </button>
            <button type="button" onClick={() => handleAction('mock-export')}>
              Export CSV (Mock)
            </button>
          </div>
        )}
      </div>

      {toastMessage && <div className="ui-live-toast acad-toast">{toastMessage}</div>}
    </section>
  )
}

export default AcademicsHubPage
