"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const AddTaskByProject = ({ params }) => {
    const { id } = params;
    const apiUrl = process.env.API_URL;

    const [projectList, setProjectList] = useState([]);
    const [activity_name, setActivityName] = useState('');
    const [status, setStatus] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedProjectID, setSelectedProjectID] = useState('');


    useEffect(() => {
        const getProject = async () => {
            try {
                const res = await fetch(`/api/project/${id}`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Projects")
                }
                const data = await res.json();
                setProjectList(data.projects);
                setSelectedProject(data.projects.project_title);
                setSelectedProjectID(data.projects._id);
            } catch (error) {
                console.log("Error Loading Projects", error);
            }
        }

        getProject();

    }, []);


    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Data sending");



        if (!activity_name || !status) {
            Swal.fire({
                title: "Error",
                text: "Input required",
                icon: "error"
            });
            return;
        }

        try {
            const res = await fetch(`/api/task`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ activity_name, status, project: selectedProjectID }),
            });

            if (res.ok) {
                Swal.fire({
                    title: "Good Job",
                    text: "Task Registered",
                    icon: "success"
                });
                router.refresh();
                router.back();
            } else {
                throw new Error("Failed to create a Task");
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
                        <h1 className="fw-bolder">Add Projectwork</h1>
                        <p className="lead fw-normal text-muted mb-0">Let&apos;s work together!</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} id="addCollege" >
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setActivityName(e.target.value)}
                                        className="form-control"
                                        id="activity_name"
                                        value={activity_name}
                                        type="text"
                                        placeholder="Enter Activity Title..." />
                                    <label htmlFor="activity_name">Acticity Title</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="form-control"
                                        id="status"
                                        value={status}
                                        type="text"
                                        placeholder="Enter Project Status..." />
                                    <label htmlFor="status">Project Status</label>
                                </div>


                                <div className="form-floating mb-3">

                                    <select className="form-select py-0" aria-label="Default select example" id="dept"
                                        value={selectedProject}
                                        onChange={(e) => setSelectedProjectID(e.target.value)}>
                                        <option defaultValue={selectedProjectID}>{selectedProject}</option>
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

export default AddTaskByProject