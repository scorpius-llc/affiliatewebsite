export const getComparisonFaqs = (comparison) => {
  if (comparison?.faqs?.length) {
    return comparison.faqs;
  }

  const left = comparison?.left_option?.title || 'Option A';
  const right = comparison?.right_option?.title || 'Option B';

  return [
    {
      question: 'Which option is better for most people?',
      answer: `${left} is usually the better fit when buyers want the safer, more practical all-around choice. ${right} can still be the better buy when its specific strengths match your priorities more closely.`,
    },
    {
      question: 'Is the more expensive option worth it?',
      answer: `The more expensive option is only worth it if you will actually use the added convenience, performance, or build quality. If those benefits do not change your routine meaningfully, the cheaper option is usually the better value.`,
    },
    {
      question: 'What are the main trade-offs between these options?',
      answer: `${left} and ${right} solve the same decision from different angles, so the trade-offs usually come down to cost, convenience, maintenance, and long-term ownership fit. The better option is the one whose trade-offs feel acceptable in your real routine, not just on paper.`,
    },
    {
      question: 'Which option is easier to maintain?',
      answer: `The easier option to maintain is usually the one with fewer moving parts, lower upkeep demands, and less day-to-day effort. Buyers should weigh maintenance realistically, because friction after purchase often matters more than feature lists.`,
    },
    {
      question: 'Which option is better for beginners?',
      answer: `Beginners usually do better with the option that is simpler to set up, easier to use consistently, and less expensive to try. Lower friction is often more important than maximum performance at the start.`,
    },
    {
      question: 'What is the long-term cost difference?',
      answer: `Long-term cost is not just the purchase price. It also includes upkeep, replacement needs, energy or consumable costs, and whether the setup actually supports regular use over time.`,
    },
    {
      question: 'Which option provides better performance or results?',
      answer: `The better-performing option depends on what result you care about most. Buyers should compare the kind of performance that actually affects ownership and daily use, rather than assuming the pricier option automatically wins.`,
    },
  ];
};

export default function ComparisonFAQ({ faqs }) {
  if (!faqs?.length) {
    return null;
  }

  return (
    <section className="money-section comparison-faq-section">
      <div className="section-heading">
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="comparison-faq-list">
        {faqs.map((faq) => (
          <article key={faq.question} className="comparison-faq-card">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
