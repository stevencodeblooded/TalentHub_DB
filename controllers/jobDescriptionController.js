const JobDescription = require('../model/jobDescription')

//create job description
const jds = async (req, res) => {
    const { title, company_info, job_description, requirements, benefits, location, salary } = req.body

    let jd
    try {
        jd = new JobDescription({ title, company_info,  job_description,  requirements,  benefits,  location,  salary })
        await jd.save()
        res.status(201).json({ message: 'Job details submitted successfully', job: jd })
    } catch (error) {
        res.status(401).json({message: 'Failed to submit job description'})
    } 
}

const getAlljobs = async (req, res) => {
    let jobs
    try {
        jobs = await JobDescription.find({})
        if (jobs !== null) {
            res.status(200).json({ message: 'Successfully retrieved all jobs', data: jobs})
        } else {
            res.status(200).json({ message: 'Sorry there are no jobs at the moment'})
        }
    } catch (error) {
        res.status(401).json({ message: 'Something went wrong, Try again later!'})
    }
} 

//retrieve job description
const jobDesc = async (req, res) => {
    const { id } = req.params

    let job
    try {
        job = await JobDescription.findById(id)
        res.status(200).json({ data: job, message: 'Successfully retrieved' })
    } catch (error) {
        return res.status(401).json({ message: 'Something went wrong, Try again later!' })
    }

    if (!job) {
        return res.status(404).json({ message: 'Sorry the job does not exist.'})
    }
}


module.exports = { jds, jobDesc, getAlljobs }