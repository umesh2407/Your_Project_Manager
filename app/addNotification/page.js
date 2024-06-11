"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'

function AddNotification() {
    const apiUrl = process.env.API_URL;
    const [notification_content, setNotificationContent] = useState("");

    const router = useRouter();
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Data sending");
        if (!notification_content) {
            Swal.fire({
                title: "Error",
                text: "Input required",
                icon: "error"
            });
            return;
        }

        try {
            const res = await fetch(`/api/notification`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ notification_content }),
            });

            if (res.ok) {
                Swal.fire({
                    title: "Good Job",
                    text: "Notification Registered",
                    icon: "success"
                });
                router.refresh();
                router.back();
            } else {
                throw new Error("Failed to create a notification");
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
                        <h1 className="fw-bolder">Add Announcement</h1>
                        <p className="lead fw-normal text-muted mb-0">Let&apos;s work together!</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <form onSubmit={handleSubmit} id="addCollege" >
                                <div className="form-floating mb-3">
                                    <input
                                        onChange={(e) => setNotificationContent(e.target.value)}
                                        className="form-control"
                                        id="notification_content"
                                        value={notification_content}
                                        type="text"
                                        placeholder="Enter Notification..." />
                                    <label htmlFor="notification_content">Notification</label>
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

export default AddNotification