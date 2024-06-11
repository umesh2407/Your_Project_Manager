"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const AddStudentByProject = ({ params }) => {

    const { id } = params;
    const apiUrl = process.env.API_URL;

    const [projectList, setProjectList] = useState([]);
    const [student_name, setStudentName] = useState('');
    const [roll_number, setRollNumber] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
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



        if (!student_name || !roll_number || !email) {
            Swal.fire({
                title: "Error",
                text: "Input required",
                icon: "error"
            });
            return;
        }

        try {
            const res = await fetch(`/api/student`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ student_name, roll_number, email, mobile_number, project: selectedProjectID }),
            });

            if (res.ok) {
                Swal.fire({
                    title: "Good Job",
                    text: "Student Registered",
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
                        <h1 className="fw-bolder">Add Student</h1>
                        <p className="lead fw-normal text-muted mb-0">Let&apos;s work together!</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} id="addCollege" >
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setStudentName(e.target.value)}
                                        className="form-control"
                                        id="student_name"
                                        value={student_name}
                                        type="text"
                                        placeholder="Enter Student Name..." />
                                    <label htmlFor="student_name">Student Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setRollNumber(e.target.value)}
                                        className="form-control"
                                        id="roll_number"
                                        value={roll_number}
                                        type="text"
                                        placeholder="Enter Roll Number..." />
                                    <label htmlFor="roll_number">Roll Number</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        type="text"
                                        placeholder="Enter Email..." />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        className="form-control"
                                        id="mobile_number"
                                        value={mobile_number}
                                        type="text"
                                        placeholder="Enter Mobile Number..." />
                                    <label htmlFor="mobile_number">Mobile Number</label>
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

export default AddStudentByProject