"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

import React from 'react'

const AddCordByDept = ({ params }) => {
    const { id } = params;
    const apiUrl = process.env.API_URL;
    const [deptList, setDeptList] = useState('');
    const [coordinator_name, setProjectCordName] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedCollegeId, setSelectedCollegeId] = useState('');
    const [selectedCollegeName, setSelectedCollegeName] = useState('');

    useEffect(() => {
        const getDept = async (id) => {
            try {
                const res = await fetch(`/api/department/${id}`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Department")
                }
                const data = await res.json();
                setDeptList(data.dept);
                setSelectedCollegeId(data.dept._id);
                setSelectedCollegeName(data.dept.department_name);
            } catch (error) {
                console.log("Error Loading Departments", error);
            }
        }

        getDept(id);
    }, []);


    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Data sending");



        if (!coordinator_name || !setDeptList) {
            Swal.fire({
                title: "Error",
                text: "Input required",
                icon: "error"
            });
            return;
        }

        try {
            const res = await fetch(`/api/projectcoordinator`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ coordinator_name, department: selectedCollegeId }),
            });

            if (res.ok) {
                Swal.fire({
                    title: "Good Job",
                    text: "Project Co-ordinator Registered",
                    icon: "success"
                });
                router.refresh();
                router.back();
            } else {
                throw new Error("Failed to create a college");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="d-flex flex-column"><section className="py-5">
            <div className="container px-5">

                <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                    <div className="text-center mb-5">
                        <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                        <h1 className="fw-bolder">Add Project Coordinator </h1>
                        <p className="lead fw-normal text-muted mb-0">Let&apos;s work together!</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} id="addCollege" >
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setProjectCordName(e.target.value)}
                                        className="form-control"
                                        id="coordinator_name"
                                        value={coordinator_name}
                                        type="text"
                                        placeholder="Enter Coordinator name..." />
                                    <label htmlFor="coordinator_name">Coordinator name</label>
                                </div>
                                <div className="form-floating mb-3">

                                    <select className="form-select py-0" aria-label="Default select example" id="dept"
                                        value={selectedCollegeId}
                                        onChange={(e) => setSelectedDept(e.target.value)}>
                                        <option defaultValue={selectedCollegeId}>{selectedCollegeName}</option>

                                    </select>
                                </div>
                                <div className="d-grid"><button className="btn btn-primary btn-lg" id="submitButton" type="submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default AddCordByDept