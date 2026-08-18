const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true,
        },
        company: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
        },
        location: {
            type: String,
            default: 'Remote',
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Job description is required'],
        },
        category: {
            type: String,
            trim: true,
            default: 'General',
        },
        jobType: {
            type: String,
            trim: true,
            default: 'Full-time',
        },
        salary: {
            type: String,
            trim: true,
            default: '',
        },
        tags: {
            type: [String],
            default: [],
        },
        companyLogo: {
            type: String,
            trim: true,
            default: '',
        },
        url: {
            type: String,
            trim: true,
        },
        source: {
            type: String,
            default: 'Remotive API',
            trim: true,
        },
        externalId: {
            type: String,
            unique: true,
            sparse: true,
        },
        postedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Job', jobSchema);
