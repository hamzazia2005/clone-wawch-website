'use client';
import { useState } from 'react';
import { BlocksRender, Button } from '@/components';
import { Formik, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import Image from 'next/image';
import { postUninsallForm } from '@/utils/post_uninstall';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

const UninstallForm = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submit, setSubmit] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className='flex justify-center items-center bg-gray-100 px-5 sm:px-12 py-16'>
      <div className='sm:max-w-[1000px] w-full flex gap-8 md:gap-0 md:justify-between flex-col md:flex-row p-3 bg-white rounded-[10px]'>
        <div className='md:w-[45%] bg-bg_form bg-center px-4 sm:pl-5 sm:pr-10 py-12 flex flex-col justify-center'>
          <p className='text-green1 font-medium font-poppins'>{data?.title}</p>
          <h2 className='text-primary text-4xl leading-10 sm:text-5xl sm:leading-[60px] font-semibold font-poppins mt-2'>
            {data?.heading}
          </h2>
          <BlocksRender data={data?.text} />
        </div>
        <div className='md:w-[50%]'>
          <Formik
            initialValues={{
              email: '',
              details: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              if (!selectedOption) {
                setSubmit(true);
                return;
              }
              postUninsallForm(
                'api/uninstall-applications',
                false,
                values,
                selectedOption
              );
              document.getElementById('workEmail').value = '';
              document.getElementById('details').value = '';
              setSelectedOption(null);
              setSubmit(false);
              resetForm();
              toast.success('Application submitted', {
                style: {
                  border: '2px solid #22c55d',
                  borderRadius: '10px',
                  padding: '12px 40px',
                  color: '#17552f',
                  backgroundColor: '#dcfce7',
                },
                iconTheme: {
                  primary: '#44a047',
                  secondary: '#dcfce7',
                },
              });
            }}
          >
            {({ errors, touched, handleChange }) => (
              <Form>
                <Toaster position='bottom-center' />
                <h3 className='text-primary font-poppins font-medium text-lg my-2'>
                  {data?.email_title}
                  <span className='text-red-500'>*</span>
                </h3>
                <input
                  id='workEmail'
                  name='email'
                  placeholder={data?.email_placeholder}
                  onChange={handleChange}
                  className='w-full py-3 pl-4 border border-[#D0D5DD] rounded-md focus:outline-none text-[#667085] placeholder-[#667085]'
                />
                {errors.email && touched.email ? (
                  <div className='text-red-500 text-xs ml-2'>
                    {errors.email}
                  </div>
                ) : null}
                <h3 className='text-primary font-poppins font-medium text-lg mt-6 mb-2'>
                  {data?.difficulty_title}
                  <span className='text-red-500'>*</span>
                </h3>
                <div className='relative'>
                  <div
                    className='flex justify-between items-center border border-[#D0D5DD] rounded-md text-[#667085] placeholder-[#667085] shadow-sm px-4 py-3 cursor-pointer'
                    onClick={toggleDropdown}
                  >
                    {selectedOption
                      ? selectedOption
                      : data?.difficulty_placeholder}
                    <Image
                      src='/assets/dropdown.svg'
                      alt='dropdown'
                      //priority={true}
                      width={12}
                      height={12}
                      className={`${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                  {(!selectedOption &&
                    Object.keys(errors).some((key) => touched[key])) ||
                  (!selectedOption && submit) ? (
                    <div className='text-red-500 text-xs ml-2'>Required</div>
                  ) : null}
                  {isOpen && (
                    <ul className='absolute z-10 w-full bg-white border border-[#D0D5DD] rounded-md text-[#667085] shadow-lg max-h-60 overflow-auto'>
                      {data?.difficulties.map((option) => (
                        <li
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <h3 className='text-primary font-poppins font-medium text-lg mt-6 mb-2'>
                  {data?.details_title}
                </h3>
                <textarea
                  id='details'
                  name='details'
                  placeholder={data?.details_placeholder}
                  rows={10}
                  onChange={handleChange}
                  className='w-full py-3 pl-4 border border-[#D0D5DD] text-[#667085] focus:outline-none rounded-md placeholder-[#667085]'
                />
                <div className='flex justify-end mt-5'>
                  <div className='w-[240px]'>
                    <Button background={true} text={data?.btn_txt} />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UninstallForm;
