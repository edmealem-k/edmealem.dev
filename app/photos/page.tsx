import { Slide } from "../animation/Slide";
import Image from "next/image";
import { Metadata } from "next";
import PageHeading from "@/app/components/shared/PageHeading";
import { siteConfig } from "@/config/site";

const images = [
  {
    id: "1",
    src: "/images/photos/certification of graduation.jpg",
    alt: "Bahir Dar University Temporary Certificate of Graduation — B.Sc. in Software Engineering",
  },
  {
    id: "2",
    src: "/images/photos/image_2026-10-09_21-16-27.png",
    alt: "Personal photograph",
  },
  {
    id: "3",
    src: "/images/photos/avatar-1.jpg",
    alt: "Developer avatar",
  },
];

export const metadata: Metadata = {
  title: `Photos | ${siteConfig.name}`,
  metadataBase: new URL(`${siteConfig.siteUrl}/photos`),
  description: `Photos and visual notes from ${siteConfig.name}`,
  openGraph: {
    title: `Photos | ${siteConfig.name}`,
    url: `${siteConfig.siteUrl}/photos`,
    description: `Photos and visual notes from ${siteConfig.name}`,
    images: "/edmealem_kassahun.jpg",
  },
};

export default function Photos() {
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <PageHeading
        title="Photos"
        description="Moments, academic milestones, and snapshots."
      />
      <figure className="my-6">
        <Slide delay={0.12} className="flex flex-wrap gap-4">
          {images.map((image) => (
            <Image
              key={image.id}
              src={image.src}
              alt={image.alt}
              width={350}
              height={450}
              className="dark:bg-primary-bg bg-secondary-bg object-cover rounded-md max-h-[450px]"
              style={{ width: "auto", height: "auto" }}
            />
          ))}
        </Slide>
      </figure>
    </main>
  );
}
