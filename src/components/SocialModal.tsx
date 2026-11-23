import React from 'react';
import { ExternalLink, X } from 'lucide-react';
import { SCHOOL_IMAGES } from '../data/schoolData';
import { FacebookIcon, InstagramIcon, RainbowLogo } from './RainbowLogo';
import { ResilientImage } from './ResilientImage';
import { SlideInFrame } from './SlideInFrame';

interface SocialModalProps {
  network: 'facebook' | 'instagram' | null;
  onClose: () => void;
}

export const SocialModal: React.FC<SocialModalProps> = ({ network, onClose }) => {
  if (!network) return null;

  const isFb = network === 'facebook';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isFb ? 'Rainbow School on Facebook' : 'Rainbow School on Instagram'}
    >
      <div className="bg-[#FBF9F5] border border-stone-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        <div className="grid grid-cols-4 h-1.5 w-full">
          <div className="bg-[#C85A32]" />
          <div className="bg-[#1E6B52]" />
          <div className="bg-[#264B8A]" />
          <div className="bg-[#8B1E2D]" />
        </div>
        <div className="bg-[#10233D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isFb ? (
              <FacebookIcon className="w-5 h-5 text-[#60A5FA]" />
            ) : (
              <InstagramIcon className="w-5 h-5 text-[#F472B6]" />
            )}
            <div>
              <p className="text-sm font-semibold">
                {isFb ? 'Rainbow School on Facebook' : 'Rainbow School on Instagram'}
              </p>
              <p className="text-xs text-stone-300 font-mono">
                {isFb ? '@RainbowSchoolOfficial' : '@rainbowschool.campus'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close social preview"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <RainbowLogo size={42} />
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#10233D]">Rainbow School</h3>
              <p className="text-xs text-stone-500">
                Kindergarten to Grade 10 · Oakridge Campus Chronicles
              </p>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-xl overflow-hidden border border-stone-200">
            <SlideInFrame key={network} className="w-full h-full" distancePx={44} durationMs={640}>
              <ResilientImage
                src={isFb ? SCHOOL_IMAGES.campusHero : SCHOOL_IMAGES.kindergartenRoom}
                alt="Recent Rainbow School campus highlight"
                className="w-full h-full object-cover"
                fallbackLabel="Rainbow School Highlights"
              />
            </SlideInFrame>
          </div>

          <p className="text-sm text-[#44403C] leading-relaxed">
            {isFb
              ? 'Follow our official Facebook page for parent-teacher conference dates, varsity match recaps, open house livestreams, and school calendar notices.'
              : 'Follow @rainbowschool.campus on Instagram for daily snapshots from our Kindergarten art studios, Grade 8–10 science labs, and Oakridge track meets.'}
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 border border-stone-300 rounded-md text-sm text-stone-700 bg-white"
            >
              Close
            </button>
            <a
              href={isFb ? 'https://www.facebook.com' : 'https://www.instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2 bg-[#8B1E2D] hover:bg-[#721623] text-white text-sm font-medium rounded-md inline-flex items-center gap-2"
            >
              <span>Open {isFb ? 'Facebook' : 'Instagram'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
