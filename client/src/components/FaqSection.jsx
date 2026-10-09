import { useEffect, useRef, useState } from 'react';
import Accent from '../content/Accent';
import { useSection } from '../content/SiteContent';
import useApiData from '../hooks/useApiData';
import { fetchFaqs } from '../services/siteContentService';

function FaqItem({ number, question, answer, open, onToggle }) {
  const panelRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open && panelRef.current) setHeight(panelRef.current.scrollHeight);
  }, [open]);

  return (
    <li className="bg-white relative mb-[20px] rounded-[10px]">
      <button
        type="button"
        className="w-full px-[10px] py-[6px] rounded-t-[10px] text-left"
        onClick={onToggle}
        aria-expanded={open}
        style={{ background: open ? '#00aeef' : '#F0F6FF' }}
      >
        <div className="flex justify-between">
          <div className="flex">
            <span className="font-600 text-[26px] px-3" style={{ color: open ? '#fff' : '#00aeef' }}>
              {number}
            </span>
            <span className="text-[14px] sm:text-[18px] my-auto" style={{ color: open ? '#fff' : '#001017' }}>
              {question}
            </span>
          </div>
          <div className="my-auto">
            <span style={{ display: open ? 'none' : 'inline' }}>
              <i className="fa-solid fa-angle-down my-auto" />
            </span>
            <span style={{ display: open ? 'inline' : 'none' }}>
              <i className="fa-solid fa-angle-up text-white my-auto" />
            </span>
          </div>
        </div>
      </button>
      <div
        ref={panelRef}
        className="relative overflow-hidden transition-all max-h-0 duration-700 border-2 border-t-0 rounded-b-[10px] border-[#e0e0e0]"
        style={{ maxHeight: open ? `${height}px` : undefined }}
      >
        <div className="p-6">
          <p className="text-[14px] sm:text-[16px]">{answer}</p>
        </div>
      </div>
    </li>
  );
}

/** "Common Questions" accordion; the first question is open on load. */
export default function FaqSection() {
  const { heading, intro } = useSection('home', 'faq');
  const { data } = useApiData(fetchFaqs);
  const faqs = data?.data ?? [];
  const [selected, setSelected] = useState(0);

  return (
    <div className="bg-[#fff] relative z-30">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="text-center">
            <p className="text-[24px] sm:text-[40px] font-600 text-[#001017] my-0">
              <Accent text={heading} />
            </p>
            <p className="text-[14px] sm:text-[18px] text-[#001017] pt-[20px] my-0">
              {intro}
            </p>
          </div>
          <div className="pt-[50px] xl:w-[1020px] m-auto">
            <div className="flex justify-center">
              <div className="mx-auto">
                <ul className="shadow-box">
                  {faqs.map((faq, i) => (
                    <FaqItem
                      key={faq.id}
                      number={String(i + 1).padStart(2, '0')}
                      question={faq.question}
                      answer={faq.answer}
                      open={selected === i}
                      onToggle={() => setSelected(selected === i ? null : i)}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
