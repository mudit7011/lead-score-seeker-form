
import { useState, useEffect } from 'react';

const ScoreDisplay = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(counter);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(counter);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    if (score >= 40) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent Lead';
    if (score >= 60) return 'Good Lead';
    if (score >= 40) return 'Average Lead';
    return 'Low Quality Lead';
  };

  return (
    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl animate-pulse" />
        
        <div className="relative z-10 text-center">
          <div className="mb-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {animatedScore}
            </div>
            <div className="text-white/60 text-lg">/ 100</div>
          </div>
          
          <div className={`inline-block px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${getScoreColor(score)} shadow-lg`}>
            {getScoreLabel(score)}
          </div>
          
          <div className="mt-6 w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getScoreColor(score)} rounded-full transition-all duration-2000 ease-out shadow-lg`}
              style={{ width: `${animatedScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
