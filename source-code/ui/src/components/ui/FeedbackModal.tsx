import { CheckCircle, AlertCircle, X } from 'lucide-react';

type FeedbackModalProps = {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  details?: string[];
  onClose: () => void;
};

export function FeedbackModal({ type, title, message, details, onClose }: FeedbackModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-12 h-12 text-red-500" />;
      case 'info':
        return <AlertCircle className="w-12 h-12 text-orange-500" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          button: 'bg-green-500 hover:bg-green-600'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          button: 'bg-red-500 hover:bg-red-600'
        };
      case 'info':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          button: 'bg-orange-500 hover:bg-orange-600'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className={`${colors.bg} ${colors.border} border rounded-full p-3 mb-4`}>
              {getIcon()}
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{message}</p>
            
            {details && details.length > 0 && (
              <div className={`${colors.bg} ${colors.border} border rounded-lg p-4 w-full mb-4`}>
                <div className="space-y-2 text-left">
                  {details.map((detail, index) => (
                    <p key={index} className="text-sm text-gray-700">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className={`w-full px-4 py-3 ${colors.button} text-white rounded-lg transition-colors`}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}