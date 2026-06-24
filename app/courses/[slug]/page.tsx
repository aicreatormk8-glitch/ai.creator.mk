import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CourseDetail } from '@/components/CourseDetail';
import { COURSE_SLUGS, getCourse } from '@/lib/courses';

export function generateStaticParams() {
  return COURSE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const course = getCourse('ua', params.slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.subtitle,
    openGraph: {
      title: `${course.title} · AI Creator MK`,
      description: course.subtitle,
    },
  };
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  if (!COURSE_SLUGS.includes(params.slug)) return notFound();
  return <CourseDetail slug={params.slug} />;
}
