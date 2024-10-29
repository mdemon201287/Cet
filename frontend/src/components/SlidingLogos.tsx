// frontend/src/app/components/SlidingLogos.tsx

import Image from 'next/image';

const logos = [
  { src: "/images/Gong.png", alt: "Gong" },
  { src: "/images/automattic.png", alt: "Automattic" },
  { src: "/images/Hashicorp.png", alt: "Hashicorp" },
  { src: "/images/activecampaign.png", alt: "ActiveCampaign" },
  { src: "/images/evernote.png", alt: "Evernote" },
  { src: "/images/pipedrive.png", alt: "Pipedrive" },
  { src: "/images/Airwales.png", alt: "Airwallex" },
];

export default function SlidingLogos() {
  return (
    <section>
      <div className="my-16 relative flex overflow-x-hidden bg-[#EEEEEE]">
        <div className="py-12 animate-infinite-scroll flex space-x-6 sm:space-x-12 md:space-x-16 lg:space-x-24">
          {logos.map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-6 sm:h-10 md:h-12 lg:h-16 w-auto max-w-none"
              width={256}
              height={256}
            />
          ))}
        </div>
        <div className="py-12 animate-infinite-scroll flex space-x-6 sm:space-x-12 md:space-x-16 lg:space-x-24" aria-hidden="true">
          {logos.map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-6 sm:h-10 md:h-12 lg:h-16 w-auto max-w-none"
              width={256}
              height={256}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
