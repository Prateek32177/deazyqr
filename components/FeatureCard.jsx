import {Chip} from "@nextui-org/react";
import {NotificationIcon} from '../Icons'
export default function FeatureCard(props) {
  const { cardTitle, cardDescp, id, link } = props.featureData;

  return (
    <>
      {/* <span class="absolute flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span> */}
      <a
        href={link}
        rel="noreferrer"
        className=" font-mono w-3/4 md:w-full m-auto  font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4"
      >
        <div className="border border-black/[0.2] dark:border-white/[0.2] max-w-sm   p-4 bg-zinc-900 relative bg-opacity-60 ">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
        
        {
      
         <Chip
        endContent={<NotificationIcon size={18} />}
        variant="flat"
        color="secondary"
        className={ `mb-3 ${id==="f1" && "invisible"}`}
      >
        Coming soon
       </Chip>}
          <p className="mb-4 text-lg font-bold md:text-2xl md:leading-snug  bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            {cardTitle}
          </p>
          <p className=" leading-relaxed text-gray-400 dark:text-gray-200 animate-in">
        {cardDescp}
          </p>
        </div>
      </a>
    </>
  );
}

export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};