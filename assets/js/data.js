/* ==========================================================================
   LearnSphere — data.js
   Central content for courses, tutors, blog posts & testimonials.
   Load this file BEFORE main.js on every page.
   ========================================================================== */
(function (global) {
  'use strict';

  var LS_DATA = {
    courses: [
      {
        slug: 'mathematics',
        title: 'Mathematics',
        category: 'Core Subject',
        image: 'assets/images/courses/mathematics.svg',
        alt: 'Mathematics tutoring illustration',
        price: 1499,
        duration: '6 Months',
        classes: 48,
        lessons: 96,
        students: 420,
        rating: 4.9,
        level: 'Class 1 – 12',
        short: 'Build strong fundamentals with concept-first teaching, daily practice sets and personalised doubt-solving for every board.',
        desc: 'Our Mathematics programme moves beyond rote learning. Every concept is introduced visually, practised step-by-step and reinforced with board-pattern questions. Weekly tests track mastery so no student falls behind.',
        outcomes: [
          'Master algebra, geometry, trigonometry and calculus progressively',
          'Solve NCERT + board-pattern questions with speed and accuracy',
          'Develop logical reasoning and problem-solving habits',
          'Score consistently above 90% in school & board examinations',
          'Build confidence to face Olympiad and competitive exams'
        ],
        curriculum: [
          { week: 'Weeks 1–4', title: 'Number Systems & Arithmetic', items: ['Real numbers, rationalisation', 'Percentages, ratios & averages', 'Speed maths & mental calculation'] },
          { week: 'Weeks 5–9', title: 'Algebra Foundations', items: ['Linear & quadratic equations', 'Polynomials and identities', 'Word-problem mastery'] },
          { week: 'Weeks 10–14', title: 'Geometry & Mensuration', items: ['Triangles, circles & proofs', 'Coordinate geometry', 'Areas, volumes & surface areas'] },
          { week: 'Weeks 15–19', title: 'Trigonometry & Statistics', items: ['Trigonometric ratios & identities', 'Heights & distances', 'Data handling & probability'] },
          { week: 'Weeks 20–24', title: 'Calculus & Revision Sprint', items: ['Differentiation & integration basics', 'Full-syllabus mock tests', 'Doubt marathon before finals'] }
        ],
        schedule: [
          { day: 'Monday', time: '5:00 PM – 6:30 PM' },
          { day: 'Wednesday', time: '5:00 PM – 6:30 PM' },
          { day: 'Saturday', time: '10:00 AM – 12:00 PM' }
        ]
      },
      {
        slug: 'science',
        title: 'Science',
        category: 'Core Subject',
        image: 'assets/images/courses/science.svg',
        alt: 'Science tutoring illustration',
        price: 1399,
        duration: '6 Months',
        classes: 48,
        lessons: 96,
        students: 380,
        rating: 4.8,
        level: 'Class 1 – 10',
        short: 'Learn physics, chemistry and biology with hands-on experiments, animations and exam-focused practice for every topic.',
        desc: 'Science is best learned by doing. Our programme blends animated concept videos, live demonstrations and printable worksheets so theory turns into real understanding — and top exam scores.',
        outcomes: [
          'Understand Physics, Chemistry and Biology with clear concepts',
          'Master diagrams, definitions and numerical problems',
          'Relate everyday phenomena to scientific principles',
          'Excel in school exams, NTSE and science olympiads'
        ],
        curriculum: [
          { week: 'Weeks 1–5', title: 'Physics: Motion & Force', items: ['Motion, speed & acceleration', 'Newton’s laws with real examples', 'Work, energy & power'] },
          { week: 'Weeks 6–10', title: 'Chemistry: Matter & Reactions', items: ['States of matter & separation', 'Chemical reactions & equations', 'Acids, bases & salts'] },
          { week: 'Weeks 11–15', title: 'Biology: Life Processes', items: ['Nutrition, respiration & transport', 'Cell structure & function', 'Control and coordination'] },
          { week: 'Weeks 16–20', title: 'Diagrams & Practicals', items: ['Lab-diagram perfection', 'Viva questions bank', 'Experiment write-ups'] },
          { week: 'Weeks 21–24', title: 'Revision & Mock Exams', items: ['Chapter-wise revision sheets', 'Board-pattern mock papers', 'Score-boost strategy'] }
        ],
        schedule: [
          { day: 'Tuesday', time: '5:00 PM – 6:30 PM' },
          { day: 'Thursday', time: '5:00 PM – 6:30 PM' },
          { day: 'Saturday', time: '12:00 PM – 2:00 PM' }
        ]
      },
      {
        slug: 'english',
        title: 'English',
        category: 'Language',
        image: 'assets/images/courses/english.svg',
        alt: 'English tutoring illustration',
        price: 1199,
        duration: '4 Months',
        classes: 32,
        lessons: 64,
        students: 300,
        rating: 4.9,
        level: 'Class 1 – 12',
        short: 'Speak, write and read with confidence — grammar, vocabulary, comprehension and public speaking in one course.',
        desc: 'From phonics for juniors to advanced composition for seniors, our English programme builds complete language fluency with regular speaking sessions and personalised writing feedback.',
        outcomes: [
          'Strong grammar, vocabulary and sentence-building skills',
          'Confident spoken English for school and interviews',
          'Excellence in comprehension, writing and literature',
          'Clear pronunciation and fluent public speaking'
        ],
        curriculum: [
          { week: 'Weeks 1–4', title: 'Grammar Foundations', items: ['Parts of speech', 'Tenses & subject–verb agreement', 'Common error correction'] },
          { week: 'Weeks 5–9', title: 'Writing Skills', items: ['Letter, essay & story writing', 'Notice, message & report writing', 'Paragraph structuring'] },
          { week: 'Weeks 10–14', title: 'Reading & Comprehension', items: ['Unseen passage mastery', 'Inference & vocabulary building', 'Literary appreciation'] },
          { week: 'Weeks 15–18', title: 'Speaking & Confidence', items: ['Daily speaking practice', 'Presentations & debates', 'Interview preparation'] }
        ],
        schedule: [
          { day: 'Monday', time: '6:30 PM – 8:00 PM' },
          { day: 'Thursday', time: '6:30 PM – 8:00 PM' },
          { day: 'Sunday', time: '9:00 AM – 11:00 AM' }
        ]
      },
      {
        slug: 'physics',
        title: 'Physics',
        category: 'Science (Senior)',
        image: 'assets/images/courses/physics.svg',
        alt: 'Physics tutoring illustration',
        price: 1799,
        duration: '6 Months',
        classes: 48,
        lessons: 96,
        students: 260,
        rating: 4.9,
        level: 'Class 11 – 12',
        short: 'JEE & board-focused Physics with deep conceptual clarity, numerical practice and weekly problem-solving marathons.',
        desc: 'A rigorous Physics programme for Class 11 & 12 students targeting boards, JEE Main and NEET. Every law is derived, visualised and applied to board and competitive exam problems.',
        outcomes: [
          'Master mechanics, electrodynamics, optics and modern physics',
          'Crack numericals quickly with proven strategies',
          'Complete JEE Main & board-level question banks',
          'Strong foundation for engineering entrance exams'
        ],
        curriculum: [
          { week: 'Weeks 1–5', title: 'Mechanics', items: ['Kinematics & vectors', 'Laws of motion & friction', 'Work, energy & collisions'] },
          { week: 'Weeks 6–10', title: 'Rotation & Gravitation', items: ['Rotational dynamics', 'Gravitation & satellites', 'Simple harmonic motion'] },
          { week: 'Weeks 11–15', title: 'Electrodynamics', items: ['Electrostatics & capacitors', 'Current electricity', 'Magnetism & EMI'] },
          { week: 'Weeks 16–20', title: 'Optics & Waves', items: ['Ray optics & instruments', 'Wave optics', 'Sound & superposition'] },
          { week: 'Weeks 21–24', title: 'Modern Physics & Revision', items: ['Dual nature, atoms & nuclei', 'Semi-conductors', 'Mock test marathon'] }
        ],
        schedule: [
          { day: 'Monday', time: '6:30 PM – 8:00 PM' },
          { day: 'Wednesday', time: '6:30 PM – 8:00 PM' },
          { day: 'Saturday', time: '4:00 PM – 6:00 PM' }
        ]
      },
      {
        slug: 'chemistry',
        title: 'Chemistry',
        category: 'Science (Senior)',
        image: 'assets/images/courses/chemistry.svg',
        alt: 'Chemistry tutoring illustration',
        price: 1699,
        duration: '6 Months',
        classes: 48,
        lessons: 96,
        students: 230,
        rating: 4.8,
        level: 'Class 11 – 12',
        short: 'Reactions, equations and name-reactions made simple with memory maps and board & JEE/NEET targeted practice.',
        desc: 'Chemistry made visual and memorable. From periodic trends to organic reaction mechanisms, our teachers break every chapter into digestible, exam-ready modules.',
        outcomes: [
          'Memorise the periodic table and trends easily',
          'Master balanced equations and mole concepts',
          'Crack organic name-reactions with memory maps',
          'Score high in boards, JEE Main & NEET chemistry'
        ],
        curriculum: [
          { week: 'Weeks 1–5', title: 'Physical Chemistry', items: ['Mole concept & stoichiometry', 'Atomic structure', 'Thermodynamics & kinetics'] },
          { week: 'Weeks 6–10', title: 'Inorganic Chemistry', items: ['Periodic table & trends', 'Chemical bonding', 's-block & p-block elements'] },
          { week: 'Weeks 11–15', title: 'Organic Chemistry Basics', items: ['IUPAC nomenclature', 'Isomerism & conformations', 'Reaction mechanisms'] },
          { week: 'Weeks 16–20', title: 'Organic Reactions', items: ['Hydrocarbons & haloalkanes', 'Alcohols, phenols & ethers', 'Aldehydes, ketones & acids'] },
          { week: 'Weeks 21–24', title: 'Revision & Tests', items: ['Memory-map revision', 'Numerical speed drills', 'Full-length mock papers'] }
        ],
        schedule: [
          { day: 'Tuesday', time: '6:30 PM – 8:00 PM' },
          { day: 'Friday', time: '6:30 PM – 8:00 PM' },
          { day: 'Sunday', time: '11:00 AM – 1:00 PM' }
        ]
      },
      {
        slug: 'biology',
        title: 'Biology',
        category: 'Science (Senior)',
        image: 'assets/images/courses/biology.svg',
        alt: 'Biology tutoring illustration',
        price: 1599,
        duration: '6 Months',
        classes: 48,
        lessons: 96,
        students: 245,
        rating: 4.8,
        level: 'Class 11 – 12',
        short: 'NEET & board-oriented Biology with diagram training, quick-revision notes and high-frequency question coverage.',
        desc: 'Every diagram, definition and diagram-based question covered in depth. Our NEET-focused notes and weekly recall tests make Biology a scoring subject.',
        outcomes: [
          'Master botany & zoology for boards and NEET',
          'Perfect diagram-drawing and labelling skills',
          'High-frequency MCQs and assertion-reason practice',
          'Rapid revision strategies for finals'
        ],
        curriculum: [
          { week: 'Weeks 1–5', title: 'Cell & Genetics', items: ['Cell structure & division', 'Molecular basis of inheritance', 'Biomolecules'] },
          { week: 'Weeks 6–10', title: 'Human Physiology', items: ['Digestion, respiration & circulation', 'Excretion & locomotion', 'Neural & endocrine systems'] },
          { week: 'Weeks 11–15', title: 'Plant Physiology', items: ['Photosynthesis & respiration', 'Plant growth & hormones', 'Transport in plants'] },
          { week: 'Weeks 16–20', title: 'Ecology & Diversity', items: ['Ecosystems & biodiversity', 'Classification & kingdoms', 'Health & disease'] },
          { week: 'Weeks 21–24', title: 'NEET Sprint', items: ['3000+ high-frequency MCQs', 'Diagram rapid-fire', 'Mock test series'] }
        ],
        schedule: [
          { day: 'Wednesday', time: '6:30 PM – 8:00 PM' },
          { day: 'Friday', time: '6:30 PM – 8:00 PM' },
          { day: 'Sunday', time: '9:00 AM – 11:00 AM' }
        ]
      },
      {
        slug: 'computer',
        title: 'Computer Science',
        category: 'Technology',
        image: 'assets/images/courses/computer.svg',
        alt: 'Computer science tutoring illustration',
        price: 1299,
        duration: '4 Months',
        classes: 32,
        lessons: 64,
        students: 190,
        rating: 4.9,
        level: 'Class 3 – 12',
        short: 'Coding, computer fundamentals and practical projects — from Scratch for juniors to Python for seniors.',
        desc: 'Future-proof your child with practical computer skills. Learn coding logic with Scratch and Python, plus computer science theory for school and board exams.',
        outcomes: [
          'Coding fundamentals with Scratch & Python',
          'Computer science theory for school & boards',
          'Logic building, algorithms and debugging',
          'Real projects to showcase in portfolios'
        ],
        curriculum: [
          { week: 'Weeks 1–4', title: 'Computer Fundamentals', items: ['Hardware, software & operating systems', 'Internet, email & cyber safety', 'MS Office essentials'] },
          { week: 'Weeks 5–9', title: 'Coding with Scratch', items: ['Blocks & motion', 'Loops, conditions & variables', 'Game & story projects'] },
          { week: 'Weeks 10–14', title: 'Python Basics', items: ['Variables & data types', 'Conditionals & loops', 'Functions & mini projects'] },
          { week: 'Weeks 15–18', title: 'Projects & Revision', items: ['Quiz app & calculator project', 'Theory revision for exams', 'Portfolio showcase'] }
        ],
        schedule: [
          { day: 'Monday', time: '4:00 PM – 5:30 PM' },
          { day: 'Saturday', time: '9:00 AM – 11:00 AM' }
        ]
      },
      {
        slug: 'social',
        title: 'Social Studies',
        category: 'Humanities',
        image: 'assets/images/courses/social.svg',
        alt: 'Social studies tutoring illustration',
        price: 999,
        duration: '4 Months',
        classes: 32,
        lessons: 64,
        students: 150,
        rating: 4.7,
        level: 'Class 6 – 12',
        short: 'History, Geography, Civics & Economics simplified with timelines, maps and answer-writing practice.',
        desc: 'Turn Social Studies from a memorisation burden into a scoring, story-rich subject with timelines, map practice and structured answer-writing coaching.',
        outcomes: [
          'Master History, Geography, Civics & Economics',
          'Perfect map work and timeline skills',
          'Structured, high-scoring answer writing',
          'Board & NTSE question confidence'
        ],
        curriculum: [
          { week: 'Weeks 1–4', title: 'History', items: ['Ancient & medieval India', 'Modern India & freedom movement', 'World history essentials'] },
          { week: 'Weeks 5–9', title: 'Geography', items: ['Physical geography of India', 'Climate, rivers & resources', 'Map-work practice'] },
          { week: 'Weeks 10–14', title: 'Civics & Polity', items: ['Democracy & constitution', 'Government & elections', 'Rights and duties'] },
          { week: 'Weeks 15–18', title: 'Economics & Revision', items: ['Basic economics concepts', 'Development & sectors', 'Answer-writing & mock tests'] }
        ],
        schedule: [
          { day: 'Thursday', time: '4:00 PM – 5:30 PM' },
          { day: 'Sunday', time: '2:00 PM – 4:00 PM' }
        ]
      }
    ],

    tutors: [
      { id: 't1', name: 'Ananya Sharma', subject: 'Mathematics', img: 'assets/images/avatars/avatar-01.webp', qual: 'M.Sc. Mathematics, B.Ed.', experience: 12, rating: 4.9, students: 860, bio: 'Former school teacher with a gift for making numbers intuitive. Specialises in board and Olympiad preparation.', specs: ['B.Ed', 'Olympiad Coach', 'Class 1–12'] },
      { id: 't2', name: 'Rohan Mehta', subject: 'Physics', img: 'assets/images/avatars/avatar-02.webp', qual: 'B.Tech IIT Roorkee', experience: 10, rating: 4.8, students: 720, bio: 'IIT alumnus who makes Physics visual and fun. Known for his numerical marathons and doubt-friendly classes.', specs: ['IIT Alumnus', 'JEE Expert', 'Class 11–12'] },
      { id: 't3', name: 'Priya Iyer', subject: 'English', img: 'assets/images/avatars/avatar-03.webp', qual: 'M.A. English Literature', experience: 9, rating: 4.9, students: 640, bio: 'Certified spoken-English trainer. Focuses on fluency, writing craft and building confidence in every learner.', specs: ['Spoken English', 'Grammar', 'Writing Coach'] },
      { id: 't4', name: 'Vikram Singh', subject: 'Chemistry', img: 'assets/images/avatars/avatar-04.webp', qual: 'M.Sc. Chemistry, NET', experience: 11, rating: 4.8, students: 590, bio: 'Organic chemistry specialist with unique memory maps and reaction shortcuts loved by board and NEET aspirants.', specs: ['NET Qualified', 'NEET Mentor', 'Memory Maps'] },
      { id: 't5', name: 'Sneha Reddy', subject: 'Biology', img: 'assets/images/avatars/avatar-05.webp', qual: 'M.Sc. Zoology, B.Ed.', experience: 8, rating: 4.9, students: 550, bio: 'Diagram-perfect Biology coaching with quick-revision notes tailored for NEET and board success.', specs: ['B.Ed', 'NEET Coach', 'Diagram Expert'] },
      { id: 't6', name: 'Amit Kumar', subject: 'Computer Science', img: 'assets/images/avatars/avatar-06.webp', qual: 'M.Tech CSE', experience: 7, rating: 4.8, students: 410, bio: 'Coding mentor for all ages — Scratch for young minds, Python and logic building for seniors.', specs: ['Python', 'Scratch', 'App Projects'] },
      { id: 't7', name: 'Fatima Khan', subject: 'Science', img: 'assets/images/avatars/avatar-07.webp', qual: 'M.Sc. Physics, B.Ed.', experience: 9, rating: 4.7, students: 480, bio: 'Makes Science an adventure with experiments and animations. Perfect for Classes 1–10.', specs: ['B.Ed', 'Lab Demos', 'Class 1–10'] },
      { id: 't8', name: 'Karthik Nair', subject: 'Social Studies', img: 'assets/images/avatars/avatar-08.webp', qual: 'M.A. History, B.Ed.', experience: 10, rating: 4.7, students: 390, bio: 'Storytelling historian who turns timelines into tales and maps into memories. Answer-writing expert.', specs: ['B.Ed', 'Map Expert', 'Board Coach'] }
    ],

    blog: [
      {
        slug: 'study-routine',
        title: 'The Perfect Study Routine: A Step-by-Step Guide for Students',
        category: 'Study Tips',
        image: 'assets/images/blog/blog-study-routine.svg',
        excerpt: 'Stop cramming and start planning. Here is a realistic, science-backed daily routine that helps students study smarter — not harder.',
        date: '2026-08-05',
        author: 'Ananya Sharma',
        authorRole: 'Mathematics Lead, LearnSphere',
        authorImg: 'assets/images/avatars/avatar-01.webp',
        reading: 6,
        tags: ['Study Tips', 'Time Management', 'Class 6–12'],
        content: [
          { type: 'p', text: 'Every parent has heard it: "I studied all night!" The truth is, all-nighters rarely work. A consistent, well-planned routine beats a desperate last-minute sprint every single time. Here is how to build one that actually sticks.' },
          { type: 'h2', text: 'Start with a fixed study window' },
          { type: 'p', text: 'Pick two to three study blocks of 40–50 minutes and put them in the family calendar like appointments. Fixed windows train the brain to expect focus at the same time each day.' },
          { type: 'quote', text: 'Consistency is the hidden superpower of every topper I have ever taught.' },
          { type: 'h2', text: 'Use the Pomodoro technique' },
          { type: 'p', text: 'Study for 25–50 minutes, then take a 5–10 minute break. During the break, stand up, stretch, or look at something far away. This prevents burnout and keeps concentration fresh.' },
          { type: 'h3', text: 'A simple daily template' },
          { type: 'list', items: ['4:30 PM – Refresh & snack', '5:00 PM – Subject 1 (toughest first)', '5:50 PM – Short break', '6:00 PM – Subject 2 (practice questions)', '7:00 PM – Play / hobby time', '8:30 PM – Subject 3 (revision or reading)', '9:30 PM – Wind down, no screens'] },
          { type: 'h2', text: 'Review before you rest' },
          { type: 'p', text: 'End each day by recalling what you learned — a 5-minute self-test beats re-reading notes. Reviewing before sleep improves memory consolidation, so tomorrow starts a little easier.' }
        ]
      },
      {
        slug: 'exam-prep',
        title: 'Exam Preparation Made Simple: What Works (and What Does Not)',
        category: 'Exam Preparation',
        image: 'assets/images/blog/blog-exam-prep.svg',
        excerpt: 'From past papers to smart revision — a practical exam game plan that reduces stress and boosts scores in the final weeks.',
        date: '2026-07-28',
        author: 'Vikram Singh',
        authorRole: 'Chemistry Lead, LearnSphere',
        authorImg: 'assets/images/avatars/avatar-04.webp',
        reading: 7,
        tags: ['Exam Prep', 'Revision', 'Board Exams'],
        content: [
          { type: 'p', text: 'Exams measure how well you can recall under time pressure. That means preparation is about repetition, retrieval and exam simulation — not just reading the textbook again and again.' },
          { type: 'h2', text: 'Start with past papers' },
          { type: 'p', text: 'Past papers reveal the exam pattern and the topics examiners love. Solve the last 5 years under timed conditions before you begin textbook revision.' },
          { type: 'h2', text: 'Revision in three passes' },
          { type: 'list', items: ['Pass 1 – Read actively with notes & diagrams', 'Pass 2 – Solve questions chapter by chapter', 'Pass 3 – Mock tests + error log review'] },
          { type: 'quote', text: 'Your error log is your best teacher in the final week.' },
          { type: 'h2', text: 'The night before' },
          { type: 'p', text: 'Stop studying new material the night before the exam. Instead, review one-page summaries, get a full night’s sleep, and plan your morning. A calm mind recalls far more than a tired one.' },
          { type: 'h3', text: 'Exam-day quick wins' },
          { type: 'list', items: ['Read the paper fully before starting', 'Attempt the easy questions first', 'Show all steps — marks follow steps', 'Leave 10 minutes for checking'] }
        ]
      },
      {
        slug: 'parent-guide',
        title: 'How Parents Can Support Learning at Home Without Nagging',
        category: 'For Parents',
        image: 'assets/images/blog/blog-parent-guide.svg',
        excerpt: 'Practical, guilt-free ways to become your child’s learning partner — from study spaces to encouraging questions at dinner.',
        date: '2026-07-20',
        author: 'Priya Iyer',
        authorRole: 'English Lead, LearnSphere',
        authorImg: 'assets/images/avatars/avatar-03.webp',
        reading: 6,
        tags: ['Parenting', 'Home Learning', 'Motivation'],
        content: [
          { type: 'p', text: 'The best support at home is not hovering — it is structure plus warmth. A supportive routine, a calm study space and genuine curiosity from parents transform how children feel about learning.' },
          { type: 'h2', text: 'Build a study corner that works' },
          { type: 'p', text: 'A dedicated desk with good light, stationery and no TV nearby does more than any pep talk. Keep phones in another room during study time — for everyone.' },
          { type: 'h2', text: 'Ask better questions' },
          { type: 'list', items: ['"What did you learn today that surprised you?"', '"Show me how you solved that problem."', '"What was the hardest part today?"', '"What would you like help with tomorrow?"'] },
          { type: 'quote', text: 'Children do not remember lectures; they remember conversations around the dinner table.' },
          { type: 'h2', text: 'Praise effort, not grades' },
          { type: 'p', text: 'Celebrate persistence, improvement and curiosity. When children connect effort with results, they keep trying even when work gets hard — and that is the habit that lasts a lifetime.' }
        ]
      },
      {
        slug: 'mathematics',
        title: 'Why Children Fear Maths — and 7 Ways to Fix It',
        category: 'Study Tips',
        image: 'assets/images/blog/blog-mathematics.svg',
        excerpt: 'Maths anxiety is learned, not born. Discover the root causes and the simple daily habits that turn maths dread into confidence.',
        date: '2026-07-12',
        author: 'Ananya Sharma',
        authorRole: 'Mathematics Lead, LearnSphere',
        authorImg: 'assets/images/avatars/avatar-01.webp',
        reading: 8,
        tags: ['Mathematics', 'Confidence', 'Learning Habits'],
        content: [
          { type: 'p', text: '"I’m just not a maths person." You have probably heard it — maybe even said it. But maths anxiety is mostly a confidence problem built on weak foundations and fear of mistakes.' },
          { type: 'h2', text: 'What causes maths fear?' },
          { type: 'list', items: ['A single gap in early basics that snowballs', 'Fear of making mistakes in front of others', 'Speed pressure on timed tests too early', '“Wrong answer = bad person” classroom culture'] },
          { type: 'h2', text: 'Seven fixes that work' },
          { type: 'list', items: ['Rebuild the foundation topic by topic', 'Use real objects and drawings for new concepts', 'Let mistakes happen — analyse them together', 'Practice a little every day, not a lot rarely', 'Use growth language: “not yet” instead of “can’t”', 'Celebrate process over correct answers', 'Turn maths into games and daily-life problems'] },
          { type: 'quote', text: 'Every wrong answer is a clue — follow it and you will learn more than any mark you lose.' },
          { type: 'h2', text: 'A calm first step' },
          { type: 'p', text: 'Start with the easiest topic the child already feels okay about. Win small battles daily. Within a month, the "maths brain" rewires itself — and confidence compounds.' }
        ]
      },
      {
        slug: 'science',
        title: 'Science Learning Through Experiments: 5 Kitchen Labs for Kids',
        category: 'Practical Learning',
        image: 'assets/images/blog/blog-science.svg',
        excerpt: 'Turn your kitchen into a science lab. Five safe, cheap experiments that make physics, chemistry and biology unforgettable.',
        date: '2026-07-03',
        author: 'Fatima Khan',
        authorRole: 'Science Lead, LearnSphere',
        authorImg: 'assets/images/avatars/avatar-07.webp',
        reading: 6,
        tags: ['Science', 'Experiments', 'Class 1–10'],
        content: [
          { type: 'p', text: 'The fastest way to love Science is to watch it happen. Here are five kitchen experiments that use everyday materials and teach real concepts — safely, with an adult supervising.' },
          { type: 'h2', text: '1. The inflating balloon (Chemistry)' },
          { type: 'p', text: 'Baking soda + vinegar in a bottle, funnel into a balloon, and watch carbon dioxide blow it up. It demonstrates gas-producing reactions and pressure beautifully.' },
          { type: 'h2', text: '2. Dancing raisins (Physics)' },
          { type: 'p', text: 'Drop raisins into fizzy water and watch them dance. Carbon dioxide bubbles attach, lift the raisin, then pop at the surface — a perfect lesson in buoyancy.' },
          { type: 'h2', text: '3. Skittles rainbow (Chemistry)' },
          { type: 'p', text: 'Arrange skittles in a ring, add warm water, and watch colours diffuse into a rainbow. Great for talking about dissolving and concentration.' },
          { type: 'h2', text: '4. Egg in a bottle (Physics)' },
          { type: 'p', text: 'A peeled egg sits on a bottle mouth; light a paper strip inside and the egg gets sucked in. Classic demonstration of air pressure differences.' },
          { type: 'h2', text: '5. Bean sprout race (Biology)' },
          { type: 'p', text: 'Grow moong beans in a damp cotton bowl. Water one, keep one dark, keep one cold — and observe germination conditions for a week.' },
          { type: 'quote', text: 'Children remember what they do with their hands far longer than what they only read.' }
        ]
      },
      {
        slug: 'experiments',
        title: 'The Science of Memory: Revision Techniques That Actually Stick',
        category: 'Practical Learning',
        image: 'assets/images/blog/blog-experiments.svg',
        excerpt: 'Spaced repetition, active recall and the Feynman technique — the research-backed study methods behind every topper’s routine.',
        date: '2026-06-25',
        author: 'Rohan Mehta',
        authorRole: 'Physics Lead, LearnSphere',
        authorImg: 'assets/images/avatars/avatar-02.webp',
        reading: 7,
        tags: ['Memory', 'Revision', 'Study Tips'],
        content: [
          { type: 'p', text: 'Forgetting is normal — your brain cleans out unused information. The trick is to fight forgetting at the right moments using techniques proven by memory research.' },
          { type: 'h2', text: 'Spaced repetition beats cramming' },
          { type: 'p', text: 'Review a topic after 1 day, then 3 days, then 7 days, then 21 days. Each review is faster and the memory becomes permanent. Cramming feels productive but fades within days.' },
          { type: 'h2', text: 'Active recall over re-reading' },
          { type: 'p', text: 'Close the book and write everything you remember. Then check. This "retrieval practice" builds strong memory paths far better than highlighting or re-reading.' },
          { type: 'h2', text: 'The Feynman technique' },
          { type: 'list', items: ['Pick a concept and explain it in plain language', 'Pretend you are teaching a 12-year-old', 'Find the gaps in your explanation', 'Re-study those gaps, then explain again'] },
          { type: 'quote', text: 'If you cannot explain it simply, you have not understood it yet.' },
          { type: 'h2', text: 'Interleave your subjects' },
          { type: 'p', text: 'Mix topics during one session instead of studying one subject for hours. It feels harder, but the effort produces far stronger long-term learning.' }
        ]
      }
    ],

    testimonials: [
      { name: 'Meera Kapoor', role: 'Parent of Class 10 student', text: 'My daughter went from fearing Maths to topping her class. The teachers explain everything so patiently and the weekly tests kept her honest. Best decision we made.', stars: 5, img: 'assets/images/testimonials/customer-01.webp' },
      { name: 'Rajesh Patel', role: 'Parent of Class 12 student', text: 'The Physics coaching was outstanding. My son cracked JEE Main with a great rank, and the doubt-solving sessions were available even on weekends.', stars: 5, img: 'assets/images/testimonials/customer-02.webp' },
      { name: 'Sonia Gupta', role: 'Parent of Class 6 student', text: 'My son actually looks forward to his coding classes! The small batches mean personal attention, and I can track his progress on the dashboard.', stars: 5, img: 'assets/images/testimonials/customer-03.webp' },
      { name: 'Amit Verma', role: 'Parent of Class 8 student', text: 'The study materials and revision notes are excellent. His English has improved dramatically, and his confidence in speaking has grown so much.', stars: 4, img: 'assets/images/testimonials/customer-04.webp' },
      { name: 'Kavita Joshi', role: 'Parent of NEET aspirant', text: 'Biology coaching for my daughter was exactly what she needed — diagram training and NEET question banks. Her mock test scores jumped within two months.', stars: 5, img: 'assets/images/testimonials/customer-05.webp' },
      { name: 'Nitin Desai', role: 'Parent of Class 9 student', text: 'Affordable pricing, honest teachers and real progress. The attendance and results reports keep us informed without chasing anyone for updates.', stars: 5, img: 'assets/images/testimonials/customer-06.webp' }
    ]
  };

  global.LS_DATA = LS_DATA;
})(typeof window !== 'undefined' ? window : this);
