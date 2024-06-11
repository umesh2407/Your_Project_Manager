"use client";
import { useState } from "react";
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

function AddCollege() {
    const apiUrl = process.env.API_URL;
    const [college_name, setCollegeName] = useState("");

    const router = useRouter();
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Data sending");
        if (!college_name) {
            Swal.fire({
                title: "Error",
                text: "Input required",
                icon: "error"
            });
            return;
        }

        try {
            const res = await fetch(`/api/colleges`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ college_name }),
            });

            if (res.ok) {
                Swal.fire({
                    title: "Good Job",
                    text: "College Registered",
                    icon: "success"
                });
                router.refresh();
                router.push("/");
            } else {
                throw new Error("Failed to create a college");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="d-flex flex-column" style={{ height: "83vh" }}><section className="py-5">
            <div className="container px-5">

                <div className="bg-light rounded-4 py-5 px-4 px-md-5 shadow">
                    <div className="text-center mb-5">
                        <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                        <h1 className="fw-bolder">Add Your College</h1>
                        <p className="lead fw-normal text-muted mb-0">Let&apos;s work together!</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} id="addCollege" >
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setCollegeName(e.target.value)}
                                        className="form-control"
                                        id="college_name"
                                        value={college_name}
                                        type="text"
                                        placeholder="Enter College name..." />
                                    <label htmlFor="college_name">College name</label>
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

export default AddCollege