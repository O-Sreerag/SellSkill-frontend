import axios from 'axios';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

import MultiTextBox from './MultiTextBox';
import { api } from '../../../../services/axios';

export const Form = () => {
    const navigate = useNavigate()
    const { search } = useLocation();
    const careerId = new URLSearchParams(search).get('careerId');

    const [formData, setFormData] = useState({});
    const [TextBoxclick, setTextBoxclick] = useState<number>(0)
    const [skillSet, setSkillSet] = useState<string[]>([]);
    const [qualifications, setQualifications] = useState<string[]>([]);
    const [selectedResume, setSelectedResume] = useState<File | null>(null);

    const handleSkillSetUpdate = (data: string[]) => {
        setSkillSet(data);
    };

    const handleQualificationsUpdate = (data: string[]) => {
        setQualifications(data);
    };

    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first file selected
        if (file) {
            setSelectedResume(file);
            // setFormData({
            //     ...formData,
            //     resume: file,
            // });
        }
    };

    const handleClearResume = () => {
        setSelectedResume(null);
        // setFormData({
        //     ...formData,
        //     resume: undefined,
        // });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        console.log("handle submit")
        console.log(event)
        event.preventDefault();
        console.log(skillSet, qualifications)

        const formData = new FormData(event.currentTarget);

        // Convert FormData to plain object
        const formDataObject: any = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        
        // Include data from MultiTextBox components in formDataObject
        formDataObject['skill_set'] = JSON.stringify(skillSet);
        formDataObject['qualifications'] = JSON.stringify(qualifications);
        
        // Include resume
        formDataObject['resume'] = "selectedResume"

        console.log(formDataObject)

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // validation logic

        try {
            const response = await api.post(`/career/application/create?career=${careerId}`, formDataObject);
            // const response = await api.post(`/career/application/create?career=${careerId}`, formDataObject);

            // Check if the signup was successful
            if (response.status === 200) {
                console.log(response.data);
                toast.success("Application created successfully");
            } else {
                toast.error('Application creation failed. Please try again later.');
            }

        } catch (error) {
            console.error("Internal server error:", error);
            toast.error("Internal server error. Please try again later.");
        }
    };

    const { pathname } = useLocation();
    const handleCancel = () => {
        const destination = '/application/career';

        if (pathname !== destination) {
            navigate(destination);
        }
    };

    return (
        <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex w-full">
                <div className="w-3/4">
                    <p className="text-gray-600">Apply for the job from your url</p>
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
                    <div className="grid gap-6 mb-6 md:grid-cols-1 mt-4 p-4">
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input type="text" id="first_name" name="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="John" required onFocus={() => setTextBoxclick(() => 0)} />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input type="text" id="last_name" name="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Doe" required onFocus={() => setTextBoxclick(() => 0)} />
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500" placeholder="name@gmail.com" required onFocus={() => setTextBoxclick(() => 0)} />
                            </div>
                            <div className='w-1/2'>
                                <div>
                                    <label htmlFor="phone_no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    <input type="number" id="phone_no" name="phone_no" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="1234-5678-9000" required onFocus={() => setTextBoxclick(() => 0)} />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select id="gender" name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500" required onFocus={() => setTextBoxclick(() => 0)}>
                                    <option value="fulltime">Male</option>
                                    <option value="parttime">Female</option>
                                    <option value="contract">don't want to disclose</option>
                                </select>
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Opened</label>
                                <input type="date" id="dob" name="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input type="text" id="address" name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Address" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="grad_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grad Year</label>
                                <input type="date" id="grad_year" name="grad_year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience</label>
                                <input type="number" id="experience" name="experience" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Experience in years" required onFocus={() => setTextBoxclick(() => 0)} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="current_location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Location</label>
                            <input type="text" id="current_location" name="current_location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Current Location" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                        <div>
                            <label htmlFor="current_employer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Employer</label>
                            <input type="text" id="current_employer" name="current_employer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Current Employer" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                        <div>
                            <label htmlFor="current_ctc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current ctc</label>
                            <input type="Number" id="current_ctc" name="current_ctc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Current ctc" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                        <div>
                            <label htmlFor="expected_ctc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expected Ctc</label>
                            <input type="Number" id="expected_ctc" name="expected_ctc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Expected Ctc" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>
                        <div>
                            <label htmlFor="notice_period" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notice Period</label>
                            <input type="Number" id="notice_period" name="notice_period" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:outline-blue-500" placeholder="Notice Period" required onFocus={() => setTextBoxclick(() => 0)} />
                        </div>

                    </div>
                </div>

                <div> {/* section 2 */}
                    <div className="grid gap-6 mb-6 md:grid-cols-1 mt-4 p-4">
                        <div>
                            <label htmlFor="skill_set" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Skill Set</label>
                            <div onClick={() => setTextBoxclick(() => 1)}>
                                <MultiTextBox customClassName={`${TextBoxclick == 1 ? 'border-2 border-blue-500' : ''}`} placeholder='Type in skills' onDataUpdate={handleSkillSetUpdate} />
                            </div>
                        </div>
                        <div>
                            <div onClick={() => setTextBoxclick(() => 2)}>
                                <label htmlFor="qualifications" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Qualifications</label>
                                <MultiTextBox customClassName={`${TextBoxclick == 2 ? 'border-2 border-blue-500' : ''}`} placeholder="Type in qualifications" onDataUpdate={handleQualificationsUpdate} />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="resume" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resume</label>
                            <div className="flex items-center justify-between">
                                <input type="file" id="resume" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="hidden" />
                                <label htmlFor="resume" className="cursor-pointer bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                                    Choose File
                                </label>
                                {selectedResume && (
                                    <div className="flex items-center">
                                        <span className="ml-2">{selectedResume.name}</span>
                                        <button type="button" className="ml-2 text-red-600" onClick={handleClearResume}>
                                            Clear
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </form>
    )
}
