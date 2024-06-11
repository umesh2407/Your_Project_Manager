"use client";
import { Suspense } from 'react';
import Loading from "../loading"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';



const Notifications = () => {
    const apiUrl = process.env.API_URL;
    const [notifyList, setNotifyList] = useState([]);

    useEffect(() => {
        const getnotifications = async () => {
            try {
                const res = await fetch(`/api/notification`, {
                    cache: 'no-store',
                })
                if (!res.ok) {
                    throw new Error("Failed to fetch notifications")
                }
                const data = await res.json();
                setNotifyList(data.notifications);
            } catch (error) {
                console.log("Error Loading notifications", error);
            }
        }


        getnotifications();


    }, [])

    const timeAgo = (timestamp) => {
        const current = new Date();
        const previous = new Date(timestamp);
        const seconds = Math.floor((current - previous) / 1000);

        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return `${interval} years ago`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return `${interval} months ago`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return `${interval} days ago`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return `${interval} hours ago`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return `${interval} minutes ago`;
        }
        return `${Math.floor(seconds)} seconds ago`;
    };



    return (
        <div className="container px-5 my-auto" style={{ height: "90vh" }}>
            <div className="row px-5 py-2 d-flex justify-content-center">
                <div className="col-xl-8 d-flex justify-content-between align-items-center">
                    <h3 className="mt-4 py-2 fw-bolder">Announcement</h3>
                    <Link href={`/addNotification`} className="btn btn-primary rounded">Add Announcement</Link>
                </div>
            </div>
            <Suspense fallback={<Loading />}>


                <div className="row px-5 py-2 d-flex justify-content-center ">
                    <div className="col-xl-8 d-flex justify-content-center align-items-center">
                        {notifyList.length > 0 ? (<ul className="list-group">
                            {notifyList.map((noti) => (
                                <li className="list-group-item w-100" key={noti._id}>
                                    <div className="d-flex justify-content-between align-items-center" style={{ gap: "20px" }}>
                                        <p>{noti.notification_content}</p>
                                        <p className="text-right">{timeAgo(noti.timestamp)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>) : (<h4>No Announcement</h4>)}

                    </div>
                </div>
            </Suspense>
        </div>
    )
}

export default Notifications