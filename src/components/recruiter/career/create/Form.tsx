import axios from 'axios';
import React, { FormEvent, useState } from 'react'; // Import useState for form state
import { toast } from 'react-toastify';

export const Form = () => {
    const [formData, setFormData] = useState({}); // State for form data

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        console.log("handle submit")
        console.log(event)
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // Convert FormData to plain object
        const formDataObject: any = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // Add form validation logic here (optional)

        try {
            const recruiter: string | null = localStorage.getItem("token") || null;
            const response = await axios.post(`http://sellskill.online/career/create?recruiter=${recruiter}`, formDataObject)
            // Check if the signup was successful
            if (response.status === 200) {
                console.log(response.data);
                toast.success("Career created successfully");
            } else {
                toast.error('Career creation failed. Please try again later.');
            }

        } catch(error) {
            console.error("Internal server error:", error);
            toast.error("Internal server error. Please try again later.");
        }
    };

    return (
        <form className="w-full" onSubmit={(e) =>handleSubmit(e)}>
            <div className="flex w-full">
                <div className="w-3/4">
                    <p className="text-gray-600">Create and Manage Career openings in your company.</p>
                </div>
                <div className="w-1/4 flex gap-3 justify-end">
                    <button type="submit" className="bg-green-400 text-white hover:bg-green-500 hover:text-white font-sans py-1 px-8 rounded shadow-md">
                        save
                    </button>
                    <button className="bg-red-400 text-white hover:bg-red-500 hover:text-white font-sans py-1 px-8 rounded shadow-md">
                        cancel
                    </button>
                </div>
            </div>

            <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6'>

                <div> {/* section 1 */}
                    <h3 className='text-xl text-gray-800'>
                        Job Opening Information
                    </h3>
                    <div className="grid gap-6 mb-6 md:grid-cols-1 mt-4 p-4">
                        <div>
                            <label htmlFor="posting_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Posting Title</label>
                            <input type="text" id="posting_title" name="posting_title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Job Title" required />
                        </div>
                        <div>
                            <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
                            <input type="number" id="salary" name="salary" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Salary Range" required />
                        </div>
                        <div>
                            <label htmlFor="contact_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Name</label>
                            <input type="text" id="contact_name" name="contact_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contact Person Name" required />
                        </div>
                        <div>
                            <label htmlFor="job_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Type</label>
                            <input type="text" id="job_type" name="job_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full-time/Part-time/Contract" required />
                        </div>
                        <div>
                            <label htmlFor="opening_status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opening Status</label>
                            <input type="text" id="opening_status" name="opening_status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Open/Closed" required />
                        </div>
                        {/* Add more fields for industry, work_exp, date_opened, target_date, revenue per position, and no of positions */}
                        <div>
                            <label htmlFor="industry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Industry</label>
                            <input type="text" id="industry" name="industry" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Industry" required />
                        </div>
                        <div>
                            <label htmlFor="work_exp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Experience</label>
                            <input type="number" id="work_exp" name="work_exp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Work Experience Required" required />
                        </div>
                        <div>
                            <label htmlFor="date_opened" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Opened</label>
                            <input type="date" id="date_opened" name="date_opened" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="target_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Date</label>
                            <input type="date" id="target_date" name="target_date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="revenue_per_position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Revenue per Position</label>
                            <input type="number" id="revenue_per_position" name="revenue_per_person" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Revenue per Position" required />
                        </div>
                        <div>
                            <label htmlFor="no_of_positions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Positions</label>
                            <input type="number" id="no_of_positions" name="no_of_positions" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Number of Positions" required />
                        </div>
                    </div>
                </div>

                <div> {/* section 2 */}
                    <h3 className='text-xl text-gray-800'>
                        Descriptive Information
                    </h3>
                    <div className="grid gap-6 mb-6 md:grid-cols-1 mt-4 p-4">
                        <div>
                            <label htmlFor="required_skills" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Required Skills</label>
                            <textarea id="required_skills" name="required_skills" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Required Skills" required />
                        </div>
                        <div>
                            <label htmlFor="requirements" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Requirements</label>
                            <textarea id="requirements" name="requirements" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Requirements" required />
                        </div>
                        <div>
                            <label htmlFor="responsibilities" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Responsibilities</label>
                            <textarea id="responsibilities" name="responsibilities" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Responsibilities" required />
                        </div>
                        <div>
                            <label htmlFor="benefits" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Benefits</label>
                            <textarea id="benefits" name="benefits" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Benefits" required />
                        </div>
                    </div>
                </div>

            </div>
        </form>

    )
}
