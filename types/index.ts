export type ProfileType = {
  fullName: string;
  headline: string;
  profileImage: {
    image: string;
    alt: string;
    lqip?: string;
  };
  shortBio: string;
  email?: string;
  fullBio?: string;
  location: string;
  resumeURL?: string;
  og?: string;
};

export type Experience = {
  id: string;
  _id?: string;
  company: string;
  name?: string;
  role: string;
  jobTitle?: string;
  companyUrl: string;
  url?: string;
  logo: string;
  startDate: string | null;
  endDate: string | null;
  current: boolean;
  verifiedDates: boolean;
  summary: string;
  description?: string;
};

export type JobType = Experience;

export type EducationType = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
  location?: string;
  description?: string;
  logo: string;
  url?: string;
};

export type ProjectType = {
  _id?: string;
  name: string;
  slug: string;
  tagline: string;
  summary?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  order?: number;
  tags?: string[];
  projectUrl?: string | null;
  repository?: string | null;
  logo?: string;
  coverImage?: {
    image: string;
    alt: string | null;
    lqip?: string;
  };
  content?: string;
  published?: boolean;
};

export type PostType = {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  description: string;
  canonicalLink?: string;
  date?: string;
  coverImage?: {
    image: string;
    alt: string | null;
    lqip?: string;
  };
  tags: string[];
  author: {
    name: string;
    photo: {
      image: string;
      alt: string;
    };
    twitterUrl: string;
  };
  body?: string;
  content?: string;
  featured?: boolean;
  isPublished?: boolean;
  published?: boolean;
  readingTime?: string;
};

export type HeroeType = {
  _id: string;
  _createdAt?: string;
  name: string;
  url: string;
  met: boolean;
};
