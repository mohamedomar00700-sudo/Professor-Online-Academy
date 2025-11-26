
import React from 'react';

/**
 * A simple loading spinner component.
 * @param {boolean} overlay - If true, it renders as a full-screen overlay.
 */
export const LoadingSpinner: React.FC<{ overlay?: boolean }> = ({ overlay = false }) => {
    if (overlay) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-[100]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }
    // Inline spinner for buttons
    return <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>;
};