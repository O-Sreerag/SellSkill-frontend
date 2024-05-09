import axios from 'axios';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import MultiTextBox from './MultiTextBox';
import { api } from '../../../../services/axios';

export const Form = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});

    const [TextBoxclick, setTextBoxclick] = useState<number>(0)

    const [jobDescription, setJobDescription] = useState<string[]>([]);
    const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
    const [responsibilities, setResponsibilities] = useState<string[]>([]);
    const [benefits, setBenefits] = useState<string[]>([]);

    const handleJobDescriptionUpdate = (data: string[]) => {
        setJobDescription(data);
    };

    const handleRequiredSkillsUpdate = (data: string[]) => {
        setRequiredSkills(data);
    };

    const handleResponsibilitiesUpdate = (data: string[]) => {
        setResponsibilities(data);
    };

    const handleBenefitsUpdate = (data: string[]) => {
        setBenefits(data);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        console.log("handle submit")
        console.log(event)
        event.preventDefault();
        console.log(jobDescription, requiredSkills, responsibilities, benefits)

        const formData = new FormData(event.currentTarget);

        // Convert FormData to plain object
        const formDataObject: any = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        // Include data from MultiTextBox components in formDataObject
        formDataObject['job_description'] = JSON.stringify(jobDescription);
        formDataObject['required_skills'] = JSON.stringify(requiredSkills);
        formDataObject['responsibilities'] = JSON.stringify(responsibilities);
        formDataObject['benefits'] = JSON.stringify(benefits);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // validation logic

        try {
            const response = await api.post('/career/create', formDataObject);
            // Check if the signup was successful
            if (response.status === 200) {
                console.log(response.data);
                toast.success("Career created successfully");
            } else {
                toast.error('Career creation failed. Please try again later.');
            }

        } catch (error) {
            console.error("Internal server error:", error);
            toast.error("Internal server error. Please try again later.");
        }
    };

    const { pathname } = useLocation();
    const handleCancel = () => {
        const destination = '/recruiter/career';

        if (pathname !== destination) {
            navigate(destination);
        }
    };

    return (
        <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex w-full">
                <div className="w-3/4">
                    <p className="text-gray-600">Create and Manage Career openings in your company.</p>
                </div>
                <div className="w-1/4 flex gap-3 justify-end">
                    <button type="submit" className="bg-blue-50 border-blue-500 border hover:bg-blue-100 text-blue-500 text-sm font-semibold font-sans py-1 px-8 rounded shadow-md">
                        save
                    </button>
                    <button className="bg-red-50 hover:bg-red-100 border-red-500 border text-red-500 text-sm font-semibold font-sans py-1 px-8 rounded shadow-md" onClick={handleCancel}>
                        cancel
                    </button>
                </div>
            </div>

            <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6'>

                <div>
                    <h3 className='text-xl text-gray-800'>
                        Job Opening Information
                    </h3>
                    <div className="grid gap-6 mb-6 md:grid-cols-1 mt-4 p-4">
                        <div>
                            <label htmlFor="posting_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Posting Title</label>
                            <input type="text" id="posting_title" name="posting_title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Job Title" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                        <div>
                            <label htmlFor="industry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Industry</label>
                            <input type="text" id="industry" name="industry" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Industry" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                        <div>
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                            <input type="text" id="location" name="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Location" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                        <div>
                            <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                            <div className='flex justify-between gap-2'>
                                <input type="number" id="salary_min" name="salary_min" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500" placeholder="Minimum Salary" required onFocus={() => setTextBoxclick(() => 0)} />
                                <input type="number" id="salary_max" name="salary_max" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500" placeholder="Maximum Salary" required onFocus={() => setTextBoxclick(() => 0)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="workExp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Experience</label>
                            <div className='flex justify-between gap-2'>
                                <input type="number" id="workExp_min" name="workExp_min" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500" placeholder="Minimum Work Experience" required onFocus={() => setTextBoxclick(() => 0)} />
                                <input type="number" id="workExp_max" name="workExp_max" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500" placeholder="Maximum Work Experience" required onFocus={() => setTextBoxclick(() => 0)} />
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="job_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Type</label>
                                <select id="job_type" name="job_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500" required onFocus={() => setTextBoxclick(() => 0)}>
                                    <option value="fulltime">Full-time</option>
                                    <option value="parttime">Part-time</option>
                                    <option value="contract">Contract</option>
                                </select>
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="opening_status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opening Status</label>
                                <select id="opening_status" name="opening_status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500" required onFocus={() => setTextBoxclick(() => 0)}>
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                    <option value="inHold">In Hold</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="date_opened" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Opened</label>
                                <input type="date" id="date_opened" name="date_opened" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="target_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Date</label>
                                <input type="date" id="target_date" name="target_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="contact_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Name</label>
                            <input type="text" id="contact_name" name="contact_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Contact Person Name" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                        <div>
                            <label htmlFor="no_of_positions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Positions</label>
                            <input type="number" id="no_of_positions" name="no_of_positions" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Number of Positions" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                    </div>
                </div>

                <div> {/* section 2 */}
                    <h3 className='text-xl text-gray-800'>
                        Descriptive Information
                    </h3>
                    <div className="grid gap-6 mb-6 md:grid-cols-1 mt-4 p-4">
                        <div>
                            <label htmlFor="job_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Description</label>
                            <div onClick={() => setTextBoxclick(() => 1)}>
                                <MultiTextBox customClassName={`${TextBoxclick == 1 ? 'border-2 border-blue-500' : ''}`} placeholder='job description' onDataUpdate={handleJobDescriptionUpdate} />
                            </div>
                        </div>
                        <div>
                            <div onClick={() => setTextBoxclick(() => 2)}>
                                <label htmlFor="required_skills" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Required Skills</label>
                                <MultiTextBox customClassName={`${TextBoxclick == 2 ? 'border-2 border-blue-500' : ''}`} placeholder="Required Skills" onDataUpdate={handleRequiredSkillsUpdate} />
                            </div>
                        </div>
                        <div>
                            <div onClick={() => setTextBoxclick(() => 3)}>
                                <label htmlFor="responsibilities" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Responsibilities</label>
                                <MultiTextBox customClassName={`${TextBoxclick == 3 ? 'border-2 border-blue-500' : ''}`} placeholder='responsibilities' onDataUpdate={handleResponsibilitiesUpdate} />
                            </div>
                        </div>
                        <div>
                            <div onClick={() => setTextBoxclick(() => 4)}>
                                <label htmlFor="benefits" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Benefits</label>
                                <MultiTextBox customClassName={`${TextBoxclick == 4 ? 'border-2 border-blue-500' : ''}`} placeholder='benefits' onDataUpdate={handleBenefitsUpdate} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    )
}
