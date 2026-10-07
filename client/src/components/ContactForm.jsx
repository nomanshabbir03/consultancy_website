import { useState } from 'react';
import Honeypot from './Honeypot';
import { submitContactForm } from '../services/contactService';

const SERVICES = ['BPO', 'Healthcare', 'Digital Marketing', 'Software Development'];
const FIELD = 'w-full border-[#e0e0e0] border-[1px] text-[#001017]';
// Inputs sit inside wrapper divs (for error messages), so make them block to avoid an inline baseline gap.
const INPUT = `block ${FIELD}`;
const INITIAL = { services: '', name: '', email: '', number: '', subject: '', description: '' };

/** Lead / inquiry form. Posts to `POST /api/contact` and reports the API's answer as-is. */
export default function ContactForm({ id }) {
  const [values, setValues] = useState(INITIAL);
  const [status, setStatus] = useState({ type: 'idle', message: '', errors: {} });

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '', errors: {} });
    try {
      const res = await submitContactForm({ ...values, company_website: e.target.elements.company_website?.value || '' });
      setStatus({ type: 'success', message: res.message, errors: {} });
      setValues(INITIAL);
    } catch (err) {
      setStatus({ type: 'error', message: err.message, errors: err.details || {} });
    }
  };

  const fieldError = (name) =>
    status.errors[name] ? <p className="text-red-500 text-[14px] my-1">{status.errors[name]}</p> : null;

  return (
    <form onSubmit={onSubmit} className="w-full" id={id} noValidate>
      <Honeypot id={`company_website_${id || 'contact'}`} />
      <div>
        <select className={`${FIELD} p-3`} aria-label="Service" name="services" value={values.services} onChange={onChange}>
          <option value="">Please select service ...</option>
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex gap-3 my-[20px]">
        <div className="w-full">
          <input
            className={`${INPUT} p-3`}
            type="text"
            name="name"
            placeholder="Your Name ..."
            aria-label="Your Name"
            value={values.name}
            onChange={onChange}
          />
          {fieldError('name')}
        </div>
        <div className="w-full">
          <input
            className={`${INPUT} p-3`}
            type="email"
            name="email"
            placeholder="Your Email ..."
            aria-label="Your Email"
            value={values.email}
            onChange={onChange}
          />
          {fieldError('email')}
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-3 my-[20px]">
        <div>
          <input
            className={`${INPUT} p-3`}
            type="tel"
            name="number"
            placeholder="Your Phone ..."
            aria-label="Your Phone"
            value={values.number}
            onChange={onChange}
          />
          {fieldError('number')}
        </div>
        <div>
          <input
            className={`${INPUT} p-3`}
            type="text"
            name="subject"
            placeholder="Enter Subject ..."
            aria-label="Enter Subject"
            value={values.subject}
            onChange={onChange}
          />
          {fieldError('subject')}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-3 my-[20px]">
        <div>
          <textarea
            className={`${INPUT} p-3`}
            name="description"
            cols="30"
            rows="5"
            placeholder="Project Description"
            aria-label="Project Description"
            value={values.description}
            onChange={onChange}
          />
          {fieldError('description')}
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="relative flex gap-4 items-center justify-center px-[20px] h-[49px] border-[2px] border-[#2b3990] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#00aeef] text-[#2b3990] text-[16px] 2xl:text-[18px] disabled:opacity-50"
        >
          <p className="my-auto h-7">{status.type === 'loading' ? 'Sending...' : 'Submit'}</p>
          <p className="text-xl my-auto">
            <i className="fa-solid fa-arrow-right" />
          </p>
        </button>
        {status.message && (
          <p
            role="status"
            className={`mt-4 text-[14px] sm:text-[16px] ${status.type === 'error' ? 'text-red-500' : 'text-[#2b3990]'}`}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
