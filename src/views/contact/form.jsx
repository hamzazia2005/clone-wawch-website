'use client';
import { useState } from 'react';
import { Button, IconButton } from '@/components';
import Image from 'next/image';
import { Input } from '@/components';
import { Formik, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { postContactForm } from '@/utils/post_contact';

const SignupSchema = Yup.object().shape({
  fName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  company: Yup.string().required('Required'),
  job: Yup.string().required('Required'),
  salespeople: Yup.string().required('Required'),
  phone: Yup.string().matches(/^\+\d{2,3}\d{8,12}$/, 'Invalid phone number'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
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
        <div className='md:w-[40%] bg-bg_form bg-center bg-cover px-4 sm:pl-5 sm:pr-10 py-8 flex flex-col justify-between gap-8'>
          <div>
            <h2 className='text-primary text-[28px] font-semibold font-poppins'>
              {data?.heading}
            </h2>
            <p className='text-third leading-7 text-lg font-poppins'>
              {data?.description}
            </p>
            <div className='mt-12 mb-6'>
              {data?.contacts?.map((item, index) => (
                <div key={index} className='mb-6 flex gap-4 items-start'>
                  <Image
                    src={item?.icon || '/assets/placeholder.png'}
                    //priority={true}
                    alt='icon'
                    width={index === 2 ? 20 : 16}
                    height={index === 2 ? 20 : 16}
                    className='mt-1'
                  />

                  {item?.link ? (
                    <a
                      href={item?.link}
                      target='_blank'
                      className='text-primary font-poppins underline'
                    >
                      {item?.value}
                    </a>
                  ) : (
                    <p className='text-primary font-poppins'>{item?.value}</p>
                  )}
                </div>
              ))}
              <a href={data?.whatsapp_button?.link} target='_blank'>
                <IconButton
                  text={data?.whatsapp_button?.title}
                  isStarted={true}
                  isWhatsapp={true}
                />
              </a>
            </div>
          </div>
          <div className='flex gap-4'>
            {data?.social_media_icons?.map((item, index) => (
              <div key={index}>
                <a href={item.link} target='_blank'>
                  <Image
                    src={item.icon || '/assets/placeholder.png'}
                    //priority={true}
                    alt='icon'
                    width={24}
                    height={24}
                    className='scale-1 hover:scale-[1.1] object-cover transition-all cursor-pointer'
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className='md:w-[60%] py-8'>
          <Formik
            initialValues={{
              fName: '',
              lName: '',
              company: '',
              job: '',
              salespeople: '',
              phone: '',
              email: '',
              message: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              if (!selectedOption) {
                setSubmit(true);
                return;
              }
              postContactForm(
                'api/contact-applications',
                false,
                values,
                selectedOption
              );
              document.getElementById('fName').value = '';
              document.getElementById('lName').value = '';
              document.getElementById('company').value = '';
              document.getElementById('job').value = '';
              document.getElementById('salespeople').value = '';
              document.getElementById('phone').value = '';
              document.getElementById('email').value = '';
              document.getElementById('message').value = '';
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
                      id='company'
                      name='company'
                      label={data?.company}
                      placeholder={data?.company_placeholder}
                      onChange={handleChange}
                      errors={errors.company}
                      touched={touched.company}
                    />
                    <Input
                      id='job'
                      name='job'
                      label={data?.job}
                      placeholder={data?.job_placeholder}
                      onChange={handleChange}
                      errors={errors.job}
                      touched={touched.job}
                    />
                  </div>
                  <div className='flex flex-col sm:flex-row sm:gap-8'>
                    <div className='w-full'>
                      <h3 className='text-primary text-[12px] font-poppins font-medium mb-2 mt-4'>
                        {data?.company_size}
                        <span className='text-red-500'>*</span>
                      </h3>
                      <div className='relative'>
                        <div
                          className='flex justify-between items-center border border-[#D0D5DD] rounded-md text-[#667085] placeholder-[#667085] shadow-sm px-4 py-3 cursor-pointer'
                          onClick={toggleDropdown}
                        >
                          {selectedOption
                            ? selectedOption
                            : data?.company_size_placeholder}
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
                            {data?.company_size_option.map((option) => (
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
                      id='salespeople'
                      name='salespeople'
                      label={data?.salespeople}
                      placeholder={data?.salespeople_placeholder}
                      onChange={handleChange}
                      errors={errors.salespeople}
                      touched={touched.salespeople}
                    />
                  </div>
                  <div className='flex flex-col sm:flex-row sm:gap-8'>
                    <Input
                      id='phone'
                      name='phone'
                      label={data?.phone}
                      placeholder={data?.phone_placeholder}
                      isRequired={false}
                      onChange={handleChange}
                      errors={errors.phone}
                      touched={touched.phone}
                    />
                    <Input
                      id='email'
                      name='email'
                      label={data?.email}
                      placeholder={data?.email_placeholder}
                      onChange={handleChange}
                      errors={errors.email}
                      touched={touched.email}
                    />
                  </div>
                </div>
                <h3 className='text-primary  font-poppins font-medium mt-6 mb-2'>
                  {data?.message}
                  <span className='text-red-500'>*</span>
                </h3>
                <textarea
                  id='message'
                  name='message'
                  placeholder={data?.message_placeholder}
                  rows={7}
                  onChange={handleChange}
                  className='w-full py-3 pl-4 border border-[#D0D5DD] text-[#667085] focus:outline-none rounded-md placeholder-[#667085]'
                />
                {errors.message && touched.message ? (
                  <div className='text-red-500 text-xs ml-2'>
                    {errors.message}
                  </div>
                ) : null}
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
