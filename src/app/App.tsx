import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import collegeLogo from "@/imports/image.png";
import collegePhoto from "@/imports/school_two.jpg";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Award,
  FileText,
  Building2,
  Instagram,
  ImagePlus,
  Trash2,
  Save,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "College Functions", href: "#functions" },
  { label: "Leadership & Faculty", href: "#leadership" },
  { label: "Admissions", href: "#admissions" },
  { label: "Important Dates", href: "#dates" },
  { label: "Fees", href: "#fees" },
  { label: "Contact", href: "#contact" },
];

const PROGRAMS = [
  {
    code: "SCI",
    title: "Science",
    streams: ["Physics", "Chemistry", "Mathematics", "Biology"],
    duration: "2 Years",
    seats: 120,
  },
  {
    code: "COM",
    title: "Commerce",
    streams: ["Accountancy", "Business Studies", "Economics", "Statistics"],
    duration: "2 Years",
    seats: 100,
  },
  {
    code: "ART",
    title: "Arts",
    streams: ["History", "Political Science", "Sociology", "Economics"],
    duration: "2 Years",
    seats: 80,
  },
];

const ADMISSION_STEPS = [
  {
    n: "01",
    title: "Online Registration",
    desc: "Create an account on the college portal and fill out the application form with personal and academic details.",
    icon: FileText,
  },
  {
    n: "02",
    title: "Document Upload",
    desc: "Upload scanned copies of mark sheets, transfer certificate, character certificate, and passport-size photographs.",
    icon: BookOpen,
  },
  {
    n: "03",
    title: "Fee Payment",
    desc: "Pay the application fee of ₹500 via net banking, UPI, or debit/credit card through the secure payment gateway.",
    icon: DollarSign,
  },
  {
    n: "04",
    title: "Entrance Test / Merit",
    desc: "Appear for the entrance examination (if applicable) or qualify based on merit in qualifying examinations.",
    icon: Award,
  },
  {
    n: "05",
    title: "Counselling & Seat Allotment",
    desc: "Attend online or in-person counselling session. Seats are allotted based on merit, reservation, and preferences.",
    icon: Users,
  },
  {
    n: "06",
    title: "Confirmation & Enrollment",
    desc: "Pay tuition fee, submit original documents at the college, and collect your enrollment number to complete admission.",
    icon: CheckCircle,
  },
];

const ELIGIBILITY = [
  {
    program: "First PUC (Class XI)",
    criteria: [
      "Passed Class X / SSLC or equivalent from a recognized board",
      "Admission is based on merit and availability of seats",
      "Choose Science, Commerce, or Arts at the time of application",
      "Submit the required original documents during admission",
    ],
  },
  {
    program: "Second PUC (Class XII)",
    criteria: [
      "Passed First PUC or an equivalent Class XI course",
      "Continue in the same department, subject to college guidelines",
      "Maintain satisfactory attendance and academic progress",
      "Submit transfer documents if joining from another institution",
    ],
  },
];

const DATES = [
  { event: "Application Form Available Online", date: "March 1, 2025", status: "open" },
  { event: "Last Date for Application Submission", date: "May 30, 2025", status: "upcoming" },
  { event: "Entrance Examination (if applicable)", date: "June 15, 2025", status: "upcoming" },
  { event: "Declaration of Merit List — Round 1", date: "June 25, 2025", status: "upcoming" },
  { event: "Counselling & Document Verification", date: "July 1–10, 2025", status: "upcoming" },
  { event: "Fee Payment & Enrollment Confirmation", date: "July 11–20, 2025", status: "upcoming" },
  { event: "Commencement of Classes", date: "August 1, 2025", status: "upcoming" },
  { event: "Declaration of Merit List — Round 2", date: "July 25, 2025", status: "upcoming" },
];

const FEES = [
  {
    program: "Arts",
    tuition: "₹12,000",
    exam: "₹2,000",
    development: "₹2,000",
    total: "₹16,000",
    period: "per year",
  },
  {
    program: "Commerce",
    tuition: "₹14,000",
    exam: "₹2,000",
    development: "₹2,500",
    total: "₹18,500",
    period: "per year",
  },
  {
    program: "Science",
    tuition: "₹18,000",
    exam: "₹2,000",
    development: "₹3,500",
    total: "₹23,500",
    period: "per year",
  },
];

const STATS = [
  { value: "500+", label: "Students Enrolled" },
  { value: "30+", label: "Faculty Members" },
  { value: "100%", label: "Result" },
  { value: "Est. 1968", label: "Years of Excellence" },
];

const ADMIN_USERNAME = "ajeethvernekar";
const ADMIN_PASSWORD = "@jeethvernekar2408";

type FunctionPost = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type StudentRecord = {
  id: number;
  name: string;
  username: string;
  password: string;
  section: string;
};

type ApplicationRecord = {
  id: number;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  previousSchool: string;
  marks: string;
  message: string;
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
  adminNote: string;
};

type ExamMarkRecord = {
  id: number;
  studentId: number;
  exam: "Preparatory" | "LBA" | "Mid-Term Exam" | "Final Exam";
  subject: string;
  marks: string;
  maxMarks: string;
};

type AdminSignupRequest = {
  id: number;
  submittedAt: string;
  fullName: string;
  email: string;
  employeeId: string;
  status: "Pending" | "Approved" | "Rejected";
};

type DepartmentPhoto = {
  id: number;
  department: string;
  title: string;
  image: string;
};

type PersonCategory = "Father" | "Principal" | "Faculty" | "Administrative Member";

type PeopleProfile = {
  id: number;
  name: string;
  category: PersonCategory;
  role: string;
  description: string;
  experience: string;
  image: string;
};

const DEFAULT_PEOPLE: PeopleProfile[] = [];

const DEFAULT_DEPARTMENT_PHOTOS: DepartmentPhoto[] = [];

const DEFAULT_FUNCTIONS: FunctionPost[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=650&fit=crop&auto=format",
    title: "Cultural Fest",
    description: "Music, dance, art, and performances that showcase student talent.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=900&h=650&fit=crop&auto=format",
    title: "Annual Day",
    description: "A memorable celebration of achievement, creativity, and community.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=650&fit=crop&auto=format",
    title: "Student Activities",
    description: "Clubs, outreach, leadership, and experiences that build confidence.",
  },
];

const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
};

function AdminDashboard({
  functions,
  setFunctions,
  students,
  setStudents,
  siteSettings,
  setSiteSettings,
  applications,
  setApplications,
  examMarks,
  setExamMarks,
  departmentPhotos,
  setDepartmentPhotos,
  adminRequests,
  setAdminRequests,
  people,
  setPeople,
  onClose,
}: {
  functions: FunctionPost[];
  setFunctions: React.Dispatch<React.SetStateAction<FunctionPost[]>>;
  students: StudentRecord[];
  setStudents: React.Dispatch<React.SetStateAction<StudentRecord[]>>;
  siteSettings: { announcement: string; email: string };
  setSiteSettings: React.Dispatch<React.SetStateAction<{ announcement: string; email: string }>>;
  applications: ApplicationRecord[];
  setApplications: React.Dispatch<React.SetStateAction<ApplicationRecord[]>>;
  examMarks: ExamMarkRecord[];
  setExamMarks: React.Dispatch<React.SetStateAction<ExamMarkRecord[]>>;
  departmentPhotos: DepartmentPhoto[];
  setDepartmentPhotos: React.Dispatch<React.SetStateAction<DepartmentPhoto[]>>;
  adminRequests: AdminSignupRequest[];
  setAdminRequests: React.Dispatch<React.SetStateAction<AdminSignupRequest[]>>;
  people: PeopleProfile[];
  setPeople: React.Dispatch<React.SetStateAction<PeopleProfile[]>>;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"functions" | "students" | "applications" | "marks" | "departments" | "people" | "admin-requests" | "settings">("functions");
  const [notice, setNotice] = useState<string | null>(null);
  const [newFunction, setNewFunction] = useState({ title: "", description: "", image: "" });
  const [newStudent, setNewStudent] = useState({ name: "", username: "", password: "", section: "" });
  const [newExamMark, setNewExamMark] = useState({ studentId: "", exam: "Preparatory" as ExamMarkRecord["exam"], subject: "", marks: "", maxMarks: "100" });
  const [newDepartmentPhoto, setNewDepartmentPhoto] = useState({ department: "Science", title: "", image: "" });
  const [newPerson, setNewPerson] = useState({ name: "", category: "Faculty" as PersonCategory, role: "", description: "", experience: "", image: "" });
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);

  const saveFunctions = (nextFunctions: FunctionPost[]) => {
    setFunctions(nextFunctions);
    localStorage.setItem("loyola-functions", JSON.stringify(nextFunctions));
  };

  const handleFunctionImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setNotice("Please choose an image smaller than 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setNewFunction((current) => ({ ...current, image: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const addFunction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newFunction.image) {
      setNotice("Choose a photo before adding the function.");
      return;
    }
    saveFunctions([...functions, { ...newFunction, id: Date.now() }]);
    setNewFunction({ title: "", description: "", image: "" });
    setNotice("Function photo added to the website.");
  };

  const addStudent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextStudents = [...students, { ...newStudent, id: Date.now() }];
    setStudents(nextStudents);
    localStorage.setItem("loyola-students", JSON.stringify(nextStudents));
    setNewStudent({ name: "", username: "", password: "", section: "" });
    setNotice("Student login record added.");
  };

  const savePeople = (nextPeople: PeopleProfile[]) => {
    setPeople(nextPeople);
    localStorage.setItem("loyola-people", JSON.stringify(nextPeople));
  };

  const handlePersonImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setNotice("Please choose an image smaller than 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setNewPerson((current) => ({ ...current, image: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newPerson.image) {
      setNotice("Choose a profile photo before adding this person.");
      return;
    }
    if (editingPersonId !== null) {
      savePeople(people.map((person) => person.id === editingPersonId ? { ...newPerson, id: editingPersonId } : person));
      setNotice("Profile updated on the website.");
    } else {
      savePeople([...people, { ...newPerson, id: Date.now() }]);
      setNotice("Profile added to the website.");
    }
    setNewPerson({ name: "", category: "Faculty", role: "", description: "", experience: "", image: "" });
    setEditingPersonId(null);
  };

  const editPerson = (person: PeopleProfile) => {
    setNewPerson({ name: person.name, category: person.category, role: person.role, description: person.description, experience: person.experience, image: person.image });
    setEditingPersonId(person.id);
    setNotice(null);
  };

  const saveSettings = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("loyola-site-settings", JSON.stringify(siteSettings));
    setNotice("Website settings updated.");
  };

  const deleteApplication = (id: number) => {
    const nextApplications = applications.filter((application) => application.id !== id);
    setApplications(nextApplications);
    localStorage.setItem("loyola-applications", JSON.stringify(nextApplications));
  };

  const updateApplication = (id: number, changes: Partial<ApplicationRecord>) => {
    const nextApplications = applications.map((application) => application.id === id ? { ...application, ...changes } : application);
    setApplications(nextApplications);
    localStorage.setItem("loyola-applications", JSON.stringify(nextApplications));
    setNotice("Application assessment saved.");
  };

  const addExamMark = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextExamMarks = [...examMarks, { ...newExamMark, id: Date.now(), studentId: Number(newExamMark.studentId) }];
    setExamMarks(nextExamMarks);
    localStorage.setItem("loyola-exam-marks", JSON.stringify(nextExamMarks));
    setNewExamMark({ studentId: "", exam: "Preparatory", subject: "", marks: "", maxMarks: "100" });
    setNotice("Exam marks saved for the student.");
  };

  const deleteExamMark = (id: number) => {
    const nextExamMarks = examMarks.filter((mark) => mark.id !== id);
    setExamMarks(nextExamMarks);
    localStorage.setItem("loyola-exam-marks", JSON.stringify(nextExamMarks));
  };

  const saveDepartmentPhotos = (nextPhotos: DepartmentPhoto[]) => {
    setDepartmentPhotos(nextPhotos);
    localStorage.setItem("loyola-department-photos", JSON.stringify(nextPhotos));
  };

  const handleDepartmentImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setNotice("Please choose an image smaller than 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setNewDepartmentPhoto((current) => ({ ...current, image: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const addDepartmentPhoto = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newDepartmentPhoto.image) {
      setNotice("Choose a department group photo first.");
      return;
    }
    saveDepartmentPhotos([...departmentPhotos, { ...newDepartmentPhoto, id: Date.now() }]);
    setNewDepartmentPhoto({ department: "Science", title: "", image: "" });
    setNotice("Department group photo added to the website.");
  };

  const updateAdminRequest = (id: number, status: AdminSignupRequest["status"]) => {
    const nextRequests = adminRequests.map((request) => request.id === id ? { ...request, status } : request);
    setAdminRequests(nextRequests);
    localStorage.setItem("loyola-admin-requests", JSON.stringify(nextRequests));
    setNotice("Administrator request status updated.");
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#102847] p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="admin-dashboard-title">
      <div className="mx-auto min-h-full max-w-6xl rounded-2xl bg-[#f5f1e8] p-5 text-[#102847] shadow-2xl sm:p-8">
        <header className="mb-8 flex flex-col gap-5 border-b border-[#d8d2c5] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#b58b25]"><ShieldCheck className="h-4 w-4" /> Admin workspace</div>
            <h2 id="admin-dashboard-title" className="text-4xl font-black tracking-[-0.04em]" style={{ fontFamily: "'Playfair Display', serif" }}>College Administration</h2>
            <p className="mt-2 text-sm text-[#526174]">Manage the public website and student portal records.</p>
          </div>
          <button onClick={onClose} className="inline-flex items-center justify-center gap-2 rounded-md border border-[#bcc5d0] px-4 py-2.5 text-sm font-semibold hover:bg-white"><LogOut className="h-4 w-4" /> Exit workspace</button>
        </header>

        <div className="mb-7 flex flex-wrap gap-2">
          {(["functions", "students", "applications", "marks", "departments", "people", "admin-requests", "settings"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-md px-4 py-2.5 text-sm font-semibold capitalize transition ${activeTab === tab ? "bg-[#102847] text-white" : "border border-[#c9c2b5] bg-white/50 hover:bg-white"}`}>
              {tab === "functions" ? "Function Photos" : tab === "students" ? "Student Logins" : tab === "applications" ? `Applications (${applications.length})` : tab === "marks" ? "Exam Marks" : tab === "departments" ? "Department Photos" : tab === "people" ? "People & Admin" : tab === "admin-requests" ? `Admin Requests (${adminRequests.length})` : "Website Settings"}
            </button>
          ))}
        </div>

        {notice && <div className="mb-6 rounded-md bg-[#dff3e9] px-4 py-3 text-sm font-medium text-[#126544]" role="status">{notice}</div>}

        {activeTab === "functions" && (
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <form onSubmit={addFunction} className="rounded-xl border border-[#d8d2c5] bg-white/60 p-6">
              <h3 className="mb-5 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Add a college function</h3>
              <div className="space-y-4">
                <input value={newFunction.title} onChange={(event) => setNewFunction({ ...newFunction, title: event.target.value })} placeholder="Function title" required className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" />
                <textarea value={newFunction.description} onChange={(event) => setNewFunction({ ...newFunction, description: event.target.value })} placeholder="Short description" rows={3} required className="w-full resize-none rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" />
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-[#8b9caf] bg-[#eef2f7] px-4 py-5 text-sm font-semibold hover:bg-[#e5ebf3]"><ImagePlus className="h-5 w-5" /> {newFunction.image ? "Photo selected" : "Choose function photo"}<input type="file" accept="image/*" onChange={handleFunctionImage} className="sr-only" /></label>
                {newFunction.image && <img src={newFunction.image} alt="Selected function preview" className="h-40 w-full rounded-md object-cover" />}
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#102847] px-4 py-3 font-semibold text-white hover:bg-[#183a64]"><ImagePlus className="h-4 w-4" /> Add to website</button>
              </div>
            </form>
            <div>
              <h3 className="mb-5 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Published functions ({functions.length})</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {functions.map((item) => <article key={item.id} className="overflow-hidden rounded-xl border border-[#d8d2c5] bg-white"><img src={item.image} alt={item.title} className="h-36 w-full object-cover" /><div className="p-4"><div className="flex items-start justify-between gap-3"><h4 className="font-bold">{item.title}</h4><button onClick={() => saveFunctions(functions.filter((current) => current.id !== item.id))} aria-label={`Delete ${item.title}`} className="text-[#a5323a] hover:text-red-700"><Trash2 className="h-4 w-4" /></button></div><p className="mt-1 text-xs leading-relaxed text-[#526174]">{item.description}</p></div></article>)}
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <form onSubmit={addStudent} className="rounded-xl border border-[#d8d2c5] bg-white/60 p-6">
              <h3 className="mb-5 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Add student login</h3>
              <div className="space-y-4">
                <label className="block text-sm font-semibold">Student full name<input value={newStudent.name} onChange={(event) => setNewStudent({ ...newStudent, name: event.target.value })} placeholder="Enter student name" required className="mt-2 w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#2a5b8a]" /></label>
                <label className="block text-sm font-semibold">Login username<input value={newStudent.username} onChange={(event) => setNewStudent({ ...newStudent, username: event.target.value })} placeholder="Username student will use to log in" required className="mt-2 w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#2a5b8a]" /></label>
                <label className="block text-sm font-semibold">Login password<input value={newStudent.password} onChange={(event) => setNewStudent({ ...newStudent, password: event.target.value })} type="password" minLength={6} placeholder="Temporary password" required className="mt-2 w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#2a5b8a]" /></label>
                <select value={newStudent.section} onChange={(event) => setNewStudent({ ...newStudent, section: event.target.value })} required className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]"><option value="">Select section</option><option>Science</option><option>Commerce</option><option>Arts</option></select>
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#102847] px-4 py-3 font-semibold text-white hover:bg-[#183a64]"><Save className="h-4 w-4" /> Save student login</button>
              </div>
            </form>
            <div>
              <h3 className="mb-5 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Student accounts ({students.length})</h3>
              <div className="overflow-x-auto rounded-xl border border-[#d8d2c5] bg-white"><table className="w-full text-left text-sm"><thead className="bg-[#102847] text-white"><tr><th className="px-4 py-3">Student Name</th><th className="px-4 py-3">Login Username</th><th className="px-4 py-3">Department</th><th className="px-4 py-3">Login Status</th><th className="px-4 py-3" /></tr></thead><tbody>{students.length === 0 ? <tr><td colSpan={5} className="px-4 py-8 text-center text-[#526174]">No student accounts yet.</td></tr> : students.map((student) => <tr key={student.id} className="border-t border-[#e5e0d6]"><td className="px-4 py-3 font-medium">{student.name}</td><td className="px-4 py-3"><span className="rounded bg-[#eaf1f8] px-2 py-1 font-mono text-xs font-semibold text-[#1f4e79]">{student.username}</span></td><td className="px-4 py-3">{student.section}</td><td className="px-4 py-3"><span className="rounded bg-[#dff3e9] px-2 py-1 text-xs font-semibold text-[#126544]">Ready</span></td><td className="px-4 py-3 text-right"><button onClick={() => { const nextStudents = students.filter((current) => current.id !== student.id); setStudents(nextStudents); localStorage.setItem("loyola-students", JSON.stringify(nextStudents)); }} aria-label={`Delete ${student.name}`} className="text-[#a5323a] hover:text-red-700"><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody></table></div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Student applications</h3>
                <p className="mt-1 text-sm text-[#526174]">Review admission details submitted through the public application form.</p>
              </div>
              <span className="text-sm font-semibold text-[#1f3355]">{applications.length} total</span>
            </div>
            {applications.length === 0 ? <div className="rounded-xl border border-dashed border-[#c9c2b5] p-10 text-center text-sm text-[#526174]">No student applications have been submitted yet.</div> : <div className="space-y-4">{applications.map((application) => <article key={application.id} className="rounded-xl border border-[#d8d2c5] bg-white p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div><div className="mb-1 text-xs uppercase tracking-widest text-[#b58b25]">{application.program}</div><h4 className="text-xl font-bold">{application.name}</h4><p className="mt-1 text-sm text-[#526174]">Submitted {application.submittedAt}</p></div><button onClick={() => deleteApplication(application.id)} className="inline-flex items-center gap-2 self-start rounded-md border border-[#e4b8bb] px-3 py-2 text-xs font-semibold text-[#a5323a] hover:bg-[#fff1f1]"><Trash2 className="h-4 w-4" /> Delete</button></div><div className="mt-4 grid gap-3 border-t border-[#e5e0d6] pt-4 text-sm sm:grid-cols-2 lg:grid-cols-4"><div><span className="block text-xs text-[#7b8795]">Email</span>{application.email}</div><div><span className="block text-xs text-[#7b8795]">Phone</span>{application.phone}</div><div><span className="block text-xs text-[#7b8795]">Previous school</span>{application.previousSchool}</div><div><span className="block text-xs text-[#7b8795]">Marks / percentage</span>{application.marks}</div></div>{application.message && <p className="mt-4 rounded-md bg-[#f5f1e8] p-3 text-sm text-[#526174]"><span className="font-semibold text-[#1f3355]">Student note: </span>{application.message}</p>}<div className="mt-4 grid gap-3 border-t border-[#e5e0d6] pt-4 sm:grid-cols-[180px_1fr_auto]"><select value={application.status} onChange={(event) => updateApplication(application.id, { status: event.target.value as ApplicationRecord["status"] })} className="rounded-md border border-[#c8ced8] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2a5b8a]"><option>Pending</option><option>Under Review</option><option>Approved</option><option>Rejected</option></select><input value={application.adminNote} onChange={(event) => updateApplication(application.id, { adminNote: event.target.value })} placeholder="Private assessment note for administrators" className="rounded-md border border-[#c8ced8] bg-white px-3 py-2 text-sm outline-none focus:border-[#2a5b8a]" /><span className="self-center text-xs font-semibold text-[#526174]">Admin assessment</span></div></article>)}</div>}
          </div>
        )}

        {activeTab === "marks" && (
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <form onSubmit={addExamMark} className="rounded-xl border border-[#d8d2c5] bg-white/60 p-6">
              <h3 className="mb-2 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Record examination marks</h3>
              <p className="mb-5 text-sm text-[#526174]">Select a student and enter marks for each examination.</p>
              <div className="space-y-4">
                <select value={newExamMark.studentId} onChange={(event) => setNewExamMark({ ...newExamMark, studentId: event.target.value })} required className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]"><option value="">Select student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.name} ({student.username})</option>)}</select>
                <select value={newExamMark.exam} onChange={(event) => setNewExamMark({ ...newExamMark, exam: event.target.value as ExamMarkRecord["exam"] })} className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]"><option>Preparatory</option><option>LBA</option><option>Mid-Term Exam</option><option>Final Exam</option></select>
                <input value={newExamMark.subject} onChange={(event) => setNewExamMark({ ...newExamMark, subject: event.target.value })} placeholder="Subject" required className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" />
                <div className="grid grid-cols-2 gap-3"><input value={newExamMark.marks} onChange={(event) => setNewExamMark({ ...newExamMark, marks: event.target.value })} type="number" min="0" required placeholder="Marks scored" className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" /><input value={newExamMark.maxMarks} onChange={(event) => setNewExamMark({ ...newExamMark, maxMarks: event.target.value })} type="number" min="1" required placeholder="Maximum marks" className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" /></div>
                {students.length === 0 && <p className="rounded-md bg-[#fff3d6] px-3 py-2 text-xs text-[#735516]">Add student login records first, then their names will appear here.</p>}
                <button disabled={students.length === 0} className="flex w-full items-center justify-center gap-2 rounded-md bg-[#102847] px-4 py-3 font-semibold text-white hover:bg-[#183a64] disabled:cursor-not-allowed disabled:opacity-50"><Save className="h-4 w-4" /> Save marks</button>
              </div>
            </form>
            <div>
              <h3 className="mb-5 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Marks register ({examMarks.length})</h3>
              <div className="overflow-x-auto rounded-xl border border-[#d8d2c5] bg-white"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-[#102847] text-white"><tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Exam</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Score</th><th className="px-4 py-3" /></tr></thead><tbody>{examMarks.length === 0 ? <tr><td colSpan={5} className="px-4 py-10 text-center text-[#526174]">No marks recorded yet.</td></tr> : examMarks.map((mark) => { const student = students.find((record) => record.id === mark.studentId); return <tr key={mark.id} className="border-t border-[#e5e0d6]"><td className="px-4 py-3 font-medium">{student?.name ?? "Unknown student"}</td><td className="px-4 py-3">{mark.exam}</td><td className="px-4 py-3">{mark.subject}</td><td className="px-4 py-3 font-semibold">{mark.marks} / {mark.maxMarks}</td><td className="px-4 py-3 text-right"><button onClick={() => deleteExamMark(mark.id)} aria-label={`Delete ${mark.subject} marks`} className="text-[#a5323a] hover:text-red-700"><Trash2 className="h-4 w-4" /></button></td></tr>; })}</tbody></table></div>
            </div>
          </div>
        )}

        {activeTab === "departments" && (
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <form onSubmit={addDepartmentPhoto} className="rounded-xl border border-[#d8d2c5] bg-white/60 p-6">
              <h3 className="mb-2 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Add class group photo</h3>
              <p className="mb-5 text-sm text-[#526174]">Upload photos that students and visitors can see when they open a department.</p>
              <div className="space-y-4">
                <select value={newDepartmentPhoto.department} onChange={(event) => setNewDepartmentPhoto({ ...newDepartmentPhoto, department: event.target.value })} className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]"><option>Science</option><option>Commerce</option><option>Arts</option></select>
                <input value={newDepartmentPhoto.title} onChange={(event) => setNewDepartmentPhoto({ ...newDepartmentPhoto, title: event.target.value })} placeholder="Photo title (e.g. Science Batch 2025)" required className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" />
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-[#8b9caf] bg-[#eef2f7] px-4 py-5 text-sm font-semibold hover:bg-[#e5ebf3]"><ImagePlus className="h-5 w-5" /> {newDepartmentPhoto.image ? "Photo selected" : "Choose group photo"}<input type="file" accept="image/*" onChange={handleDepartmentImage} className="sr-only" /></label>
                {newDepartmentPhoto.image && <img src={newDepartmentPhoto.image} alt="Selected department preview" className="h-40 w-full rounded-md object-cover" />}
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#102847] px-4 py-3 font-semibold text-white hover:bg-[#183a64]"><ImagePlus className="h-4 w-4" /> Publish department photo</button>
              </div>
            </form>
            <div>
              <h3 className="mb-5 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Published photos ({departmentPhotos.length})</h3>
              {departmentPhotos.length === 0 ? <div className="rounded-xl border border-dashed border-[#c9c2b5] p-8 text-sm text-[#526174]">No department photos published yet.</div> : <div className="grid gap-4 sm:grid-cols-2">{departmentPhotos.map((photo) => <article key={photo.id} className="overflow-hidden rounded-xl border border-[#d8d2c5] bg-white"><img src={photo.image} alt={photo.title} className="h-36 w-full object-cover" /><div className="flex items-start justify-between gap-3 p-4"><div><span className="text-[10px] uppercase tracking-widest text-[#b58b25]">{photo.department}</span><h4 className="font-bold">{photo.title}</h4></div><button onClick={() => saveDepartmentPhotos(departmentPhotos.filter((current) => current.id !== photo.id))} aria-label={`Delete ${photo.title}`} className="text-[#a5323a] hover:text-red-700"><Trash2 className="h-4 w-4" /></button></div></article>)}</div>}
            </div>
          </div>
        )}

        {activeTab === "people" && (
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <form onSubmit={addPerson} className="rounded-xl border border-[#d8d2c5] bg-white/60 p-6">
              <h3 className="mb-5 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{editingPersonId === null ? "Add profile to website" : "Edit published profile"}</h3>
              <div className="space-y-4">
                <input value={newPerson.name} onChange={(event) => setNewPerson({ ...newPerson, name: event.target.value })} placeholder="Full name" required className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" />
                <select value={newPerson.category} onChange={(event) => setNewPerson({ ...newPerson, category: event.target.value as PersonCategory })} className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]"><option>Father</option><option>Principal</option><option>Faculty</option><option>Administrative Member</option></select>
                <input value={newPerson.role} onChange={(event) => setNewPerson({ ...newPerson, role: event.target.value })} placeholder="Role or subject (e.g. Principal, Physics)" required className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" />
                <input value={newPerson.experience} onChange={(event) => setNewPerson({ ...newPerson, experience: event.target.value })} placeholder="Experience (e.g. 10+ years)" required={newPerson.category === "Faculty"} className="w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" />
                <textarea value={newPerson.description} onChange={(event) => setNewPerson({ ...newPerson, description: event.target.value })} placeholder="Description and responsibilities" rows={4} required className="w-full resize-none rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2a5b8a]" />
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-[#8b9caf] bg-[#eef2f7] px-4 py-5 text-sm font-semibold hover:bg-[#e5ebf3]"><ImagePlus className="h-5 w-5" /> {newPerson.image ? "Photo selected" : "Choose profile photo"}<input type="file" accept="image/*" onChange={handlePersonImage} className="sr-only" /></label>
                {newPerson.image && <img src={newPerson.image} alt="Selected profile preview" className="h-40 w-full rounded-md object-cover" />}
                <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#102847] px-4 py-3 font-semibold text-white hover:bg-[#183a64]"><Save className="h-4 w-4" /> {editingPersonId === null ? "Publish profile" : "Save profile changes"}</button>
                {editingPersonId !== null && <button type="button" onClick={() => { setEditingPersonId(null); setNewPerson({ name: "", category: "Faculty", role: "", description: "", experience: "", image: "" }); }} className="w-full rounded-md border border-[#bcc5d0] px-4 py-3 text-sm font-semibold hover:bg-white">Cancel editing</button>}
              </div>
            </form>
            <div>
              <h3 className="mb-5 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Published people ({people.length})</h3>
              {people.length === 0 ? <div className="rounded-xl border border-dashed border-[#c9c2b5] p-8 text-sm text-[#526174]">No profiles published yet. Add fathers, the principal, faculty, or administrative members from the form.</div> : <div className="grid gap-4 sm:grid-cols-2">{people.map((person) => <article key={person.id} className="overflow-hidden rounded-xl border border-[#d8d2c5] bg-white"><img src={person.image} alt={person.name} className="h-36 w-full object-cover" /><div className="p-4"><div className="flex items-start justify-between gap-3"><div><span className="text-[10px] uppercase tracking-widest text-[#b58b25]">{person.category}</span><h4 className="font-bold">{person.name}</h4></div><div className="flex items-center gap-2"><button onClick={() => editPerson(person)} aria-label={`Edit ${person.name}`} className="rounded p-1 text-[#1f4e79] hover:bg-[#eaf1f8]">Edit</button><button onClick={() => savePeople(people.filter((current) => current.id !== person.id))} aria-label={`Delete ${person.name}`} className="text-[#a5323a] hover:text-red-700"><Trash2 className="h-4 w-4" /></button></div></div><p className="mt-1 text-xs font-semibold text-[#1f3355]">{person.role}{person.experience ? ` · ${person.experience}` : ""}</p><p className="mt-1 text-xs leading-relaxed text-[#526174]">{person.description}</p></div></article>)}</div>}
            </div>
          </div>
        )}

        {activeTab === "admin-requests" && (
          <div>
            <div className="mb-5">
              <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Administrator sign-up requests</h3>
              <p className="mt-1 text-sm text-[#526174]">Review requests submitted from the public Admin Sign Up form.</p>
            </div>
            {adminRequests.length === 0 ? <div className="rounded-xl border border-dashed border-[#c9c2b5] p-10 text-center text-sm text-[#526174]">No administrator sign-up requests have been submitted yet.</div> : <div className="space-y-4">{adminRequests.map((request) => <article key={request.id} className="rounded-xl border border-[#d8d2c5] bg-white p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><span className="text-xs uppercase tracking-widest text-[#b58b25]">Submitted {request.submittedAt}</span><h4 className="mt-1 text-xl font-bold">{request.fullName}</h4><div className="mt-2 grid gap-1 text-sm text-[#526174] sm:grid-cols-3"><span>{request.email}</span><span>Employee ID: {request.employeeId}</span><span>Status: <strong className="text-[#1f3355]">{request.status}</strong></span></div></div><div className="flex gap-2"><button onClick={() => updateAdminRequest(request.id, "Approved")} className="rounded-md bg-[#dff3e9] px-3 py-2 text-xs font-bold text-[#126544] hover:bg-[#c9eddb]">Approve</button><button onClick={() => updateAdminRequest(request.id, "Rejected")} className="rounded-md bg-[#f9d7d9] px-3 py-2 text-xs font-bold text-[#a5323a] hover:bg-[#f4c5c8]">Reject</button></div></div></article>)}</div>}
          </div>
        )}

        {activeTab === "settings" && <form onSubmit={saveSettings} className="max-w-2xl rounded-xl border border-[#d8d2c5] bg-white/60 p-6"><h3 className="mb-5 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Website settings</h3><div className="space-y-5"><label className="block text-sm font-semibold">Admissions announcement<input value={siteSettings.announcement} onChange={(event) => setSiteSettings({ ...siteSettings, announcement: event.target.value })} className="mt-2 w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#2a5b8a]" /></label><label className="block text-sm font-semibold">Admissions email<input type="email" value={siteSettings.email} onChange={(event) => setSiteSettings({ ...siteSettings, email: event.target.value })} className="mt-2 w-full rounded-md border border-[#c8ced8] bg-white px-4 py-3 text-sm font-normal outline-none focus:border-[#2a5b8a]" /></label><button className="flex items-center gap-2 rounded-md bg-[#102847] px-5 py-3 font-semibold text-white hover:bg-[#183a64]"><Save className="h-4 w-4" /> Publish changes</button></div></form>}
      </div>
    </div>
  );
}

function StudentPortal({
  student,
  examMarks,
  applications,
  onClose,
}: {
  student: StudentRecord;
  examMarks: ExamMarkRecord[];
  applications: ApplicationRecord[];
  onClose: () => void;
}) {
  const studentMarks = examMarks.filter((mark) => mark.studentId === student.id);
  const application = applications.find((record) => record.name.toLowerCase() === student.name.toLowerCase());

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#102847] p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="student-portal-title">
      <div className="mx-auto min-h-full max-w-5xl rounded-2xl bg-[#f5f1e8] p-5 text-[#102847] shadow-2xl sm:p-8">
        <header className="mb-8 flex flex-col gap-5 border-b border-[#d8d2c5] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#b58b25]"><GraduationCap className="h-4 w-4" /> Student portal</div>
            <h2 id="student-portal-title" className="text-4xl font-black tracking-[-0.04em]" style={{ fontFamily: "'Playfair Display', serif" }}>Welcome, {student.name}</h2>
            <p className="mt-2 text-sm text-[#526174]">Your college information and examination results.</p>
          </div>
          <button onClick={onClose} className="inline-flex items-center justify-center gap-2 rounded-md border border-[#bcc5d0] px-4 py-2.5 text-sm font-semibold hover:bg-white"><LogOut className="h-4 w-4" /> Sign out</button>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-[#d8d2c5] bg-white p-5"><p className="text-xs uppercase tracking-widest text-[#7b8795]">Student name</p><p className="mt-2 text-lg font-bold">{student.name}</p></div>
          <div className="rounded-xl border border-[#d8d2c5] bg-white p-5"><p className="text-xs uppercase tracking-widest text-[#7b8795]">Username</p><p className="mt-2 text-lg font-bold">{student.username}</p></div>
          <div className="rounded-xl border border-[#d8d2c5] bg-white p-5"><p className="text-xs uppercase tracking-widest text-[#7b8795]">Department</p><p className="mt-2 text-lg font-bold">{student.section}</p></div>
        </div>

        <section className="mt-8">
          <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Examination marks</h3>
          {studentMarks.length === 0 ? <div className="rounded-xl border border-dashed border-[#c9c2b5] p-8 text-sm text-[#526174]">Your marks have not been published yet.</div> : <div className="grid gap-4 sm:grid-cols-2">{["Preparatory", "LBA", "Mid-Term Exam", "Final Exam"].map((exam) => { const marks = studentMarks.filter((mark) => mark.exam === exam); return <div key={exam} className="rounded-xl border border-[#d8d2c5] bg-white p-5"><h4 className="mb-3 font-bold text-[#1f3355]">{exam}</h4>{marks.length === 0 ? <p className="text-sm text-[#7b8795]">No marks added.</p> : <div className="space-y-2">{marks.map((mark) => <div key={mark.id} className="flex items-center justify-between border-b border-[#eee9df] pb-2 text-sm last:border-0 last:pb-0"><span>{mark.subject}</span><span className="font-bold">{mark.marks} / {mark.maxMarks}</span></div>)}</div>}</div>; })}</div>}
        </section>

        <section className="mt-8">
          <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Application details</h3>
          {application ? <div className="rounded-xl border border-[#d8d2c5] bg-white p-5"><div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-5"><div><span className="block text-xs text-[#7b8795]">Program</span>{application.program}</div><div><span className="block text-xs text-[#7b8795]">Email</span>{application.email}</div><div><span className="block text-xs text-[#7b8795]">Phone</span>{application.phone}</div><div><span className="block text-xs text-[#7b8795]">Qualifying marks</span>{application.marks}</div><div><span className="block text-xs text-[#7b8795]">Application status</span><span className="font-semibold text-[#1f4e79]">{application.status ?? "Pending"}</span></div></div>{application.message && <p className="mt-4 rounded-md bg-[#f5f1e8] p-3 text-sm text-[#526174]">{application.message}</p>}</div> : <div className="rounded-xl border border-dashed border-[#c9c2b5] p-8 text-sm text-[#526174]">No application has been linked to this account yet.</div>}
        </section>
      </div>
    </div>
  );
}

function DepartmentGallery({
  department,
  photos,
  onClose,
}: {
  department: typeof PROGRAMS[number];
  photos: DepartmentPhoto[];
  onClose: () => void;
}) {
  const departmentPhotos = photos.filter((photo) => photo.department === department.title);

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center overflow-y-auto bg-[#102847]/80 p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="department-gallery-title">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-[#f5f1e8] p-6 text-[#102847] shadow-2xl sm:p-8">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-md p-2 text-[#1f3355] hover:bg-black/5" aria-label="Close department gallery"><X className="h-5 w-5" /></button>
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#b58b25]" style={{ fontFamily: "'DM Mono', monospace" }}>Department gallery</p>
        <h2 id="department-gallery-title" className="text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>{department.title}</h2>
        <p className="mt-2 text-sm text-[#526174]">{department.streams.join(" · ")}</p>
        {departmentPhotos.length === 0 ? <div className="mt-8 rounded-xl border border-dashed border-[#c9c2b5] p-12 text-center text-sm text-[#526174]">Class group photos for this department will be added soon.</div> : <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{departmentPhotos.map((photo) => <figure key={photo.id} className="overflow-hidden rounded-xl border border-[#d8d2c5] bg-white"><img src={photo.image} alt={photo.title} className="h-56 w-full object-cover" /><figcaption className="p-4 font-semibold">{photo.title}</figcaption></figure>)}</div>}
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loginOpen, setLoginOpen] = useState<"admin" | "student" | "admin-signup" | null>(null);
  const [loginFeedback, setLoginFeedback] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [functionPosts, setFunctionPosts] = useState<FunctionPost[]>(() => readStored("loyola-functions", DEFAULT_FUNCTIONS));
  const [studentRecords, setStudentRecords] = useState<StudentRecord[]>(() => readStored("loyola-students", []));
  const [siteSettings, setSiteSettings] = useState(() => readStored("loyola-site-settings", {
    announcement: "Admissions Open — 2025–26",
    email: "admissions@loyolacompositepuclg.com",
  }));
  const [people, setPeople] = useState<PeopleProfile[]>(() => readStored("loyola-people", DEFAULT_PEOPLE));
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => readStored("loyola-applications", []));
  const [examMarks, setExamMarks] = useState<ExamMarkRecord[]>(() => readStored("loyola-exam-marks", []));
  const [studentPortal, setStudentPortal] = useState<StudentRecord | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<typeof PROGRAMS[number] | null>(null);
  const [departmentPhotos, setDepartmentPhotos] = useState<DepartmentPhoto[]>(() => readStored("loyola-department-photos", DEFAULT_DEPARTMENT_PHOTOS));
  const [adminRequests, setAdminRequests] = useState<AdminSignupRequest[]>(() => readStored("loyola-admin-requests", []));
  const [applicationFeedback, setApplicationFeedback] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const nextApplications = [...applications, {
      id: Date.now(),
      submittedAt: new Date().toLocaleString(),
      name: String(values.get("applicantName")),
      email: String(values.get("applicantEmail")),
      phone: String(values.get("applicantPhone")),
      program: String(values.get("applicantProgram")),
      previousSchool: String(values.get("previousSchool")),
      marks: String(values.get("marks")),
      message: String(values.get("applicationMessage") ?? ""),
      status: "Pending" as ApplicationRecord["status"],
      adminNote: "",
    }];
    setApplications(nextApplications);
    localStorage.setItem("loyola-applications", JSON.stringify(nextApplications));
    setApplicationFeedback("Application submitted successfully. The admissions office will review your details.");
    event.currentTarget.reset();
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── NAV ── */}
      <nav className="fixed left-0 right-0 top-0 z-50 bg-primary text-primary-foreground shadow-lg shadow-black/10">
        <div className="mx-auto flex h-24 w-full max-w-[1800px] items-center justify-between gap-8 px-6 lg:px-10 xl:px-14">
          <button
            onClick={() => scrollTo("#hero")}
            className="flex min-w-0 shrink-0 items-center gap-3 text-left transition-opacity hover:opacity-80"
          >
            <ImageWithFallback
              src={collegeLogo}
              alt="Loyola Composite PU College Logo"
              className="h-16 w-16 rounded-full bg-white p-0.5 object-contain"
            />
            <div className="leading-none">
              <div
                className="whitespace-nowrap text-xl font-black tracking-wide lg:text-2xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Loyola Composite PU College
              </div>
              <div className="mt-1 whitespace-nowrap text-[9px] font-medium text-primary-foreground/75 tracking-[0.15em] uppercase lg:text-[10px]">
                loyolacompositepuclg.com · Karnataka STATE PU Education
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <ul className="hidden flex-1 items-center justify-end gap-4 2xl:flex 2xl:gap-5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className="whitespace-nowrap text-sm font-semibold tracking-wide text-primary-foreground/90 transition-colors hover:text-secondary"
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollTo("#admissions")}
                className="whitespace-nowrap rounded bg-secondary px-5 py-3 text-sm font-bold text-secondary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                Apply Now
              </button>
            </li>
            <li className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/20 bg-black/10 p-1.5">
              <button onClick={() => { setLoginOpen("student"); setLoginFeedback(null); }} className="whitespace-nowrap rounded-md border border-white/25 px-3.5 py-2.5 text-xs font-semibold transition-colors hover:border-secondary hover:text-secondary">Student Login</button>
              <button onClick={() => { setLoginOpen("admin"); setLoginFeedback(null); }} className="whitespace-nowrap rounded-md px-3.5 py-2.5 text-xs font-semibold transition-colors hover:bg-white/15">Admin Login</button>
              <button onClick={() => { setLoginOpen("admin-signup"); setLoginFeedback(null); }} className="whitespace-nowrap rounded-md bg-secondary px-3.5 py-2.5 text-xs font-bold text-secondary-foreground transition-opacity hover:opacity-90">Admin Sign Up</button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="2xl:hidden p-2 text-primary-foreground/80 hover:text-primary-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="2xl:hidden bg-primary border-t border-white/10 px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-sm text-primary-foreground/80 hover:text-secondary transition-colors py-1"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#admissions")}
              className="mt-2 px-4 py-2 bg-secondary text-secondary-foreground text-sm font-semibold rounded"
            >
              Apply Now
            </button>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={() => { setLoginOpen("student"); setLoginFeedback(null); setMenuOpen(false); }} className="px-3 py-2 border border-white/30 text-xs font-semibold rounded">Student Login</button>
              <button onClick={() => { setLoginOpen("admin"); setLoginFeedback(null); setMenuOpen(false); }} className="px-3 py-2 bg-white/10 text-xs font-semibold rounded">Admin Login</button>
              <button onClick={() => { setLoginOpen("admin-signup"); setLoginFeedback(null); setMenuOpen(false); }} className="px-3 py-2 bg-secondary text-secondary-foreground text-xs font-semibold rounded">Admin Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {loginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/75 p-4" role="dialog" aria-modal="true" aria-labelledby="login-title">
          <div className="relative w-full max-w-[520px] rounded-[18px] bg-[#efece4] px-7 pb-6 pt-5 shadow-[0_28px_65px_rgba(8,24,48,0.38)]">
            <button onClick={() => setLoginOpen(null)} className="absolute right-5 top-5 rounded p-1 text-[#1f3355] hover:bg-black/5" aria-label="Close login panel"><X className="h-5 w-5" /></button>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#1f3355]" style={{ fontFamily: "'DM Mono', monospace" }}>LOYOLA COMPOSITE PU COLLEGE</p>
            </div>
            <h2 id="login-title" className="mb-2 text-4xl font-black leading-tight tracking-[-0.04em] text-[#0d1b2a]" style={{ fontFamily: "'Playfair Display', serif" }}>{loginOpen === "admin" ? "Administration Login" : loginOpen === "admin-signup" ? "Create Admin Account" : "Student Login"}</h2>
            <p className="mb-5 text-base leading-relaxed text-[#3d4d63]">{loginOpen === "admin" ? "Sign in to access the college administration portal." : loginOpen === "admin-signup" ? "Register an authorized administrator account for the college portal." : "Enter your student details to access the student portal."}</p>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                const values = new FormData(event.currentTarget);
                if (loginOpen === "admin-signup") {
                  const password = values.get("password");
                  const confirmPassword = values.get("confirmPassword");
                  if (password === confirmPassword) {
                    const nextRequests = [...adminRequests, {
                      id: Date.now(),
                      submittedAt: new Date().toLocaleString(),
                      fullName: String(values.get("fullName")),
                      email: String(values.get("email")),
                      employeeId: String(values.get("employeeId")),
                      status: "Pending" as AdminSignupRequest["status"],
                    }];
                    setAdminRequests(nextRequests);
                    localStorage.setItem("loyola-admin-requests", JSON.stringify(nextRequests));
                    setLoginFeedback({ type: "success", text: "Administrator account request submitted for approval." });
                  } else {
                    setLoginFeedback({ type: "error", text: "Passwords do not match." });
                  }
                } else if (loginOpen === "admin") {
                  const isValidAdmin = values.get("username") === ADMIN_USERNAME && values.get("password") === ADMIN_PASSWORD;
                  setLoginFeedback(isValidAdmin
                    ? { type: "success", text: "Administration login verified." }
                    : { type: "error", text: "Incorrect username or password." });
                  if (isValidAdmin) {
                    setLoginOpen(null);
                    setAdminDashboardOpen(true);
                  }
                } else {
                  const student = studentRecords.find((record) => record.username === values.get("username") && record.password === values.get("password"));
                  setLoginFeedback(student
                    ? { type: "success", text: `Welcome, ${student.name}. Student login verified.` }
                    : { type: "error", text: "Student username or password is incorrect." });
                  if (student) {
                    setLoginOpen(null);
                    setStudentPortal(student);
                  }
                }
              }}
            >
              {loginOpen === "admin-signup" ? (
                <>
                  <div><label htmlFor="admin-full-name" className="mb-1.5 block text-sm font-medium text-[#1f3355]">Full Name</label><input id="admin-full-name" name="fullName" type="text" autoComplete="name" placeholder="Enter your full name" required className="w-full rounded-md border border-[#c8ced8] bg-[#f4f1ea] px-4 py-3 text-base text-[#0f172a] outline-none transition focus:border-[#2a5b8a] focus:ring-2 focus:ring-[#2a5b8a]/20" /></div>
                  <div><label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-[#1f3355]">Official Email</label><input id="admin-email" name="email" type="email" autoComplete="email" placeholder="name@college.edu" required className="w-full rounded-md border border-[#c8ced8] bg-[#f4f1ea] px-4 py-3 text-base text-[#0f172a] outline-none transition focus:border-[#2a5b8a] focus:ring-2 focus:ring-[#2a5b8a]/20" /></div>
                  <div><label htmlFor="admin-employee-id" className="mb-1.5 block text-sm font-medium text-[#1f3355]">Employee ID</label><input id="admin-employee-id" name="employeeId" type="text" placeholder="Enter employee ID" required className="w-full rounded-md border border-[#c8ced8] bg-[#f4f1ea] px-4 py-3 text-base text-[#0f172a] outline-none transition focus:border-[#2a5b8a] focus:ring-2 focus:ring-[#2a5b8a]/20" /></div>
                  <div><label htmlFor="admin-signup-password" className="mb-1.5 block text-sm font-medium text-[#1f3355]">Password</label><input id="admin-signup-password" name="password" type="password" autoComplete="new-password" minLength={8} placeholder="••••••••••••" required className="w-full rounded-md border border-[#c8ced8] bg-[#f4f1ea] px-4 py-3 text-base text-[#0f172a] outline-none transition focus:border-[#2a5b8a] focus:ring-2 focus:ring-[#2a5b8a]/20" /></div>
                  <div><label htmlFor="admin-confirm-password" className="mb-1.5 block text-sm font-medium text-[#1f3355]">Confirm Password</label><input id="admin-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} placeholder="••••••••••••" required className="w-full rounded-md border border-[#c8ced8] bg-[#f4f1ea] px-4 py-3 text-base text-[#0f172a] outline-none transition focus:border-[#2a5b8a] focus:ring-2 focus:ring-[#2a5b8a]/20" /></div>
                </>
              ) : loginOpen === "admin" ? (
                <>
                  <div><label htmlFor="admin-username" className="mb-1.5 block text-sm font-medium text-[#1f3355]">Username</label><input id="admin-username" name="username" type="text" autoComplete="username" placeholder="Enter username" required className="w-full rounded-md border border-[#c8ced8] bg-[#f4f1ea] px-4 py-3 text-base text-[#0f172a] outline-none transition focus:border-[#2a5b8a] focus:ring-2 focus:ring-[#2a5b8a]/20" /></div>
                  <div><label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-[#1f3355]">Password</label><input id="admin-password" name="password" type="password" autoComplete="current-password" placeholder="Enter password" required className="w-full rounded-md border border-[#c8ced8] bg-[#f4f1ea] px-4 py-3 text-base text-[#0f172a] outline-none transition focus:border-[#2a5b8a] focus:ring-2 focus:ring-[#2a5b8a]/20" /></div>
                </>
              ) : (
                <>
                  <div><label htmlFor="student-username" className="mb-1.5 block text-sm font-medium text-[#1f3355]">Username</label><input id="student-username" name="username" type="text" autoComplete="username" placeholder="Enter username" required className="w-full rounded-md border border-[#c8ced8] bg-[#f4f1ea] px-4 py-3 text-base text-[#0f172a] outline-none transition focus:border-[#2a5b8a] focus:ring-2 focus:ring-[#2a5b8a]/20" /></div>
                  <div><label htmlFor="student-password" className="mb-1.5 block text-sm font-medium text-[#1f3355]">Password</label><input id="student-password" name="password" type="password" autoComplete="current-password" placeholder="Enter password" required className="w-full rounded-md border border-[#c8ced8] bg-[#f4f1ea] px-4 py-3 text-base text-[#0f172a] outline-none transition focus:border-[#2a5b8a] focus:ring-2 focus:ring-[#2a5b8a]/20" /></div>
                </>
              )}
              {loginFeedback && (
                <p className={`rounded-md px-3 py-2.5 text-sm font-medium ${loginFeedback.type === "success" ? "bg-[#dff3e9] text-[#126544]" : loginFeedback.type === "error" ? "bg-[#f9d7d9] text-[#a5323a]" : "bg-[#dfe7f4] text-[#1a3c64]"}`} role="status">
                  {loginFeedback.text}
                </p>
              )}
              <button type="submit" className="mt-2 w-full rounded-md bg-[#0b2947] px-4 py-3 text-lg font-semibold text-white shadow-md shadow-[#0b2947]/20 transition hover:bg-[#0d345a]">{loginOpen === "admin-signup" ? "Create Account" : "Sign In"}</button>
            </form>
          </div>
        </div>
      )}

      {adminDashboardOpen && (
        <AdminDashboard
          functions={functionPosts}
          setFunctions={setFunctionPosts}
          students={studentRecords}
          setStudents={setStudentRecords}
          applications={applications}
          setApplications={setApplications}
          adminRequests={adminRequests}
          setAdminRequests={setAdminRequests}
          examMarks={examMarks}
          setExamMarks={setExamMarks}
          departmentPhotos={departmentPhotos}
          setDepartmentPhotos={setDepartmentPhotos}
          siteSettings={siteSettings}
          setSiteSettings={setSiteSettings}
          people={people}
          setPeople={setPeople}
          onClose={() => setAdminDashboardOpen(false)}
        />
      )}

      {studentPortal && (
        <StudentPortal
          student={studentPortal}
          examMarks={examMarks}
          applications={applications}
          onClose={() => setStudentPortal(null)}
        />
      )}

      {selectedDepartment && (
        <DepartmentGallery
          department={selectedDepartment}
          photos={departmentPhotos}
          onClose={() => setSelectedDepartment(null)}
        />
      )}

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden pt-24"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={collegePhoto}
            alt="Loyola Composite PU College campus building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/65" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1600px] items-center gap-16 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 xl:gap-24">
          <div>
            <p
              className="mb-6 text-sm uppercase tracking-[0.3em] text-secondary"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {siteSettings.announcement}
            </p>
            <h1
              className="mb-8 text-6xl font-bold leading-[0.98] text-primary-foreground sm:text-7xl lg:text-8xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shape Your
              <br />
              <em className="italic text-secondary">Future</em>
              <br />
              Here.
            </h1>
            <p className="mb-10 max-w-xl text-xl leading-relaxed text-primary-foreground/80">
              Loyola Composite PU College offers Science, Commerce, and Arts programs
              designed to equip students with knowledge, skills, and values for a changing world.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#admissions")}
                className="flex items-center gap-2 rounded bg-secondary px-8 py-4 text-base font-semibold text-secondary-foreground shadow-lg shadow-black/10 transition-opacity hover:opacity-90"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("#programs")}
                className="flex items-center gap-2 rounded border border-primary-foreground/40 px-8 py-4 text-base text-primary-foreground transition-colors hover:border-secondary hover:text-secondary"
              >
                View Programs
              </button>
            </div>
          </div>

          {/* Stats card */}
          <div className="hidden lg:grid grid-cols-2 gap-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="min-h-40 rounded-xl border border-white/25 bg-white/15 p-8 shadow-xl shadow-black/10 backdrop-blur-md"
              >
                <div
                  className="mb-2 text-5xl font-bold text-secondary"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.value}
                </div>
                <div className="text-base text-primary-foreground/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-primary-foreground/40">
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 bg-background">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12 grid lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
          <div>
            <p
              className="text-secondary text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              About the College
            </p>
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Legacy of
              <br />
              Academic Excellence
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Loyola Composite PU College has been a cornerstone of pre-university education
              in the region for over five decades, committed to nurturing holistic individuals.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Our sprawling 50-acre campus houses state-of-the-art laboratories, a central
              library with 80,000+ volumes, digital classrooms, sports facilities, and
              dedicated student hostels — creating an environment where learning thrives.
            </p>
            <div className="flex flex-wrap gap-3">
              {["NAAC A+ Accredited", "50-Acre Campus", "80,000+ Library Volumes", "25+ Clubs & Societies"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded border border-primary/15"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-w-0">
            <ImageWithFallback
              src={collegePhoto}
              alt="Loyola Composite PU College building"
              className="h-[28rem] w-full rounded-xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
              <div
                className="text-3xl font-bold text-secondary"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                57+
              </div>
              <div className="text-sm text-primary-foreground/70">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programs" className="py-28 bg-card">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <p
              className="text-secondary text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Academic Offerings
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 justify-between">
              <h2
                className="text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Programs Offered
              </h2>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                Choose the department that matches your ambitions: Science, Commerce, or Arts.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((p, i) => (
                <button
                key={p.code}
                  type="button"
                  onClick={() => setSelectedDepartment(p)}
                  aria-label={`View ${p.title} department gallery`}
                className="bg-background border border-border rounded-lg p-7 hover:border-secondary/50 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="text-3xl font-bold text-primary/15 leading-none"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded font-medium"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {p.code}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {p.title}
                </h3>
                <ul className="space-y-1 mb-5">
                  {p.streams.slice(0, 3).map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-secondary flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                  {p.streams.length > 3 && (
                    <li className="text-xs text-muted-foreground/70 pl-3">
                      +{p.streams.length - 3} more specializations
                    </li>
                  )}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {p.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> {p.seats} Seats
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY ── */}
      <section className="py-28 bg-primary text-primary-foreground">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12">
          <p
            className="text-secondary text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Who Can Apply
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold mb-14"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Eligibility Criteria
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {ELIGIBILITY.map((e) => (
              <div key={e.program} className="bg-white/10 border border-white/15 rounded-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-secondary" />
                  </div>
                  <h3
                    className="font-bold text-lg"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {e.program}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {e.criteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-primary-foreground/80 text-sm leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-primary-foreground/50 text-sm">
            * Reservation policy as per State Government norms. Documents proving category will be required at the time of admission.
          </p>
        </div>
      </section>

      {/* ── ADMISSION PROCESS ── */}
      <section id="admissions" className="py-28 bg-background">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12">
          <p
            className="text-secondary text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Step-by-Step Guide
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-14"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Admission Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADMISSION_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="relative">
                  {i < ADMISSION_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-6 h-px bg-border z-10" />
                  )}
                  <div className="bg-card border border-border rounded-lg p-7 h-full hover:border-secondary/40 transition-colors">
                    <div className="flex items-start justify-between mb-5">
                      <span
                        className="text-4xl font-bold text-primary/10 leading-none"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {step.n}
                      </span>
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <h3
                      className="font-bold text-foreground mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-14 max-w-4xl rounded-xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-6">
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-secondary" style={{ fontFamily: "'DM Mono', monospace" }}>Online registration</p>
              <h3 className="text-3xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Start Your Application</h3>
              <p className="mt-2 text-sm text-muted-foreground">Submit your details securely for review by the admissions office.</p>
            </div>
            <form onSubmit={submitApplication} className="grid gap-4 sm:grid-cols-2">
              <input name="applicantName" type="text" placeholder="Full name" required className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary" />
              <input name="applicantEmail" type="email" placeholder="Email address" required className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary" />
              <input name="applicantPhone" type="tel" placeholder="Mobile number" required className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary" />
              <select name="applicantProgram" defaultValue="" required className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary"><option value="" disabled>Select program</option>{PROGRAMS.map((program) => <option key={program.code} value={program.title}>{program.title}</option>)}</select>
              <input name="previousSchool" type="text" placeholder="Previous school / college" required className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary" />
              <input name="marks" type="text" placeholder="SSLC / qualifying marks" required className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary" />
              <textarea name="applicationMessage" rows={3} placeholder="Additional message (optional)" className="sm:col-span-2 w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary" />
              {applicationFeedback && <p className="sm:col-span-2 rounded-md bg-[#dff3e9] px-4 py-3 text-sm font-medium text-[#126544]" role="status">{applicationFeedback}</p>}
              <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded bg-primary px-8 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90">Submit Application <ArrowRight className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
      </section>

      {/* ── IMPORTANT DATES ── */}
      <section id="dates" className="py-28 bg-card">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12">
          <p
            className="text-secondary text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Academic Calendar
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-14"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Important Dates 2025
          </h2>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] bg-primary text-primary-foreground px-6 py-3 text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span>Event</span>
              <span className="hidden sm:block pr-8">Date</span>
              <span>Status</span>
            </div>
            {DATES.map((d, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_auto_auto] px-6 py-4 items-center border-t border-border ${i % 2 === 0 ? "bg-background" : "bg-card"} hover:bg-secondary/5 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium">{d.event}</span>
                </div>
                <span
                  className="hidden sm:block text-sm text-muted-foreground pr-8 text-right"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {d.date}
                </span>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-medium ${
                    d.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-primary/10 text-primary"
                  }`}
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {d.status === "open" ? "Open" : "Upcoming"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEES ── */}
      <section id="fees" className="py-28 bg-background">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12">
          <p
            className="text-secondary text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Transparent Pricing
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Fee Structure
          </h2>
          <p className="text-muted-foreground mb-14 max-w-xl">
            All fees are per academic year for the selected PU department. Additional hostel and transport charges apply separately.
            Scholarships available for meritorious and economically weaker students.
          </p>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    {["Program", "Tuition Fee", "Exam Fee", "Development Fee", "Total"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-left text-xs font-medium tracking-widest uppercase"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f, i) => (
                    <tr
                      key={f.program}
                      className={`border-t border-border hover:bg-secondary/5 transition-colors ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
                    >
                      <td className="px-6 py-4 font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {f.program}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{f.tuition}</td>
                      <td className="px-6 py-4 text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{f.exam}</td>
                      <td className="px-6 py-4 text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{f.development}</td>
                      <td className="px-6 py-4 font-bold text-primary" style={{ fontFamily: "'DM Mono', monospace" }}>{f.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scholarships note */}
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              { title: "Merit Scholarship", desc: "Up to 100% fee waiver for students scoring above 90% in qualifying exams." },
              { title: "Government Scholarships", desc: "SC/ST/OBC students eligible for full fee reimbursement as per state policy." },
              { title: "Sports Quota", desc: "Reduced fee and additional benefits for state and national level sportspersons." },
            ].map((s) => (
              <div key={s.title} className="flex gap-4 p-5 bg-card border border-border rounded-lg">
                <Award className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</div>
                  <div className="text-muted-foreground text-xs leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLEGE FUNCTIONS ── */}
      <section id="functions" className="py-28 bg-background">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-14">
            <div>
              <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
                Beyond the Classroom
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                College Functions
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              Our campus comes alive through celebrations, cultural programmes, sports, and student-led events throughout the year.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {functionPosts.map((event) => (
              <article key={event.title} className="group overflow-hidden rounded-lg border border-border bg-card">
                <div className="h-64 overflow-hidden bg-muted">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{event.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="py-28 bg-card">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12">
          <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Our People</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Leadership & Faculty</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">Meet the fathers, principal, faculty, and administrative team who guide our students and campus community.</p>
          {people.length === 0 ? <p className="text-sm text-muted-foreground">Our team profiles will be published soon.</p> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{people.map((person) => <article key={person.id} className="overflow-hidden rounded-lg border border-border bg-background"><img src={person.image} alt={person.name} className="h-56 w-full object-cover" /><div className="p-5"><p className="mb-1 text-xs uppercase tracking-widest text-secondary" style={{ fontFamily: "'DM Mono', monospace" }}>{person.category}</p><h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{person.name}</h3><p className="mt-1 text-sm font-semibold text-primary">{person.role}{person.experience ? ` · ${person.experience}` : ""}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{person.description}</p></div></article>)}</div>}
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section className="py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="text-secondary text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Campus Life
          </p>
          <h2
            className="text-4xl lg:text-5xl font-bold text-foreground mb-14"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            World-Class Facilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=350&fit=crop&auto=format",
                alt: "College library",
                label: "Central Library",
                desc: "80,000+ books, e-journals, OPAC system",
              },
              {
                img: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=500&h=350&fit=crop&auto=format",
                alt: "Computer lab",
                label: "Computer Labs",
                desc: "500+ workstations with high-speed internet",
              },
              {
                img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=350&fit=crop&auto=format",
                alt: "Sports facility",
                label: "Sports Complex",
                desc: "Cricket ground, basketball, gymnasium",
              },
              {
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=350&fit=crop&auto=format",
                alt: "Seminar hall",
                label: "Seminar Halls",
                desc: "Air-conditioned halls with AV equipment",
              },
            ].map((f) => (
              <div key={f.label} className="group overflow-hidden rounded-lg border border-border bg-background">
                <div className="h-44 overflow-hidden bg-muted">
                  <img
                    src={f.img}
                    alt={f.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="font-bold text-foreground mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {f.label}
                  </h3>
                  <p className="text-muted-foreground text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="text-secondary text-xs tracking-[0.3em] uppercase mb-4 text-center"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Common Questions
          </p>
          <h2
            className="text-4xl font-bold text-foreground mb-14 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "Is there an entrance exam for PU admission?",
              a: "Admission to First PUC is generally merit-based on SSLC/Class X marks and the availability of seats. Please contact the admissions office for the current admission guidelines.",
            },
            {
              q: "Can I apply for multiple programs simultaneously?",
              a: "Yes, you may apply for up to two programs in a single application cycle. A separate application form and fee is required for each program.",
            },
            {
              q: "What documents are required for admission?",
              a: "You will need: 10th and 12th mark sheets and certificates, character certificate from previous institution, transfer certificate, caste/category certificate (if applicable), and 4 passport-size photographs.",
            },
            {
              q: "Are hostel facilities available?",
              a: "Yes, separate hostels for boys and girls are available on campus. Hostel allotment is done on a first-come, first-served basis after admission confirmation. Hostel fee is ₹45,000/year including meals.",
            },
            {
              q: "Which departments are available?",
              a: "The college offers three PU departments: Science, Commerce, and Arts. The admissions team can help you choose the stream that best fits your interests and future plans.",
            },
          ].map((f, i) => (
            <div key={i} className="border-t border-border">
              <button
                className="w-full flex items-center justify-between py-5 text-left gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span
                  className="font-semibold text-foreground"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {f.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <p className="pb-5 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              )}
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 bg-primary text-primary-foreground">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          <div>
            <p
              className="text-secondary text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Get in Touch
            </p>
            <h2
              className="text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admissions Office
            </h2>
            <p className="text-primary-foreground/70 mb-10 leading-relaxed">
              Our dedicated admissions team is here to guide you through every step.
              Reach out to us for queries, campus visits, or any assistance.
            </p>

            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Address", value: "Loyola Composite PU College, Mundargi, Gadag District, Karnataka — 581349", href: null },
                { icon: Phone, label: "Phone", value: "+91-8375-220011 | +91-8375-220012", href: null },
                { icon: Mail, label: "Email", value: siteSettings.email, href: `mailto:${siteSettings.email}` },
                { icon: Clock, label: "Office Hours", value: "Mon–Sat: 9:00 AM – 5:00 PM", href: null },
                { icon: Instagram, label: "Instagram", value: "@loyolacpucmundgod", href: "https://www.instagram.com/loyolacpucmundgod" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-xs text-primary-foreground/50 mb-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/90 hover:text-secondary transition-colors">
                        {value}
                      </a>
                    ) : (
                      <div className="text-sm text-primary-foreground/90">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 border border-white/15 rounded-lg p-8">
            <h3
              className="text-xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Send an Inquiry
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-primary-foreground/60 mb-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Arjun Sharma"
                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-primary-foreground/60 mb-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-primary-foreground/60 mb-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>Email Address</label>
                <input
                  type="email"
                  placeholder="arjun@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-secondary"
                />
              </div>
              <div>
                <label className="block text-xs text-primary-foreground/60 mb-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>Program Interested In</label>
                <select className="w-full bg-white/10 border border-white/20 rounded px-4 py-2.5 text-sm text-primary-foreground focus:outline-none focus:border-secondary appearance-none">
                  <option value="" className="bg-primary">Select a program</option>
                  {PROGRAMS.map((p) => (
                    <option key={p.code} value={p.code} className="bg-primary">{p.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-primary-foreground/60 mb-1.5" style={{ fontFamily: "'DM Mono', monospace" }}>Message</label>
                <textarea
                  rows={3}
                  placeholder="Your questions or message..."
                  className="w-full bg-white/10 border border-white/20 rounded px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-secondary resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-secondary text-secondary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0F1F3A] text-primary-foreground/60 py-12">
        <div className="w-full max-w-none mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <ImageWithFallback
                  src={collegeLogo}
                  alt="Loyola Composite PU College Logo"
                  className="w-10 h-10 object-contain rounded-full bg-white/10 p-0.5"
                />
                <div>
                  <div
                    className="text-primary-foreground font-bold text-sm leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Loyola Composite PU College
                  </div>
                  <a
                    href="http://loyolacompositepuclg.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-secondary hover:underline"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    loyolacompositepuclg.com
                  </a>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-xs mb-5">
                Shaping minds and futures since 1968. NAAC A+ accredited institution
                committed to holistic education and excellence.
              </p>
              <a
                href="https://www.instagram.com/loyolacpucmundgod"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs text-primary-foreground/70 hover:border-secondary hover:text-secondary transition-colors"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <Instagram className="w-3.5 h-3.5" />
                @loyolacpucmundgod
              </a>
            </div>
            <div>
              <h4
                className="text-primary-foreground text-sm font-semibold mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => scrollTo(l.href)}
                      className="hover:text-secondary transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-primary-foreground text-sm font-semibold mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Programs
              </h4>
              <ul className="space-y-2 text-sm">
                {PROGRAMS.map((p) => (
                  <li key={p.code}>{p.code} — {p.title.split(" ").slice(-1)[0]}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs">
            <span>© 2025 Loyola Composite PU College, Mundgod. All rights reserved.</span>
            <span className="text-primary-foreground/80">Developed by <strong className="font-semibold text-secondary">AJEETH VERNEKAR</strong></span>
            <div className="flex gap-5">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-secondary transition-colors">RTI</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
