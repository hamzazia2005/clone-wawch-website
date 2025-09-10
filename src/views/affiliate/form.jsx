'use client';
import { useState } from 'react';
import { Button } from '@/components';
import Image from 'next/image';
import { Input } from '@/components';
import { Formik, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { postAffiliateForm } from '@/utils/post_affiliate';

const SignupSchema = Yup.object().shape({
  fName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  whatsapp: Yup.string()
    .matches(/^\+\d{2,3}\d{8,12}$/, 'Invalid phone number')
    .required('Required'),
});

const ContactForm = ({ data }) => {
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
      <div className='sm:max-w-[1000px] w-full flex gap-12 md:justify-between flex-col md:flex-row p-3 bg-white rounded-[10px]'>
        <div className='md:w-[40%] bg-bg_form bg-center bg-cover px-4 sm:pl-5 sm:pr-10 py-8 flex flex-col justify-center items-center gap-8'>
          <div>
            <h2 className='text-primary text-[28px] font-semibold font-poppins'>
              {data?.heading}
            </h2>
            <p className='text-third leading-7 text-lg font-poppins'>
              {data?.description}
            </p>
          </div>
        </div>
        <div className='md:w-[60%] py-8'>
          <Formik
            initialValues={{
              fName: '',
              lName: '',
              email: '',
              whatsapp: '',
              company: '',
              url: '',
              note: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              if (!selectedOption) {
                setSubmit(true);
                return;
              }
              postAffiliateForm(
                false,
                values,
                selectedOption
              );
              document.getElementById('fName').value = '';
              document.getElementById('lName').value = '';
              document.getElementById('company').value = '';
              document.getElementById('url').value = '';
              document.getElementById('whatsapp').value = '';
              document.getElementById('email').value = '';
              document.getElementById('note').value = '';
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
                <div className='w-full'>
                  <Toaster position='bottom-center' />
                  <div className='flex flex-col sm:flex-row sm:gap-8'>
                    <Input
                      id='fName'
                      name='fName'
                      label={data?.fname}
                      placeholder={data?.fname_placeholder}
                      onChange={handleChange}
                      errors={errors.fName}
                      touched={touched.fName}
                    />
                    <Input
                      id='lName'
                      name='lName'
                      label={data?.lname}
                      placeholder={data?.lname_placeholder}
                      onChange={handleChange}
                      errors={errors.lName}
                      touched={touched.lName}
                    />
                  </div>
                  <div className='flex flex-col sm:flex-row sm:gap-8'>
                    <Input
                      id='email'
                      name='email'
                      label={data?.email}
                      placeholder={data?.email_placeholder}
                      onChange={handleChange}
                      errors={errors.email}
                      touched={touched.email}
                    />
                    <Input
                      id='whatsapp'
                      name='whatsapp'
                      label={data?.whatsapp}
                      placeholder={data?.whatsapp_placeholder}
                      onChange={handleChange}
                      errors={errors.whatsapp}
                      touched={touched.whatsapp}
                    />
                  </div>
                  <div className='flex flex-col sm:flex-row sm:gap-8'>
                    <div className='w-full'>
                      <h3 className='text-primary text-[12px] font-poppins font-medium mb-2 mt-4'>
                        {data?.promote}
                        <span className='text-red-500'>*</span>
                      </h3>
                      <div className='relative'>
                        <div
                          className='flex justify-between items-center border border-[#D0D5DD] rounded-md text-[#667085] placeholder-[#667085] shadow-sm px-4 py-3 cursor-pointer'
                          onClick={toggleDropdown}
                        >
                          {selectedOption
                            ? selectedOption
                            : data?.promote_placeholder}
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
                          <div className='text-red-500 text-xs ml-2'>
                            Required
                          </div>
                        ) : null}
                        {isOpen && (
                          <ul className='absolute z-10 w-full bg-white border border-[#D0D5DD] rounded-md text-[#667085] shadow-lg max-h-60 overflow-auto'>
                            {data?.promote_option.map((option) => (
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
                    </div>
                    <Input
                      id='company'
                      name='company'
                      label={data?.company}
                      placeholder={data?.company_placeholder}
                      isRequired={false}
                      onChange={handleChange}
                      errors={errors.company}
                      touched={touched.company}
                    />
                  </div>
                  <div className='flex flex-col sm:flex-row sm:gap-8'>
                    <Input
                      id='url'
                      name='url'
                      label={data?.url}
                      placeholder={data?.url_placeholder}
                      isRequired={false}
                      onChange={handleChange}
                      errors={errors.url}
                      touched={touched.url}
                    />
                  </div>
                </div>
                <h3 className='text-primary  font-poppins font-medium mt-6 mb-2'>
                  {data?.note}
                </h3>
                <textarea
                  id='note'
                  name='note'
                  placeholder={data?.note_placeholder}
                  rows={7}
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

export default ContactForm;
