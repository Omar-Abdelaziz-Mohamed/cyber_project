// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
// import { Sun, Moon } from "lucide-react";
// import "tailwindcss/tailwind.css";

// const Dashboard = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   const data = [
//     { date: "Feb 12", Low: 0.2, Medium: 0.1, High: 0, Critical: 0 },
//     { date: "Feb 13", Low: 0.3, Medium: 0.1, High: 0, Critical: 0 },
//     { date: "Feb 14", Low: 0.2, Medium: 0.2, High: 0, Critical: 0 },
//   ];

//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen p-6`}>
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">Dashboard</h1>
//         <Switch checked={darkMode} onCheckedChange={toggleDarkMode}>
//           {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
//         </Switch>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mb-6">
//         {["Critical", "High", "Medium", "Low", "Accepted", "Closed"].map((risk, index) => (
//           <Card key={index} className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-4 text-center`}>
//             <CardContent>
//               <h2 className="text-lg font-semibold">{risk}</h2>
//               <p className="text-2xl font-bold">0</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <Card className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} p-4`}>
//           <h2 className="font-bold mb-2">Security Over Time</h2>
//           <LineChart width={500} height={200} data={data}>
//             <XAxis dataKey="date" stroke={darkMode ? "#fff" : "#000"} />
//             <YAxis stroke={darkMode ? "#fff" : "#000"} />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="Low" stroke="yellow" />
//             <Line type="monotone" dataKey="Medium" stroke="orange" />
//           </LineChart>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
