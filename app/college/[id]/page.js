"use client";
import React, { useState, useEffect } from 'react'
import { Suspense } from 'react';
import Loading from "../../loading"
import Link from 'next/link';
import Image from "next/image"
import Univ from "../../../public/university1.png"

const ShowDepartments = ({ params }) => {
    const [department, setdepartment] = useState([]);
    const { id } = params;
    const apiUrl = process.env.API_URL;

    useEffect(() => {
        const getDept = async (id) => {
            try {
                const res = await fetch(`/api/department/${id}/detail`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch Departments")
                }
                const data = await res.json();
                setdepartment(data.dept);

            } catch (error) {
                console.log("Error Loading Departments", error);
            }
        }

        getDept(id);
    }, []);


    return (
        <div className="container px-5">
            <h1 className="mt-4 text-center py-3 fw-bolder">Select Department</h1>
            <Suspense fallback={<Loading />}>

                {department.length > 0 ? (<div className="row gx-5 justify-content-center py-5">
                    {department.map((dep) => (
                        <div className="col-lg-6 col-xl-4" key={dep._id}>
                            <Link href={`/department/${dep._id}`} style={{ textDecoration: "none" }}>
                                <div className="card mb-5 mb-xl-0 shadow">
                                    <div className="card-body p-5 d-flex justify-content-between align-items-center">

                                        <div className="mb-3">
                                            <span className="display-4 fw-bold">{dep.department_name}</span>
                                        </div>
                                        <div className="img-fluid mb-3">
                                            <Image src={Univ} alt="..." className="img-fluid" width={90} quality={100} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>) : (<h4 className="text-center">No Department available</h4>)}

            </Suspense>
            <div className="row d-flex justify-content-center align-items-center py-5">
                <h3 className="text-center py-3 fw-bold">OR</h3>
                <div className="col-lg-6 col-xl-6 text-center">
                    <Link href={`/addDepartment/${id}`} className="btn btn-primary">Add New Department</Link>
                </div>
            </div>


        </div>
    )
}

export default ShowDepartments