export default function FeatureCard(props) {
  const { cardTitle } = props;

  return (
    <>
      <span class="absolute flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
      <a
        href="#"
        rel="noreferrer"
        className="font-mono font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
      >
        <div className=" max-w-sm border p-8 rounded-md ">
          <p className="mb-4 text-lg font-bold md:text-2xl md:leading-snug">
            {cardTitle}
          </p>
          <p className=" leading-relaxed text-gray-200 animate-in">
            Start your dynamic QR adventure with us, shaping connections that
            evolve with every scan.
          </p>
        </div>
      </a>
    </>
  );
}
