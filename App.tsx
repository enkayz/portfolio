import React from 'react';

const App: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#050505',
        color: '#b5e853',
        fontFamily: 'Fira Code, monospace',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          border: '1px solid rgba(181, 232, 83, 0.25)',
          borderRadius: '12px',
          padding: '2rem',
          background: 'rgba(0, 0, 0, 0.4)',
          boxShadow: '0 0 24px rgba(181, 232, 83, 0.2)',
        }}
      >
        <div style={{ borderBottom: '1px solid rgba(181, 232, 83, 0.25)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <h1 style={{ color: '#fffa8b', fontSize: '2.2rem', lineHeight: 1.2, marginBottom: '0.5rem' }}>
            Dylan Boekelman –
            <br />
            Systems & DevOps Engineer
          </h1>
          <p style={{ margin: 0, color: '#8df4ff', fontSize: '1rem' }}>Sydney | ecom@system8.com.au</p>
          <p style={{ margin: '0.2rem 0 0', color: '#8df4ff', fontSize: '1rem' }}>
            Systems &amp; DevOps Engineer + Telephony &amp; Audio-Visual Technologist
          </p>
        </div>

        <p style={{ margin: 0, color: '#8df4ff', fontSize: '1rem' }}>
          Explore the interactive shell at:
          <br />
          <a
            href="https://www.system8.com.au"
            style={{ color: '#b5e853', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.4rem' }}
          >
            www.system8.com.au
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
