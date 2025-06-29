import React, { useState } from 'react';
import { Download, X, ExternalLink, FileText, AlertCircle } from 'lucide-react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume_Mahesh.pdf';
    link.download = 'Mahesh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open('/Resume_Mahesh.pdf', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl">
        {/* Compact Header with Logo Only */}
        <div className="flex items-center justify-between p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700">
          {/* Left Section - Just Logo and Title */}
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">Resume</span>
          </div>
          
          {/* Right Section - Compact Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-1 bg-indigo-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md hover:bg-indigo-700 transition-colors text-xs sm:text-sm font-medium touch-manipulation"
              title="Download Resume"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            
            <button
              onClick={handleOpenInNewTab}
              className="flex items-center justify-center p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors touch-manipulation bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
              title="Open in New Tab"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            
            <button
              onClick={onClose}
              className="flex items-center justify-center p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors touch-manipulation bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
              title="Close"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mx-auto mb-3 sm:mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Loading resume...</p>
              </div>
            </div>
          )}
          <iframe
            src="/Resume_Mahesh.pdf"
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
            title="Mahesh Resume"
          />
        </div>

        {/* Minimal Bottom Banner */}
        <div className="bg-gray-900 px-3 py-2 flex items-center justify-between text-white text-xs">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-3 w-3" />
            <span>Can't view?</span>
          </div>
          <button
            onClick={handleDownload}
            className="text-gray-300 hover:text-white underline transition-colors"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;