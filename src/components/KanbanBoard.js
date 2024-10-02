// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles.css'; // Import styles for Kanban

// const KanbanBoard = () => {
//     const [tickets, setTickets] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [selectedTickets, setSelectedTickets] = useState([]); // State to hold selected tickets

//     useEffect(() => {
//         // Fetch the tickets and users from the API
//         axios.get('https://api.quicksell.co/v1/internal/frontend-assignment') // Replace with actual URL
//             .then(response => {
//                 setTickets(response.data.tickets);
//                 setUsers(response.data.users);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);

//     const priorityLabels = {
//         4: { label: 'Urgent', color: 'red' },
//         3: { label: 'High', color: 'orange' },
//         2: { label: 'Medium', color: 'yellow' },
//         1: { label: 'Low', color: 'green' },
//         0: { label: 'No priority', color: 'gray' },
//     };

//     const groupedTickets = tickets.reduce((acc, ticket) => {
//         const { priority } = ticket;
//         if (!acc[priority]) {
//             acc[priority] = [];
//         }
//         acc[priority].push(ticket);
//         return acc;
//     }, {});

//     // Custom order for priorities
//     const priorityOrder = [0, 4, 3, 2, 1];

//     // Function to handle ticket selection
//     const handleCheckboxChange = (ticketId) => {
//         setSelectedTickets(prevSelected => {
//             if (prevSelected.includes(ticketId)) {
//                 return prevSelected.filter(id => id !== ticketId); // Deselect ticket
//             } else {
//                 return [...prevSelected, ticketId]; // Select ticket
//             }
//         });
//     };

//     return (
//         <div className="kanban-container">
//             {priorityOrder.map(priority => (
//                 <div key={priority} className="kanban-column">
//                     <h3>{priorityLabels[priority].label}</h3>
//                     <div className="ticket-list">
//                         {groupedTickets[priority] ? groupedTickets[priority].map(ticket => (
//                             <div key={ticket.id} className="ticket-card">
//                                 <label style={{ display: 'flex', alignItems: 'center' }}>
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedTickets.includes(ticket.id)}
//                                         onChange={() => handleCheckboxChange(ticket.id)}
//                                         style={{
//                                             display: 'none' // Hide the default checkbox
//                                         }}
//                                     />
//                                     <span style={{
//                                         width: '20px',
//                                         height: '20px',
//                                         borderRadius: '50%',
//                                         border: '2px solid',
//                                         borderColor: selectedTickets.includes(ticket.id) ? 'blue' : 'gray',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         position: 'relative',
//                                         marginRight: '10px',
//                                         cursor: 'pointer'
//                                     }}>
//                                         {selectedTickets.includes(ticket.id) && (
//                                             <span style={{
//                                                 fontSize: '14px', // Adjust size for visibility
//                                                 color: 'blue', // Checkmark color
//                                             }}>
//                                                 ✔
//                                             </span>
//                                         )}
//                                     </span>
//                                     <div>
//                                         <p style={{ margin: 0 }}>{ticket.id}</p> {/* Show ID above title */}
//                                         <h4>{ticket.title}</h4>
//                                     </div>
//                                 </label>
//                                 <p>{ticket.tag.join(', ')}</p>
                                
//                             </div>
//                         )) : <p>No tasks</p>}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default KanbanBoard;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; // Import styles for Kanban

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]); // State to hold selected tickets
  const [groupBy, setGroupBy] = useState("status");
  const [orderBy, setOrderBy] = useState("priority"); // New state for ordering

  useEffect(() => {
    // Fetch the tickets and users from the API
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const priorityLabels = {
    4: { label: "Urgent", color: "red" },
    3: { label: "High", color: "orange" },
    2: { label: "Medium", color: "yellow" },
    1: { label: "Low", color: "green" },
    0: { label: "No priority", color: "gray" },
  };

  const handleGroupingChange = (e) => {
    setGroupBy(e.target.value);
  };
     const handleOrderingChange = (e) => {
       setOrderBy(e.target.value);
     };

  const groupedTickets = tickets.reduce((acc, ticket) => {
    const groupKey =
      groupBy === "user"
        ? users.find((u) => u.id === ticket.userId)?.name
        : groupBy === "priority"
        ? priorityLabels[ticket.priority].label
        : ticket.status;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(ticket);
    return acc;
  }, {});

  // Custom order for priorities
  const priorityOrder = [0, 4, 3, 2, 1];

  // Function to handle ticket selection
  const handleCheckboxChange = (ticketId) => {
    setSelectedTickets((prevSelected) => {
      if (prevSelected.includes(ticketId)) {
        return prevSelected.filter((id) => id !== ticketId); // Deselect ticket
      } else {
        return [...prevSelected, ticketId]; // Select ticket
      }
    });
  };

  return (
    <div>
      <select onChange={handleGroupingChange}>
        <option value="status">Group by Status</option>
        <option value="user">Group by User</option>

        <option value="priority">order by Priority</option>
      </select>
      <div className="kanban-container">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <h3>{group}</h3>
            <div className="ticket-list">
              {groupedTickets[group].length > 0 ? (
                groupedTickets[group].map((ticket) => (
                  <div key={ticket.id} className="ticket-card">
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        checked={selectedTickets.includes(ticket.id)}
                        onChange={() => handleCheckboxChange(ticket.id)}
                        style={{ display: "none" }} // Hide the default checkbox
                      />
                      <span
                        style={{
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "100%",
                          border: "2px solid",
                          borderColor: selectedTickets.includes(ticket.id)
                            ? "blue"
                            : "gray",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      >
                        {selectedTickets.includes(ticket.id) && (
                          <span
                            style={{
                              fontSize: "14px", // Adjust size for visibility
                              color: "blue", // Checkmark color
                            }}
                          >
                            ✔
                          </span>
                        )}
                      </span>
                      <div>
                        <p style={{ margin: 0 }}>{ticket.id}</p>{" "}
                        {/* Show ID above title */}
                        <h4>{ticket.title}</h4>
                        <p>{ticket.tag.join(", ")}</p>{" "}
                        {/* Move tags inside the card */}
                      </div>
                    </label>
                  </div>
                ))
              ) : (
                <p>No tasks</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
