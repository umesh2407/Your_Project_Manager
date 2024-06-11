"use client";
import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Loading from "../../loading"


const Department = ({ params }) => {
    const { id } = params;
    const apiUrl = process.env.API_URL;
    const [projectList, setProjectList] = useState([]);
    const [guideList, setGuideList] = useState([]);
    const [coord, setCoord] = useState('');
    const [hodName, setHodName] = useState('');
    const [dept, setDeptName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [clg, setClgName] = useState('');


    useEffect(() => {
        const getDept = async (id) => {
            try {
                const res = await fetch(`/api/department/${id}`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setDeptName(data.dept.department_name);
                setDeptId(data.dept._id);
                setClgName(data.dept.college.college_name);
            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }
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

        const getProjects = async (id) => {
            try {
                const res = await fetch(`/api/project/${id}/detail`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setProjectList(data.projects);

            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }

        const getGuides = async (id) => {
            try {
                const res = await fetch(`/api/projectguide`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Collegs")
                }
                const data = await res.json();
                setGuideList(data.guides);

            } catch (error) {
                console.log("Error Loading Collegs", error);
            }
        }

        getProjects(id);
        getCord(id);
        getHod(id);
        getDept(id);
        getGuides(id);


    }, []);

    return (
        <div className="container-fluid px-5">
            <h1 className="mt-4">{dept}</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">{clg}</li>
                <li className="breadcrumb-item active">{dept}</li>
            </ol>
            <div className="row px-5">
                <div className="col-xl-4">
                    <div className="card mb-4">
                        <div className="card-header bg-dark text-white">
                            <i className="fas fa-chart-area me-1"></i>
                            Project Coordinator
                        </div>

                        {coord ? <div className="card-body"> {coord}</div> : <div className="card-body"> <Link href={`/addProjectCord/${deptId}`} className="btn btn-primary btn-sm">Add New Coordinator</Link></div>}
                    </div>
                </div>
                <div className="col-xl-4">
                    <div className="card mb-4">
                        <div className="card-header bg-dark text-white">
                            <i className="fas fa-chart-area me-1"></i>
                            Head of Department
                        </div>
                        {hodName ? <div className="card-body"> {hodName}</div> : <div className="card-body"> <Link href={`/addHod/${deptId}`} className="btn btn-primary btn-sm">Add New Hod</Link></div>}
                    </div>
                </div>
            </div>

            <div className="row px-5 py-5 d-flex justify-content-center">
                <div className="col-xl-8 d-flex justify-content-between align-items-center">
                    <h3 className="mt-4 py-2 fw-bolder">Project list</h3>
                    <Link href={`/addProject/${deptId}`} className="btn btn-primary rounded">Add Project</Link>
                </div>
                <Suspense fallback={<Loading />}>
                    {projectList.length > 0 ? (<div className="col-xl-8">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Project Title</th>
                                    <th scope="col">Domain</th>
                                    <th scope="col">Guide</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectList.map((proj, index) => (
                                    <tr key={proj._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{proj.project_title}</td>
                                        <td>{proj.domain}</td>
                                        <td>{proj.guide.guide_name}</td>
                                        <td><Link href={`/project/${proj._id}`} className="btn btn-outline-primary btn-sm">View</Link></td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>) : (<h4 className="text-center">No Projects to display</h4>)}

                </Suspense>
            </div>

            <div className="row px-5 py-5 d-flex justify-content-center">
                <div className="col-xl-8 d-flex justify-content-between align-items-center">
                    <h3 className="mt-4 py-2 fw-bolder">Guide list</h3>
                    <Link href={`/addProjectGuide/${deptId}`} className="btn btn-primary rounded">Add Guide</Link>
                </div>
                <Suspense fallback={<Loading />}>
                    {guideList.length > 0 ? (<div className="col-xl-8">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Guide Name</th>

                                </tr>
                            </thead>
                            <tbody>
                                {guideList.map((gd, index) => (
                                    <tr key={gd._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{gd.guide_name}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>) : (<h4 className="text-center">No Guides to display</h4>)}

                </Suspense>
            </div>

        </div>
    )
}

export default Department