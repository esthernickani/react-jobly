import { React, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import JoblyApi from "./api";

const JobCard = ({title='companyJobs', id }) => {
    const [ job, setJob ] = useState(null);

    const { currentUser, applyJob } = useContext(UserContext)

    //get job from the db
    useEffect(() => {
        async function getJob(id) {
            let job = await JoblyApi.getJob(id)
            setJob(job.job)
        }
        getJob(id)
    }, [])

    const applyToJob = () => {
        console.log(currentUser)
        applyJob(currentUser.username, id)
    }

    return (
            <> {title ? <div>
                            <h2>{job.title}</h2>
                            <p>{job.company.name}</p>
                            <p>Salary: {job.salary}</p>
                            <p>Equity: {job.equity}</p>
                            {currentUser.applications.includes(job.id) ?
                            <button disabled>Applied</button>:
                            <button onClick={applyToJob}>Apply</button>}
                        </div>
                :
                        <div>
                            <h2>{job.title}</h2>
                            <p>Salary: {job.salary}</p>
                            <p>Equity: {job.equity}</p>
                            {currentUser.applications.includes(job.id) ?
                            <button disabled>Applied</button>:
                            <button onClick={applyToJob}>Apply</button>}
                        </div>
            }
            </>
    )
}

export default JobCard;