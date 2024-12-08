import { useState, useEffect } from 'react'
import { ArrowUpRight, Github, Linkedin, Terminal, Moon, Sun, ChevronDown, Mail, Phone, MapPin, Clock, FileText, Code2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import emailjs from 'emailjs-com';

type ColorTheme = 'green' | 'blue' | 'purple' | 'red' | 'orange' | 'pink' | 'cyan' | 'rainbow'

export default function EnhancedPortfolioe() {
  const [activeWindow, setActiveWindow] = useState('about')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [terminalStyle, setTerminalStyle] = useState<WindowProps['style']>('modern')
  const [colorTheme, setColorTheme] = useState<ColorTheme>('green')
  const [isThemeControlsOpen, setIsThemeControlsOpen] = useState(false)


  const [loading, setLoading] = useState(false);  // To track the loading state
  const [success, setSuccess] = useState(null);  // To track success/error state
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Set loading state to true when form is submitted
    setLoading(true);
    setSuccess(null);
    setErrorMessage('');

    // Send email using EmailJS
    emailjs
      .sendForm(
        'service_fmunrra', // Replace with your EmailJS Service ID
        'template_v6kvs1o', // Replace with your EmailJS Template ID
        event.target, // The form element
        'oI4fxdnBlZTqiTpOm' // Replace with your EmailJS User ID
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setSuccess(true); // Set success state to true
          setLoading(false); // Disable loading spinner
          event.target.reset(); // Reset form after successful submission
        },
        (error) => {
          console.error('Error sending email:', error.text);
          setSuccess(false); // Set success state to false
          setErrorMessage('Something went wrong, please try again later.');
          setLoading(false); // Disable loading spinner
        }
      );
  };

  useEffect(() => {
    // Handle scroll to update active window
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'career', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveWindow(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Add initial loading animation
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Update terminal style when dark mode changes
    if (!isDarkMode) {
      setTerminalStyle('paper')
    } else {
      setTerminalStyle('modern') // or whatever default dark theme you prefer
    }
  }, [isDarkMode])

  // Window component with TypeScript props
  interface WindowProps {
    title: string
    children: React.ReactNode
    isActive?: boolean
    style?: 'modern' | 'retro' | 'minimal' | 'glass' | 'neon' | 'matrix' | 'cyberpunk' | 'gradient' |
    'vaporwave' | 'paper'
  }

  const Window = ({ title, children, isActive = false, style = terminalStyle }: WindowProps) => {
    const styles = {
      modern: {
        window: `bg-black/80 backdrop-blur-sm rounded-lg border border-${colorTheme}-500/20`,
        header: `px-4 py-2 border-b border-${colorTheme}-500/20`,
        buttons: "flex gap-2",
        button: "w-3 h-3 rounded-full",
        title: `text-sm text-${colorTheme}-400 font-mono`,
        content: "p-4",
        animation: {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        }
      },
      retro: {
        window: "bg-zinc-900 rounded border-2 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
        header: "px-4 py-2 border-b-2 border-green-500/50 bg-zinc-800",
        buttons: "flex gap-2",
        button: "w-3 h-3 rounded",
        title: "text-sm text-green-500 font-mono uppercase tracking-wider",
        content: "p-4 text-green-500",
        animation: {
          initial: { scale: 0.95, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }
      },
      minimal: {
        window: "bg-zinc-900/50 rounded-sm border border-zinc-800",
        header: "px-3 py-1.5 border-b border-zinc-800",
        buttons: "hidden",
        button: "",
        title: "text-xs text-zinc-500 font-mono",
        content: "p-3",
        animation: {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.3 }
        }
      },
      glass: {
        window: "bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg",
        header: "px-4 py-2 border-b border-white/20",
        buttons: "flex gap-2",
        button: "w-3 h-3 rounded-full bg-white/20",
        title: "text-sm text-white/70 font-mono",
        content: "p-4",
        animation: {
          initial: { opacity: 0, backdropFilter: "blur(0px)" },
          animate: { opacity: 1, backdropFilter: "blur(12px)" },
          transition: { duration: 0.7 }
        }
      },
      neon: {
        window: "bg-black/90 rounded-lg border-2 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
        header: "px-4 py-2 border-b-2 border-purple-500/50 bg-black/50",
        buttons: "flex gap-2",
        button: "w-3 h-3 rounded-full animate-pulse",
        title: "text-sm text-purple-400 font-mono uppercase tracking-widest",
        content: "p-4 text-purple-300",
        animation: {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 5
          }
        }
      },
      matrix: {
        window: "bg-black rounded-lg border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)] overflow-hidden",
        header: "px-4 py-2 border-b border-green-500/30 bg-black/90",
        buttons: "flex gap-2",
        button: "w-3 h-3 rounded-full bg-green-500/50",
        title: "text-sm text-green-400 font-mono glitch",
        content: "p-4 text-green-400 matrix-bg",
        animation: {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "spring", stiffness: 200 }
        }
      },
      cyberpunk: {
        window: "bg-black/80 rounded-lg border-l-4 border-r-4 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]",
        header: "px-4 py-2 border-b-2 border-yellow-500/50 bg-yellow-500/10",
        buttons: "flex gap-2",
        button: "w-3 h-3 rounded cyberpunk-glow",
        title: "text-sm text-yellow-500 font-mono uppercase tracking-widest",
        content: "p-4 text-yellow-100",
        animation: {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { type: "spring", stiffness: 200 }
        }
      },
      gradient: {
        window: "bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 backdrop-blur-md rounded-lg border border-white/10",
        header: "px-4 py-2 border-b border-white/10 bg-white/5",
        buttons: "flex gap-2",
        button: "w-3 h-3 rounded-full gradient-glow",
        title: "text-sm text-white/80 font-mono",
        content: "p-4 text-white/90",
        animation: {
          initial: { opacity: 0, rotate: -2 },
          animate: { opacity: 1, rotate: 0 },
          transition: { type: "spring", stiffness: 200 }
        }
      },
      vaporwave: {
        window: "bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-lg border-2 border-pink-400/30",
        header: "px-4 py-2 border-b-2 border-pink-400/30 bg-gradient-to-r from-pink-500/10 to-purple-500/10",
        buttons: "flex gap-2",
        button: "w-3 h-3 rounded-full shadow-lg shadow-pink-500/50",
        title: "text-sm text-pink-300 font-mono tracking-widest",
        content: "p-4 text-pink-200",
        animation: {
          initial: { opacity: 0, rotate: -2 },
          animate: { opacity: 1, rotate: 0 },
          transition: { type: "spring", stiffness: 200 }
        }
      },
      paper: {
        window: "bg-stone-50 rounded-lg border border-stone-200 shadow-md",
        header: "px-4 py-2 bg-stone-100 border-b border-stone-200",
        buttons: "flex gap-2",
        button: "w-3 h-3 rounded-full shadow-sm",
        title: "text-sm text-stone-600 font-mono",
        content: "p-4 text-stone-800",
        animation: {
          initial: { opacity: 0, y: -5 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.2 }
        }
      }
    }

    const currentStyle = styles[style]

    return (
      <motion.div
        {...currentStyle.animation}
        className={`${currentStyle.window} overflow-hidden ${isActive ? 'ring-1 ring-green-500/20' : ''}`}
      >
        <div className={`flex items-center justify-between ${currentStyle.header}`}>
          <span className={currentStyle.title}>{title}</span>
          <div className={currentStyle.buttons}>
            {style !== 'minimal' && (
              <>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`${currentStyle.button} ${getButtonColor(style, 'close')}`}
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`${currentStyle.button} ${getButtonColor(style, 'minimize')}`}
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`${currentStyle.button} ${getButtonColor(style, 'maximize')}`}
                />
              </>
            )}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={style}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={currentStyle.content}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }

  // Helper function for button colors
  const getButtonColor = (style: string, type: 'close' | 'minimize' | 'maximize') => {
    const colors = {
      modern: { close: 'bg-red-500', minimize: 'bg-yellow-500', maximize: 'bg-green-500' },
      retro: { close: 'bg-green-500/50', minimize: 'bg-green-500/50', maximize: 'bg-green-500/50' },
      glass: { close: 'bg-white/20', minimize: 'bg-white/20', maximize: 'bg-white/20' },
      neon: { close: 'bg-purple-500', minimize: 'bg-purple-400', maximize: 'bg-purple-300' },
      matrix: { close: 'bg-green-500', minimize: 'bg-green-400', maximize: 'bg-green-300' },
      cyberpunk: { close: 'bg-yellow-500', minimize: 'bg-yellow-400', maximize: 'bg-yellow-300' },
      gradient: { close: 'bg-gradient-to-r from-purple-500 to-pink-500', minimize: 'bg-gradient-to-r from-pink-500 to-red-500', maximize: 'bg-gradient-to-r from-red-500 to-orange-500' },
      vaporwave: { close: 'bg-pink-500', minimize: 'bg-purple-500', maximize: 'bg-blue-500' },
      paper: { close: 'bg-red-400', minimize: 'bg-amber-400', maximize: 'bg-emerald-400' },
    }
    return colors[style]?.[type] || colors.modern[type]
  }

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = activeWindow === href.replace('#', '')

    return (
      <motion.a
        href={href}
        className={`relative text-sm uppercase tracking-wider transition-colors
          ${isActive ? 'text-green-500' : 'text-zinc-400 hover:text-green-500'}`}
        onClick={(e) => {
          e.preventDefault()
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
          setIsMenuOpen(false)
        }}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="activeSection"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.a>
    )
  }

  const Navigation = () => {
    return (
      <nav aria-label="Main navigation">
        <div className="flex justify-between items-center">
          <Terminal className="text-green-500 w-8 h-8" />
          <button
            className="md:hidden text-zinc-400 hover:text-green-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <ChevronDown className={`w-6 h-6 transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          <ul className={`md:flex items-center gap-4 text-zinc-400 ${isMenuOpen ? 'block absolute top-full left-0 right-0 bg-black/80 p-4 md:p-0 md:relative md:bg-transparent' : 'hidden'}`}>
            {['home', 'about', 'projects', 'career', 'contact'].map((item) => (
              <li key={item}>
                <NavLink href={`#${item}`}>
                  {item === 'career' ? 'Career Journey' : item}
                </NavLink>
              </li>
            ))}
            <li className="md:ml-4">
              <motion.a
                href="https://drive.google.com/file/d/10BMAFigxAIGCNvHvr6zgbxPZWjh1vUfY/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-semibold rounded-full 
                  hover:bg-green-400 transition-colors duration-300"
              >
                <FileText className="w-4 h-4" />
                Resume
              </motion.a>
            </li>
            <li>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-zinc-400 hover:text-green-500 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }

  const ThemeControls = () => {
    const colorThemes = {
      green: {
        primary: 'rgb(34, 197, 94)',
        accent: 'rgb(21, 128, 61)',
        gradient: 'from-green-500/20 to-green-600/20'
      },
      blue: {
        primary: 'rgb(59, 130, 246)',
        accent: 'rgb(29, 78, 216)',
        gradient: 'from-blue-500/20 to-blue-600/20'
      },
      purple: {
        primary: 'rgb(168, 85, 247)',
        accent: 'rgb(126, 34, 206)',
        gradient: 'from-purple-500/20 to-purple-600/20'
      },
      red: {
        primary: 'rgb(239, 68, 68)',
        accent: 'rgb(185, 28, 28)',
        gradient: 'from-red-500/20 to-red-600/20'
      },
      orange: {
        primary: 'rgb(249, 115, 22)',
        accent: 'rgb(194, 65, 12)',
        gradient: 'from-orange-500/20 to-orange-600/20'
      },
      pink: {
        primary: 'rgb(236, 72, 153)',
        accent: 'rgb(190, 24, 93)',
        gradient: 'from-pink-500/20 to-pink-600/20'
      },
      cyan: {
        primary: 'rgb(34, 211, 238)',
        accent: 'rgb(21, 170, 191)',
        gradient: 'from-cyan-500/20 to-cyan-600/20'
      },
      rainbow: {
        primary: 'linear-gradient(to right, #ff0000, #00ff00, #0000ff)',
        accent: 'linear-gradient(to right, #ff0000, #00ff00, #0000ff)',
        gradient: 'from-violet-500/20 via-fuchsia-500/20 to-pink-500/20'
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-4 z-50"
      >
        <motion.div
          initial={false}
          animate={{ height: isThemeControlsOpen ? 'auto' : '48px' }}
          className={`bg-black/90 backdrop-blur-md rounded-lg border border-${colorTheme}-500/20 
            shadow-lg shadow-${colorTheme}-500/10 overflow-hidden
            transition-colors duration-300`}
        >
          <button
            onClick={() => setIsThemeControlsOpen(!isThemeControlsOpen)}
            className={`w-full px-4 py-2 flex items-center justify-between 
              text-${colorTheme}-400 hover:text-${colorTheme}-300 
              transition-all duration-300`}
          >
            <span className="text-sm font-mono flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-${colorTheme}-500 animate-pulse`} />
              Theme Controls
            </span>
            <motion.div
              animate={{ rotate: isThemeControlsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isThemeControlsOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-4 border-t border-${colorTheme}-500/20`}
              >
                {/* Color Theme Selection */}
                <div className="space-y-4">
                  <h3 className={`text-sm font-mono text-${colorTheme}-400`}>Color Theme</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(colorThemes).map(([theme, colors]) => (
                      <motion.button
                        key={theme}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setColorTheme(theme as ColorTheme)}
                        className={`w-8 h-8 rounded-full relative 
                          ${colorTheme === theme
                            ? `ring-2 ring-${theme}-400 ring-offset-2 ring-offset-black`
                            : ''}`}
                        style={{
                          background: colors.primary,
                          boxShadow: `0 0 20px ${theme === 'rainbow'
                            ? 'rgba(124, 58, 237, 0.2)'
                            : colors.primary}40`
                        }}
                      >
                        {colorTheme === theme && (
                          <motion.div
                            layoutId="selectedColor"
                            className={`absolute inset-0 rounded-full border-2 border-${theme}-400`}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Terminal Style Selection */}
                <div className="mt-6 space-y-4">
                  <h3 className={`text-sm font-mono text-${colorTheme}-400`}>Terminal Style</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['modern', 'retro', 'minimal', 'glass', 'neon', 'matrix', 'cyberpunk', 'gradient', 'vaporwave', 'paper'].map((style) => (
                      <motion.button
                        key={style}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTerminalStyle(style as WindowProps['style'])}
                        className={`px-3 py-2 rounded-md text-xs font-mono transition-all duration-300
                          ${terminalStyle === style
                            ? `bg-${colorTheme}-500 text-black font-medium shadow-md shadow-${colorTheme}-500/20`
                            : `text-${colorTheme}-400 hover:text-${colorTheme}-300 bg-black/50 hover:bg-black/70`}`}
                      >
                        {style}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    )
  }

  const getThemeColor = (opacity = 1) => {
    const colors = {
      green: `rgba(34, 197, 94, ${opacity})`,
      blue: `rgba(59, 130, 246, ${opacity})`,
      purple: `rgba(168, 85, 247, ${opacity})`,
      red: `rgba(239, 68, 68, ${opacity})`,
      orange: `rgba(249, 115, 22, ${opacity})`,
      pink: `rgba(236, 72, 153, ${opacity})`,
      cyan: `rgba(34, 211, 238, ${opacity})`,
      rainbow: `rgba(124, 58, 237, ${opacity})`
    }
    return colors[colorTheme]
  }

  return (
    <div
      className="min-h-screen transition-all duration-500"
      style={{
        background: isDarkMode
          ? `linear-gradient(to bottom right, rgb(0, 0, 0), rgba(0, 0, 0, 0.9), ${getThemeColor(0.1)})`
          : `linear-gradient(to bottom right, rgb(255, 255, 255), rgb(243, 244, 246), ${getThemeColor(0.1)})`
      }}
    >
      {isLoading ? (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          onAnimationComplete={() => setIsLoading(false)}
        >
          <Terminal className="text-green-500 w-12 h-12 animate-pulse" />
        </motion.div>
      ) : (
        <>
          <ThemeControls />
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
            <nav className="container mx-auto px-6 py-4">
              <Navigation />
            </nav>
          </header>

          <main className="container mx-auto px-4 py-20">
            <section id="home" className="min-h-screen flex items-center justify-center py-20 relative">
              {/* Optional: Animated Background Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-purple-500/5" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center z-10 px-4"
              >
                {/* Greeting with Typing Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <span className={`text-lg ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    👋 Welcome to my portfolio
                  </span>
                </motion.div>

                {/* Main Heading */}
                <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Hi, <span className="text-green-500">I'm</span>{' '}
                  <span className="relative">
                    Pabitra Pandit
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-green-500/20"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </span>
                </h1>
                <br />

                {/* Brief Introduction */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-xl max-w-2xl mx-auto mb-8 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}
                >
                  I'm a <span className="text-green-500 font-semibold">Python Backend Developer</span> with{' '}
                  <span className="text-green-500 font-semibold">2.5+ years of experience</span>, specializing in{' '}
                  <span className="text-green-500 font-semibold">building scalable APIs</span> and{' '}
                  <span className="text-green-500 font-semibold">high-performance web applications</span>, driven by a passion
                  for solving complex problems with elegant and efficient solutions.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-green-500 text-black font-bold py-3 px-6 rounded-full 
                      hover:bg-green-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Get in touch
                  </motion.a>
                  <motion.a
                    href="https://drive.google.com/uc?export=download&id=10BMAFigxAIGCNvHvr6zgbxPZWjh1vUfY"
                    // target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-full border-2 border-green-500 
    text-green-500 font-bold hover:bg-green-500/10 transition-colors duration-300"
                  >
                    <FileText className="w-5 h-5" />
                    Download Resume
                  </motion.a>

                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-12 flex justify-center gap-6"
                >
                  {[
                    { icon: Github, href: 'https://github.com/myself-pabitra', label: 'GitHub' },
                    { icon: Linkedin, href: 'https://www.linkedin.com/in/pabitrapandit', label: 'LinkedIn' },
                    // { icon: Code2, href: 'https://leetcode.com/myself_pabitra', label: 'LeetCode' },
                    { icon: Mail, href: 'mailto:pabitrapandit2001@gmail.com', label: 'Email' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`text-zinc-400 hover:text-green-500 transition-colors duration-300`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Scroll to explore</span>
                    <ChevronDown className="w-5 h-5 text-green-500" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </section>

            <section id="about" className="py-20">
              <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>About Me</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Window title="about-me.txt" isActive>
                  <div className="font-mono space-y-4 text-zinc-300">
                    <div className="typing-effect">
                      <div className="flex gap-4 items-center hover:bg-zinc-800/50 p-2 rounded transition-colors">
                        <span className="text-zinc-600 select-none">01</span>
                        <span>
                          Hi! I'm <span className="text-green-500 font-semibold">Pabitra Pandit</span>, a{' '}
                          <span className="text-blue-400 font-semibold">Python Backend Developer</span> at Paythrough Software Solutions Private Limited.
                        </span>
                      </div>
                      <div className="flex gap-4 items-center hover:bg-zinc-800/50 p-2 rounded transition-colors">
                        <span className="text-zinc-600 select-none">02</span>
                        <span>
                          With <span className="text-yellow-500">2.5+ years</span> of experience in designing
                          <span className="text-purple-400"> scalable APIs</span> and{' '}
                          <span className="text-purple-400">high-performance web applications</span>.
                        </span>
                      </div>
                      <div className="flex gap-4 items-center hover:bg-zinc-800/50 p-2 rounded transition-colors">
                        <span className="text-zinc-600 select-none">03</span>
                        <span>
                          Specializing in <span className="text-pink-400">backend development</span> and{' '}
                          <span className="text-orange-400">modern web technologies</span>.
                        </span>
                      </div>
                      <div className="flex gap-4 items-center hover:bg-zinc-800/50 p-2 rounded transition-colors">
                        <span className="text-zinc-600 select-none">04</span>
                        <span>
                          Passionate about <span className="text-green-400">crafting efficient solutions</span> and{' '}
                          <span className="text-blue-400">maintaining clean code</span>.
                        </span>
                      </div>
                      <div className="flex gap-4 items-center hover:bg-zinc-800/50 p-2 rounded transition-colors">
                        <span className="text-zinc-600 select-none">05</span>
                        <span>
                          Proven track record of <span className="text-yellow-500">delivering impactful solutions</span> in challenging projects.
                        </span>
                      </div>
                    </div>
                  </div>
                </Window>



                <div className="space-y-6">
                  <Window title="skills.json">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-green-500 mb-4 font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Languages & Tools
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {['Python', 'JavaScript', 'C', 'C++', 'SQL'].map(skill => (
                            <motion.span
                              key={skill}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1.5 bg-zinc-800/70 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700/70 transition-colors cursor-default"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-blue-400 mb-4 font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          Frameworks & Libraries
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {['Django', , 'FastAPI', 'Django REST Framework', 'SQLAlchemy', 'React', 'Pytest',].map(skill => (
                            <motion.span
                              key={skill}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1.5 bg-zinc-800/70 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700/70 transition-colors cursor-default"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-yellow-500 mb-4 font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          Cloud & DevOps
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {['AWS', 'Docker', 'Git', 'Linux'].map(skill => (
                            <motion.span
                              key={skill}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1.5 bg-zinc-800/70 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700/70 transition-colors cursor-default"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Window>

                  <Window title="achievements.md">
                    <div className="space-y-4">
                      {[
                        { icon: '🚀', color: 'text-green-500', text: 'Spearheaded the development of scalable APIs handling 100,000+ monthly transactions' },
                        { icon: '💻', color: 'text-yellow-500', text: 'Expert in RESTful API development and automated testing with 90% test coverage' },
                        { icon: '📊', color: 'text-blue-400', text: 'Built a real-time transaction monitoring dashboard, reducing issue resolution time by 50%' },
                        { icon: '🌐', color: 'text-purple-400', text: 'Contributed to full-stack projects with modern tech stacks like Django, FastAPI, and React.js' },
                        { icon: '🔍', color: 'text-pink-400', text: 'Optimized UPI intent systems, increasing transaction success rates by 40%' },
                        { icon: '🌟', color: 'text-orange-400', text: 'Recognized for delivering high-impact solutions in fast-paced Agile environments' }
                      ].map((achievement, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                        >
                          <span className="text-xl">{achievement.icon}</span>
                          <span className={`${achievement.color} font-medium`}>{achievement.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </Window>

                </div>
              </div>
            </section>

            <section id="projects" className="py-20">
              <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Projects</h2>
              <Window title="projects.json" isActive>
                <div className="space-y-8">
                  {[
                    {
                      id: '01',
                      title: 'Scalable Payment Gateway API',
                      year: '2024',
                      tech: ['Python', 'FastAPI', 'MySQL'],
                      description: 'A scalable and secure API for integrating multiple payment methods, handling 100,000+ monthly transactions.'
                    },
                    {
                      id: '02',
                      title: 'Real-Time Transaction Monitoring Dashboard',
                      year: '2024',
                      tech: ['Python', 'FastAPI', 'Django', 'MySQL', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
                      description: 'A real-time dashboard for monitoring transactions across multiple payment methods, reducing issue resolution time by 50%.'
                    },
                    {
                      id: '03',
                      title: 'Automated Testing Suite for Web Applications',
                      year: '2022',
                      tech: ['Python', 'Selenium', 'Cucumber'],
                      description: 'An end-to-end automated testing framework that reduced manual testing time by 60%, with over 90% test coverage.'
                    },
                    {
                      id: '04',
                      title: 'ChicChoice E-commerce Platform',
                      year: '2023',
                      tech: ['Python', 'Django', 'MySQL', 'HTML5', 'CSS3', 'Bootstrap'],
                      description: 'A full-stack e-commerce platform with secure user authentication, real-time product management, and integrated payment processing.'
                    },

                  ].map((project) => (
                    <motion.div
                      key={project.id}
                      className="group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <span className="text-zinc-600 font-mono">{project.id}</span>
                          <h3 className={`text-2xl font-bold group-hover:text-green-500 transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            {project.title}
                          </h3>
                        </div>
                        <span className="text-zinc-600">{project.year}</span>
                      </div>
                      <p className={`mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{project.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 rounded-full bg-zinc-800/50 text-xs text-zinc-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Window>
            </section>


            <section id="career" className="py-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className={`text-3xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Career Journey
                </h2>
                <motion.a
                  href="https://drive.google.com/file/d/10BMAFigxAIGCNvHvr6zgbxPZWjh1vUfY/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg text-green-500 
        hover:bg-zinc-700 transition-colors duration-300 border border-green-500/20"
                >
                  <FileText className="w-4 h-4" />
                  <span className="font-mono text-sm">Pabitra_Pandit_Resume.pdf</span>
                </motion.a>
              </div>
              <Window title="career.json" isActive={activeWindow === 'career'}>
                <div className="space-y-12">
                  {/* Paythrough Software and Solutions Pvt. Ltd. - Python Developer */}
                  <motion.div
                    className="relative pl-8 border-l-2 border-green-500/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute -left-[9px] top-0">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          Python Developer
                        </h3>
                        <span className="text-green-500 font-mono text-sm">Oct 2023 - Present</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Paythrough Software and Solutions Pvt. Ltd.</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-zinc-500">Kolkata, India</span>
                      </div>
                      <ul className="space-y-3 text-zinc-400">
                        <li className="flex gap-2">
                          <span className="text-green-500">→</span>
                          <span>Engineered and deployed robust RESTful API systems for payment gateway integration, handling 100,000+ monthly transactions</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-green-500">→</span>
                          <span>Optimized UPI intent systems, resulting in 40% improvement in transaction success rates</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-green-500">→</span>
                          <span>Architected scalable API infrastructure supporting multiple payment methods (UPI, IMPS, NEFT, RTGS, DD)</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-green-500">→</span>
                          <span>Developed real-time transaction monitoring dashboard using FastAPI and React.js, reducing issue resolution time by 50%</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-green-500">→</span>
                          <span>Implemented role-based access control (RBAC) system enhancing security protocols for 10+ internal users</span>
                        </li>
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Python', 'FastAPI', 'React.js', 'RESTful APIs', 'UPI', 'AWS', 'Security'].map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Cognizant Technology Solutions - Quality Assurance Engineer */}
                  <motion.div
                    className="relative pl-8 border-l-2 border-blue-500/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute -left-[9px] top-0">
                      <div className="w-4 h-4 rounded-full bg-blue-500" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          Quality Assurance Engineer
                        </h3>
                        <span className="text-blue-500 font-mono text-sm">Jul 2022 - Sep 2023</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>Cognizant Technology Solutions</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-zinc-500">Kolkata, India</span>
                      </div>
                      <ul className="space-y-3 text-zinc-400">
                        <li className="flex gap-2">
                          <span className="text-blue-500">→</span>
                          <span>Spearheaded test automation initiatives using Selenium with Python, reducing manual testing time by 60% across 1000+ test cases</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-500">→</span>
                          <span>Designed and maintained end-to-end automated test suites, achieving 90% test coverage</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-500">→</span>
                          <span>Collaborated with cross-functional teams in an Agile environment for Royal London Mutual Insurance Society project</span>
                        </li>
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Selenium', 'Python', 'Test Automation', 'Agile', 'QA', 'Cucumber'].map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Education */}
                  <motion.div
                    className="relative pl-8 border-l-2 border-purple-500/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="absolute -left-[9px] top-0">
                      <div className="w-4 h-4 rounded-full bg-purple-500" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          Bachelor of Computer Applications
                        </h3>
                        <span className="text-purple-500 font-mono text-sm">Graduated Jun 2022</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          Midnapore College (Autonomous)
                        </span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-zinc-500">Midnapore, West Bengal</span>
                      </div>
                      <div className="text-zinc-400">
                        <span className="text-purple-500 font-semibold">CGPA:</span> 8.03/10.0
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Python', 'Django', 'Object-Oriented Programming', 'Database Management Systems', 'Web Development',].map((subject) => (
                          <span key={subject} className="px-2 py-1 bg-zinc-800/50 rounded-full text-xs text-zinc-400">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Window>
            </section>


            <section id="contact" className="py-20">
              <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Contact</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Window title="contact-form.jsx" isActive>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        disabled={loading} // Disable input during submission
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-zinc-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        disabled={loading} // Disable input during submission
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-zinc-600"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        disabled={loading} // Disable input during submission
                        rows={4}
                        placeholder="Your message here..."
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-zinc-600"
                        required
                      ></textarea>
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full ${loading ? 'bg-gray-500' : 'bg-green-500'} text-black font-bold py-3 px-4 rounded-md hover:bg-green-400 transition-colors flex items-center justify-center gap-2`}
                      disabled={loading} // Disable button during submission
                    >
                      {loading ? (
                        <div className="loader w-4 h-4 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div> // Spinner while loading
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                      {loading ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                  {/* Success/Error Message */}
                  {success !== null && (
                    <div className={`pt-4 mt-4 ${success ? 'text-green-500' : 'text-red-500'}`}>
                      <p>{success ? 'Your message was sent successfully!' : errorMessage}</p>
                    </div>
                  )}
                  {/* Quick Response Promise */}
                  <div className="pt-4 border-t border-zinc-800 mt-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <Clock className="w-4 h-4" />
                      <span>Usually responds within 24 hours</span>
                    </div>
                  </div>
                </Window>

                <Window title="me-online.sh">
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      {[
                        { icon: Mail, label: 'pabitrapandit2001@gmail.com', href: 'mailto:pabitrapandit2001@gmail.com' },
                        { icon: Phone, label: '+91 8158079208', href: 'tel:+918158079208' },
                        { icon: MapPin, label: 'Midnapore, West Bengal, India', href: null },
                      ].map((contact, index) => (
                        <motion.div
                          key={index}
                          whileHover={contact.href ? { x: 4 } : {}}
                          className={`group flex items-center gap-4 p-2 rounded-md ${contact.href ? 'hover:bg-zinc-800/50' : ''} transition-colors`}
                        >
                          <contact.icon className={`text-zinc-400 ${contact.href ? 'group-hover:text-green-500' : ''} transition-colors`} />
                          {contact.href ? (
                            <a href={contact.href} className="text-zinc-300 group-hover:text-green-500 transition-colors">{contact.label}</a>
                          ) : (
                            <span className="text-zinc-300">{contact.label}</span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="pt-4 border-t border-zinc-800">
                      <div className="space-y-4">
                        {[
                          { icon: Github, label: 'github.com/myself-pabitra', href: 'https://github.com/myself-pabitra' },
                          { icon: Linkedin, label: 'linkedin.com/in/pabitrapandit', href: 'https://www.linkedin.com/in/pabitrapandit' },
                          // { icon: Code2, label: 'leetcode.com/pabitrapandit', href: 'https://leetcode.com/pabitrapandit' },
                        ].map((social, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ x: 4 }}
                            className="group flex items-center gap-4 p-2 rounded-md hover:bg-zinc-800/50 transition-colors"
                          >
                            <social.icon className="text-zinc-400 group-hover:text-green-500 transition-colors" />
                            <a href={social.href} className="text-zinc-300 group-hover:text-green-500 transition-colors">{social.label}</a>
                            <ArrowUpRight className="text-zinc-600 w-4 h-4 group-hover:text-green-500 transition-colors ml-auto" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Availability Status */}
                    <div className="pt-4 border-t border-zinc-800">
                      <motion.div
                        className="flex items-center gap-3 p-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="relative">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                        </div>
                        <span className="text-zinc-300">Available for new opportunities</span>
                      </motion.div>
                    </div>
                  </div>
                </Window>
              </div>
            </section>
          </main>

          <footer className="bg-black/80 backdrop-blur-sm py-8">
            <div className="container mx-auto px-6 text-center">
              <p className="text-zinc-400">Copyright &copy; {new Date().getFullYear()} Pabitra Pandit. All rights reserved.</p>
            </div>
          </footer>
          <Analytics />
        </>
      )}
    </div>
  )
}