import Link from 'next/link';
import bestLists from '../../data/best-lists.json';
import PageFaqs from '../../components/PageFaqs';
import pageContent from '../../data/best-of-page.json';

export default function BestOf() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">{pageContent.title}</h1>
      <p className="lead text-center mb-5">{pageContent.subtitle}</p>

      <div className="row mb-5">
        {bestLists.map((list, index) => (
          <div key={list.id} className="col-md-4 mb-3">
            <div className={`card text-center h-100 ${index === 0 ? 'border-primary' : ''}`}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{list.title}</h5>
                <p className="card-text">{list.description}</p>
                <Link href={`/best-of/${list.id}`} className={`btn ${index === 0 ? 'btn-primary' : 'btn-outline-primary'} mt-auto`}>View List</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h3>{pageContent.whyTrustTitle}</h3>
          <p className="text-muted">{pageContent.whyTrustContent}</p>
        </div>
      </div>

      <PageFaqs />

    </div>
  );
}