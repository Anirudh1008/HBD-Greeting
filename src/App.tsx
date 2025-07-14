import React, { useState, useRef, useEffect } from 'react';
import { Heart, Mail } from 'lucide-react';

function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [visiblePhotos, setVisiblePhotos] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sample photos - replace with your own
  const photos = [
    {
      url: '/images/Ani1.jpg',
      caption: 'Together'
    },
    {
      url: '/images/Ani2.jpg',
      caption: 'Childhood Memories'
    },
    {
      url: '/images/Ani3.jpg',
      caption: 'Family Time'
    },
    {
      url: '/images/Ani4.jpg',
      caption: 'Special Moments'
    },
    {
      url: '/images/Ani5.jpg',
      caption: 'Happy Times'
    },
    {
      url: '/images/Ani6.jpg',
      caption: 'Beautiful Days'
    },
    {
      url: '/images/Ani7.jpg',
      caption: 'You and Me'
    },
    {
      url: '/images/Ani8.jpg',
      caption: 'Forever'
    }
  ];

  const handleScene1Click = () => {
    setCurrentScene(2);
    setTimeout(() => setIsEnvelopeOpen(true), 500);
    setTimeout(() => setIsCardVisible(true), 1500);
  };

  const handleScene2Click = () => {
    setCurrentScene(3);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Auto-play failed, user will need to click play
        });
        setIsMusicPlaying(true);
      }
      // Start revealing photos one by one
      const interval = setInterval(() => {
        setVisiblePhotos(prev => {
          if (prev >= photos.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    }, 1000);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    }
  };


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => {
        setIsMusicPlaying(false);
      });
    }
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src="/audio/birthday_song.mp3" type="audio/mp3" />
      </audio>

      {/* Scene 1: Heart with Ribbon */}
      {currentScene === 1 && (
        <div 
          className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center cursor-pointer transition-all duration-1000 ease-out relative overflow-hidden"
          onClick={handleScene1Click}
        >
          {/* Floating Hearts Background */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-hearts opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            >
              <Heart className="w-4 h-4 text-pink-400 fill-current" />
            </div>
          ))}

          {/* Decorative Corner Elements */}
          <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-16 right-12 w-12 h-12 bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-12 left-16 w-16 h-16 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-8 right-8 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full animate-bounce-slow"></div>

          <div className="text-center transform hover:scale-105 transition-transform duration-300 z-10">
            {/* Enhanced Heart with Ribbon SVG */}
            <div className="relative mb-8 animate-float">
              <svg width="240" height="240" viewBox="0 0 240 240" className="mx-auto drop-shadow-lg">
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#ff6b9d', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#ff8a9b', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#c44569', stopOpacity: 1}} />
                  </linearGradient>
                  <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#f093fb', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#f5576c', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#4facfe', stopOpacity: 1}} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Ribbon Shadow */}
                <path d="M70 95 L170 95 L170 110 L120 125 L70 110 Z" fill="rgba(0,0,0,0.1)" transform="translate(2,2)" />
                <path d="M100 125 L140 125 L145 145 L120 140 L95 145 Z" fill="rgba(0,0,0,0.1)" transform="translate(2,2)" />
                
                {/* Ribbon */}
                <path d="M70 95 L170 95 L170 110 L120 125 L70 110 Z" fill="url(#ribbonGradient)" />
                <path d="M100 125 L140 125 L145 145 L120 140 L95 145 Z" fill="url(#ribbonGradient)" />
                
                {/* Heart Shadow */}
                <path d="M120,170 C95,135 50,135 50,95 C50,70 70,50 95,50 C110,50 120,60 120,75 C120,60 130,50 145,50 C170,50 190,70 190,95 C190,135 145,135 120,170 Z" 
                      fill="rgba(0,0,0,0.1)" transform="translate(3,3)" />
                
                {/* Heart */}
                <path d="M120,170 C95,135 50,135 50,95 C50,70 70,50 95,50 C110,50 120,60 120,75 C120,60 130,50 145,50 C170,50 190,70 190,95 C190,135 145,135 120,170 Z" 
                      fill="url(#heartGradient)" 
                      filter="url(#glow)"
                      className="animate-heartbeat" />
                
                {/* Heart highlights */}
                <ellipse cx="100" cy="85" rx="12" ry="18" fill="rgba(255,255,255,0.4)" />
                <ellipse cx="140" cy="85" rx="8" ry="12" fill="rgba(255,255,255,0.2)" />
                
                {/* Ribbon Text */}
                <text x="120" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="serif">
                  For You
                </text>
              </svg>
            </div>

            <p className="text-3xl md:text-4xl font-light text-gray-700 animate-pulse tracking-wide font-script">
              Tap here to open
            </p>
            <p className="text-lg text-gray-500 mt-2 animate-pulse">
              A special surprise awaits...
            </p>
          </div>
        </div>
      )}

      {/* Scene 2: Envelope and Card */}
      {currentScene === 2 && (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Magical Sparkles */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
              </div>
            ))}
          </div>

          <div className="relative max-w-4xl w-full">
            {/* Envelope Container */}
            <div className="relative h-96 md:h-[500px] flex items-center justify-center">
              
              {/* Envelope */}
              <div className="relative">
                {/* Envelope Body */}
                <div className="w-80 h-56 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg shadow-2xl border-2 border-amber-200 relative">
                  {/* Envelope Flap */}
                  <div 
                    className={`absolute -top-20 left-0 right-0 h-24 bg-gradient-to-br from-amber-200 to-orange-200 transition-all duration-1000 origin-bottom border-2 border-amber-300 ${
                      isEnvelopeOpen ? 'transform rotate-12 translate-y-4' : ''
                    }`}
                    style={{
                      clipPath: 'polygon(0 100%, 50% 0, 100% 100%)'
                    }}
                  >
                    {/* Wax Seal */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>

                  {/* Envelope Address */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Mail className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                      <p className="text-amber-800 font-script text-lg">To: Dear</p>
                      <p className="text-amber-600 text-sm">With Love ❤️</p>
                    </div>
                  </div>
                </div>

                {/* Birthday Card (slides out from envelope) */}
                {isCardVisible && (
                  <div className="absolute inset-0 animate-card-slide-out">
                    <div className="w-80 h-56 bg-gradient-to-br from-white to-pink-50 rounded-lg shadow-2xl border-2 border-pink-200 p-6 flex flex-col justify-center items-center transform rotate-2">
                      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-text-glow text-center font-birthday-special tracking-wider transform hover:scale-105 transition-transform duration-300">
                        Happy Birthday My Friend! 🎉
                      </h1>
                      <p className="text-gray-700 text-center text-sm md:text-base leading-relaxed mb-4 font-light">
                        On this special day, I want you to know how grateful I am to have you. 
                        Your kindness, humor, and love have made my life so much brighter! ❤️
                      </p>
                      <div 
                        className="cursor-pointer animate-bounce-gentle hover:scale-110 transition-transform duration-300"
                        onClick={handleScene2Click}
                      >
                        <Heart className="w-12 h-12 text-red-500 animate-heartbeat mx-auto mb-1" fill="currentColor" />
                        <p className="text-xs text-gray-600 font-medium">Tap here</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scene 3: Sequential Photo Gallery */}
      {currentScene === 3 && (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
          {/* Music Controls */}
          <div className="fixed top-6 right-6 z-50">
            <button
              onClick={toggleMusic}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
            >
              {isMusicPlaying ? '⏸️' : '▶️'}
            </button>
          </div>

          {/* Animated Background Elements */}
          <div className="fixed inset-0 pointer-events-none">
            {/* Floating Orbs */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`orb-${i}`}
                className="absolute rounded-full bg-gradient-to-r from-pink-400/20 to-purple-400/20 animate-float-orbs"
                style={{
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${8 + Math.random() * 4}s`
                }}
              ></div>
            ))}

            {/* Twinkling Stars */}
            {[...Array(60)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>

          {/* Photo Gallery */}
          <div className="relative min-h-screen flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center animate-fadeIn font-script relative">
              Our Beautiful Memories Together 💫
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"></div>
            </h2>
            
            <div className="w-full max-w-6xl">
              <div className="flex flex-col items-center space-y-16">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className={`relative group transition-all duration-1500 w-full max-w-lg ${
                      index < visiblePhotos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                    }`}
                    style={{
                      transitionDelay: `${index * 1200}ms`,
                      transform: index % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)'
                    }}
                  >
                    {/* Polaroid-Style Frame with Enhanced Design */}
                    <div className="relative bg-white p-4 pb-16 rounded-lg shadow-2xl hover:scale-105 transition-all duration-700 hover:shadow-pink-500/30 transform-gpu">
                      {/* Decorative Tape */}
                      <div className="absolute -top-2 left-8 w-16 h-6 bg-yellow-200/80 rounded-sm transform -rotate-12 shadow-md"></div>
                      <div className="absolute -top-2 right-8 w-12 h-6 bg-pink-200/80 rounded-sm transform rotate-12 shadow-md"></div>
                      
                      {/* Vintage Corner Stamps */}
                      <div className="absolute top-2 left-2 w-3 h-3 bg-red-400/60 rounded-full"></div>
                      <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400/60 rounded-full"></div>
                      <div className="absolute bottom-16 left-2 w-3 h-3 bg-green-400/60 rounded-full"></div>
                      <div className="absolute bottom-16 right-2 w-3 h-3 bg-purple-400/60 rounded-full"></div>

                      {/* Photo */}
                      <div className="relative overflow-hidden rounded-md">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                        />
                        
                        {/* Vintage Photo Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/10 via-transparent to-orange-100/10 pointer-events-none"></div>
                      </div>

                      {/* Handwritten Caption */}
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <p className="text-gray-700 text-lg font-script transform -rotate-1">
                          {photo.caption}
                        </p>
                      </div>
                      
                      {/* Photo Number Badge */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {index + 1}
                      </div>
                      
                      {/* Floating Hearts around Photo */}
                      <div className="absolute -top-4 -left-4 text-pink-400 animate-float opacity-70">
                        <Heart className="w-4 h-4 fill-current" />
                      </div>
                      <div className="absolute -bottom-4 -right-4 text-purple-400 animate-float opacity-70" style={{animationDelay: '1s'}}>
                        <Heart className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Sister's Message - Only appears after all photos are visible */}
              {visiblePhotos >= photos.length && (
                <div className="mt-20 text-center animate-fadeInUp">
                  <div className="bg-gradient-to-br from-white/20 to-pink-100/20 backdrop-blur-md rounded-3xl p-10 border-2 border-white/40 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-3xl"></div>
                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-pink-400/30 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-purple-400/30 rounded-full blur-xl"></div>
                    
                    <div className="relative z-10">
                      <Heart className="w-12 h-12 text-pink-400 fill-current mx-auto mb-6 animate-heartbeat" />
                      <p className="text-white text-3xl md:text-4xl font-light font-script mb-6 leading-relaxed">
                      With all my love, your Best Friend ❤️
                    </p>
                    <p className="text-white/90 text-xl md:text-2xl font-light">
                      May this year bring you endless joy and happiness!
                    </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;