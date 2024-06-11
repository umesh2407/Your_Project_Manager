"use client";
import { Suspense } from 'react';
import Loading from "../../loading"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { ProgressB } from "@/components/ProgressB";

const ProjectDetails = ({ params }) => {
    const { id } = params;
    const apiUrl = process.env.API_URL;
    const [projectObj, setProjectObj] = useState('');
    const [guideName, setGuideName] = useState('');
    const [deptName, setdeptName] = useState('');
    const [coord, setCoord] = useState('');
    const [hodName, setHodName] = useState('');
    const [clg, setClgName] = useState('');
    const [showTracker, setShowTracker] = useState(false);
    const [currentStep, setcurrentStep] = useState(4);
    const [studentList, setStudentList] = useState([]);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const getCord = async (id) => {
            try {
                const res = await fetch(`/api/projectcoordinator/${id}`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setCoord(data.cord.coordinator_name);
            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }

        const getHod = async (id) => {
            try {
                const res = await fetch(`/api/hod/${id}`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setHodName(data.hod.hod_name);
            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }

        const getDept = async (id) => {
            try {
                const res = await fetch(`/api/department/${id}`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setClgName(data.dept.college.college_name);
            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }

        const getProject = async (id) => {
            try {
                const res = await fetch(`/api/project/${id}`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setProjectObj(data.projects);
                setcurrentStep(data.projects.currentStage);
                setGuideName(data.projects.guide.guide_name)
                setdeptName(data.projects.department.department_name)

                const deptId = data.projects.department._id;
                getCord(deptId);
                getHod(deptId);
                getDept(deptId);



            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }
        const getStudents = async (id) => {
            try {
                const res = await fetch(`/api/student/${id}/detail`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setStudentList(data.students);
            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }

        const getTasks = async (id) => {
            try {
                const res = await fetch(`/api/task/${id}/detail`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setTaskList(data.tasks);
            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }


        getProject(id);
        getStudents(id);
        getTasks(id);

    }, []);

    const router = useRouter();

    const handleSubmit = async (e) => {
        setShowTracker(false);
        const updateStep = currentStep + 1;

        setcurrentStep(updateStep);

        if (updateStep >= 6) {
            alert("Project already Submitted");
            return;
        }

        try {
            const res = await fetch(`/api/project/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ updateStep }),
            });

            if (!res.ok) {
                throw new Error("Failed to update task");
            }

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container-fluid px-5">
            <h1 className="mt-4">{projectObj.project_title}</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">{clg}</li>
                <li className="breadcrumb-item">{deptName}</li>
                <li className="breadcrumb-item active">{projectObj.project_title}</li>
            </ol>
            <div className="row px-5">
                <div className="col-xl-4">
                    <div className="card mb-4">
                        <div className="card-header bg-dark text-white">
                            <i className="fas fa-chart-area me-1"></i>
                            Project Coordinator
                        </div>
                        <div className="card-body"> {coord}</div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card mb-4">
                        <div className="card-header bg-dark text-white">
                            <i className="fas fa-chart-area me-1"></i>
                            Head of Department
                        </div>
                        <div className="card-body"> {hodName}</div>
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card mb-4">
                        <div className="card-header bg-dark text-white">
                            <i className="fas fa-chart-area me-1"></i>
                            Project Guide
                        </div>
                        <div className="card-body"> {guideName}</div>
                    </div>
                </div>
            </div>
            <div className="row px-5 py-5 d-flex justify-content-center">
                <div className="col-xl-8 d-flex justify-content-between align-items-center">
                    <h3 className="mt-4 py-2 fw-bolder">Project Details</h3>

                </div>
                <div className="col-xl-8">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-area me-1"></i>
                            {projectObj.project_title}<span className="badge rounded-pill text-bg-primary ms-2">{projectObj.domain}</span>
                        </div>
                        <div className="card-body">{projectObj.project_intro}</div>
                    </div>
                </div>

            </div>

            <div className="row px-5 py-5 d-flex justify-content-center">
                <div className="col-xl-8 d-flex justify-content-between align-items-center">
                    <h3 className="mt-4 py-2 fw-bolder">Group Members</h3>
                    <Link href={`/addStudent/${projectObj._id}`} className="btn btn-primary rounded">Add Group Member</Link>
                </div>
                <div className="col-xl-8 my-auto">
                    {studentList.length > 0 ? (<table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Roll No</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((student, index) => (
                                <tr key={student._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{student.student_name}</td>
                                    <td>{student.roll_number}</td>
                                    <td>{student.email}</td>
                                    <td>{student.mobile_number}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>) : (<h4 className="text-center">No Students addded</h4>)}

                </div>
            </div>

            <div className="row px-5 py-5 d-flex justify-content-center">
                <div className="col-xl-8 d-flex justify-content-between align-items-center">
                    <h3 className="mt-4 py-2 fw-bolder">Project Work / Activity</h3>
                    <Link href={`/addTask/${projectObj._id}`} className="btn btn-primary rounded">Add Task</Link>
                </div>
                <Suspense fallback={<Loading />}>
                    <div className="col-xl-8">
                        {taskList.length > 0 ? (<table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Activity Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Timeline</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {taskList.map((task, index) => (
                                    <tr key={task._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{task.activity_name}</td>
                                        <td>{task.status}</td>
                                        <td>{new Date(task.timestamp).toLocaleDateString('en-GB')}</td>
                                        <td><Link href={`/updateTask/${task._id}`} className="btn btn-outline-primary btn-sm">Update</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>) : (<h4 className="text-center">No tasks yet.</h4>)}
                    </div>
                </Suspense>
            </div>
            <div className="row px-5 py-5 d-flex justify-content-center">
                <div className="col-xl-8 d-flex justify-content-between align-items-center">
                    <h3 className="mt-4 py-2 fw-bolder">Track Project Status</h3>
                    <button onClick={handleSubmit} className="btn btn-primary rounded">Update</button>
                </div>
                <div className="col-xl-8">
                    {showTracker ? (<Suspense fallback={<Loading />}>
                        <ProgressB currentStep={currentStep} />
                    </Suspense>) : (<button onClick={(e) => {
                        setShowTracker(true);
                    }} className="btn btn-primary rounded">Track</button>)}

                </div>

            </div>

        </div>
    )
}

export default ProjectDetails