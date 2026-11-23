import React, { useState } from 'react';
import { Bus, Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { CAMPUS_BUILDINGS, SCHOOL_IMAGES } from '../data/schoolData';
import { FacebookIcon, InstagramIcon } from './RainbowLogo';
import { ResilientImage } from './ResilientImage';
import { SlideInFrame } from './SlideInFrame';

export const LocationPage: React.FC<{
  onOpenSocialModal: (network: 'facebook' | 'instagram') => void;
}> = ({ onOpenSocialModal }) => {
  const [activeBuildingId, setActiveBuildingId] = useState(CAMPUS_BUILDINGS[0].id);
  const activeBuilding =
    CAMPUS_BUILDINGS.find((b) => b.id === activeBuildingId) || CAMPUS_BUILDINGS[0];

  return (
    <div className="bg-[#FBF9F5]">
      {/* Masthead */}
      <section className="bg-[#10233D] text-white border-b border-[#1E3B62]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <p className="text-xs uppercase tracking-[0.18em] text-[#E8C587]">
            Campus Location &amp; Directions
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold mt-2">
            Visit Rainbow School
          </h1>
          <p className="text-base text-stone-200 leading-relaxed max-w-xl mt-2">
            742 Crestview Meadow Lane, Oakridge District · Gate B Visitor Parking · 14 GPS Bus
            Routes.
          </p>
        </div>
      </section>

      {/* Interactive Architectural Campus Map + Building Details */}
      <section className="py-12 md:py-16 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Map Schematic */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-shadow duration-200">
            <div className="h-1.5 w-full bg-[#10233D]" />
            <div className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#10233D]">
                  Interactive 18-Acre Campus Map
                </h2>
                <p className="text-xs text-stone-500">
                  Select any campus pavilion below to view hours and department locations.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=742+Crestview+Meadow+Lane"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] px-3.5 py-2 bg-[#F3EFE6] hover:bg-stone-200 text-[#10233D] text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#8B1E2D]" />
                <span>Get GPS Directions</span>
              </a>
            </div>

            {/* Clean Architectural SVG Campus Schematic */}
            <div className="bg-[#F3EFE6] border border-stone-200 rounded-lg p-4 overflow-hidden">
              <svg viewBox="0 0 640 360" className="w-full h-auto" role="img" aria-label="Interactive Rainbow School Campus Map">
                {/* Campus Grounds & Paths */}
                <rect x="0" y="0" width="640" height="360" fill="#EFEAE0" rx="8" />
                <path d="M40 315 H600" stroke="#CBD5E1" strokeWidth="18" />
                <text x="320" y="319" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="monospace">
                  CRESTVIEW MEADOW LANE · MAIN VISITOR GATE B
                </text>
                {/* Central Courtyard Quadrangle */}
                <rect x="210" y="130" width="210" height="120" rx="8" fill="#D9E6D4" stroke="#9BB693" strokeWidth="1.5" />
                <text x="315" y="194" textAnchor="middle" fontSize="11" fill="#14532D" fontWeight="600">
                  OAKRIDGE QUADRANGLE
                </text>

                {/* Building 1: Heritage Hall */}
                <g
                  onClick={() => setActiveBuildingId('heritage')}
                  className="cursor-pointer"
                >
                  <rect
                    x="48"
                    y="120"
                    width="138"
                    height="135"
                    rx="6"
                    fill={activeBuildingId === 'heritage' ? '#10233D' : '#FFFFFF'}
                    stroke="#10233D"
                    strokeWidth="2"
                  />
                  <text
                    x="117"
                    y="180"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={activeBuildingId === 'heritage' ? '#FFFFFF' : '#10233D'}
                  >
                    Heritage Hall
                  </text>
                  <text
                    x="117"
                    y="198"
                    textAnchor="middle"
                    fontSize="10"
                    fill={activeBuildingId === 'heritage' ? '#E8C587' : '#8B1E2D'}
                  >
                    Admissions · Admin
                  </text>
                </g>

                {/* Building 2: Kindergarten Wing */}
                <g
                  onClick={() => setActiveBuildingId('kindergarten')}
                  className="cursor-pointer"
                >
                  <rect
                    x="210"
                    y="28"
                    width="210"
                    height="82"
                    rx="6"
                    fill={activeBuildingId === 'kindergarten' ? '#10233D' : '#FFFFFF'}
                    stroke="#10233D"
                    strokeWidth="2"
                  />
                  <text
                    x="315"
                    y="66"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={activeBuildingId === 'kindergarten' ? '#FFFFFF' : '#10233D'}
                  >
                    Kindergarten & Primary Wing
                  </text>
                  <text
                    x="315"
                    y="84"
                    textAnchor="middle"
                    fontSize="10"
                    fill={activeBuildingId === 'kindergarten' ? '#E8C587' : '#57534E'}
                  >
                    KG-1 to Grade 4 · Sensory Garden
                  </text>
                </g>

                {/* Building 3: Science & Library Pavilion */}
                <g
                  onClick={() => setActiveBuildingId('pavilion')}
                  className="cursor-pointer"
                >
                  <rect
                    x="445"
                    y="28"
                    width="155"
                    height="100"
                    rx="6"
                    fill={activeBuildingId === 'pavilion' ? '#10233D' : '#FFFFFF'}
                    stroke="#10233D"
                    strokeWidth="2"
                  />
                  <text
                    x="522"
                    y="72"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={activeBuildingId === 'pavilion' ? '#FFFFFF' : '#10233D'}
                  >
                    Science & Library
                  </text>
                  <text
                    x="522"
                    y="90"
                    textAnchor="middle"
                    fontSize="10"
                    fill={activeBuildingId === 'pavilion' ? '#E8C587' : '#57534E'}
                  >
                    Labs · Grades 5–10
                  </text>
                </g>

                {/* Building 4: Athletic Stadium & Aquatics */}
                <g
                  onClick={() => setActiveBuildingId('athletics')}
                  className="cursor-pointer"
                >
                  <rect
                    x="445"
                    y="150"
                    width="155"
                    height="125"
                    rx="6"
                    fill={activeBuildingId === 'athletics' ? '#10233D' : '#FFFFFF'}
                    stroke="#8B1E2D"
                    strokeWidth="2"
                  />
                  <text
                    x="522"
                    y="206"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={activeBuildingId === 'athletics' ? '#FFFFFF' : '#8B1E2D'}
                  >
                    Athletics & Pool
                  </text>
                  <text
                    x="522"
                    y="224"
                    textAnchor="middle"
                    fontSize="10"
                    fill={activeBuildingId === 'athletics' ? '#E8C587' : '#57534E'}
                  >
                    400m Track · Arena
                  </text>
                </g>
              </svg>
            </div>

            {/* Quick Building Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CAMPUS_BUILDINGS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveBuildingId(b.id)}
                  className={`min-h-[42px] px-3 py-2 rounded-md text-xs font-medium border text-left transition-colors ${
                    activeBuildingId === b.id
                      ? 'bg-[#10233D] text-white border-[#10233D]'
                      : 'bg-[#FBF9F5] text-[#10233D] border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span className="block font-mono text-[10px] opacity-75">{b.code}</span>
                  <span className="block truncate">{b.name.split('&')[0].trim()}</span>
                </button>
              ))}
            </div>
            </div>
          </div>

          {/* Right Info Column: Active Building + Address + Social */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(16,35,61,0.12)] hover:shadow-xl transition-all duration-200">
              <div className="h-1.5 w-full bg-[#264B8A]" />
              <div className="aspect-[16/9] overflow-hidden bg-stone-100">
                <SlideInFrame key={activeBuildingId} className="w-full h-full" distancePx={48} durationMs={640}>
                  <ResilientImage
                    src={
                      activeBuildingId === 'kindergarten'
                        ? SCHOOL_IMAGES.kindergartenRoom
                        : activeBuildingId === 'pavilion'
                        ? SCHOOL_IMAGES.admissionsLibrary
                        : activeBuildingId === 'athletics'
                        ? SCHOOL_IMAGES.athleticsField
                        : SCHOOL_IMAGES.campusHero
                    }
                    alt={activeBuilding.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    fallbackLabel={activeBuilding.name}
                  />
                </SlideInFrame>
              </div>
              <div className="p-6 space-y-2.5">
                <p className="text-xs font-mono text-[#8B1E2D]">{activeBuilding.code} · SELECTED BUILDING</p>
                <h3 className="font-serif text-2xl font-semibold text-[#10233D]">
                  {activeBuilding.name}
                </h3>
                <p className="text-sm text-[#44403C] leading-relaxed">{activeBuilding.summary}</p>
                <p className="text-xs text-stone-500 flex items-center gap-2 pt-2 border-t border-stone-100 tabular-nums">
                  <Clock className="w-4 h-4 text-[#264B8A]" />
                  <span>{activeBuilding.hours}</span>
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200">
              <div className="h-1.5 w-full bg-[#1E6B52]" />
              <div className="p-6 space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#10233D]">
                  Campus Address & Transit
                </h3>
                <div className="space-y-3 text-sm text-[#44403C]">
                  <p className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#8B1E2D] shrink-0 mt-1" />
                    <span>
                      <strong className="text-[#10233D]">Rainbow School Oakridge Campus</strong>
                      <br />
                      742 Crestview Meadow Lane, Oakridge District, 75230
                    </span>
                  </p>
                  <p className="flex items-center gap-3 tabular-nums">
                    <Phone className="w-4 h-4 text-[#10233D] shrink-0" />
                    <span>Main Reception: (555) 392-4810 · Admissions: Ext. 103</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#1E6B52] shrink-0 mt-1" />
                    <span>
                      <strong className="text-[#10233D]">Official Rainbow School Mail</strong>
                      <br />
                      <span className="text-xs font-mono text-stone-600 block mt-0.5">
                        General: info@rainbowschool.edu · Admissions: admissions@rainbowschool.edu
                        <br />
                        Principal: principal@rainbowschool.edu · Athletics: athletics@rainbowschool.edu
                      </span>
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Bus className="w-4 h-4 text-[#10233D] shrink-0 mt-1" />
                    <span>
                      14 GPS-monitored school bus routes serving North, East, West, and Central
                      Oakridge neighborhoods.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Follow Card */}
            <div className="bg-gradient-to-br from-[#10233D] via-[#132B4D] to-[#1D3B68] text-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200">
              <div className="grid grid-cols-4 h-1.5 w-full">
                <div className="bg-[#C85A32]" />
                <div className="bg-[#1E6B52]" />
                <div className="bg-[#264B8A]" />
                <div className="bg-[#8B1E2D]" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-serif text-xl font-semibold">
                  Follow Rainbow School Online
                </h3>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Stay connected with campus events, sports results, and classroom highlights on
                  Facebook and Instagram.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenSocialModal('facebook')}
                    className="min-h-[44px] px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-medium flex items-center justify-center gap-2.5 transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4 text-[#60A5FA]" />
                    <span>Facebook</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenSocialModal('instagram')}
                    className="min-h-[44px] px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-medium flex items-center justify-center gap-2.5 transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#F472B6]" />
                    <span>Instagram</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
