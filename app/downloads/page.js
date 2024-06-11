"use client";
import React from 'react'
import styles from "../page.module.css"


const Downloads = () => {
    const handleDownload = () => {
        window.location.href = "https://www.iist.ac.in/sites/default/files/projectinternship/Internship%20Report%20Format.pdf"
        window.location.download = "Project_Report"
    }
    const handleDownloadT = () => {
        window.location.href = "https://www.slideshare.net/ramesh_x/presentation-on-project-report"
        window.location.download = "Project_PPT"
    }
    const handleDownloadI = () => {
        window.location.href = "./dfd.png"
        window.location.download = "Project_DFD"
    }
    return (
        <div className="container px-5 my-auto" style={{ height: "90vh" }}>
            <div className="row px-5 py-2 d-flex justify-content-center">
                <div className="col-xl-8 d-flex justify-content-left align-items-center">
                    <h3 className="mt-4 py-2 fw-bolder">Downloads</h3>
                </div>
            </div>
            <div className="row px-5 py-2 d-flex justify-content-center ">
                <div className="col-xl-8 g-3 d-flex justify-content-center align-items-center">
                    <div className={`${styles.formBox} me-3 shadow`}>
                        <div className={styles.form}>
                            <span className={styles.title}>Project Report</span>
                            <span className={styles.subtitle}>Sample Project Report</span>
                            <button onClick={handleDownload}>Download</button>
                        </div>
                    </div>
                    <div className={`${styles.formBox} me-3 shadow `}>
                        <div className={styles.form}>
                            <span className={styles.title}>Project PPT</span>
                            <span className={styles.subtitle}>Format document for PPT</span>
                            <button onClick={handleDownloadT}>Download</button>
                        </div>
                    </div>
                    <div className={`${styles.formBox} me-3 shadow`}>
                        <div className={styles.form}>
                            <span className={styles.title}>Project DFD</span>
                            <span className={styles.subtitle}>Format document for DFD</span>
                            <button onClick={handleDownloadI}>Download</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Downloads