"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

const AddProjectByDept = ({ params }) => {
    const { id } = params;
    const apiUrl = process.env.API_URL;
    const [project_title, setProjectTitle] = useState('');
    const [project_intro, setProjectIntro] = useState('');
    const [project_domain, setProjectDomain] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedGuide, setSelectedGuide] = useState('');
    const [deptID, setDeptID] = useState('');
    const [guideList, setGuideList] = useState([]);

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
                setDeptID(data.dept._id);
                setSelectedDept(data.dept.department_name);
            } catch (error) {
                console.log("Error Loading Departments", error);
            }
        }
        const getGuide = async (id) => {
            try {
                const res = await fetch(`/api/projectguide/${id}/detail`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Guides")
                }
                const data = await res.json();
                setGuideList(data.guide);
            } catch (error) {
                console.log("Error Loading Guides", error);
            }
        }


        getDept(id);
        getGuide(id);

    }, []);

    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Data sending");



        if (!project_title || !project_intro || !project_domain) {
            Swal.fire({
                title: "Error",
                text: "Input required",
                icon: "error"
            });
            return;
        }

        try {
            const res = await fetch(`/api/project`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ project_title, project_intro, domain: project_domain, guide: selectedGuide, department: deptID }),
            });

            if (res.ok) {
                Swal.fire({
                    title: "Good Job",
                    text: "Project Registered",
                    icon: "success"
                });
                router.refresh();
                router.back();
            } else {
                throw new Error("Failed to create a Project");
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
                        <h1 className="fw-bolder">Add Project</h1>
                        <p className="lead fw-normal text-muted mb-0">Let&apos;s work together!</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} id="addCollege" >
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setProjectTitle(e.target.value)}
                                        className="form-control"
                                        id="project_title"
                                        value={project_title}
                                        type="text"
                                        placeholder="Enter Project Title..." />
                                    <label htmlFor="project_title">Project Title</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setProjectIntro(e.target.value)}
                                        className="form-control"
                                        id="project_intro"
                                        value={project_intro}
                                        type="text"
                                        placeholder="Enter Project Introduction..." />
                                    <label htmlFor="project_intro">Git Hub Link </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setProjectDomain(e.target.value)}
                                        className="form-control"
                                        id="project_domain"
                                        value={project_domain}
                                        type="text"
                                        placeholder="Enter Project Domain..." />
                                    <label htmlFor="project_domain">Project Domain</label>
                                </div>
                                <div className="form-floating mb-3">

                                    <select className="form-select py-0" aria-label="Default select example" id="dept"
                                        value={selectedGuide}
                                        onChange={(e) => setSelectedGuide(e.target.value)}>
                                        <option defaultValue={"Select a Guide"}>Select a Guide</option>
                                        {guideList.map((gd) => (
                                            <option key={gd._id} value={gd._id}>
                                                {gd.guide_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-floating mb-3">
                                    <select className="form-select py-0" aria-label="Default select example" id="dept"
                                        value={selectedDept}
                                        onChange={(e) => setSelectedDept(e.target.value)}>
                                        <option defaultValue={deptID}>{selectedDept}</option>
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

export default AddProjectByDept