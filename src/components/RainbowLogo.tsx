import React from 'react';

interface RainbowLogoProps {
  className?: string;
  size?: number;
}

export const RainbowLogo: React.FC<RainbowLogoProps> = ({ className = '', size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Classical Crest Shield Backdrop */}
      <rect x="2" y="2" width="44" height="44" rx="10" fill="#10233D" />
      <rect x="4.5" y="4.5" width="39" height="39" rx="8" stroke="#B08D57" strokeWidth="1" strokeOpacity="0.6" />

      {/* Refined 5-Band Academic Rainbow Arch */}
      <path
        d="M10 29C10 21.268 16.268 15 24 15C31.732 15 38 21.268 38 29"
        stroke="#C83E4D"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M13 29C13 22.925 17.925 18 24 18C30.075 18 35 22.925 35 29"
        stroke="#E08E45"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M16 29C16 24.582 19.582 21 24 21C28.418 21 32 24.582 32 29"
        stroke="#E8B954"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M19 29C19 26.239 21.239 24 24 24C26.761 24 29 26.239 29 29"
        stroke="#3A8E6B"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M21.8 29C21.8 27.785 22.785 26.8 24 26.8C25.215 26.8 26.2 27.785 26.2 29"
        stroke="#4F86C6"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Open Scholarly Book Base */}
      <path
        d="M13 33.5C16.5 32 20.5 32.3 24 34.5C27.5 32.3 31.5 32 35 33.5V36.5C31.5 35 27.5 35.3 24 37.5C20.5 35.3 16.5 35 13 36.5V33.5Z"
        fill="#FBF9F5"
      />
    </svg>
  );
};

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
