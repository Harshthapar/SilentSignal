export const BUILDINGS = [
  "Academic Block",
  "Library",
  "Engineering Block",
  "Computer Science Department",
  "Student Center",
  "Hostels",
  "Laboratories"
];

export const CATEGORIES = [
  "Electrical",
  "Classroom Equipment",
  "Plumbing",
  "Furniture",
  "Internet & Wi-Fi",
  "Laboratory",
  "Cleanliness",
  "Other"
];

export const PRIORITIES = ["Low", "Medium", "High", "Urgent"];
export const STATUSES = ["Pending", "Under Review", "In Progress", "Resolved"];

export const INITIAL_REPORTS = [
  {
    id: "REP-1024",
    title: "Projector not working in Room 204",
    description: "The ceiling HDMI projector power light flashes red and turns off after 10 seconds. Affecting continuous morning lectures.",
    category: "Classroom Equipment",
    building: "Academic Block",
    room: "Room 204",
    priority: "High",
    status: "In Progress",
    createdAt: "2026-11-04T09:30:00.000Z",
    upvotes: 24,
    upvotedByUser: false,
    reporter: "Rahul Sharma (Roll #21BCE042)",
    isCurrentUser: false,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "REP-1025",
    title: "Water leakage near Chemistry Lab",
    description: "Continuous ceiling dripping water accumulating on corridor tiles just outside Lab 2B, posing slipping hazard for students.",
    category: "Plumbing",
    building: "Laboratories",
    room: "2nd Floor Corridor Lab 2B",
    priority: "Urgent",
    status: "Under Review",
    createdAt: "2026-11-05T08:15:00.000Z",
    upvotes: 38,
    upvotedByUser: true,
    reporter: "Priya Patel (Roll #22BCH018)",
    isCurrentUser: false,
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "REP-1026",
    title: "Broken lights in Academic Block",
    description: "Three tube lights in Classroom 108 are flickering constantly and producing buzzing noise. Strains eyes during evening tutorials.",
    category: "Electrical",
    building: "Academic Block",
    room: "Room 108",
    priority: "Medium",
    status: "Pending",
    createdAt: "2026-11-05T14:40:00.000Z",
    upvotes: 12,
    upvotedByUser: false,
    reporter: "Ananya Roy (Roll #23BCS105)",
    isCurrentUser: false,
    image: null
  },
  {
    id: "REP-1027",
    title: "Wi-Fi unavailable in Library 2nd Floor",
    description: "Campus-Air wireless access point repeatedly rejects WPA2-Enterprise authentication near the silent reference study zone.",
    category: "Internet & Wi-Fi",
    building: "Library",
    room: "2nd Floor Reference Section",
    priority: "High",
    status: "In Progress",
    createdAt: "2026-11-03T11:20:00.000Z",
    upvotes: 45,
    upvotedByUser: false,
    reporter: "Arjun Verma (Roll #21BIT089)",
    isCurrentUser: false,
    image: null
  },
  {
    id: "REP-1028",
    title: "Damaged bench near Student Center",
    description: "Wooden outdoor bench beside the campus cafeteria has fractured support beams with exposed splintered nails.",
    category: "Furniture",
    building: "Student Center",
    room: "Courtyard North Patio",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-10-28T16:00:00.000Z",
    upvotes: 9,
    upvotedByUser: false,
    reporter: "Siddharth Jain (Roll #22BME034)",
    isCurrentUser: false,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "REP-1029",
    title: "Faulty AC in Lecture Hall 3",
    description: "Central HVAC split unit in LH-3 making loud rattling sounds and failing to circulate cool air during packed lecture hours.",
    category: "Classroom Equipment",
    building: "Engineering Block",
    room: "Lecture Hall 3",
    priority: "High",
    status: "Under Review",
    createdAt: "2026-11-02T13:10:00.000Z",
    upvotes: 31,
    upvotedByUser: false,
    reporter: "Sneha Mukherjee (Roll #20BEC077)",
    isCurrentUser: false,
    image: null
  },
  {
    id: "REP-1030",
    title: "Computer systems not working in Lab 3",
    description: "Terminals 14 through 18 in OS lab fail to boot due to network PXE boot failure and corrupt local drives.",
    category: "Laboratory",
    building: "Computer Science Department",
    room: "Lab 3 - Systems Wing",
    priority: "Urgent",
    status: "In Progress",
    createdAt: "2026-11-04T10:00:00.000Z",
    upvotes: 52,
    upvotedByUser: true,
    reporter: "Dev Mehta (Roll #21BCS012)",
    isCurrentUser: true,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "REP-1031",
    title: "Washroom maintenance required",
    description: "Third floor gentlemen's restroom tap in Block B is jammed open, wasting water continuously and leaking onto the floor.",
    category: "Cleanliness",
    building: "Academic Block",
    room: "3rd Floor Restroom B-Wing",
    priority: "Urgent",
    status: "Pending",
    createdAt: "2026-11-06T07:45:00.000Z",
    upvotes: 19,
    upvotedByUser: false,
    reporter: "Karan Johar (Roll #22BAE003)",
    isCurrentUser: false,
    image: null
  },
  {
    id: "REP-1032",
    title: "Electrical socket damaged",
    description: "Wall power socket behind desk row 4 has burned insulation casing and gives spark when plugged in.",
    category: "Electrical",
    building: "Computer Science Department",
    room: "Seminar Hall 1",
    priority: "Urgent",
    status: "In Progress",
    createdAt: "2026-11-05T16:15:00.000Z",
    upvotes: 27,
    upvotedByUser: false,
    reporter: "Tanvi Saxena (Roll #21BCS088)",
    isCurrentUser: false,
    image: null
  },
  {
    id: "REP-1033",
    title: "Classroom door handle broken",
    description: "The exterior latch assembly on Room 312 came loose, making it difficult to open the door from outside without a key.",
    category: "Furniture",
    building: "Engineering Block",
    room: "Room 312",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-10-30T12:00:00.000Z",
    upvotes: 7,
    upvotedByUser: false,
    reporter: "Aman Gupta (Roll #23BEE051)",
    isCurrentUser: true,
    image: null
  },
  {
    id: "REP-1034",
    title: "Water dispenser cooling malfunction in Hostels",
    description: "Block 4 water cooler compressor is heating up instead of cooling, warm water output for past 24 hours.",
    category: "Plumbing",
    building: "Hostels",
    room: "Block 4 Ground Floor",
    priority: "Medium",
    status: "Pending",
    createdAt: "2026-11-06T08:30:00.000Z",
    upvotes: 14,
    upvotedByUser: false,
    reporter: "Dev Mehta (Roll #21BCS012)",
    isCurrentUser: true,
    image: null
  }
];

export const MAP_BUILDING_COORDINATES = {
  "Library": { x: 260, y: 150, width: 140, height: 100 },
  "Academic Block": { x: 440, y: 130, width: 180, height: 120 },
  "Computer Science Department": { x: 660, y: 160, width: 150, height: 110 },
  "Student Center": { x: 340, y: 290, width: 150, height: 90 },
  "Engineering Block": { x: 530, y: 290, width: 170, height: 110 },
  "Hostels": { x: 120, y: 310, width: 160, height: 120 },
  "Laboratories": { x: 740, y: 310, width: 150, height: 120 }
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Report Updated",
    message: "REP-1030 (Computer systems in Lab 3) was moved to In Progress by System Admin.",
    time: "10m ago",
    read: false,
    type: "status"
  },
  {
    id: "notif-2",
    title: "Maintenance Completed",
    message: "REP-1028 (Damaged bench near Student Center) has been resolved.",
    time: "2h ago",
    read: false,
    type: "resolved"
  },
  {
    id: "notif-3",
    title: "High Support on Issue",
    message: "Your report 'Water dispenser cooling malfunction' received 5 new upvotes.",
    time: "1d ago",
    read: true,
    type: "upvote"
  }
];

