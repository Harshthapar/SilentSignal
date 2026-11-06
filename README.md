# 🛠️ SilentSignal — Campus Infrastructure Reporter

SilentSignal is a smart campus infrastructure reporting platform that enables students to report maintenance issues across their university campus, track their progress, and support existing reports through upvotes.

The platform helps identify recurring infrastructure problems, prioritize maintenance requests, and improve the overall campus experience.

## 🚀 Features

- **Issue Reporting:** Submit reports for broken projectors, faulty lights, water leakage, damaged furniture, Wi-Fi issues, and more.
- **Duplicate Issue Detection:** Identify similar existing reports based on issue keywords, category, building, and room number.
- **Explore Reports:** Browse campus maintenance reports with detailed information.
- **Smart Search & Filters:** Search by issue title, building, room, category, status, and priority.
- **Upvote System:** Support existing reports and highlight frequently reported issues.
- **My Reports:** View and manage reports submitted by the current student.
- **Report Tracking:** Track issue statuses from Pending to Resolved.
- **Campus Map:** Explore campus buildings and view issue markers based on priority.
- **Admin Dashboard:** Simulate maintenance management and update report statuses.
- **Insights & Analytics:** Visualize reports by category, status, and building.
- **Notifications:** Receive in-app notifications for report submissions and status updates.
- **Responsive UI:** Optimized for desktop, tablet, and mobile.
- **Local Storage Persistence:** Save application data across browser refreshes.

## 🎯 Problem Statement

Campus infrastructure problems such as broken classroom equipment, damaged furniture, faulty electrical systems, and maintenance issues can affect students' academic experience.

Traditional complaint systems may lack visibility, transparency, and an efficient way to identify duplicate reports.

SilentSignal addresses this challenge by providing a centralized digital platform for reporting, tracking, and prioritizing campus maintenance issues.

## 💡 Solution

SilentSignal creates a transparent campus issue reporting ecosystem.

1. Students report infrastructure issues with descriptions and locations.
2. The platform checks for similar existing reports.
3. Students can support existing reports through upvotes.
4. Reports are organized by category, priority, and status.
5. A simulated admin dashboard helps track and manage resolutions.

## 🌟 Unique Feature — Duplicate Issue Detection

SilentSignal uses simple keyword matching and location-based checks to identify potentially duplicate reports.

For example, if a student reports "Projector not working in Room 204" and a similar issue already exists, the application suggests supporting the existing report instead of creating another.

This helps reduce duplicate complaint submissions and makes maintenance tracking more organized.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development server and build tool |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive UI |
| Lucide React | Icons |
| Recharts | Analytics and data visualization |
| localStorage | Client-side data persistence |

## 📂 Project Structure

```text
SilentSignal/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Harshthapar/SilentSignal.git
```

### 2. Navigate to the project directory

```bash
cd SilentSignal
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## 🌍 Deployment

SilentSignal can be deployed using Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Select Vite as the framework preset.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Deploy the application.

## 📊 Impact

SilentSignal aims to:

- Improve campus infrastructure maintenance.
- Reduce duplicate complaint submissions.
- Increase visibility of recurring issues.
- Encourage student participation.
- Help prioritize high-impact repairs.
- Improve the campus experience.

## 🔮 Future Enhancements

- Backend integration using Supabase or Firebase.
- Shared real-time reports across students.
- Student and administrator authentication.
- AI-powered issue classification.
- Image-based infrastructure issue detection.
- Real-time report status notifications.
- QR codes for reporting issues at specific locations.
- Integration with university maintenance departments.
- Real-time campus map updates.

## ⚠️ Current Limitations

SilentSignal currently uses mock data and browser-based localStorage for persistence.

Reports, upvotes, and application data are stored locally in the user's browser and are not shared across different users or devices.

The admin dashboard is simulated. A backend and shared database would be required for a real campus-wide reporting system.

## 👨‍💻 Developer

**Harsh Sharma**

B.E. Computer Engineering  
Thapar Institute of Engineering and Technology

- GitHub: [Harshthapar](https://github.com/Harshthapar)
- LinkedIn: [harshsharmatiet](https://linkedin.com/in/harshsharmatiet)

---

🛠️ **SilentSignal — Report Issues. Track Progress. Improve Your Campus.**
