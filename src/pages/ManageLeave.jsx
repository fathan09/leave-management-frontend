import React, {useState, useEffect} from "react";
import Header from "./Header";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import UpdatePopUp from "./UpdatePopUp";

function ManageLeave() {

    const [leaves, setLeaves] = useState([])
    const [searchStaff, setSearchStaff] = useState("")
    const [searchStartDate, setSearchStartDate] = useState("")
    const [searchEndDate, setSearchEndDate] = useState("")
    const [showPopup, setShowPopup] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);

    const handleStatusUpdate = (updatedLeave) => {
        setLeaves((prevLeaves) =>
            prevLeaves.map((leave) =>
                leave.leaveId === updatedLeave.leaveId ? { ...leave, status: updatedLeave.status } : leave
            )
        );
    };


    useEffect(() => {
        axios.get("https://leave-management-backend-production.up.railway.app/leave/all").then(
            (response) => {
                var result = response.data
                console.log(result)
                setLeaves(response.data)
            }, (error) => {
                console.log(error)
            }
        )
    }, [])

    const filteredLeaves = leaves.filter((leave) => {
        const staffMatch = leave.staffId.toLowerCase().includes(searchStaff.toLowerCase())
        const startDateMatch = leave.startDate.split(" ")[0].includes(searchStartDate)
        const endDateMatch = leave.endDate.split(" ")[0].includes(searchEndDate)

        return(
            (searchStaff === "" || staffMatch) && 
            (searchStartDate === "" || startDateMatch) &&
            (searchEndDate === "" || endDateMatch)
        )
    })
        
    return(
        <>
        <Header />
        {showPopup && (
            <div className="show-popup">
                <UpdatePopUp
                    leave={selectedLeave}
                    onClose={() => {
                        setSelectedLeave(null);
                        setShowPopup(false);
                    }}
                    onStatusUpdate={handleStatusUpdate}
                />
            </div>
        )}
        <div className="container-manage-leave">
            <div className="container-search">
                <input
                    placeholder="Search Staff ID"
                    value={searchStaff}
                    onChange={(e) => setSearchStaff(e.target.value)}
                />
                <input 
                    placeholder="Search Start Date (MM/DD/YYYY)"
                    value={searchStartDate}
                    onChange={(e) => setSearchStartDate(e.target.value)}
                />
                <input 
                    placeholder="Search End Date (MM/DD/YYYY)"
                    value={searchEndDate}
                    onChange={(e) => setSearchEndDate(e.target.value)}
                />
            </div>
            <div className="scrollable-table">
            <table>
                <thead>
                    <tr>
                        <th>Staff ID</th>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Change Status</th>
                    </tr>
                </thead>
                <tbody>
                        {filteredLeaves.map((leave, index) => (
                            <tr key={index}>
                                <td>{leave.staffId}</td>
                                <td>{leave.employeeName}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.startDate.split(" ")[0]}</td>
                                <td>{leave.endDate.split(" ")[0]}</td>
                                <td className={`status ${leave.status.toLowerCase()}`}>{leave.status}</td>
                                <td><button onClick={() => {
                                    setSelectedLeave(leave);
                                    setShowPopup(true)
                                }}><GrUpdate /> Update Status</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
            </div>
        </div>
        </>
    );
}

export default ManageLeave;