import React, { useState } from "react";
import Header from "./Header";
import { CiUser } from "react-icons/ci";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { MdOutlineMergeType } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { BsCalendarDate } from "react-icons/bs";
import { GrStatusUnknown } from "react-icons/gr";
import axios from "axios";

function CreateLeave() {

    const [employeeName, setEmployeeName] = useState("");
    const [staffId, setStaffId] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const newLeave = {
            employeeName,
            staffId,
            leaveType,
            startDate,
            endDate,
            status
        }

        axios.post("https://leave-management-backend-production.up.railway.app/leave/create", newLeave).then((response) => {
            setResponseMessage("New Leave Data Is Created Successfully!");
        }).catch((err) => {
            if(err.response) {
                console.log("Response error:", err.response);
            } else if(err.request) {
                console.log("Request error:", err.request);
            } else {
                console.log("Error:", err.message)
            }
            setResponseMessage("Error Creating Leave Data");
            alert(responseMessage)
        });
    };
    return(
        <>
            <Header />
            <div class="container-create-leave">
                <div class="create-leave-box">
                    <h1>Create New Leave</h1>
                    <form onSubmit={handleSubmit}>
                        <div class="input-container">
                            <CiUser class="input-icon"/>
                            <input type="text" placeholder="Employee Name" name="employeeName" onChange={(e) => setEmployeeName(e.target.value)}required/>
                        </div>
                        <div class="input-container">
                            <MdOutlineFormatListNumbered class="input-icon"/>
                            <input type="text" placeholder="Staff ID" name="staffId" onChange={(e) => setStaffId(e.target.value)} required/>
                        </div>
                        <div class="input-container">
                            <MdOutlineMergeType class="input-icon"/>
                            <input type="text" placeholder="Leave Type" name="leaveType" onChange={(e) => setLeaveType(e.target.value)}required/>
                        </div>
                        <div class="input-container">
                            <CiCalendarDate class="input-icon"/>
                            <input type="text" placeholder="Start Date" name="startDate" onChange={(e) => setStartDate(e.target.value)}required/>
                        </div>
                        <div class="input-container">
                            <BsCalendarDate class="input-icon"/>
                            <input type="text" placeholder="End Date" name="endDate" onChange={(e) => setEndDate(e.target.value)}required/>
                        </div>
                        <div class="input-container">
                            <GrStatusUnknown class="input-icon"/>
                            <input type="text" placeholder="Status" name="status" onChange={(e) => setStatus(e.target.value)}required/>
                        </div>
                        <button type="submit">CREATE</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateLeave;
