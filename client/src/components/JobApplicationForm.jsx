import { useRef, useState } from 'react';
import Honeypot from './Honeypot';
import { submitApplication } from '../services/careerService';

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function Field({ id, label, note, error, children }) {
  return (
    <div className="w-full mb-3">
      {note === 'file' ? (
        <div className="flex justify-between items-center">
          <label htmlFor={id} className="text-sm font-600">
            {label}
          </label>
          <small className="text-xs text-danger font-600">Accepted file types: PDF, DOCX</small>
        </div>
      ) : (
        <label htmlFor={id} className="text-sm font-600">
          {label}
          {note === 'optional' && (
            <>
              {' '}
              <span className="text-danger text-xs">*Optional</span>
            </>
          )}
        </label>
      )}
      {children}
      {error && <p className="text-danger text-xs my-1">{error}</p>}
    </div>
  );
}

const ROW = 'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5';

/** Application form with the same fields, order and labels as the original (résumé is uploaded as multipart). */
export default function JobApplicationForm({ jobId }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: 'idle', message: '', errors: {} });
  const err = (name) => status.errors[name];

  const onFileChange = (e) => {
    if (e.target.value && !/\.(pdf|docx)$/i.test(e.target.value)) {
      e.target.value = '';
      setStatus({ type: 'error', message: '', errors: { upload_file: 'Please upload files having extensions .pdf or .docx only.' } });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '', errors: {} });
    try {
      const res = await submitApplication(jobId, new FormData(e.target));
      setStatus({ type: 'success', message: res.message, errors: {} });
      formRef.current.reset();
    } catch (error) {
      setStatus({ type: 'error', message: error.message, errors: error.details || {} });
    }
  };

  return (
    <div className="p-[20px] border-[1px] shadow-md border-[#e0e0e0] mt-[40px] mb-[40px] col-md-8 mx-auto" id="applicationForm">
      <form ref={formRef} onSubmit={onSubmit} id="applicationForms" encType="multipart/form-data">
        <Honeypot id="company_website_apply" />
        <div className={ROW}>
          <Field id="first_name" label="First Name" error={err('first_name')}>
            <input type="text" name="first_name" id="first_name" className="form-control w-full" placeholder="Enter First Name . . ." />
          </Field>
          <Field id="last_name" label="Last Name" error={err('last_name')}>
            <input type="text" name="last_name" id="last_name" className="form-control w-full" placeholder="Enter Last Name . . ." />
          </Field>
        </div>
        <div className={ROW}>
          <Field id="email" label="Email" error={err('email')}>
            <input type="email" name="email" id="email" className="form-control w-full" placeholder="Enter Email . . ." />
          </Field>
          <Field id="gender" label="Gender" error={err('gender')}>
            <select name="gender" id="gender" className="form-control w-full">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </Field>
        </div>
        <div className={ROW}>
          <Field id="phone_number" label="Phone Number" error={err('phone_number')}>
            <input type="text" name="phone_number" id="phone_number" className="form-control w-full" placeholder="Enter Phone Number . . ." required />
          </Field>
          <Field id="cnic" label="CNIC" error={err('cnic')}>
            <input type="text" name="cnic" id="cnic" className="form-control w-full" placeholder="Enter CNIC . . ." required />
          </Field>
        </div>
        <div className={ROW}>
          <Field id="city" label="City" error={err('city')}>
            <input type="text" name="city" id="city" className="form-control w-full" placeholder="Enter City . . ." required />
          </Field>
          <Field id="address" label="Address" error={err('address')}>
            <input type="text" name="address" id="address" className="form-control w-full" placeholder="Enter Address . . ." required />
          </Field>
        </div>
        <div className={ROW}>
          <Field id="date_applied" label="Date Applied">
            <input type="date" name="date_applied" id="date_applied" className="form-control w-full" required defaultValue={today()} readOnly />
          </Field>
          <Field id="upload_file" label="Upload Resume" note="file" error={err('upload_file')}>
            <input type="file" name="upload_file" id="upload_file" className="form-control w-full" required onChange={onFileChange} />
          </Field>
        </div>
        <div className={ROW}>
          <Field id="current_salary" label="Current Salary" note="optional" error={err('current_salary')}>
            <input type="number" name="current_salary" id="current_salary" className="form-control w-full" placeholder="Enter Current Salary . . ." />
          </Field>
          <Field id="expected_salary" label="Expected Salary" note="optional" error={err('expected_salary')}>
            <input type="number" name="expected_salary" id="expected_salary" className="form-control w-full" placeholder="Enter Expected Salary . . ." />
          </Field>
        </div>
        <button
          type="submit"
          id="submitFormButton"
          disabled={status.type === 'loading'}
          className="transform hover:scale-90 transition duration-500 ease-in-out px-4 py-2 bg-[#2b3990] rounded-[6px] text-white border-[2px] border-[#2b3990] disabled:opacity-50"
        >
          {status.type === 'loading' ? 'Submitting...' : 'Submit'}
        </button>
        {status.message && (
          <p role="status" className={`mt-4 text-sm ${status.type === 'error' ? 'text-danger' : 'text-[#2b3990]'}`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
