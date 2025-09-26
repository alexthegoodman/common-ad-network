"use client";

import { Trophy } from "@phosphor-icons/react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <Trophy size={20} className="text-white" weight="bold" />
          </div>
          <span className="text-xl font-bold">Common Ad Network</span>
        </div>
        <p className="text-gray-400 text-sm font-sans">
          Built by indie makers, for indie makers. Support the community that
          supports you.
        </p>
      </div>
    </footer>
  );
};
