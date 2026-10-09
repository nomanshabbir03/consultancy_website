import Accent from '../content/Accent';
import { useSection } from '../content/SiteContent';
import useApiData from '../hooks/useApiData';
import { fallbackPhoto } from '../utils/avatarFallback';
import { fetchTeam } from '../services/siteContentService';

const AOS = ['fade-right', 'flip-right', 'fade-right'];
const ICON_CLASS = 'hover:text-[#2b3990] text-[#00aeef] text-2xl';

// The reference used extra <br>s so the social icons line up across cards of different bio length.
const SPACERS = [
  [],
  ['hidden desktop:block min-[1700px]:hidden'],
  ['hidden desktop:block', 'hidden desktop:block min-[1700px]:hidden', 'hidden desktop:block 2xl:hidden'],
];

function SocialLink({ href, icon }) {
  if (!href) return null; // only show networks the person actually has
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={ICON_CLASS} aria-label={icon}>
      <i className={`fa-brands ${icon}`} />
    </a>
  );
}

function TeamCard({ member, index }) {
  const isUmer = member.name === 'Umer Rafique';
  const photo = isUmer ? '/assets/pics/team/umerrafiqueblack.jpeg' : member.photo;

  return (
    <div className="px-[16px] py-4 desktop:py-0 relative" data-aos={AOS[index % AOS.length]}>
      <div className="relative z-30 m-auto w-[160px] h-[160px] flex items-center justify-center bg-[#fff] rounded-full">
        <img
          src={photo}
          alt={member.name}
          onError={fallbackPhoto(member.name)}
          className="w-[150px] h-[150px] rounded-full object-cover"
          style={isUmer ? { objectPosition: 'center top' } : undefined}
        />
      </div>
      <div className="z-20 text-center bg-[#fff] rounded-[10px] px-[15px] relative -mt-16 py-[15px] border-[#fff] border-[2px]">
        <div className="border-[1px] border-[#000] pt-[60px]">
          <p className="text-[20px] sm:leading-[32px] sm:text-[28px] text-[#001017] my-0" style={{ fontWeight: '600' }}>
            {member.name}
          </p>
          <p className="text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017] my-0" style={{ fontWeight: '600' }}>
            {member.role}
          </p>
          <p
            className="text-[14px] sm:text-[16px] sm:leading-[22px] text-[#001017] pt-[20px] px-3 my-0"
            style={{ fontWeight: '400' }}
          >
            {member.bio}
          </p>
          {(SPACERS[index] || []).map((cls) => (
            <br key={cls} className={cls} />
          ))}
          <div className="py-[10px] flex gap-3 justify-center items-center">
            <SocialLink href={member.facebook} icon="fa-facebook" />
            <SocialLink href={member.instagram} icon="fa-instagram" />
            <SocialLink href={member.linkedin} icon="fa-linkedin-in" />
          </div>
          <div className="w-[15px] h-[150px] rounded-tr-[10px] bg-[#2b3990] absolute top-0 right-0" />
          <div className="h-[15px] w-[150px] rounded-tr-[10px] bg-[#2b3990] absolute top-0 right-0" />
          <div className="w-[15px] h-[150px] rounded-bl-[10px] bg-[#00aeef] absolute bottom-0 left-0" />
          <div className="h-[15px] w-[150px] rounded-bl-[10px] bg-[#00aeef] absolute bottom-0 left-0" />
        </div>
      </div>
    </div>
  );
}

/** "Meet Our Leadership" - intro band plus the team cards loaded from the API. */
export default function TeamSection() {
  const { heading, intro } = useSection('home', 'team');
  const { data } = useApiData(fetchTeam);
  const members = data?.data ?? [];

  return (
    <div className="bg-[#F0F6FF] relative z-30">
      <div className="bg-[#2b3990]">
        <div className="col-md-8 py-[70px] sm:pt-[150px] sm:pb-[250px] mx-auto md:mx-[20px]">
          <div>
            <div className="text-center">
              <p className="text-[24px] sm:text-[40px] text-white" style={{ fontWeight: '600' }} data-aos="fade-right">
                <Accent text={heading} />
              </p>
            </div>
            <p
              className="text-[14px] sm:text-[18px] text-center text-[#fff] pt-[10px] m-auto"
              style={{ fontWeight: '400' }}
              data-aos="fade-up"
            >
              {intro}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-8 mx-auto md:-mt-48 pb-[70px] sm:pb-[150px]">
        <div className="grid grid-cols-1 desktop:grid-cols-3">
          {members.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
