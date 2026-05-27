import React from 'react';
import ProductScene from './ProductScene';
import BlockchainVerificationMockup from './BlockchainVerificationMockup';
import LiveDashboardMockup from './LiveDashboardMockup';
import AgriTechMockup from './AgriTechMockup';
import AIScannerMockup from './AIScannerMockup';
import OMSMockup from './OMSMockup';

const PRODUCTS = [
  {
    title: 'Degree Verification Portal',
    description: 'A decentralized, smart contract-powered academic credential verification network that stores certs securely. It protects institutions from document forgery and bypasses centralized delays through tamper-proof QR logs.',
    tags: ['Blockchain', 'Education', 'Smart Contracts', 'Security'],
    status: 'VERIFIED',
    features: [
      'Store degrees on blockchain',
      'Tamper-proof certificate records',
      'Instant QR-based credential check',
      'P2P consensus verification',
      'Immutable audit history',
      'Smart contract-based minting'
    ],
    MockupComponent: BlockchainVerificationMockup
  },
  {
    title: 'University Management System',
    description: 'A comprehensive, high-throughput operating system for advanced universities to streamline fee collection, student attendance, term examinations, and role-based administrative workflows from one secure control room.',
    tags: ['EdTech', 'SaaS', 'ERP', 'Automation'],
    status: 'LIVE',
    features: [
      'Interactive student registers',
      'Real-time faculty trackers',
      'Exam timeline schedules',
      'Unified fee portals',
      'Performance analytics panels',
      'Role-based security layers'
    ],
    MockupComponent: LiveDashboardMockup
  },
  {
    title: 'AgriConnect Platform',
    description: 'A smart agritech network connecting farmers, Mandi buyers, and crop advisors. Integrates real-time mandi prices, satellite crop health scanners, and AI diagnosis interfaces to optimize yield returns.',
    tags: ['AgriTech', 'Marketplace', 'Advisory', 'AI Diagnostics'],
    status: 'LIVE',
    features: [
      'AI-powered crop health scanner',
      'Live Mandi price ticker',
      'Expert consultations chat',
      'Weather-crop alerts index',
      'NPK soil content tracking',
      'Secure buyer/seller channels'
    ],
    MockupComponent: AgriTechMockup
  },
  {
    title: 'Grade AI Engine',
    description: 'An AI-powered paper correction and grading agent utilizing high-precision handwriting OCR and rubric compliance models. Generates detailed feedback and calculates marks instantly.',
    tags: ['AI', 'Education', 'OCR Scanner', 'Automation'],
    status: 'ANALYZING',
    features: [
      'OCR answer sheet parsing',
      'Rubric matching indexer',
      'Instant marks calculation',
      'AI-generated text feedback',
      'Confidence score metrics',
      'Teacher revision interfaces'
    ],
    MockupComponent: AIScannerMockup
  },
  {
    title: 'Online Management System (OMS)',
    description: 'An enterprise task pipeline and collaborative scheduling workspace. Synthesizes task board flows, generates automated AI meeting transcripts, and optimizes organization sprint velocities.',
    tags: ['OMS', 'Productivity', 'Meetings', 'Workflow'],
    status: 'DEPLOYED',
    features: [
      'Kanban task board sprint views',
      'AI meeting summaries (MOM)',
      'Productivity velocity tracker',
      'Calendar booking managers',
      'Team task activity tickers',
      'Collaborative chat feeds'
    ],
    MockupComponent: OMSMockup
  }
];

export default function ProductShowcase() {
  return (
    <div id="products" className="relative bg-cyber-bg">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      
      {/* Section Title */}
      <div className="pt-24 pb-8 px-4 text-center max-w-4xl mx-auto relative z-10">
        <span className="font-mono text-xs text-neon-green tracking-widest block mb-3 animate-pulse">SYSTEM_APPLICATIONS</span>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-cyber mb-4">
          Flagship Technologies
        </h2>
        <div className="h-0.5 w-24 bg-neon-green mx-auto mb-6 shadow-[0_0_8px_#22ff66]" />
        <p className="text-cyber-text text-sm md:text-base font-mono">
          Exploration portals for our five production-grade enterprise platforms. Select any engine to initiate live simulation telemetry.
        </p>
      </div>

      {/* Render Product Sections */}
      <div>
        {PRODUCTS.map((product, index) => (
          <ProductScene key={product.title} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
