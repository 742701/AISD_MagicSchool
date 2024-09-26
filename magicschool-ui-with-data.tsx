import React, { useState, useEffect } from 'react';
import { Search, Star, Video, Pyramid, Bot, BarChart2, MessageSquare, FileText, List, Globe, Image, Apple, FileUp } from 'lucide-react';

// Synthetic user data (abbreviated for brevity)
const users = [
  { name: 'Teacher1', email: 'Teacher1@schooldistrict.org', role: 'Teacher', department: 'CTE', campus: 'Oakridge Elementary' },
  { name: 'Teacher51', email: 'Teacher51@schooldistrict.org', role: 'Teacher', department: 'Electives', campus: 'Lakeside Elementary' },
  { name: 'Teacher101', email: 'Teacher101@schooldistrict.org', role: 'Teacher', department: 'Social Studies', campus: 'Oakridge Elementary' },
  { name: 'Teacher151', email: 'Teacher151@schooldistrict.org', role: 'Teacher', department: 'ELA', campus: 'Lakeside Elementary' },
  { name: 'Teacher201', email: 'Teacher201@schooldistrict.org', role: 'Teacher', department: 'Math', campus: 'Oakridge Elementary' },
  { name: 'Teacher251', email: 'Teacher251@schooldistrict.org', role: 'Teacher', department: 'Science', campus: 'Lakeside Elementary' },
  { name: 'AdminCTE1', email: 'AdminCTE1@schooldistrict.org', role: 'Org Admin', department: 'CTE', campus: 'Central Office' },
];

// Department access rules
const departmentAccess = {
  CTE: 'all',
  Electives: 'all',
  'Social Studies': 'all',
  ELA: {
    blocked: ['Lesson Plan', 'TextRewriter', 'Worksheet Generator', 'Unit Plan Generator', 
              'Gift Suggestion', 'Math Spiral Review', 'Jeopardy Review Game', 
              'Math Story Word Problems', 'Science Labs', '5E Model Lesson Plan']
  },
  Math: {
    blocked: ['Lesson Plan', 'TextRewriter', 'Worksheet Generator', 'Unit Plan Generator', 
              'Gift Suggestion', 'Jeopardy Review Game', 'Science Labs', '5E Model Lesson Plan']
  },
  Science: {
    blocked: ['Lesson Plan', 'TextRewriter', 'Worksheet Generator', 'Unit Plan Generator', 
              'Gift Suggestion', 'Math Spiral Review', 'Jeopardy Review Game', 
              'Math Story Word Problems']
  }
};

// Function to check if a user has access to a specific tool
const hasToolAccess = (user, tool) => {
  if (user.role === 'Org Admin') {
    return true;
  }
  
  const access = departmentAccess[user.department];
  if (access === 'all') {
    return true;
  }
  
  return !access.blocked.includes(tool.name);
};

const tools = [
  { id: 1, name: 'YouTube Video Questions', icon: <Video />, description: 'Generate guiding questions aligned to a YouTube video.' },
  { id: 2, name: 'DOK Questions', icon: <Pyramid />, description: 'Generate questions based on topic or standard for each of the 4 Depth of Knowledge (DOK) levels.' },
  { id: 3, name: 'Custom Chatbot', icon: <Bot />, description: 'Create a custom chatbot to interact with based on any criteria that you choose!' },
  { id: 4, name: 'Data Table Analysis', icon: <BarChart2 />, description: 'Generate a table with data of your choice for your class with associated questions.' },
  { id: 5, name: 'Sentence Starters', icon: <MessageSquare />, description: 'Provide sentence starters for any topic, assignment, standard, or objective.' },
  { id: 6, name: 'Multiple Choice Quiz / Assessment', icon: <FileText />, description: 'Create a multiple choice assessment, quiz, or test based on any topic, standard(s), or criteria!' },
  { id: 7, name: 'IEP Generator', icon: <FileText />, description: 'Generate a draft of an individualized education program (IEP) customized to students\' needs.' },
  { id: 8, name: 'Behavior Intervention Suggestions', icon: <List />, description: 'Generate a list of suggestions for behavior intervention based on the behaviors of a student that needs support.' },
  { id: 9, name: 'BIP Generator', icon: <FileText />, description: 'Generate suggestions for a Behavior Intervention Plan (BIP).' },
  { id: 10, name: 'Lesson Plan', icon: <FileText />, description: 'Generate a lesson plan for a topic or objective you\'re teaching.' },
  { id: 11, name: 'TextRewriter', icon: <FileText />, description: 'Take any text and rewrite it with custom criteria however you\'d like!' },
  { id: 12, name: 'Worksheet Generator', icon: <FileText />, description: 'Generate a worksheet based on any topic or text.' },
  { id: 13, name: 'Unit Plan Generator', icon: <FileText />, description: 'Generate a draft of a unit plan based on topic, standards and objectives, and length of unit.' },
  { id: 14, name: 'Gift Suggestion', icon: <FileText />, description: 'Get gift suggestions for various occasions.' },
  { id: 15, name: 'Math Spiral Review', icon: <FileText />, description: 'Generate a spiral review problem set for any math standards or topics.' },
  { id: 16, name: 'Jeopardy Review Game', icon: <FileText />, description: 'Create a jeopardy review game for a fun way to review content with students!' },
  { id: 17, name: 'Math Story Word Problems', icon: <FileText />, description: 'Write a custom math word / story problem based on the concept you\'re teaching and a story topic.' },
  { id: 18, name: 'Science Labs', icon: <FileText />, description: 'Generate an engaging science lab based on topics and standards of your choice.' },
  { id: 19, name: '5E Model Lesson Plan', icon: <FileText />, description: 'Generate a 5E model lesson plan for your science class. Engage, Explore, Explain, Elaborate, Evaluate.' },
];

const MagicSchoolUI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(users[0]);

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    hasToolAccess(currentUser, tool)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-purple-600">MagicSchool</h1>
          <p className="text-sm text-gray-600">ENTERPRISE</p>
        </div>
        <nav className="mt-4">
          <a href="#" className="block py-2 px-4 bg-purple-100 text-purple-700">Magic Tools</a>
          <a href="#" className="block py-2 px-4 text-gray-700">Raina (Chatbot)</a>
          <a href="#" className="block py-2 px-4 text-gray-700">Output History</a>
          <a href="#" className="block py-2 px-4 text-gray-700">Launch to Students</a>
          <a href="#" className="block py-2 px-4 text-gray-700">Love</a>
          <a href="#" className="block py-2 px-4 text-gray-700">Training</a>
          <a href="#" className="block py-2 px-4 text-gray-700">Share the Magic</a>
          <a href="#" className="block py-2 px-4 text-gray-700">MagicStudent Intro</a>
        </nav>
        {/* User selection dropdown (for demo purposes) */}
        <div className="p-4">
          <select 
            value={currentUser.email}
            onChange={(e) => setCurrentUser(users.find(u => u.email === e.target.value))}
            className="w-full p-2 border rounded"
          >
            {users.map(user => (
              <option key={user.email} value={user.email}>
                {user.name} ({user.department})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-purple-600 p-4">
          <div className="flex items-center justify-between">
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="Search Tools"
                className="w-full py-2 px-4 pr-10 rounded-full focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            <div>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-full mr-2">MagicSchool</button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">MagicStudent</button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Tools for {currentUser.name} ({currentUser.department}) 
            <span className="text-purple-600 text-sm font-normal ml-2">Change Order</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map(tool => (
              <div key={tool.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="text-purple-600 mr-3">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                  <Star className="text-yellow-400" size={20} />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MagicSchoolUI;
