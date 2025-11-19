import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, Copy, RefreshCcw, Settings, AlertCircle, Smartphone, MousePointer2 } from 'lucide-react';

// --- DATA: ANSWERS ---
const ANSWERS = [
  "You already know the answer.",
  "Try defining the problem more clearly first.",
  "Your gut reaction just now is the one that matters.",
  "Ask yourself why you’re hesitating.",
  "The real question is what are you afraid of?",
  "If you did nothing, how would you feel in a week?",
  "If you did it, how would you feel in a week?",
  "This might be a good time to sleep on it.",
  "What would you tell your best friend in this situation?",
  "The fact that you’re asking is already telling you something.",
  "You might be overthinking this.",
  "You might not be thinking about it enough.",
  "First, write the problem down in one clear sentence.",
  "Imagine you already chose. Are you relieved or disappointed?",
  "Your closest friend probably has the answer you need.",
  "That sounds like a good first step.",
  "If it scares you and excites you, it’s worth a closer look.",
  "If you have to force it, it might not fit.",
  "Try flipping a coin and watch how you feel while it’s in the air.",
  "Ask yourself: is this aligned with your values?",
  "You might be asking the wrong question.",
  "This decision may not be as big as it feels.",
  "This decision might be bigger than you’re treating it.",
  "Think about the long-term, not just this week.",
  "Think about this week, not just the long-term.",
  "You’re not stuck; you’re just at a crossroads.",
  "Maybe the timing, not the idea, is the problem.",
  "Try talking this out with someone you trust.",
  "Start with the smallest possible action and see how it feels.",
  "If you’re hiding this from people, that’s important information.",
  "If you’d be proud to talk about it, that’s important too.",
  "Consider what you would regret more: doing it or not doing it.",
  "This might be a chance to practice letting go.",
  "This might be a chance to practice commitment.",
  "Silence your phone and think about it for five minutes.",
  "Your first instinct was the most honest one.",
  "You might be trying to control too many variables at once.",
  "Lower the stakes in your head and see what happens.",
  "Imagine it went wrong. Could you live with that?",
  "Imagine it went right. Would it be worth the risk?",
  "Ask yourself: “If not now, when?”",
  "Ask yourself: “If not this, what instead?”",
  "You may be looking for certainty that doesn’t exist.",
  "Progress, not perfection, should guide you here.",
  "Try removing ego from the equation and ask again.",
  "Try removing fear from the equation and ask again.",
  "This might be a test of patience, not bravery.",
  "This might be a test of bravery, not patience.",
  "Take a deep breath and imagine the calmest version of you deciding.",
  "You’re allowed to change your mind later.",
  "You’re not allowed to abandon yourself in this process.",
  "Are you choosing out of curiosity or out of fear?",
  "The answer is hiding behind what you don’t want to admit.",
  "Ask: “What outcome am I secretly hoping for?”",
  "Ask: “What outcome am I secretly dreading?”",
  "It’s okay to choose the option that feels kinder to you.",
  "It’s okay to choose the option that feels challenging.",
  "You might be underestimating your ability to handle the consequences.",
  "You might be overestimating how much this will matter in ten years.",
  "Think: Will this matter three months from now?",
  "Think: Will this matter three years from now?",
  "Your future self is already watching this moment.",
  "Act in a way your future self would thank you for.",
  "Consider what you’d decide if nobody else ever found out.",
  "Consider what you’d decide if everyone found out.",
  "Maybe you need more information before deciding.",
  "Maybe more information is just an excuse to postpone.",
  "The answer might appear after you take a walk.",
  "Whatever you choose, own it fully.",
  "You may be trying to avoid discomfort that is actually necessary.",
  "You may be chasing comfort that won’t last.",
  "Ask: “What am I trying to protect here?”",
  "Ask: “What am I willing to risk for this?”",
  "You’re not a passenger here; you’re the driver.",
  "Think of the simplest version of this decision. Start there.",
  "Complexity is making this look bigger than it is.",
  "Don’t confuse urgency with importance.",
  "Don’t confuse comfort with safety.",
  "Imagine explaining this choice to a child. What would you simplify?",
  "Imagine explaining this choice to your older self. What would they say?",
  "You may need a boundary, not an answer.",
  "You may need a conversation, not a conclusion.",
  "Maybe both options are fine, and that’s okay.",
  "Maybe neither option is right, and you need a third.",
  "Flip the roles: if someone asked you this, what would you say?",
  "Take a moment and ask: what does your body feel right now?",
  "Tension might be pointing at something important.",
  "Calm might be pointing at something important too.",
  "Try removing money from the question and see what remains.",
  "Try removing other people’s opinions and see what remains.",
  "The version of you five years ago already has an opinion on this.",
  "The version of you five years from now does too.",
  "You might be clinging to something that’s already over.",
  "You might be resisting something that’s already begun.",
  "Ask yourself: “What am I afraid of losing?”",
  "Ask yourself: “What could I gain if this works?”",
  "You don’t need a perfect choice; you need a honest one.",
  "You don’t need approval; you need clarity.",
  "Take one small step toward one side and observe how it feels.",
  "Take one small step back and observe how it feels.",
  "You might have already decided and just want permission.",
  "Nobody can give you that permission but you.",
  "If this were your last week on earth, what would you pick?",
  "If this were the first week of a new life, what would you pick?",
  "Ask: “What would the bravest version of me do?”",
  "Ask: “What would the kindest version of me do?”",
  "Ask: “What would the most grounded version of me do?”",
  "Your answer is hidden in what you keep replaying in your head.",
  "Your answer is hidden in what you’re avoiding thinking about.",
  "Imagine the worst realistic outcome. Can you handle it?",
  "Imagine the best realistic outcome. Are you ready for it?",
  "You might not get a sign. You might have to choose.",
  "Some doors only open after you walk toward them.",
  "Some doors only close after you finally let go.",
  "Fear is loud. Wisdom is quiet. Listen for the quiet voice.",
  "If you had to decide in the next 10 seconds, what would you pick?",
  "If you had one more month to decide, what would you do with that time?",
  "Ask yourself: “Is this helping me become who I want to be?”",
  "Ask yourself: “Am I shrinking myself to keep things familiar?”",
  "The path you’re most curious about might deserve a chance.",
  "The path you’re most resistant to might deserve a question.",
  "This might be less about right vs. wrong and more about who you want to be.",
  "You can make a careful choice without freezing.",
  "You can change course, but you can’t get back wasted time.",
  "If this ended tomorrow, what would you wish you had done?",
  "If nothing changed, would you be okay with that?",
  "Try simplifying this to: “Stay” or “Change.” Which feels lighter?",
  "Let go of impressing anyone. What remains?",
  "Ask: “If I trusted myself fully, what would I do?”",
  "Whatever you choose, don’t abandon yourself afterward."
];

// --- DATA: DISCLAIMER ---
const DISCLAIMER_TEXT = `
The content provided by this application is for entertainment and reflective purposes only. 
It does not constitute professional advice, psychological counseling, or binding directives. 

By using this application, you acknowledge that "Can't Think" and its creators are not liable 
for any decisions, actions, or consequences resulting from your interpretation of the answers provided. 
Trust your own judgment and consult professionals for serious matters.
`;

// --- HOOK: SOUND GENERATOR (Procedural Mechanical Sound) ---
const useMechanicalSound = () => {
  const audioContextRef = useRef(null);

  const playProcessingSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      // Low frequency mechanical hum
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.5);

      // Envelope
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.5);

    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  return { playProcessingSound };
};

// --- HOOK: SHAKE DETECTION ---
const useShake = (onShake, enabled = true) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const lastPos = useRef({ x: 0, y: 0, z: 0 });
  const lastTime = useRef(Date.now());

  // Check if permission is needed (iOS 13+)
  const requiresPermission = typeof DeviceMotionEvent !== 'undefined' && 
    typeof DeviceMotionEvent.requestPermission === 'function';

  const requestAccess = async () => {
    if (!requiresPermission) return true;
    try {
      const response = await DeviceMotionEvent.requestPermission();
      if (response === 'granted') {
        setPermissionGranted(true);
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  useEffect(() => {
    if (!enabled || (requiresPermission && !permissionGranted)) return;

    const threshold = 15; // Sensitivity
    const timeout = 1000;
    let lastShake = 0;

    const handleMotion = (e) => {
      const current = e.accelerationIncludingGravity;
      if (!current) return;

      const now = Date.now();
      if ((now - lastTime.current) > 100) {
        const diffTime = now - lastTime.current;
        lastTime.current = now;

        const speed = Math.abs(current.x + current.y + current.z - lastPos.current.x - lastPos.current.y - lastPos.current.z) / diffTime * 10000;

        if (speed > threshold) {
          if (now - lastShake > timeout) {
            lastShake = now;
            onShake();
          }
        }

        lastPos.current = { x: current.x, y: current.y, z: current.z };
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [enabled, onShake, permissionGranted, requiresPermission]);

  return { requestAccess, requiresPermission, permissionGranted };
};

// --- COMPONENTS ---

const Button = ({ onClick, children, className = "", variant = "primary" }) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold tracking-wide transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    outline: "border border-white/30 text-white hover:bg-white/10 hover:border-white/60",
    ghost: "text-gray-400 hover:text-white",
    danger: "text-red-400 border border-red-900/50 hover:bg-red-900/20"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Screen = ({ children, className = "" }) => (
  <div className={`min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [screen, setScreen] = useState('loading'); // loading, disclaimer, main, processing, answer
  const [answer, setAnswer] = useState('');
  const [processingText, setProcessingText] = useState('Thinking...');
  const { playProcessingSound } = useMechanicalSound();

  // Persistence Check
  useEffect(() => {
    const accepted = localStorage.getItem('cant_think_disclaimer_accepted');
    if (accepted === 'true') {
      setScreen('main');
    } else {
      setScreen('disclaimer');
    }
  }, []);

  // Haptics helper
  const vibrate = (pattern) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  // Logic to transition to answer
  const triggerAnswer = useCallback(() => {
    if (screen !== 'main') return;

    playProcessingSound();
    vibrate([50, 50, 50]); // Initial buzz
    setScreen('processing');
    
    // Select answer immediately but show it later
    const randomAnswer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
    setAnswer(randomAnswer);

    // Animation phases
    setTimeout(() => setProcessingText('Consulting logic...'), 800);
    setTimeout(() => setProcessingText('Ignoring logic...'), 1600);
    
    setTimeout(() => {
      vibrate(100); // Final thump
      setScreen('answer');
    }, 2500);
  }, [screen, playProcessingSound]);

  // Shake Hook
  const { requestAccess, requiresPermission, permissionGranted } = useShake(triggerAnswer, screen === 'main');

  // Handlers
  const handleAcceptDisclaimer = () => {
    localStorage.setItem('cant_think_disclaimer_accepted', 'true');
    setScreen('main');
  };

  const handleReset = () => {
    setScreen('main');
    setProcessingText('Thinking...');
  };

  const handleShare = async () => {
    const shareData = {
      title: "Can't Think Answer",
      text: `My question received this answer: "${answer}"`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback
      try {
        await navigator.clipboard.writeText(`"${answer}" - Can't Think App`);
        alert("Answer copied to clipboard.");
      } catch (err) {
        alert("Could not copy to clipboard.");
      }
    }
  };

  const handleClearStorage = () => {
    localStorage.removeItem('cant_think_disclaimer_accepted');
    window.location.reload();
  };

  // --- RENDER STATES ---

  if (screen === 'loading') return <Screen><div className="animate-pulse">Loading...</div></Screen>;

  if (screen === 'disclaimer') {
    return (
      <Screen>
        <div className="max-w-md w-full space-y-8 animate-in fade-in duration-700">
          <div className="text-center space-y-2">
            <AlertCircle className="w-12 h-12 mx-auto text-gray-500 mb-4" />
            <h1 className="text-2xl font-bold tracking-widest uppercase">Legal Disclaimer</h1>
            <div className="h-px w-12 bg-white mx-auto my-4 opacity-50"></div>
          </div>
          
          <div className="text-gray-300 text-sm leading-relaxed text-justify border border-white/10 p-6 rounded-lg bg-white/5">
            {DISCLAIMER_TEXT}
          </div>

          <div className="pt-4 flex justify-center">
            <Button onClick={handleAcceptDisclaimer}>
              I Understand and Agree
            </Button>
          </div>
        </div>
      </Screen>
    );
  }

  if (screen === 'main') {
    return (
      <Screen>
        {/* Top Bar */}
        <div className="absolute top-6 right-6">
           <button onClick={handleClearStorage} className="text-gray-600 hover:text-gray-400 transition-colors">
             <Settings size={20} />
           </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md text-center space-y-12 animate-in zoom-in-95 duration-500">
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-100">
              Think of your problem.
            </h2>
            <p className="text-gray-400 text-lg font-light">
              Is it a Yes or No question?<br/>
              Focus on it clearly.
            </p>
          </div>

          <div className="py-8 flex flex-col items-center gap-4">
            {/* Primary Interaction Trigger */}
            <div 
              className="relative group cursor-pointer"
              onClick={triggerAnswer}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-gray-500/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <button 
                className="relative w-48 h-48 rounded-full bg-black border border-white/20 flex flex-col items-center justify-center gap-3 hover:border-white/60 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <span className="text-4xl animate-pulse grayscale">🧠</span>
                <span className="text-xs tracking-widest uppercase text-gray-500 font-semibold">
                  Process Logic
                </span>
              </button>
            </div>

            {/* Mobile Shake Hint / Permission Request */}
            <div className="h-12 flex items-center justify-center">
              {requiresPermission && !permissionGranted ? (
                <button 
                  onClick={requestAccess}
                  className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-4"
                >
                  Enable Shake Interaction
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-widest">
                   <span className="hidden md:inline-flex items-center gap-1"><MousePointer2 size={12}/> Click Button</span>
                   <span className="md:hidden inline-flex items-center gap-1"><Smartphone size={12}/> Tap or Shake</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Screen>
    );
  }

  if (screen === 'processing') {
    return (
      <Screen>
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Abstract Gear / Loading Animation */}
          <div className="relative w-32 h-32">
             <div className="absolute inset-0 border-4 border-t-white border-r-transparent border-b-white/20 border-l-transparent rounded-full animate-spin duration-[2000ms]"></div>
             <div className="absolute inset-4 border-2 border-t-transparent border-r-white/50 border-b-transparent border-l-white/50 rounded-full animate-spin duration-[1500ms] direction-reverse"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
             </div>
          </div>

          <div className="h-8 overflow-hidden">
            <p className="text-lg font-mono text-gray-300 animate-pulse text-center">
              {processingText}
            </p>
          </div>
        </div>
      </Screen>
    );
  }

  if (screen === 'answer') {
    return (
      <Screen>
        <div className="max-w-lg w-full flex flex-col items-center justify-between h-full py-12 md:py-24 animate-in slide-in-from-bottom-10 fade-in duration-700">
          
          <div className="flex-1 flex items-center justify-center w-full">
            <blockquote className="text-center space-y-6">
              <p className="text-3xl md:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-lg">
                "{answer}"
              </p>
              <div className="w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
            </blockquote>
          </div>

          <div className="w-full flex flex-col gap-4 items-center">
            <Button onClick={handleReset} variant="primary" className="w-full max-w-xs">
              <RefreshCcw size={18} />
              Ask Another Question
            </Button>
            
            <Button onClick={handleShare} variant="outline" className="w-full max-w-xs">
              {navigator.share ? <Share2 size={18} /> : <Copy size={18} />}
              {navigator.share ? "Share Answer" : "Copy to Clipboard"}
            </Button>
          </div>

        </div>
      </Screen>
    );
  }

  return null;
}