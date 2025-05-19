import React, {useState} from "react";
import axios from "axios";

function UpdatePopUp({leave, onClose, onStatusUpdate}) {

    const [selectedStatus, setSelectedStatus] = useState(leave.status);

    const handleUpdate = async () => {
        try {
            await axios.patch(`https://leave-management-backend-production.up.railway.app/leave/updatestatus/${leave.leaveId}`, {
                status: selectedStatus
            });
            console.log("Status is updated")
            onStatusUpdate({ ...leave, status: selectedStatus });
        } catch(error) {
            console.error("error: ", error)
        }
      
        onClose();
    };
    return (
        <div className="container-popup">
            <button className="close-button" onClick={onClose}>X</button>      
            <div className="container-info">
                <div className="popup-section">
                    <h4>Staff Id</h4>
                    <h4>Employee Name</h4>
                    <h4>Leave Type</h4>
                    <h4>Start Date</h4>
                    <h4>End Date</h4>
                    <h4>Status</h4>
                </div>
                <div className="popup-section">
                    <p>{leave.staffId}</p>
                    <p>{leave.employeeName}</p>
                    <p>{leave.leaveType}</p>
                    <p>{leave.startDate.split(" ")[0]}</p>
                    <p>{leave.endDate.split(" ")[0]}</p>
                    <p>{leave.status}</p>
                </div>
            </div>
            <div className="popup-form">
            <div className="popup-form-radio">
                <input
                    type="radio"
                    id="approved"
                    name="status"
                    value="Approved"
                    checked={selectedStatus === "Approved"}
                    onChange={() => setSelectedStatus("Approved")}
                />
                <label htmlFor="approved">Approved</label>
                <input
                    type="radio"
                    id="rejected"
                    name="status"
                    value="Rejected"
                    checked={selectedStatus === "Rejected"}
                    onChange={() => setSelectedStatus("Rejected")}
                />
                <label htmlFor="rejected">Rejected</label>
                <input
                    type="radio"
                    id="pending"
                    name="status"
                    value="Pending"
                    checked={selectedStatus === "Pending"}
                    onChange={() => setSelectedStatus("Pending")}
                />
                <label htmlFor="pending">Pending</label>
            </div>
                <button className="update-button" onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
}


export default UpdatePopUp;