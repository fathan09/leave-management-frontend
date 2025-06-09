import axios from "axios";

function DeletePopUp({leave, onClose, onDeleteUpdate}) {


    const handleDelete = async () => {
        try {
            await axios.delete(`https://leave-management-backend-production.up.railway.app/leave/delete/${leave.leaveId}`);
            console.log("Request is deleted")
        } catch(error) {
            console.error("error: ", error)
        }
        onDeleteUpdate(leave);
        onClose();
    };
    return (
        <div className="container-delete-popup">
            <p>Are you sure want to delete a request from {leave.employeeName} ? </p>
            <div className="delete-buttons">
                <button className="update-button" onClick={onClose}>No</button>
                <button className="update-button" onClick={handleDelete}>Yes</button>
            </div>
        </div>
    );
}

export default DeletePopUp;