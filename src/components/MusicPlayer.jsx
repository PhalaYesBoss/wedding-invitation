import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState('Wedding Song');
  const playerRef = useRef(null);
  const containerId = 'youtube-audio-player';

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current) return; // Already initialized

      try {
        playerRef.current = new window.YT.Player(containerId, {
          height: '0',
          width: '0',
          videoId: '4V6vbbOb4gQ',
          playerVars: {
            autoplay: 0,
            loop: 1,
            playlist: '4V6vbbOb4gQ',
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(40);
              try {
                const data = event.target.getVideoData();
                if (data && data.title) {
                  setSongTitle(data.title);
                }
              } catch (e) {
                console.log("Error getting video data on ready", e);
              }
            },
            onStateChange: (event) => {
              if (event.data === 1) { // playing
                setIsPlaying(true);
                try {
                  const data = event.target.getVideoData();
                  if (data && data.title) {
                    setSongTitle(data.title);
                  }
                } catch (e) {
                  console.log("Error getting video data on state change", e);
                }
              } else if (event.data === 2 || event.data === 0) { // paused or ended
                setIsPlaying(false);
              }
            },
            onError: (err) => {
              console.error("YouTube player error:", err);
            }
          }
        });
      } catch (err) {
        console.error("Failed to construct YouTube player:", err);
      }
    };

    // Setup global callback
    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.log("Error destroying YouTube player", e);
        }
        playerRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;

    try {
      const state = playerRef.current.getPlayerState ? playerRef.current.getPlayerState() : -1;
      if (state === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        // Try refreshing title
        const data = playerRef.current.getVideoData();
        if (data && data.title) {
          setSongTitle(data.title);
        }
      }
    } catch (err) {
      console.error("Error toggling YouTube play state:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Hidden YouTube Player Iframe Target */}
      <div id={containerId} className="hidden pointer-events-none w-0 h-0 absolute" />

      {isPlaying && (
        <div className="hidden sm:flex items-center gap-1.5 bg-cream-50/90 border border-gold-300 backdrop-blur-md px-3 py-1.5 rounded-full text-sage-800 text-xs font-serif tracking-wider shadow-lg animate-fade-in max-w-xs truncate">
          <Music className="w-3.5 h-3.5 animate-bounce shrink-0" />
          <span className="truncate max-w-[180px] font-medium">{songTitle}</span>
          <span className="flex gap-0.5 items-end h-3 shrink-0">
            <span className="w-0.5 bg-gold-500 rounded-full animate-pulse h-1.5" />
            <span className="w-0.5 bg-gold-500 rounded-full animate-pulse h-3 delay-75" />
            <span className="w-0.5 bg-gold-500 rounded-full animate-pulse h-2 delay-150" />
            <span className="w-0.5 bg-gold-500 rounded-full animate-pulse h-2.5 delay-300" />
          </span>
        </div>
      )}
      <button
        id="btn-music-toggle"
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-sage-800 hover:bg-sage-700 text-gold-100 flex items-center justify-center border-2 border-gold-400/60 shadow-xl transition-all duration-300 hover:scale-110 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-400"
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-gold-200 group-hover:rotate-12 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 text-gold-400 group-hover:scale-95 transition-transform animate-pulse" />
        )}
      </button>
    </div>
  );
}
