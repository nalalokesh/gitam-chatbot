const Datastore = require('nedb-promises');
const path = require('path');

const dbPath = path.join(__dirname, '../data/queries.db');
const db = Datastore.create({ filename: dbPath, autoload: true });

const newQueries = [
    // --- ADMISSIONS ---
    {
        question: "How do I apply for admission to GITAM?",
        answer: "You can apply for admission online through the official GITAM website (gitam.edu). Navigate to the 'Admissions' section, select your desired program, and follow the application instructions.",
        category: "Admissions",
        keywords: ["apply", "admission", "application", "online"]
    },
    {
        question: "What is GAT (GITAM Admission Test)?",
        answer: "GAT (GITAM Admission Test) is an online entrance examination conducted by GITAM Deemed to be University for admission into its various undergraduate and postgraduate programs.",
        category: "Admissions",
        keywords: ["GAT", "entrance", "exam", "test"]
    },
    {
        question: "Is GAT mandatory for all courses?",
        answer: "GAT is mandatory for most programs, including Engineering, Management, and Sciences. However, some programs may accept other national-level entrance exam scores like JEE Main, AP EAMCET, TS EAMCET, or CAT/MAT/XAT for MBA.",
        category: "Admissions",
        keywords: ["GAT", "mandatory", "JEE", "EAMCET", "CAT"]
    },
    {
        question: "What is the application fee for GAT?",
        answer: "The application fee for GAT is typically around INR 1,200, but it is subject to change. Please check the official admission notification for the current year's fee.",
        category: "Admissions",
        keywords: ["application fee", "cost", "GAT price"]
    },
    {
        question: "Can I apply for multiple programs?",
        answer: "Yes, you can apply for multiple programs. However, you may need to pay separate application fees or select multiple preferences within the same application form, depending on the specific programs.",
        category: "Admissions",
        keywords: ["multiple programs", "apply", "preference"]
    },
    {
        question: "What are the eligibility criteria for B.Tech?",
        answer: "For B.Tech, candidates typically need a minimum of 60% aggregate marks in Intermediate (10+2) or equivalent with Physics, Chemistry, and Mathematics. Rank in GAT or JEE Main is also required.",
        category: "Admissions",
        keywords: ["eligibility", "B.Tech", "requirements", "marks"]
    },
    {
        question: "Is there an age limit for admission?",
        answer: "Generally, there is no specific age limit for most courses. However, candidates must fulfill the academic eligibility criteria.",
        category: "Admissions",
        keywords: ["age limit", "admission", "eligibility"]
    },
    {
        question: "Does GITAM offer scholarships?",
        answer: "Yes, GITAM offers scholarships based on merit in GAT, JEE Main, AP/TS EAMCET, and for sports achievers. Financial assistance is also available for deserving students.",
        category: "Admissions",
        keywords: ["scholarship", "financial aid", "merit"]
    },
    {
        question: "How can I check my GAT result?",
        answer: "You can check your GAT result by logging into the admissions portal on the GITAM website using your application number and password.",
        category: "Admissions",
        keywords: ["result", "GAT", "check score"]
    },
    {
        question: "What is the counseling process?",
        answer: "After the results, qualified candidates are called for counseling. You need to choose your preferred campus and branch based on your rank and availability of seats.",
        category: "Admissions",
        keywords: ["counseling", "seat allotment", "process"]
    },
    {
        question: "Can I get direct admission?",
        answer: "Admissions are primarily merit-based through entrance exams. Management quota or direct admission policies may vary; it is best to contact the admissions office directly.",
        category: "Admissions",
        keywords: ["direct admission", "management quota"]
    },
    {
        question: "Which campuses does GITAM have?",
        answer: "GITAM has three main campuses: Visakhapatnam (Main Campus), Hyderabad, and Bengaluru.",
        category: "General Info",
        keywords: ["campuses", "locations", "branches"]
    },
    {
        question: "Is GITAM a deemed university?",
        answer: "Yes, GITAM (Gandhi Institute of Technology and Management) is a Deemed to be University accredited by NAAC with 'A++' grade.",
        category: "General Info",
        keywords: ["deemed", "university", "accreditation", "NAAC"]
    },
    {
        question: "What documents are required during counseling?",
        answer: "Commonly required documents include 10th and 12th mark sheets, GAT/Entrance rank card, Transfer Certificate (TC), Conduct Certificate, Transfer Certificate, and ID proof (Aadhar).",
        category: "Admissions",
        keywords: ["documents", "certificates", "counseling"]
    },
    {
        question: "Can I change my branch after admission?",
        answer: "Branch change is subject to university policy, usually allowed after the first year based on academic performance (CGPA) and vacancy in the desired branch.",
        category: "Admissions",
        keywords: ["branch change", "transfer", "first year"]
    },
    {
        question: "What is the fee structure for B.Tech CSE?",
        answer: "The fee structure varies by campus and scholarship status. It is approximately INR 2.5 to 3.5 Lakhs per annum. Please refer to the official fee chart.",
        category: "Admissions",
        keywords: ["fee", "B.Tech", "CSE", "cost"]
    },
    {
        question: "Are there hostel facilities for boys and girls?",
        answer: "Yes, GITAM provides separate hostel facilities for boys and girls at all three campuses (Visakhapatnam, Hyderabad, Bengaluru) with modern amenities.",
        category: "Facilities",
        keywords: ["hostel", "accommodation", "boys", "girls"]
    },
    {
        question: "How do I apply for a hostel?",
        answer: "Hostel rooms are allotted on a first-come, first-served basis. You can apply for hostel accommodation during the admission counseling process.",
        category: "Facilities",
        keywords: ["hostel booking", "apply", "room"]
    },
    {
        question: "What is the hostel fee?",
        answer: "Hostel fees depend on the type of room (AC/Non-AC) and sharing basis. It ranges roughly from INR 90,000 to 1,50,000 per academic year including mess.",
        category: "Facilities",
        keywords: ["hostel fee", "rent", "cost"]
    },
    {
        question: "Is the mess food good?",
        answer: "The hostel mess serves hygienic and nutritious food, offering both North Indian and South Indian cuisine options.",
        category: "Facilities",
        keywords: ["mess", "food", "dining", "menu"]
    },
    {
        question: "Is there Wi-Fi in the hostel?",
        answer: "Yes, high-speed Wi-Fi internet connectivity is available in hostels and across the campus.",
        category: "Facilities",
        keywords: ["wifi", "internet", "hostel"]
    },

    // --- ACADEMICS ---
    {
        question: "What is the grading system at GITAM?",
        answer: "GITAM follows the Choice Based Credit System (CBCS). Performance is evaluated using a 10-point CGPA scale based on internal assessments and semester-end examinations.",
        category: "Academics",
        keywords: ["grading", "CGPA", "system", "CBCS"]
    },
    {
        question: "What is the minimum attendance required?",
        answer: "Students typically need a minimum of 75% attendance to be eligible to appear for semester-end examinations.",
        category: "Academics",
        keywords: ["attendance", "minimum", "75%"]
    },
    {
        question: "How are internal marks calculated?",
        answer: "Internal marks are usually calculated based on mid-term exams (Sessionals), quizzes, assignments, and class participation.",
        category: "Academics",
        keywords: ["internal marks", "assessment", "sessional"]
    },
    {
        question: "What happens if I fail an exam?",
        answer: "If you fail a semester-end exam, you will have to appear for a supplementary examination in the subsequent semester as per the schedule.",
        category: "Academics",
        keywords: ["fail", "backlog", "supplementary", "exam"]
    },
    {
        question: "Does GITAM offer foreign exchange programs?",
        answer: "Yes, GITAM has collaborations with several international universities for student exchange programs, study abroad semesters, and joint research.",
        category: "Academics",
        keywords: ["study abroad", "exchange", "international"]
    },
    {
        question: "Are there research opportunities for undergraduates?",
        answer: "Yes, undergraduate students are encouraged to participate in research projects under faculty guidance and can join research forums like GUSAC.",
        category: "Academics",
        keywords: ["research", "undergraduate", "projects"]
    },
    {
        question: "What is the duration of the B.Tech program?",
        answer: "The B.Tech program is a 4-year full-time undergraduate course divided into 8 semesters.",
        category: "Academics",
        keywords: ["duration", "B.Tech", "years"]
    },
    {
        question: "What is the duration of the MBA program?",
        answer: "The MBA program is a 2-year full-time postgraduate course divided into 4 semesters.",
        category: "Academics",
        keywords: ["duration", "MBA", "years"]
    },
    {
        question: "Are certificates provided for workshops?",
        answer: "Yes, students receive participation or merit certificates for attending official workshops, seminars, and conferences organized by the university.",
        category: "Academics",
        keywords: ["certificate", "workshop", "event"]
    },
    {
        question: "How do I access the digital library?",
        answer: "You can access the digital library resources through the GITAM library portal using your student credentials. It provides access to e-journals, e-books, and databases.",
        category: "Facilities",
        keywords: ["digital library", "online resources", "access"]
    },

    // --- PLACEMENTS ---
    {
        question: "How are the placements at GITAM?",
        answer: "GITAM has a strong placement record with top MNCs visiting the campus. The dedicated Career Guidance Centre (GCGC) trains students for interviews and aptitude tests.",
        category: "Placements",
        keywords: ["placement", "job", "career"]
    },
    {
        question: "What is the highest package offered?",
        answer: "The highest package varies year by year but has frequently crossed INR 40+ LPA in recent years, offered by companies like Amazon, Adobe, etc.",
        category: "Placements",
        keywords: ["highest package", "salary", "CTC"]
    },
    {
        question: "What is the average package?",
        answer: "The average package for Engineering graduates typically ranges between INR 4.5 to 6 LPA, depending on the branch and market conditions.",
        category: "Placements",
        keywords: ["average package", "salary", "median"]
    },
    {
        question: "Which companies visit GITAM for recruitment?",
        answer: "Top recruiters include TCS, Deloitte, Wipro, Accenture, Amazon, Microsoft, Capgemini, Cognizant, and many core engineering companies.",
        category: "Placements",
        keywords: ["recruiters", "companies", "hiring"]
    },
    {
        question: "Does GITAM provide internship support?",
        answer: "Yes, the university facilitates summer internships and semester-long internships for final year students with partner industries.",
        category: "Placements",
        keywords: ["internship", "training", "summer"]
    },
    {
        question: "When do placements start?",
        answer: "Placement drives usually commence at the beginning of the final year (7th semester for B.Tech) and continue throughout the academic year.",
        category: "Placements",
        keywords: ["placement start", "season", "final year"]
    },
    {
        question: "Is there a placement training program?",
        answer: "Yes, the GITAM Career Guidance Centre (GCGC) conducts continuous training sessions on soft skills, coding, aptitudes, and mock interviews from the first year.",
        category: "Placements",
        keywords: ["training", "GCGC", "soft skills"]
    },
    {
        question: "What is the placement eligibility?",
        answer: "Eligibility depends on company criteria, but generally, students with a CGPA above 6.0 or 6.5 and no active backlogs are eligible for most companies.",
        category: "Placements",
        keywords: ["eligibility", "placement", "criteria"]
    },
    {
        question: "Do startups recruit from GITAM?",
        answer: "Yes, many startups and product-based companies visit GITAM for recruitment offering diverse roles.",
        category: "Placements",
        keywords: ["startups", "hiring", "jobs"]
    },
    {
        question: "Are placements common for all campuses?",
        answer: "Yes, GITAM often organizes centralized placement drives where students from Visakhapatnam, Hyderabad, and Bengaluru campuses participate together.",
        category: "Placements",
        keywords: ["centralized", "campuses", "common placement"]
    },

    // --- CAMPUS LIFE ---
    {
        question: "What is GUSAC?",
        answer: "GUSAC (GITAM University Science and Activity Centre) is a student-run body that promotes creativity, innovation, and technical skills through various clubs and events.",
        category: "Campus Life",
        keywords: ["GUSAC", "student body", "club"]
    },
    {
        question: "Are there sports facilities available?",
        answer: "Yes, GITAM has extensive sports facilities including cricket grounds, tennis courts, basketball courts, indoor stadiums, and gyms.",
        category: "Facilities",
        keywords: ["sports", "gym", "cricket", "games"]
    },
    {
        question: "What is the biggest fest at GITAM?",
        answer: "The annual cultural and techno-management fest (often called GUSAC Carnival or Pramana/GEMS depending on campus) is the biggest event, attracting students from across the country.",
        category: "Campus Life",
        keywords: ["fest", "cultural", "event", "carnival"]
    },
    {
        question: "Are there student clubs?",
        answer: "There are numerous student clubs for dance (Kalakrithi), music, literature, coding (ACM, IEEE), robotics, photography, and social service (NSS, NCC).",
        category: "Campus Life",
        keywords: ["clubs", "societies", "extra-curricular"]
    },
    {
        question: "Is there a gym on campus?",
        answer: "Yes, well-equipped gymnasiums are available for both boys and girls within the campus/hostels.",
        category: "Facilities",
        keywords: ["gym", "fitness", "workout"]
    },
    {
        question: "Is Ragging allowed?",
        answer: "No, GITAM has a strict zero-tolerance policy towards ragging. Anti-ragging committees ensure a safe environment for all students.",
        category: "Student Support",
        keywords: ["ragging", "safety", "anti-ragging"]
    },
    {
        question: "Is there a hospital on campus?",
        answer: "GITAM Institute of Medical Sciences and Research (GIMSR) hospital is located on the Visakhapatnam main campus, providing 24/7 medical care.",
        category: "Facilities",
        keywords: ["hospital", "medical", "clinic"]
    },
    {
        question: "Is there a bank or ATM on campus?",
        answer: "Yes, there are bank branches (like Union Bank) and multiple ATMs located within the university premises for convenience.",
        category: "Facilities",
        keywords: ["bank", "ATM", "money"]
    },
    {
        question: "Is there transportation for day scholars?",
        answer: "Yes, GITAM operates a fleet of buses covering key routes in the city for day scholars and faculty.",
        category: "Facilities",
        keywords: ["bus", "transport", "shuttle"]
    },
    {
        question: "What is the dress code?",
        answer: "While there is no strict uniform for most courses, students are expected to wear decent and formal/semi-formal attire while on campus.",
        category: "Campus Life",
        keywords: ["dress code", "uniform", "attire"]
    },

    // --- MISC & SPECIFIC ---
     { question: "Where is GITAM Visakhapatnam located?", answer: "GITAM Visakhapatnam is located at Gandhi Nagar, Rushikonda, Visakhapatnam, Andhra Pradesh 530045.", category: "General Info", keywords: ["location", "address", "vizag"] },
     { question: "Where is GITAM Hyderabad located?", answer: "GITAM Hyderabad campus is located at Rudraram, Patancheru Mandal, Sangareddy District, Telangana 502329.", category: "General Info", keywords: ["location", "address", "Hyderabad"] },
     { question: "Where is GITAM Bengaluru located?", answer: "GITAM Bengaluru campus is located at Nagadenehalli, Doddaballapur Road, Bengaluru Rural, Karnataka 561203.", category: "General Info", keywords: ["location", "address", "Bengaluru"] },
     { question: "Who is the Chancellor of GITAM?", answer: "The Chancellor is the head of the university. Please check the 'Governance' section of the website for the current Chancellor's name.", category: "General Info", keywords: ["chancellor", "head", "administration"] },
     { question: "Who is the Vice-Chancellor?", answer: "The Vice-Chancellor manages the academic and administrative affairs. Please check the website for the current VC's profile.", category: "General Info", keywords: ["VC", "Vice-Chancellor", "head"] },
     { question: "What is the vision of GITAM?", answer: "To become a global leader in higher education and research by providing value-based education.", category: "General Info", keywords: ["vision", "mission", "goal"] },
     { question: "When was GITAM established?", answer: "GITAM was established in 1980 by Dr. M.V.V.S. Murthi.", category: "General Info", keywords: ["founded", "established", "history", "1980"] },
     { question: "Does GITAM have NCC?", answer: "Yes, GITAM has active National Cadet Corps (NCC) units for both boys and girls.", category: "Campus Life", keywords: ["NCC", "cadet"] },
     { question: "Does GITAM have NSS?", answer: "Yes, the National Service Scheme (NSS) is very active at GITAM, organizing blood donation camps and social service activities.", category: "Campus Life", keywords: ["NSS", "social service"] },
     { question: "How to get a bonafide certificate?", answer: "You can apply for a bonafide certificate through the student portal or by submitting a request at the administrative office of your institute.", category: "Student Support", keywords: ["bonafide", "certificate", "admin"] },
     { question: "How to pay tuition fees?", answer: "Tuition fees can be paid online via the student portal using Net Banking, Credit/Debit cards, or through Challan at designated banks.", category: "Admissions", keywords: ["fee payment", "online", "tuition"] },
     { question: "Is there a library fee?", answer: "Library usage is generally included in the tuition fee, but late fees apply for overdue book returns.", category: "Facilities", keywords: ["library fee", "cost"] },
     { question: "What are the library timings?", answer: "The central library is usually open from 8:00 AM to 8:00 PM on working days, extending during exam periods.", category: "Facilities", keywords: ["library time", "open hours"] },
     { question: "Can I bring my laptop to campus?", answer: "Yes, students are encouraged to bring laptops for academic purposes. Wi-Fi is available.", category: "Campus Life", keywords: ["laptop", "gadgets"] },
     { question: "Is mobile phone allowed in class?", answer: "Usage of mobile phones during lectures is generally prohibited. They should be kept on silent mode or switched off.", category: "Campus Life", keywords: ["mobile", "phone", "class rules"] },
     { question: "What is G-Studio?", answer: "G-Studio often refers to the digital learning or media initiatives at GITAM to enhance e-learning experiences.", category: "Academics", keywords: ["G-Studio", "media", "learning"] },
     { question: "Are parents allowed to visit hostels?", answer: "Parents can visit their wards in the hostel visitor lounge during designated visiting hours.", category: "Facilities", keywords: ["parents", "visitors", "hostel"] },
     { question: "Is outing allowed for hostelers?", answer: "Yes, outings are allowed on weekends or holidays with prior permission from the warden.", category: "Facilities", keywords: ["outing", "permission", "hostel"] },
     { question: "What is the incubation center?", answer: "GITAM has a Venture Development Centre (VDC) to support startups and innovation among students.", category: "Academics", keywords: ["incubation", "VDC", "startup"] },
     { question: "Does GITAM offer PhD programs?", answer: "Yes, GITAM offers Ph.D. programs in Engineering, Science, Management, Pharmacy, and Humanities.", category: "Academics", keywords: ["PhD", "doctorate", "research"] },
     { question: "How to join the Robotics club?", answer: "You can join the Robotics club during the club recruitment drive usually held at the start of the academic year.", category: "Campus Life", keywords: ["robotics", "club", "join"] },
     { question: "Is there a swimming pool?", answer: "Yes, there is a swimming pool available on the campus for students and staff.", category: "Facilities", keywords: ["swimming", "pool", "sports"] },
     { question: "What is the food court?", answer: "The campus has multiple canteens and a food court serving a variety of snacks, meals, and beverages.", category: "Facilities", keywords: ["canteen", "food court", "cafeteria"] },
     { question: "Can I get educational loan support?", answer: "GITAM provides necessary documents like admission letters and fee estimates to assist students in applying for bank educational loans.", category: "Admissions", keywords: ["loan", "bank", "financial"] },
     { question: "What is the code of conduct?", answer: "Students must maintain discipline, dress appropriately, punctuality, and respect towards faculty and staff.", category: "Student Support", keywords: ["code of conduct", "discipline", "rules"] },
     { question: "Who to contact for ragging complaints?", answer: "You can contact the Anti-Ragging helpline or the principal/director of your institute immediately.", category: "Student Support", keywords: ["complaint", "ragging", "helpline"] },
     { question: "Are there psychological counselors?", answer: "Yes, GITAM has professional student counselors to provide psychological support and guidance.", category: "Student Support", keywords: ["counselor", "mental health", "support"] },
     { question: "What is the alumni network?", answer: "GITAM has a strong global alumni network (GAN) that mentors current students and assists in networking.", category: "General Info", keywords: ["alumni", "network", "old students"] },
     { question: "How to get a transcript?", answer: "Transcripts can be obtained from the examination section by submitting the prescribed application form and fee.", category: "Academics", keywords: ["transcript", "marksheet", "exam section"] },
     { question: "Is there a convocation ceremony?", answer: "Yes, Convocation is held annually where degrees are awarded to graduating students.", category: "Academics", keywords: ["convocation", "graduation", "degree"] },
     { question: "What is Pramana?", answer: "Pramana is one of the popular techno-cultural fests organized by GITAM Hyderabad campus.", category: "Campus Life", keywords: ["Pramana", "fest", "Hyderabad"] },
     { question: "What is GEMS?", answer: "GEMS is a cultural fest associated with the GITAM Business School or specific campus events.", category: "Campus Life", keywords: ["GEMS", "fest", "event"] },
     { question: "Are there shuttle services within campus?", answer: "Yes, battery-operated vehicles or shuttles are available for movement within large campuses like Vizag.", category: "Facilities", keywords: ["shuttle", "transport", "campus"] },
     { question: " Is there a guest house?", answer: "Yes, the university has guest houses to accommodate visiting faculty, parents, and guests.", category: "Facilities", keywords: ["guest house", "stay", "accommodation"] },
     { question: "What is the ERP system?", answer: "G-Learn or the university ERP portal is used for attendance, marks, and academic management.", category: "Academics", keywords: ["ERP", "portal", "G-Learn"] },
     { question: "How to reset my G-Learn password?", answer: "You can reset it using the 'Forgot Password' link on the portal or contact the IT support center.", category: "Student Support", keywords: ["password", "reset", "login"] },
     { question: "Are there medical leaves allowed?", answer: "Medical leaves are considered upon submission of a valid medical certificate and approval by the HoD/Principal.", category: "Academics", keywords: ["sick leave", "medical", "attendance"] },
     { question: "Can I park my vehicle on campus?", answer: "Designated parking areas are available for student 2-wheelers and 4-wheelers. Passes may be required.", category: "Facilities", keywords: ["parking", "vehicle", "bike"] },
     { question: "What acts constitute indiscipline?", answer: "Ragging, damaging property, smoking/drinking on campus, and disrupting classes are considered acts of indiscipline.", category: "Student Support", keywords: ["indiscipline", "rules", "bad behavior"] },
     { question: "Is gate pass required to leave campus?", answer: "Yes, during class hours, a gate pass signed by the mentor/HoD is usually required to leave the campus.", category: "Student Support", keywords: ["gate pass", "security", "leave"] },
     { question: "How are labs conducted?", answer: "Labs are practical sessions conducted weekly where students adhere to safety manuals and perform experiments.", category: "Academics", keywords: ["lab", "practical", "experiments"] },
     { question: "What is the medium of instruction?", answer: "The medium of instruction for all courses at GITAM is English.", category: "Academics", keywords: ["medium", "language", "english"] },
     { question: "Are there language labs?", answer: "Yes, English Language Communication Skills (ELCS) labs help students improve their speaking and listening skills.", category: "Academics", keywords: ["language lab", "english", "skills"] },
     { question: "Does GITAM have architecture courses?", answer: "Yes, GITAM School of Architecture offers B.Arch and M.Arch programs.", category: "Academics", keywords: ["architecture", "B.Arch", "school"] },
     { question: "Does GITAM have a law school?", answer: "Yes, GITAM School of Law offers BA.LLB, BBA.LLB, and LLM programs.", category: "Academics", keywords: ["law", "LLB", "legal"] },
     { question: "Does GITAM have a medical college?", answer: "Yes, GIMSR (GITAM Institute of Medical Sciences and Research) offers MBBS and PG medical courses.", category: "Academics", keywords: ["medical", "MBBS", "doctor"] },
     { question: "What is the library collection size?", answer: "The central library houses lakhs of books, journals, and digital resources catering to all disciplines.", category: "Facilities", keywords: ["books", "collection", "library"] },
     { question: "Is e-learning supported?", answer: "Yes, GITAM uses platforms like Moodle, Zoom, and Coursera integration for blended learning.", category: "Academics", keywords: ["e-learning", "online", "digital"] },
     { question: "Are there yoga classes?", answer: "Yoga sessions are often organized by the Department of Physical Education and NSS.", category: "Campus Life", keywords: ["yoga", "health", "activity"] },
     { question: "Can I collaborate with other departments?", answer: "Yes, interdisciplinary projects are encouraged, especially in final year projects and startups.", category: "Academics", keywords: ["collaboration", "interdisciplinary", "project"] },
     { question: "Who is the Dean of Engineering?", answer: "Please refer to the 'Faculty' or 'Administration' page on the website for current Deans of respective schools.", category: "General Info", keywords: ["dean", "head", "faculty"] },
     { question: "How to access old question papers?", answer: "Previous years' question papers are generally available in the central library or its digital repository.", category: "Academics", keywords: ["question papers", "old", "exam"] },
     { question: " Is there a post office?", answer: "A post office is situated within or very near the Visakhapatnam campus for mail services.", category: "Facilities", keywords: ["post office", "mail", "courier"] },
     { question: "Are there fast food centres?", answer: "Yes, apart from the canteen, there are fast food franchises like Subway or Coke stations on some campuses.", category: "Facilities", keywords: ["fast food", "snacks", "eat"] },
     { question: "How to report lost and found?", answer: "Lost items can be reported to the security office or the student affairs section.", category: "Student Support", keywords: ["lost", "found", "security"] },
     { question: "Is water facility available?", answer: "RO purified drinking water points are available throughout the campus and hostels.", category: "Facilities", keywords: ["water", "drinking", "RO"] },
     { question: "Are there power backups?", answer: "Yes, the campus and hostels are supported by 24/7 power backup generators.", category: "Facilities", keywords: ["power", "electricity", "backup"] },
     { question: "What is the refund policy?", answer: "Fee refund follows the UGC guidelines. Please check the admission brochure for specific deadlines and deduction percentages.", category: "Admissions", keywords: ["refund", "fee", "cancellation"] },
     { question: "Can I transfer from another university?", answer: "Lateral entry is available for Diploma holders. Transfer from other universities is subject to equivalence and vacancy - contact admissions.", category: "Admissions", keywords: ["transfer", "lateral entry", "university"] },
     { question: "What about campus security?", answer: "The campus is under CCTV surveillance and guarded by professional security personnel 24/7.", category: "Facilities", keywords: ["security", "safety", "guard"] },
     { question: "Are there prayer halls?", answer: "There are designated quiet spaces or prayer halls on campus for spiritual activities.", category: "Facilities", keywords: ["prayer", "temple", "meditation"] },
     { question: "How to get a bus pass?", answer: "Bus passes can be obtained from the transport section by paying the requisite fee for the semester/year.", category: "Facilities", keywords: ["bus pass", "transport", "fee"] },
     { question: "Is bicycle allowed?", answer: "Yes, bicycles are allowed and encouraged for eco-friendly transport within the campus.", category: "Facilities", keywords: ["bicycle", "cycle", "eco"] },
     { question: "What is 'G-Hack'?", answer: "G-Hack typically refers to hackathons organized by student clubs to solve technical problems.", category: "Campus Life", keywords: ["hackathon", "coding", "event"] },
     { question: "How to join the music band?", answer: "Auditions are held by the music club (Kalakrithi) for vocalists and instrumentalists.", category: "Campus Life", keywords: ["music", "band", "join"] },
     { question: "Is there a stationery shop?", answer: "Yes, stationery shops and reprographic (Xerox) centers are available on campus.", category: "Facilities", keywords: ["shop", "store", "print"] },
     { question: "What is the student portal?", answer: "The student portal is the online gateway for checking attendance, marks, fees, and timetable.", category: "Academics", keywords: ["portal", "login", "online"] },
     { question: "How is the climate in Vizag campus?", answer: "Visakhapatnam is a coastal city; the weather is generally humid and warm, with pleasant winters.", category: "General Info", keywords: ["weather", "climate", "vizag"] },
     { question: "Does GITAM encourage startups?", answer: "Yes, through VDC (Venture Development Centre), GITAM provides mentorship and funding support for student entrepreneurs.", category: "Academics", keywords: ["startup", "entrepreneur", "business"] },
     { question: "What is the student-teacher ratio?", answer: "GITAM strives to maintain a healthy student-teacher ratio (e.g., 15:1 or 20:1) to ensure personal attention.", category: "Academics", keywords: ["ratio", "faculty", "student"] },
     { question: "Are study rooms available?", answer: "Yes, reading halls in the library and common rooms in hostels serve as study areas.", category: "Facilities", keywords: ["study", "reading", "room"] },
     { question: "Can I do a part-time job?", answer: "Full-time programs require full commitment. However, some internships or 'earn-while-you-learn' schemes may be available.", category: "Student Support", keywords: ["part-time", "job", "work"] },
     { question: " What is the 'Mentor-Mentee' system?", answer: "Each student is assigned a faculty mentor who guides them academically and personally throughout their course.", category: "Academics", keywords: ["mentor", "guide", "support"] },
     { question: "Do we have huge playgrounds?", answer: "Yes, there are large cricket and football grounds for outdoor sports.", category: "Facilities", keywords: ["ground", "play", "sports"] },
     { question: "Is there a photocopy shop?", answer: "Yes, photocopying and printing services are available at multiple points on campus.", category: "Facilities", keywords: ["xerox", "copy", "print"] },
     { question: " How to get permission for events?", answer: "Event proposals must be submitted to the Director of Student Affairs through the faculty advisor for approval.", category: "Campus Life", keywords: ["event", "permission", "organize"] },
     { question: "Are parents informed about marks?", answer: "Yes, performance reports and attendance status are often communicated to parents via SMS or the parent portal.", category: "Academics", keywords: ["parents", "marks", "report"] },
     { question: "What is the evaluation pattern?", answer: "It typically consists of Continuous Internal Evaluation (CIE) (40-50%) and Semester End Examination (SEE) (50-60%).", category: "Academics", keywords: ["evaluation", "marks", "pattern"] },
     { question: "Are there dustbins on campus?", answer: "Yes, GITAM promotes cleanliness and has dustbins placed across the campus as part of the Swachh Bharat initiative.", category: "Facilities", keywords: ["clean", "dustbin", "waste"] },
     { question: "Is plastic allowed?", answer: "GITAM aims to be a plastic-free campus and discourages the use of single-use plastics.", category: "Campus Life", keywords: ["plastic", "environment", "green"] },
     { question: "Can I learn foreign languages?", answer: "GITAM sometimes offers courses or workshops in languages like French, German, or Japanese.", category: "Academics", keywords: ["language", "foreign", "learn"] },
     { question: "What is the holiday list?", answer: "The list of holidays is provided in the academic calendar available on the website.", category: "Academics", keywords: ["holiday", "list", "calendar"] },
     { question: "Is attendance mandatory for labs?", answer: "Yes, 100% attendance is usually expected in labs, and makeup labs are required for authorised absences.", category: "Academics", keywords: ["lab", "attendance", "rules"] },
     { question: " Are there auditoriums?", answer: "Yes, there are large AC auditoriums and open-air theaters for seminars, conferences, and cultural events.", category: "Facilities", keywords: ["auditorium", "hall", "event"] },
     { question: "How to apply for a duplicate ID card?", answer: "Report the loss to the administration, pay the penalty fee, and apply for a replacement ID card.", category: "Student Support", keywords: ["ID card", "lost", "duplicate"] },
     { question: "What is the motto of GITAM?", answer: "'Strive, Serve, Thrive' or similar values promoting excellence and service. (Check current motto on website)", category: "General Info", keywords: ["motto", "values"] },
     { question: "Are there courier services?", answer: "Courier services are often available near the post office or stationary shops on campus.", category: "Facilities", keywords: ["courier", "post", "send"] },
     { question: "Can I organize a fest?", answer: "Students can be part of the organizing committees for fests under the guidance of faculty coordinators.", category: "Campus Life", keywords: ["fest", "organize", "committee"] },
     { question: "Is exam schedule flexible?", answer: "No, exam schedules are fixed by the Controller of Examinations. Rescheduling is done only in extreme emergencies.", category: "Academics", keywords: ["exam", "schedule", "timetable"] },
     { question: "How to access Wi-Fi?", answer: "Students are provided with individual login credentials to access the secure campus Wi-Fi network.", category: "Facilities", keywords: ["wifi", "login", "password"] },
     { question: "Is the campus disable-friendly?", answer: "Yes, ramps and lifts are provided in most blocks to assist differently-abled persons.", category: "Facilities", keywords: ["disabled", "ramp", "lift"] },
     { question: "Are there pharmacy courses?", answer: "Yes, GITAM Institute of Pharmacy offers B.Pharm and M.Pharm courses.", category: "Academics", keywords: ["pharmacy", "medicine", "B.Pharm"] },
     { question: "Does GITAM have a science college?", answer: "Yes, GITAM School of Science offers B.Sc and M.Sc programs in various disciplines.", category: "Academics", keywords: ["science", "B.Sc", "degree"] },
     { question: "What is the grading scale?", answer: "O (Outstanding), A+, A, B+, B, C, P (Pass), F (Fail).", category: "Academics", keywords: ["grade", "scale", "marks"] },
     { question: "How to calculate CGPA?", answer: "CGPA is the average of Grade Points obtained in all subjects, weighted by their credits.", category: "Academics", keywords: ["CGPA", "calculate", "marks"] }
];

// Add more queries to reach 150+
const extraQueries = [
    { question: "What is the full form of GITAM?", answer: "Gandhi Institute of Technology and Management.", category: "General Info", keywords: ["full form", "name", "GITAM"] },
    { question: "Is there a nursing college?", answer: "Yes, GITAM offers B.Sc Nursing and other paramedical courses.", category: "Academics", keywords: ["nursing", "medical", "course"] },
    { question: "Are there Management quotas?", answer: "Yes, a certain percentage of seats are reserved for management quota admission. Contact the office for details.", category: "Admissions", keywords: ["quota", "management", "seat"] },
    { question: "What is the intake for CSE?", answer: "The intake capacity varies by campus and year. Typically, it is the largest branch with multiple sections.", category: "Admissions", keywords: ["intake", "seats", "CSE"] },
    { question: "Is there a dress code for labs?", answer: "Yes, students must wear lab coats and shoes in Chemistry and Workshop labs for safety.", category: "Academics", keywords: ["lab", "dress", "safety"] },
    { question: "Can I stay in the hostel during vacations?", answer: "Hostels generally close during long summer vacations, but permission may be granted for internships or special classes.", category: "Facilities", keywords: ["vacation", "hostel", "stay"] },
    { question: "Are hot water facilities available?", answer: "Solar water heaters or geysers are installed in hostels to provide hot water.", category: "Facilities", keywords: ["hot water", "geyser", "hostel"] },
    { question: "Is there a laundry service?", answer: "Yes, laundry services (paid) are often available within the hostel premises.", category: "Facilities", keywords: ["laundry", "wash", "clothes"] },
    { question: "How is the water quality?", answer: "Water is treated and strictly monitored for quality and safety.", category: "Facilities", keywords: ["water", "quality", "health"] },
    { question: "Are there vending machines?", answer: "Vending machines for snacks and sanitary pads are installed in select locations.", category: "Facilities", keywords: ["vending", "snacks", "machine"] },
    { question: "What is the curfew for hostels?", answer: "Curfew timings are usually around 9:00 PM or 9:30 PM, after which students must be in their hostels.", category: "Facilities", keywords: ["curfew", "time", "hostel"] },
    { question: "Can I change my room in hostel?", answer: "Room changes are allowed only in specific cases with the warden's approval.", category: "Facilities", keywords: ["room", "change", "hostel"] },
    { question: "Is there a TV room?", answer: "Yes, common rooms with TVs are provided for recreation in hostels.", category: "Facilities", keywords: ["TV", "entertainment", "hostel"] },
    { question: "Are guests allowed in mess?", answer: "Guests may eat in the mess by purchasing a guest token.", category: "Facilities", keywords: ["guest", "mess", "food"] },
    { question: "How to register for exams?", answer: "Exam registration is done online through the portal before the semester-end due dates.", category: "Academics", keywords: ["register", "exam", "online"] },
    { question: "What is the hall ticket?", answer: "The hall ticket is the admit card required to enter the examination hall. It can be downloaded from the portal.", category: "Academics", keywords: ["hall ticket", "admit card", "exam"] },
    { question: "Can I get a loan letter?", answer: "Yes, the administration provides provisional admission letters for bank loan processing.", category: "Admissions", keywords: ["loan", "letter", "bank"] },
    { question: "Is ragging a crime?", answer: "Yes, ragging is a criminal offense and invites suspension or rustication.", category: "Student Support", keywords: ["crime", "ragging", "law"] },
    { question: "Are there separate hostels for freshers?", answer: "Often, first-year students are accommodated in separate blocks to ensure comfort and prevent ragging.", category: "Facilities", keywords: ["fresher", "hostel", "block"] },
    { question: "How to access online journals?", answer: "Through the library website using proxy or login credentials provided by the university.", category: "Facilities", keywords: ["journal", "online", "library"] },
    { question: "Are there newspapers in the library?", answer: "Yes, multiple dailies in English and regional languages are available in the reading section.", category: "Facilities", keywords: ["newspaper", "read", "library"] },
    { question: "Is there a basketball court?", answer: "Yes, synthetic or concrete basketball courts are available.", category: "Facilities", keywords: ["basketball", "court", "sports"] },
    { question: "Is there a tennis court?", answer: "Yes, lawn tennis courts are available for students.", category: "Facilities", keywords: ["tennis", "court", "sports"] },
    { question: "Is there a cricket ground?", answer: "Yes, a full-sized cricket ground is a prominent feature of the main campus.", category: "Facilities", keywords: ["cricket", "ground", "stadium"] },
    { question: "Are there indoor games?", answer: "Yes, facilities for Table Tennis, Carrom, and Chess are available.", category: "Facilities", keywords: ["indoor", "games", "TT"] },
    { question: "What is the fee for gym?", answer: "Gym usage might be free or have a nominal monthly fee depending on the facility.", category: "Facilities", keywords: ["gym", "fee", "cost"] },
    { question: "Can I join NCC in 2nd year?", answer: "Enrollment usually happens in the 1st year. Contact the NCC officer for lateral entry rules.", category: "Campus Life", keywords: ["NCC", "join", "2nd year"] },
    { question: "Is there a photography club?", answer: "Yes, clubs like 'Faces' or similar photography societies exist.", category: "Campus Life", keywords: ["photo", "club", "camera"] },
    { question: "Are there dance clubs?", answer: "Yes, KALAKRITHI involves dance, music, and distinct dance crews.", category: "Campus Life", keywords: ["dance", "club", "culture"] },
    { question: "Is there a literature club?", answer: "Yes, literary clubs conduct debates, quizzes, and writing competitions.", category: "Campus Life", keywords: ["literature", "debate", "club"] },
    { question: "How to become a class rep?", answer: "Class representatives are usually elected or selected based on merit/leadership qualities.", category: "Academics", keywords: ["CR", "class rep", "leader"] },
    { question: "What is the role of CR?", answer: "The CR acts as a bridge between the class and the faculty/administration.", category: "Academics", keywords: ["CR", "role", "duty"] },
    { question: "Is there a grievance cell?", answer: "Yes, a grievance redressal committee handles student complaints.", category: "Student Support", keywords: ["grievance", "complaint", "help"] },
    { question: "What is the women's cell?", answer: "The Women Empowerment Cell ensures the safety and addressing issues faced by female students/staff.", category: "Student Support", keywords: ["women", "cell", "safety"] },
    { question: "How to apply for leave?", answer: "Leave applications should be submitted to the HoD through the class teacher or mentor.", category: "Academics", keywords: ["leave", "apply", "permission"] },
    { question: "Is there a canteen?", answer: "Yes, multiple canteens operate during college hours.", category: "Facilities", keywords: ["canteen", "food", "eat"] },
    { question: "What is the price of a meal?", answer: "Meals are subsidized and affordable, typically ranging from Rs. 40 to Rs. 80.", category: "Facilities", keywords: ["price", "cost", "meal"] },
    { question: "Is outside food allowed?", answer: "Generally, outside food delivery is allowed to the gate/hostel entrance, but rules vary.", category: "Facilities", keywords: ["food", "outside", "delivery"] },
    { question: "Are there water coolers?", answer: "Yes, water coolers are placed in every block.", category: "Facilities", keywords: ["water", "cool", "drink"] },
    { question: "Is there a biometric attendance?", answer: "Yes, biometric or RFID based attendance systems are often used.", category: "Academics", keywords: ["biometric", "attendance", "scan"] },
    { question: "What if I miss an internal exam?", answer: "Re-exams for internals are rarely conducted unless for genuine medical reasons or official duty.", category: "Academics", keywords: ["miss", "exam", "internal"] },
    { question: "How to improve my CGPA?", answer: "Focus on internals, attend classes regularly, and perform well in practicals and semester-end exams.", category: "Academics", keywords: ["improve", "marks", "CGPA"] },
    { question: "Is there a coding club?", answer: "Yes, ACM Student Chapter and other coding clubs are very active.", category: "Campus Life", keywords: ["coding", "club", "programming"] },
    { question: "Are hackathons conducted?", answer: "Yes, internal and national level hackathons are frequently hosted.", category: "Campus Life", keywords: ["hackathon", "contest", "code"] },
    { question: "Is there an entrepreneurship cell?", answer: "Yes, E-Cell promotes entrepreneurial spirit and organizes summits.", category: "Campus Life", keywords: ["E-cell", "business", "club"] },
    { question: "How to publish a paper?", answer: "You can write research papers under faculty guidance and submit them to conferences or journals.", category: "Academics", keywords: ["paper", "publish", "research"] },
    { question: "What is a major project?", answer: "Final year students undertake a major capstone project relevant to their field.", category: "Academics", keywords: ["project", "final year", "major"] },
    { question: "What is a mini project?", answer: "Mini projects are smaller practical assignments usually done in the 2nd or 3rd year.", category: "Academics", keywords: ["mini project", "assignment", "work"] },
    { question: "Are there industrial visits?", answer: "Yes, departments organize industrial visits to give practical exposure.", category: "Academics", keywords: ["visit", "industry", "tour"] },
    { question: "Is there a trekking club?", answer: "Adventure or trekking clubs organize treks occasionally.", category: "Campus Life", keywords: ["trek", "club", "adventure"] },
    { question: "How to volunteer for events?", answer: "Look out for volunteer calls from organizing committees or join NSS/NCC.", category: "Campus Life", keywords: ["volunteer", "help", "work"] },
    { question: "Is there a scholarship for sports?", answer: "Yes, sports quota scholarships are available for state/national level players.", category: "Admissions", keywords: ["sports", "scholarship", "quota"] },
    { question: "What is the alumni portal?", answer: "A dedicated website helps alumni connect, donate, or mentor current students.", category: "General Info", keywords: ["alumni", "portal", "connect"] },
    { question: "Are there alumni meets?", answer: "Yes, alumni reunions are held annually at various chapters.", category: "General Info", keywords: ["reunion", "meet", "alumni"] },
    { question: "How to get a recommendation letter?", answer: "Approach your professors who know your work well for a Letter of Recommendation (LOR).", category: "Academics", keywords: ["LOR", "recommendation", "letter"] },
    { question: "What is the passing mark?", answer: "Usually 40% in theory and 50% in aggregate, but check specific regulations for your batch.", category: "Academics", keywords: ["pass", "mark", "fail"] },
    { question: "Can I review my answer sheet?", answer: "Yes, you can apply for revaluation or script verification after results are declared.", category: "Academics", keywords: ["revaluation", "check", "paper"] },
    { question: "Is there a makeup exam?", answer: "Supplementary exams serve as makeup exams for those who failed.", category: "Academics", keywords: ["makeup", "exam", "retry"] },
    { question: "What is 'detained'?", answer: "Detained means not allowed to write exams due to shortage of attendance or credits.", category: "Academics", keywords: ["detained", "attendance", "block"] },
    { question: "How to clear backlogs?", answer: "Register for the backlog subjects when the supplementary exam notification is released.", category: "Academics", keywords: ["backlog", "clear", "exam"] },
    { question: "Is there a convocation fee?", answer: "Yes, a fee is charged for the convocation certificate and ceremony participation.", category: "Academics", keywords: ["convocation", "fee", "cost"] },
    { question: "Can I get a duplicate degree?", answer: "Yes, in case of loss, a duplicate degree can be issued upon producing an FIR and paying a fine.", category: "Academics", keywords: ["duplicate", "degree", "certificate"] },
    { question: "What is the tatkal scheme?", answer: "Tatkal schemes are sometimes available for urgent issue of certificates.", category: "Academics", keywords: ["tatkal", "urgent", "fast"] },
    { question: "Is there a parking fee?", answer: "Parking is usually free for students with valid stickers.", category: "Facilities", keywords: ["parking", "fee", "cost"] },
    { question: "Are helmet rules enforced?", answer: "Yes, wearing a helmet is mandatory for entering the campus on a two-wheeler.", category: "Student Support", keywords: ["helmet", "rule", "safety"] },
    { question: "What is the speed limit?", answer: "The speed limit within campus is typically 20-30 km/h.", category: "Student Support", keywords: ["speed", "limit", "drive"] },
    { question: "Are electric vehicles allowed?", answer: "Yes, EVs are encouraged.", category: "Facilities", keywords: ["EV", "electric", "vehicle"] },
    { question: "Is there an EV charging station?", answer: "Some campuses may have charging points for electric vehicles.", category: "Facilities", keywords: ["charging", "station", "EV"] }
];

const allQueries = [...newQueries, ...extraQueries];

const seedQueries = async () => {
    try {
        console.log(`Adding ${allQueries.length} new queries...`);
        for (const q of allQueries) {
            // Check for duplicates based on question text
            const existing = await db.findOne({ question: q.question });
            if (!existing) {
                await db.insert(q);
            }
        }
        console.log('Successfully seeded queries.');
    } catch (e) {
        console.error('Error seeding queries:', e);
    }
};

seedQueries();
