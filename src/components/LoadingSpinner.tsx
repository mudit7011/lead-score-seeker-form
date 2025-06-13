
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-purple-400 rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-pink-400 rounded-full animate-spin animation-delay-150" />
      </div>
      <div className="text-white/80 text-lg font-medium animate-pulse">
        Analyzing lead quality...
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-100" />
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-200" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
