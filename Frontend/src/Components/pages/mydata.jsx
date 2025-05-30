import { useState } from "react";
import { Home, Users, MessageSquare, FileText, LogOut, User, BookOpen, ClipboardList, Video, Star, Edit, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Users", icon: Users },
    { name: "Mentors", icon: User },
    { name: "Mentorships", icon: MessageSquare },
    { name: "Topics", icon: BookOpen },
    { name: "Enrollment", icon: ClipboardList },
    { name: "Sessions", icon: Video },
    { name: "Feedback", icon: Star },
  ];

  const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com", enrollment: "101", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", enrollment: "102", status: "Inactive" },
    { id: 3, name: "Robert Brown", email: "robert@example.com", enrollment: "103", status: "Active" },
    { id: 4, name: "Emily Johnson", email: "emily@example.com", enrollment: "104", status: "Pending" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Users":
        return (
          <div>
            <h3>Users Management</h3>
            <p>Here you can manage all registered users, update their details, and remove inactive users.</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                  <tr style={{ background: "#ddd", textAlign: "left" }}>
                    <th style={{ padding: "10px" }}>User ID</th>
                    <th style={{ padding: "10px" }}>Name</th>
                    <th style={{ padding: "10px" }}>Email</th>
                    <th style={{ padding: "10px" }}>Enrollment</th>
                    <th style={{ padding: "10px" }}>Status</th>
                    <th style={{ padding: "10px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((user) => (
                    <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "10px" }}>{user.id}</td>
                      <td style={{ padding: "10px" }}>{user.name}</td>
                      <td style={{ padding: "10px" }}>{user.email}</td>
                      <td style={{ padding: "10px" }}>{user.enrollment}</td>
                      <td style={{ padding: "10px" }}>{user.status}</td>
                      <td style={{ padding: "10px", display: "flex", gap: "10px" }}>
                        <button style={{ background: "#007bff", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>
                          <Edit size={16} />
                        </button>
                        <button style={{ background: "#d9534f", color: "white", padding: "5px 10px", border: "none", cursor: "pointer" }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "Mentors":
        return (
          <div>
            <h3>Mentors Management</h3>
            <p>Manage mentors, approve new mentors, and track their activity on the platform.</p>
          </div>
        );
      case "Mentorships":
        return (
          <div>
            <h3>Mentorship Programs</h3>
            <p>Monitor and organize mentorship programs, ensuring smooth mentor-student interactions.</p>
          </div>
        );
      default:
        return (
          <div>
            <h3>Welcome to the Admin Dashboard</h3>
            <p>Select a section from the sidebar to manage different aspects of the platform.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", marginTop:"80px"}}>
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#222", color: "white", padding: "20px", display: "flex", flexDirection: "column" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>PathFinders Admin</h1>
        <nav style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                width: "100%",
                border: "none",
                background: activeTab === item.name ? "#007bff" : "#333",
                color: "white",
                cursor: "pointer",
                marginBottom: "5px",
              }}
            >
              <item.icon style={{ marginRight: "10px" }} />
              {item.name}
            </button>
          ))}
        </nav>
        <button style={{ display: "flex", alignItems: "center", padding: "10px", border: "none", background: "#d9534f", color: "white", cursor: "pointer" }}>
          <LogOut style={{ marginRight: "10px" }} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f4f4f4", padding: "20px" }}>
        {/* Top Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", padding: "10px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>{activeTab}</h2>
          <input type="text" placeholder="Search..." style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }} />
        </div>

        {/* Dynamic Content */}
        <div style={{ background: "white", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
 