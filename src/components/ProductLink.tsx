import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ProductLinkProps {
  url: string;
}

export function ProductLink({ url }: ProductLinkProps) {
  useEffect(() => {
    const toastId = toast.success(
      (t) => (
        <div className="flex items-center gap-3">
          <span>Your design is ready!</span>
          <button
            onClick={() => {
              window.open(url, '_blank');
              toast.dismiss(t.id);
            }}
            className="px-3 py-1 text-sm bg-white text-purple-600 rounded-md hover:bg-purple-50 transition-colors"
          >
            View Design
          </button>
        </div>
      ),
      {
        duration: Infinity,
        position: 'bottom-right',
      }
    );

    return () => {
      toast.dismiss(toastId);
    };
  }, [url]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="backdrop-blur-lg bg-white/90 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <span>View Your Just One Original</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}