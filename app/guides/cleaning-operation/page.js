import Link from 'next/link';

export const metadata = {
  title: 'Cleaning & Operation Guide - The Pool Lab',
  description: 'Best practices for daily use and maximizing cleaning cycles of your robot pool cleaner.',
};

export default function CleaningOperation() {
  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/guides">Guides</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Cleaning & Operation</li>
        </ol>
      </nav>

      <h1 className="mb-4">Cleaning & Operation Guide</h1>
      <p className="lead mb-5">Maximize your pool's cleanliness with these operational tips for your robot cleaner.</p>

      <div className="row">
        <div className="col-md-6">
          <h3>Before You Start</h3>
          <ul className="list-group mb-4">
            <li className="list-group-item"><strong>Remove Large Debris:</strong> Fish out large branches or toys manually. They can jam the intake.</li>
            <li className="list-group-item"><strong>Check Chemistry:</strong> High chlorine or low pH can damage the robot's plastic over time. Ensure water is balanced.</li>
            <li className="list-group-item"><strong>Clear the Pool:</strong> Remove thermometers, floats, and ladders (if possible) to give the robot a clear path.</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h3>During Operation</h3>
          <ul className="list-group mb-4">
            <li className="list-group-item"><strong>Submerge Properly:</strong> Place the cleaner in the pool and tilt it side-to-side to release trapped air. It should sink to the bottom.</li>
            <li className="list-group-item"><strong>Spread the Cable:</strong> Uncoil the cable fully and spread it over the water surface to prevent tangling.</li>
            <li className="list-group-item"><strong>Let it Finish:</strong> Allow the cleaner to run its full cycle for the best results. Don't pull it out halfway.</li>
          </ul>
        </div>
      </div>

      <div className="alert alert-info mt-4" role="alert">
        <strong>Pro Tip:</strong> If your pool is exceptionally dirty (like after a storm), run two cycles. Clean the filters in between the cycles to maintain suction power.
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h3>After Cleaning</h3>
          <p>Once the cycle is complete:</p>
          <ol>
            <li>Pull the cleaner to the surface using the cable.</li>
            <li><strong>STOP</strong> when it reaches the waterline. Do not lift it by the cable.</li>
            <li>Grab the handle to lift it onto the deck.</li>
            <li>Drain the water immediately.</li>
            <li>Clean the filters right away—dried debris is much harder to remove later.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}