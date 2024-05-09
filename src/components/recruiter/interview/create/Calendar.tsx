import { useState } from 'react';
import { SlCalender } from 'react-icons/sl';
import Calendar from 'react-calendar';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

const CalendarComponent = ({ onDateTimeChange }: any) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        console.log(date)

        onDateTimeChange({ date, time: selectedTime?.format('HH:mm:ss') });
    };
    
    const handleTimeChange = (time: dayjs.Dayjs | null) => {
        setSelectedTime(time);
        console.log(time?.format('HH:mm:ss'));

        onDateTimeChange({ date: selectedDate, time: time?.format('HH:mm:ss')});
    };

    return (
        <div className='flex flex-grow flex-shrink p-2 gap-5 justify-between'>
            <div className='w-full flex flex-col items-center'>
                <div className='space-y-2'>
                    <p className="barlow-semibold text-base text-gray-800">Date and Time</p>
                    <div className='flex gap-1'>
                        <SlCalender className='w-3' />
                        <p className='text-xs'>{selectedDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker
                                    label="Basic time picker"
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
            </div>
            <div className="pt-3">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                />
            </div>
        </div>
    );
}

export default CalendarComponent;

{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['TimePicker']}>
        <TimePicker label="Basic time picker" />
    </DemoContainer>
</LocalizationProvider> */}