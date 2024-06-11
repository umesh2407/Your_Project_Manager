"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'



const UpdateTask = ({ params }) => {

    const { id } = params;
    const apiUrl = process.env.API_URL;


    const [newActivity, setNewActivity] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newTime, setNewTime] = useState('');


    useEffect(() => {
        const getTaskById = async (id) => {
            try {
                const res = await fetch(`/api/task/${id}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch topic");
                }

                const data = await res.json();
                setNewActivity(data.tasks.activity_name);
                setNewStatus(data.tasks.status);
            } catch (error) {
                console.log(error);
            }
        };

        getTaskById(id);
    }, [])



    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newActivity || !newStatus) {
            Swal.fire({
                title: "Error",
                text: "Input required",
                icon: "error"
            });
            return;
        }

        const currentTime = new Date().toISOString();
        setNewTime(currentTime)
        try {
            const res = await fetch(`/api/task/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newActivity, newStatus, timestamp: newTime }),
            });

            if (!res.ok) {
                throw new Error("Failed to update task");
            }
            Swal.fire({
                title: "Good Job",
                text: "Task Updated",
                icon: "success"
            });
            router.refresh();
            router.back();
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
                        <h1 className="fw-bolder">Update Project Status</h1>
                        <p className="lead fw-normal text-muted mb-0">Let&apos;s work together!</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} id="addCollege" >
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setNewActivity(e.target.value)}
                                        className="form-control"
                                        id="activity_name"
                                        value={newActivity}
                                        type="text"
                                        placeholder="Enter Activity Title..." />
                                    <label htmlFor="activity_name">Acticity Title</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="form-control"
                                        id="status"
                                        value={newStatus}
                                        type="text"
                                        placeholder="Enter Project Status..." />
                                    <label htmlFor="status">Project Status</label>
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

export default UpdateTask