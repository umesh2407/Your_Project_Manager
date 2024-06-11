// model.js

import mongoose, { Schema } from "mongoose";


// College Schema
const CollegeSchema = new mongoose.Schema({
    college_name: { type: String, required: true },
});

// Department Schema
const DepartmentSchema = new mongoose.Schema({
    department_name: { type: String, required: true },
    college: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
});

// ProjectCoordinator Schema
const ProjectCoordinatorSchema = new mongoose.Schema({
    coordinator_name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
});

// HeadOfDepartment Schema
const HeadOfDepartmentSchema = new mongoose.Schema({
    hod_name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
});

// ProjectGuide Schema
const ProjectGuideSchema = new mongoose.Schema({
    guide_name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
});

// Project Schema
const ProjectSchema = new mongoose.Schema({
    project_title: { type: String, required: true },
    project_intro: { type: String },
    domain: { type: String },
    guide: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectGuide', required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    currentStage: { type: Number, default: 0, min: 0, max: 6 },
});


// Student Schema
const StudentSchema = new mongoose.Schema({
    student_name: { type: String, required: true },
    roll_number: { type: String, required: true },
    email: { type: String, required: true },
    mobile_number: { type: String, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

// Task Schema
const TaskSchema = new mongoose.Schema({
    activity_name: { type: String, required: true },
    status: { type: String },
    timestamp: { type: Date, default: Date.now },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});


//Notification Schema
const NotificationSchema = new mongoose.Schema({
    notification_content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});



// Create models
const College = mongoose.models.College || mongoose.model('College', CollegeSchema);
const Department = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
const ProjectCoordinator = mongoose.models.ProjectCoordinator || mongoose.model('ProjectCoordinator', ProjectCoordinatorSchema);
const HeadOfDepartment = mongoose.models.HeadOfDepartment || mongoose.model('HeadOfDepartment', HeadOfDepartmentSchema);
const ProjectGuide = mongoose.models.ProjectGuide || mongoose.model('ProjectGuide', ProjectGuideSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);


// Export models
module.exports = {
    College,
    Department,
    ProjectCoordinator,
    HeadOfDepartment,
    ProjectGuide,
    Project,
    Student,
    Task,
    Notification,
};
