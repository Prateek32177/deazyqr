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
        className="font-mono w-3/4 md:w-full m-auto  font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
      >
        <div className="  max-w-sm border p-8 rounded-md ">
        {id!=="f1" &&  <Chip
        endContent={<NotificationIcon size={18} />}
        variant="flat"
        color="secondary"
        className="mb-3"
      >
        Coming soon
       </Chip>}
          <p className="mb-4 text-lg font-bold md:text-2xl md:leading-snug">
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
