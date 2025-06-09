import React, {useState, useEffect} from "react";
import Header from "./Header";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import UpdatePopUp from "./UpdatePopUp";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import DeletePopUp from "./DeletePopUp";

function ManageLeave() {

    const [leaves, setLeaves] = useState([])
    const [searchStaff, setSearchStaff] = useState("")
    const [searchStartDate, setSearchStartDate] = useState("")
    const [searchEndDate, setSearchEndDate] = useState("")
    const [showPopup, setShowPopup] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);

    const handleStatusUpdate = (updatedLeave) => {
        setLeaves((prevLeaves) =>
            prevLeaves.map((leave) =>
                leave.leaveId === updatedLeave.leaveId ? { ...leave, status: updatedLeave.status } : leave
            )
        );
    };

    const handleDeleteUpdate = (deletedLeave) => {
        setLeaves((prevLeaves) => 
            prevLeaves.filter((leave) =>
                leave.leaveId !== deletedLeave.leaveId
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

    const handleExcel = () => {
        const headers = [
            ["Employee Name", "Staff ID", "Leave Type", "Start Date", "End Date", "Status"]
        ];

        const rows = filteredLeaves.map((leave) => [
            leave.employeeName,
            leave.staffId,
            leave.leaveType,
            leave.startDate.split(" ")[0],
            leave.endDate.split(" ")[0],
            leave.status
        ]);
        const worksheet = XLSX.utils.aoa_to_sheet([...headers, ...rows]);
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet5");

        const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"});
        const blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        saveAs(blob, "Employee_Leave_Data_v1.xlsx")
    }
        
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
        {
            showDelete && (
                <div className="show-popup">
                    <DeletePopUp
                        leave={selectedLeave}
                        onClose={() => {
                            setSelectedLeave(null);
                            setShowDelete(false);
                        }}
                        onDeleteUpdate={handleDeleteUpdate}
                    />
                </div>
            )
        }
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
            <button className="download-button" onClick={handleExcel}>
                Download Excel File
            </button>
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
                        <th>Delete Request</th>
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
                                <td><button onClick={() => {
                                    setSelectedLeave(leave);
                                    setShowDelete(true);
                                }}><MdDelete /> Delete Request</button></td>
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