'use client';
import { useState, useEffect } from 'react';

interface TableOfContentsProps {
  items: Array<{ title: string; id: string; link: string }>;
  blogTitle?: string;
}

export default function TableOfContents({ items, blogTitle }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => document.getElementById(item.id)).filter(Boolean);
      
      let current = '';
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section.id;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const targetId = link.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 100; // Account for header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="w-full md:w-[21.6%] bg-[#fafbfc] rounded-xl p-5 h-fit border border-[#ececec] sticky top-[90px]">
      <h2 className="font-inter font-semibold text-[24px] leading-[32px] text-black mb-5">Table Of Content</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className={`border-b ${activeSection === item.id ? 'border-[#7856FC]' : 'border-[#E4E7EC]'
                } ${index === items.length - 1 ? '' :
                  activeSection === item.id ? 'md:pb-[46px] pb-4 mb-4' : 'pb-4 mb-4'
                }`}
            >
              <a
                href={item.link}
                onClick={(e) => handleClick(e, item.link)}
                className={`font-inter ${activeSection === item.id
                  ? 'font-semibold text-[#7856FC]'
                  : 'font-semibold text-black'
                  } text-[18px] leading-[28px] hover:underline cursor-pointer`}
              >
                {index === 0 ? (blogTitle || item.title) : item.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[#475467] text-[14px] leading-[20px] font-normal">
          No sections available
        </p>
      )}
    </aside>
  );
}