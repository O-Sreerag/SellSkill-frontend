import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup';

import MultiTextBox from './MultiTextBox';
import { api } from '../../../../services/axios';
import { NotificationType } from '../../../../types/interface';

interface careerData {
    _id?: string;
    recruiterId?: string;
    posting_title?: string;
    industry?: string;
    location?: string;
    salary_min?: number;
    salary_max?: number;
    workExp_min?: number;
    workExp_max?: number;
    job_type?: string;
    opening_status?: string;
    date_opened?: Date;
    target_date?: Date;
    contact_name?: string;
    no_of_positions?: number;
    job_description?: string[];
    required_skills?: string[];
    responsibilities?: string[];
    benefits?: string[];
    applicants?: string[];
    url?: string;

}

export const Form = () => {
    const navigate = useNavigate()
    const { search } = useLocation();
    const careerId = new URLSearchParams(search).get('careerId');
    const [career, setCareer] = useState<careerData | null>(null)

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("adding career to applicant")
                const response = await api.get(`/career/get/${careerId}`)
                console.log(response.data)

                if(response.status == 200) {
                    const data = response.data.result;
                    setCareer(data)

                    const response2 = await api.post(`/career/applicant/add?careerId=${careerId}`)
                    console.log("response2")
                    console.log(response2)
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (careerId) {
            fetchData();
        } else {
            console.log("careerId is null")
        }
    }, [careerId]);

    // State to hold validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone_no: Yup.string().required('Phone Number is required'),
        gender: Yup.string().required('Gender is required'),
        dob: Yup.date().required('Date of Birth is required'),
        address: Yup.string().required('Address is required'),
        grad_year: Yup.date().required('Graduation Year is required'),
        experience: Yup.number().required('Experience is required').positive('Experience must be positive'),
        current_location: Yup.string().required('Current Location is required'),
        current_employer: Yup.string().required('Current Employer is required'),
        current_ctc: Yup.number().required('Current CTC is required').positive('Current CTC must be positive'),
        expected_ctc: Yup.number().required('Expected CTC is required').positive('Expected CTC must be positive'),
        notice_period: Yup.number().required('Notice Period is required').positive('Notice Period must be positive'),
        skill_set: Yup.array().of(Yup.string().required('Skill Sets are required')).min(4, 'At least four skill set is required'),
        qualifications: Yup.array().of(Yup.string().required('Qualifications are required')).min(4, 'At least four qualification is required'),
    });


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setErrors({});

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
        formDataObject['skill_set'] = skillSet
        formDataObject['qualifications'] = qualifications

        // Include resume
        formDataObject['resume'] = "selectedResume"

        console.log(formDataObject)

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        console.log("formDataObject", formDataObject)

        try {
            // Destructure elements from formDataObject for validation
            const {
                first_name,
                last_name,
                email,
                phone_no,
                gender,
                dob,
                address,
                grad_year,
                experience,
                current_location,
                current_employer,
                current_ctc,
                expected_ctc,
                notice_period,
                skill_set,
                qualifications,
            } = formDataObject;

            // Validate form data against the schema
            await validationSchema.validate({
                first_name,
                last_name,
                email,
                phone_no,
                gender,
                dob,
                address,
                grad_year,
                experience,
                current_location,
                current_employer,
                current_ctc,
                expected_ctc,
                notice_period,
                skill_set,
                qualifications,
            }, { abortEarly: false });

            // If validation passes, submit the form data
            const response = await api.post(`/career/application/create?career=${careerId}`, formDataObject);

            if (response.status === 200) {
                toast.success("Application created successfully");

                // Create notification data
                const notificationData1 = {
                    type: NotificationType.ApplicationReceived,
                    userId: career?.recruiterId,
                    role: 'recruiter',
                    message: `A new interview has been scheduled "${career?.posting_title}" has been created!`,
                    careerId: response.data?.result?.careerId,
                    read: false,
                };

                const notificationResponse1 = await api.post('/chat/notification/create', notificationData1);

                if (notificationResponse1.status === 200) {
                    console.log('Notification created successfully');
                    toast.success('Notification created successfully');
                } else {
                    toast.error('Failed to create notification. Please try again later.');
                }
                
                navigate('/applicant/career');
            } else {
                toast.error('Application creation failed. Please try again later.');
            }

        } catch (validationErrors: any) {
            if (validationErrors instanceof Yup.ValidationError) {
                const errorsObject: { [key: string]: string } = {};
                validationErrors.inner.forEach((error: any) => {
                    if (!errorsObject[error.path]) {
                        errorsObject[error.path] = error.message;
                    }
                });
                setErrors(errorsObject);
                toast.error('Please correct the form errors and try again.');
            } else {
                setErrors({});
                console.error("Internal server error:", validationErrors);
                toast.error("Internal server error. Please try again later.");
                // navigate('/applicant/career');
            }
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
                                <input type="text" id="first_name" name="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="John" required />
                                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                            </div>
                            <div className='w-1/2'>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input type="text" id="last_name" name="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="Doe" required />
                                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="name@gmail.com" required />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className='w-1/2'>
                                <div>
                                    <label htmlFor="phone_no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    <input type="number" id="phone_no" name="phone_no" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="1234-5678-9000" required />
                                    {errors.phone_no && <p className="text-red-500 text-sm">{errors.phone_no}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <input type="text" id="gender" name="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="Male" required />
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                            </div>
                            <div className='w-1/2'>
                                <div>
                                    <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                                    <input type="date" id="dob" name="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" required />
                                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input type="text" id="address" name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="Elton St. 234" required />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="grad_year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Graduation Year</label>
                                <input type="date" id="grad_year" name="grad_year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" required />
                                {errors.grad_year && <p className="text-red-500 text-sm">{errors.grad_year}</p>}
                            </div>
                            <div className='w-1/2'>
                                <div>
                                    <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience</label>
                                    <input type="number" id="experience" name="experience" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="2" required />
                                    {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="current_location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Location</label>
                                <input type="text" id="current_location" name="current_location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="India" required />
                                {errors.current_location && <p className="text-red-500 text-sm">{errors.current_location}</p>}
                            </div>
                            <div className='w-1/2'>
                                <div>
                                    <label htmlFor="current_employer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Employer</label>
                                    <input type="text" id="current_employer" name="current_employer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="Google" required />
                                    {errors.current_employer && <p className="text-red-500 text-sm">{errors.current_employer}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='w-1/2'>
                                <label htmlFor="current_ctc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current CTC</label>
                                <input type="number" id="current_ctc" name="current_ctc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="1,00,000" required />
                                {errors.current_ctc && <p className="text-red-500 text-sm">{errors.current_ctc}</p>}
                            </div>
                            <div className='w-1/2'>
                                <div>
                                    <label htmlFor="expected_ctc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expected CTC</label>
                                    <input type="number" id="expected_ctc" name="expected_ctc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="2,00,000" required />
                                    {errors.expected_ctc && <p className="text-red-500 text-sm">{errors.expected_ctc}</p>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="notice_period" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notice Period</label>
                            <input type="number" id="notice_period" name="notice_period" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5" placeholder="30" required />
                            {errors.notice_period && <p className="text-red-500 text-sm">{errors.notice_period}</p>}
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
                            {errors.skill_set && <div className="text-red-500">{errors.skill_set}</div>}
                        </div>
                        <div>
                            <div onClick={() => setTextBoxclick(() => 2)}>
                                <label htmlFor="qualifications" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Qualifications</label>
                                <MultiTextBox customClassName={`${TextBoxclick == 2 ? 'border-2 border-blue-500' : ''}`} placeholder="Type in qualifications" onDataUpdate={handleQualificationsUpdate} />
                            </div>
                            {errors.qualifications && <div className="text-red-500">{errors.qualifications}</div>}
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
