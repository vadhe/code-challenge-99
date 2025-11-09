interface SwapButtonProps {
  onClick: () => void;
}

export const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center mx-auto mt-6 border p-2 rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#737373"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-down-up-icon lucide-arrow-down-up"
      >
        <path d="m3 16 4 4 4-4" />
        <path d="M7 20V4" />
        <path d="m21 8-4-4-4 4" />
        <path d="M17 4v16" />
      </svg>
    </div>
  );
};