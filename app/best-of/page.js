import Link from 'next/link';
import bestLists from '../../data/best-lists.json';
import PageFaqs from '../../components/PageFaqs';

export default function BestOf() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Best Robot Pool Cleaners: Curated Lists</h1>
      <p className="lead text-center mb-5">We've tested dozens of models to help you find the perfect cleaner for your specific pool and budget.</p>

      <div className="row mb-5">
        {bestLists.map((list, index) => (
          <div key={list.id} className="col-md-4 mb-3">
            <div className={`card text-center h-100 ${index === 0 ? 'border-primary' : ''}`}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{list.title}</h5>
                <p className="card-text">{list.description}</p>
                <Link href={`/best-of/${list.id}/`} className={`btn ${index === 0 ? 'btn-primary' : 'btn-outline-primary'} mt-auto`}>View List</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h3>Why Trust Our Lists?</h3>
          <p className="text-muted">Our rankings are based on real-world performance metrics, including cleaning cycle efficiency, filtration capacity, and long-term durability. We don't just look at the spec sheet; we look at how these robots perform in actual pools.</p>
        </div>
      </div>

      <PageFaqs />

    </div>
  );
}