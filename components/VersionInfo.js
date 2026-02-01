'use client';

import { useState, useEffect } from 'react';

export default function VersionInfo() {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch('/version.json?t=' + new Date().getTime())
      .then(res => res.json())
      .then(data => setVersion(data))
      .catch(err => console.error('Failed to load version info', err));
  }, []);

  if (!version) return null;

  return (
    <small className="d-block text-white-50 mt-2" style={{ fontSize: '0.75rem' }}>
      Last Updated: {version.date} at {version.time}
    </small>
  );
}