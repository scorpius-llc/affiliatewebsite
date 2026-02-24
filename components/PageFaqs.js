'use client';

import { usePathname } from 'next/navigation';
import faqs from '../data/faqs.json';
import FaqSection from './FaqSection';

export default function PageFaqs() {
  const pathname = usePathname();
  // Extract the slug or ID from the pathname (e.g., /blog/my-slug/ -> my-slug)
  const slug = pathname.split('/').filter(Boolean).pop();

  const pageFaqs = faqs.find(f => f.id === slug);

  if (!pageFaqs) {
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageFaqs.questions.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <hr className="my-5" />
      <FaqSection questions={pageFaqs.questions} />
    </>
  );
}