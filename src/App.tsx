import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

import bg from "./ANHBACKOUND.jpg";
import frame from "./khung.jpg";
import weddingMusic from "./weddingMusic.mp3";

type TabKey = "home" | "story" | "gallery" | "info" | "rsvp";

const PETAL_COLORS = ["#FFB7C5", "#FFC0CB", "#FFD1DC", "#FFAEC0", "#FF91A4"];

function useLightEffects() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 768px)");
    const update = () => setLight(mq.matches || mobile.matches);
    update();
    mq.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);
  return light;
}

// =========================================================
// ENVELOPE INTRO SCREEN
// =========================================================
function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");

  const handleTap = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
      setTimeout(onOpen, 600);
    }, 1400);
  };

  return (
    <m.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#faf8f5" }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Hoa góc trên trái */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontSize: 64,
          opacity: 0.55,
          lineHeight: 1,
          transform: "rotate(-10deg) translate(-8px,-8px)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        🌿🌼
      </div>

      {/* Hoa góc dưới phải */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 0,
          fontSize: 56,
          opacity: 0.5,
          lineHeight: 1,
          transform: "rotate(10deg) translate(8px,8px)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        🌸🌹
      </div>

      {/* Dòng chữ trên đầu */}
      <m.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 8,
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "#b0a090",
          fontWeight: 500,
          textTransform: "uppercase",
        }}
      >
        <span>YOU ARE</span>
        <span>THE LOVE OF</span>
        <span>MY LIFE</span>
      </m.div>

      {/* Tiêu đề chữ thảo */}
      <m.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
        style={{
          fontFamily: "cursive, serif",
          fontSize: "clamp(28px, 8vw, 44px)",
          color: "#3a3028",
          marginBottom: 32,
          letterSpacing: "0.02em",
          textAlign: "center",
        }}
      >
        Wedding Invitation
      </m.div>

      {/* Chú thích chạm */}
      <m.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          fontSize: 13,
          color: "#a09080",
          marginBottom: 20,
          letterSpacing: "0.05em",
        }}
      >
        Chạm để mở thiệp
      </m.p>

      {/* PHONG BÌ */}
      <m.div
        onClick={handleTap}
        style={{
          cursor: phase === "idle" ? "pointer" : "default",
          position: "relative",
          width: 280,
          height: 180,
        }}
        whileHover={phase === "idle" ? { scale: 1.04 } : {}}
        whileTap={phase === "idle" ? { scale: 0.97 } : {}}
      >
        {/* Thân phong bì */}
        <svg
          width="280"
          height="180"
          viewBox="0 0 280 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thân */}
          <rect
            x="2"
            y="2"
            width="276"
            height="176"
            rx="8"
            fill="#e8e0d4"
            stroke="#d4c8b8"
            strokeWidth="1.5"
          />
          {/* Tam giác đáy */}
          <polygon points="2,178 140,100 278,178" fill="#ddd4c4" />
          {/* Tam giác trái */}
          <polygon points="2,2 2,178 100,95" fill="#d8cfc0" />
          {/* Tam giác phải */}
          <polygon points="278,2 278,178 180,95" fill="#d8cfc0" />
          {/* Nắp phong bì — xoay khi mở */}
          <m.polygon
            points="2,2 278,2 140,95"
            fill="#e0d8cc"
            stroke="#d4c8b8"
            strokeWidth="1"
            style={{ transformOrigin: "140px 2px" }}
            animate={
              phase === "opening" || phase === "done"
                ? { rotateX: 180, opacity: 0 }
                : { rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </svg>

        {/* Con dấu sáp */}
        <m.div
          style={{
            position: "absolute",
            left: "50%",
            top: "54%",
            transform: "translate(-50%,-50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #c8956a, #8b5e3c)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            zIndex: 10,
          }}
          animate={
            phase === "opening"
              ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] }
              : {}
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          🍃
        </m.div>

        {/* Ánh sáng thoát ra khi mở */}
        <AnimatePresence>
          {phase === "opening" && (
            <m.div
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: [0, 0.8, 0], scale: 2.5, y: -60 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "50%",
                top: "30%",
                transform: "translateX(-50%)",
                width: 100,
                height: 100,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,240,200,0.9) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>
      </m.div>

      {/* Ngày giờ phía dưới */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ textAlign: "center", marginTop: 36, color: "#7a6a58" }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 8,
            color: "#a09080",
          }}
        >
          Trân trọng kính mời
        </p>
        <p
          style={{
            fontSize: 11,
            color: "#9a8a78",
            marginBottom: 14,
            letterSpacing: "0.05em",
          }}
        >
          Đến dự buổi tiệc chung vui cùng gia đình chúng tôi vào lúc
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: "clamp(18px,5vw,26px)",
              fontWeight: 700,
              color: "#b8956a",
              letterSpacing: "0.08em",
            }}
          >
            11 GIỜ 30
          </span>
          <span style={{ color: "#c8b09a", fontSize: 20 }}>|</span>
          <span
            style={{
              fontSize: "clamp(18px,5vw,26px)",
              fontWeight: 700,
              color: "#b8956a",
              letterSpacing: "0.08em",
            }}
          >
            CHỦ NHẬT
          </span>
          <span style={{ color: "#c8b09a", fontSize: 20 }}>|</span>
          <span
            style={{
              fontSize: "clamp(18px,5vw,26px)",
              fontWeight: 700,
              color: "#b8956a",
              letterSpacing: "0.08em",
            }}
          >
            19.07.2026
          </span>
        </div>
        <p
          style={{
            fontSize: 11,
            color: "#b0a090",
            marginTop: 8,
            fontStyle: "italic",
          }}
        >
          (Nhằm ngày 06 tháng 06 năm Bính Ngọ)
        </p>
      </m.div>
    </m.div>
  );
}

// =========================================================
// SAKURA PETALS
// =========================================================
const SakuraPetals = memo(function SakuraPetals({ count }: { count: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 17 + 5) % 100,
        delay: `${(i * 0.9) % 10}s`,
        duration: `${9 + (i % 5)}s`,
        size: 8 + (i % 4) * 3,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
        swing: `${((i % 7) - 3) * 24}px`,
      })),
    [count]
  );

  return (
    <div className="sakura-layer" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="sakura-petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.9,
              backgroundColor: p.color,
              animationDuration: p.duration,
              animationDelay: p.delay,
              "--swing": p.swing,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
});

// =========================================================
// HEART CONFETTI
// =========================================================
function HeartConfetti({ active }: { active: boolean }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: 8 + i * 6,
        delay: (i % 7) * 0.12,
        size: 14 + (i % 3) * 5,
        drift: (i % 5) * 28 - 56,
      })),
    []
  );

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
          {hearts.map((h) => (
            <m.div
              key={h.id}
              style={{
                position: "absolute",
                left: `${h.left}%`,
                bottom: "10%",
                fontSize: h.size,
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -420, opacity: [1, 1, 0], x: h.drift }}
              transition={{ duration: 2.2, delay: h.delay, ease: "easeOut" }}
            >
              💕
            </m.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

// =========================================================
// SHIMMER CARD
// =========================================================
function ShimmerCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`shimmer-card ${className}`}>{children}</div>;
}

// =========================================================
// RIPPLE BUTTON
// =========================================================
const RippleButton = memo(function RippleButton({
  onClick,
  children,
  className = "",
}: {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden transition-transform duration-200 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
});

// =========================================================
// GIFT BOX QR
// =========================================================
function GiftBoxQR() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="text-center mb-10">
      <p className="text-xs text-white/90 italic mb-4">
        Bấm vào hộp quà để xem thông tin mừng cưới 🎁
      </p>

      <AnimatePresence mode="wait">
        {!opened ? (
          <m.div
            key="box"
            className="cursor-pointer inline-flex flex-col items-center gap-2"
            onClick={() => setOpened(true)}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 1, scale: 1 }}
            exit={{ scale: 1.3, opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <m.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                <rect
                  x="12"
                  y="46"
                  width="72"
                  height="42"
                  rx="5"
                  fill="#F9A8D4"
                />
                <rect x="42" y="46" width="12" height="42" fill="#FBCFE8" />
                <rect
                  x="8"
                  y="30"
                  width="80"
                  height="18"
                  rx="5"
                  fill="#F472B6"
                />
                <rect x="42" y="30" width="12" height="18" fill="#FBCFE8" />
                <ellipse
                  cx="35"
                  cy="28"
                  rx="13"
                  ry="9"
                  fill="#EC4899"
                  opacity="0.9"
                  transform="rotate(-15 35 28)"
                />
                <ellipse
                  cx="61"
                  cy="28"
                  rx="13"
                  ry="9"
                  fill="#EC4899"
                  opacity="0.9"
                  transform="rotate(15 61 28)"
                />
                <circle cx="48" cy="30" r="6" fill="#FDF2F8" />
                <circle cx="48" cy="30" r="3" fill="#EC4899" />
                <text x="20" y="72" fontSize="12" fill="#fff" opacity="0.5">
                  ♥
                </text>
                <text x="64" y="68" fontSize="10" fill="#fff" opacity="0.4">
                  ♥
                </text>
              </svg>
            </m.div>
            <span className="text-xs text-pink-200 font-medium tracking-wide">
              Hộp quà cưới
            </span>
          </m.div>
        ) : (
          <m.div
            key="qr"
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 18, stiffness: 200 }}
            className="inline-block"
          >
            <div className="bg-white/10 backdrop-blur-md border border-pink-300/30 rounded-2xl p-5 shadow-2xl text-center max-w-[280px] mx-auto">
              <m.div
                className="text-2xl mb-2"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 10 }}
              >
                🎉
              </m.div>
              <p className="text-xs text-pink-200 font-semibold uppercase tracking-widest mb-1">
                Mừng cưới
              </p>
              <p className="text-sm text-white font-serif mb-4">
                Hoàng &amp; Thảo
              </p>
              <div className="bg-white rounded-xl p-2 w-fit mx-auto mb-3 shadow-md">
                <img
                  src="https://i.ibb.co/wZWkp1wL/IMG-3789.jpg"
                  alt="Mã QR mừng cưới"
                  width={160}
                  height={160}
                  className="rounded-lg object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=MungCuoiHoangThao2026&color=EC4899&bgcolor=ffffff";
                  }}
                />
              </div>
              <p className="text-[11px] text-white/60 italic mb-3">
                Scan để chuyển khoản mừng cưới 💕
              </p>
              <button
                type="button"
                onClick={() => setOpened(false)}
                className="text-[11px] text-white/40 hover:text-white/70 transition underline cursor-pointer"
              >
                Đóng lại
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =========================================================
// MAIN APP
// =========================================================
export default function App() {
  const lightEffects = useLightEffects();
  const petalCount = lightEffects ? 0 : 10;

  // Màn hình phong bì — chưa mở thì chặn toàn bộ nội dung
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const [tab, setTab] = useState<TabKey>("home");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [rsvpData, setRsvpData] = useState({
    name: "",
    side: "bride",
    guests: "1",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const playlist = [
    weddingMusic,
    "https://docs.google.com/uc?export=download&id=ID_BAI_NHAC_1",
    "https://docs.google.com/uc?export=download&id=ID_BAI_NHAC_2",
  ];

  const weddingPhotos = [
    "https://i.ibb.co/yBGfDkdZ/khung.jpg",
    "https://i.ibb.co/hFK0Y64v/LA4A9176.jpg",
    "https://i.ibb.co/chvsqLC2/LA4A9002.jpg",
    "https://i.ibb.co/6R0b26YK/LA4A8953.jpg",
    "https://i.ibb.co/yBGfDkdZ/khung.jpg",
    "https://i.ibb.co/5gN3g3dg/LA4A8861.jpg",
    "https://i.ibb.co/x8H0RCdd/LA4-A8722-1.jpg",
    "https://i.ibb.co/MkrXxFkq/LA4A7775.jpg",
    "https://i.ibb.co/RG8R4CCH/LA4A7888.jpg",
    "https://i.ibb.co/dw9zQYQZ/anh-cuoi-full-quality.jpg",
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      document.removeEventListener("click", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);
    return () => document.removeEventListener("click", handleFirstInteraction);
  }, [isPlaying]);

  const handleTrackEnded = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setTimeout(() => {
      if (audioRef.current)
        audioRef.current.play().then(() => setIsPlaying(true));
    }, 200);
  };

  const togglePlayMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const target = new Date("2026-07-19T11:30:00").getTime();
    const interval = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const sectionRefs: Record<TabKey, React.RefObject<HTMLElement>> = {
    home: useRef(null),
    story: useRef(null),
    gallery: useRef(null),
    info: useRef(null),
    rsvp: useRef(null),
  };

  const handleTabChange = (t: TabKey) => {
    setTab(t);
    sectionRefs[t]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.name.trim()) return alert("Vui lòng nhập tên của bạn ạ! ❤️");
    const emailTo = "hoangvo027@gmail.com";
    const subject = encodeURIComponent(
      `[RSVP Đám Cưới] Khách mời: ${rsvpData.name}`
    );
    const body = encodeURIComponent(
      `Họ tên: ${rsvpData.name}\n` +
        `Khách bên: ${rsvpData.side === "bride" ? "Nhà Gái" : "Nhà Trai"}\n` +
        `Số lượng tham dự: ${rsvpData.guests} người\n` +
        `Lời chúc: ${rsvpData.message}`
    );
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      {/* ===== ENVELOPE INTRO — hiện trước, che toàn màn hình ===== */}
      <AnimatePresence>
        {!envelopeOpened && (
          <EnvelopeIntro onOpen={() => setEnvelopeOpened(true)} />
        )}
      </AnimatePresence>

      {/* ===== NỘI DUNG THIỆP CHÍNH ===== */}
      <div
        className="wedding-bg text-white font-sans selection:bg-pink-400 selection:text-white overflow-x-hidden pb-24"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <audio
          ref={audioRef}
          src={playlist[currentTrackIndex]}
          onEnded={handleTrackEnded}
          preload="metadata"
        />

        <div className="wedding-overlay" />
        {petalCount > 0 && <SakuraPetals count={petalCount} />}
        <HeartConfetti active={showConfetti} />

        {/* Nút nhạc */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 drop-shadow-md">
          <span className="text-[10px] md:text-xs glass-card px-2 py-1 rounded-md text-pink-200 font-medium tracking-wide">
            {isPlaying ? "🎵 Đang phát nhạc đám cưới..." : "🔇 Nhạc đang tắt"}
          </span>
          <button
            type="button"
            onClick={togglePlayMusic}
            className={`w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 text-neutral-800 shadow-xl flex items-center justify-center border-2 border-pink-400 cursor-pointer text-xl select-none relative z-50 transition-transform hover:scale-105 active:scale-95 ${
              isPlaying ? "music-spin" : ""
            }`}
          >
            {isPlaying ? "💿" : "🎵"}
          </button>
        </div>

        <div className="relative z-10">
          {/* ===== HERO ===== */}
          <section
            ref={sectionRefs.home}
            className="h-screen flex flex-col items-center px-4 overflow-hidden"
          >
            <m.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="w-full max-w-lg shrink-0 z-20 text-center tracking-wide pt-[2vh] sm:pt-[3vh]"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-pink-200 block mb-2 font-semibold save-date-pulse">
                Save The Date
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif mb-3 md:mb-4 title-glow px-4 leading-tight">
                Hoàng{" "}
                <span className="text-pink-300 font-sans amp-pulse">&</span>{" "}
                Thảo
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-white/90 italic max-w-xs mx-auto border-y border-white/20 py-2">
                Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi
              </p>
            </m.div>

            <div className="flex-1 flex items-center justify-center w-full min-h-0 relative z-10 pointer-events-none">
              <m.div
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="relative flex items-center justify-center w-full max-w-[min(100%,22rem)] sm:max-w-md md:max-w-lg h-full max-h-[48vh] sm:max-h-[52vh] md:max-h-[58vh]"
              >
                {!lightEffects && <div className="hero-glow" aria-hidden />}
                <img
                  src={frame}
                  alt="Khung ảnh cưới Hoàng và Thảo"
                  decoding="async"
                  className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                />
              </m.div>
            </div>

            <m.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
              className="w-full shrink-0 z-20 text-center pb-[2vh] sm:pb-[3vh]"
            >
              <div className="flex gap-2 justify-center text-neutral-900 select-none">
                {[
                  { label: "Ngày", val: timeLeft.days },
                  { label: "Giờ", val: timeLeft.hours },
                  { label: "Phút", val: timeLeft.minutes },
                  { label: "Giây", val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="countdown-box transition-transform hover:scale-105 hover:-translate-y-0.5"
                  >
                    <div className="text-xl md:text-2xl font-bold text-pink-600 font-mono leading-none tabular-nums">
                      {String(item.val).padStart(2, "0")}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-500 mt-1 font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 md:mt-6 flex flex-col items-center gap-1 text-white/40 text-xs scroll-hint">
                <div className="w-[1px] h-6 bg-white/20 mx-auto" />
                <span>Cuộn xuống</span>
              </div>
            </m.div>
          </section>

          {/* ===== OUR STORY ===== */}
          <section
            ref={sectionRefs.story}
            className="section-below-fold py-24 px-4 max-w-4xl mx-auto space-y-16"
          >
            <m.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="text-pink-300 text-3xl mb-3">✨</div>
              <h2 className="text-3xl font-serif mb-6 tracking-wide text-pink-200">
                Our Story
              </h2>
              <div className="w-12 h-[1px] bg-white/30 mx-auto mb-6" />
              <ShimmerCard className="bg-black/20 p-6 rounded-2xl border border-white/5 shadow-xl">
                <p className="leading-relaxed text-white/90 text-sm md:text-base px-2">
                  "Chúng ta đã cùng nhau đi qua nhiều thăng trầm để nhận ra rằng
                  được ở bên nhau là điều quý giá nhất. Hôm nay, trước sự chứng
                  kiến của mọi người từ khoảnh khắc này chúng ta sẽ nhẹ nhàng
                  gọi nhau bằng hai tiếng Vợ - Chồng."
                </p>
              </ShimmerCard>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {[
                {
                  side: "Nhà Gái",
                  photo: "https://i.ibb.co/JRJKJ0cF/thao.jpg",
                  alt: "Cô dâu Nguyễn Thị Thảo",
                  father: "Nguyễn Văn Lợi",
                  mother: "Lê Thị Thanh",
                  address: "Trung Thanh, Phong Dinh, TP.Huế",
                  rank: "Trưởng nữ",
                  name: "Nguyễn Thị Thảo",
                  delay: 0,
                },
                {
                  side: "Nhà Nam",
                  photo: "https://i.ibb.co/tpQ9WjrM/hoang.jpg",
                  alt: "Chú rể Võ Văn Hoàng",
                  father: "Võ Văn Tính",
                  mother: "Trần Thị Hoa",
                  address: "120 Tân Lập, Kado, Lâm Đồng",
                  rank: "Thứ nam",
                  name: "Võ Văn Hoàng",
                  delay: 0.2,
                },
              ].map((person, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: person.delay }}
                  whileHover={{ y: -6, scale: 1.01 }}
                >
                  <ShimmerCard className="bg-black/30 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-2xl h-full">
                    <div className="w-32 h-44 shrink-0 rounded-xl overflow-hidden border-2 border-pink-300/50 shadow-md">
                      <img
                        src={person.photo}
                        alt={person.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-2">
                      <span className="text-xs font-semibold tracking-widest text-pink-300 uppercase block">
                        ーー {person.side} ーー
                      </span>
                      <div className="text-sm text-white/80 space-y-0.5 font-medium">
                        <p>
                          <b>Ông:</b> {person.father}
                        </p>
                        <p>
                          <b>Bà:</b> {person.mother}
                        </p>
                        <p className="text-xs text-white/60 italic font-normal">
                          {person.address}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-xs text-pink-200 block">
                          {person.rank}
                        </span>
                        <h3 className="text-xl font-serif font-bold text-white tracking-wide mt-0.5">
                          {person.name}
                        </h3>
                      </div>
                    </div>
                  </ShimmerCard>
                </m.div>
              ))}
            </div>
          </section>

          {/* ===== GALLERY ===== */}
          <section
            ref={sectionRefs.gallery}
            className="section-below-fold py-12 max-w-5xl mx-auto px-4"
          >
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-serif text-center mb-2 text-pink-200"
            >
              Wedding Album
            </m.h2>
            <p className="text-xs text-center text-white/60 mb-8 italic">
              Bấm vào từng bức ảnh để ngắm nhìn khoảnh khắc của chúng mình
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {weddingPhotos.map((url, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  onClick={() => setSelectedPhoto(url)}
                  whileHover={{
                    scale: 1.04,
                    y: -5,
                    rotate: i % 2 === 0 ? 0.8 : -0.8,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative aspect-[3/4] bg-neutral-800/40 rounded-xl overflow-hidden shadow-lg border border-white/10 group cursor-pointer"
                >
                  <img
                    src={url}
                    alt={`Wedding Photo ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.onerror = null;
                      const parent = img.parentElement;
                      if (parent)
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs text-white/30 italic px-2 text-center">Đang tải ảnh cưới...</div>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-lg">
                      🔍
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </section>

          {/* ===== WEDDING INFO ===== */}
          <section
            ref={sectionRefs.info}
            className="section-below-fold py-20 px-4 text-center max-w-xl mx-auto"
          >
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ShimmerCard className="bg-neutral-900/60 backdrop-blur-md border border-pink-500/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-300/30 m-4 rounded-tl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink-300/30 m-4 rounded-br" />
                <m.div
                  className="absolute top-3 right-14 text-xl opacity-30"
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🌹
                </m.div>
                <m.div
                  className="absolute bottom-3 left-14 text-xl opacity-30"
                  animate={{ rotate: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  🌸
                </m.div>
                <h2 className="text-3xl font-serif mb-6 text-pink-200 tracking-wide">
                  Wedding Time
                </h2>
                <div className="space-y-4 text-sm md:text-base text-white/90">
                  <m.div
                    className="text-2xl font-semibold text-pink-300 tracking-widest font-mono"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    19 . 07 . 2026
                  </m.div>
                  <div className="flex justify-center items-center gap-2 text-white/80">
                    <span>🕣</span>
                    <span>Vào lúc 11 giờ 30 phút</span>
                  </div>
                  <div className="w-6 h-[1px] bg-white/20 mx-auto my-2" />
                  <div className="font-medium text-white">
                    📍 Tư gia nhà nam
                  </div>
                  <m.button
                    onClick={() =>
                      window.open(
                        "https://maps.app.goo.gl/BUkYcq4ox3otc9xz7",
                        "_blank"
                      )
                    }
                    className="mt-4 text-xs bg-white/10 hover:bg-white/20 text-pink-200 px-6 py-2 rounded-full transition-all border border-white/10 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🗺️ Xem bản đồ chỉ đường
                  </m.button>
                </div>
              </ShimmerCard>
            </m.div>
          </section>

          {/* ===== RSVP ===== */}
          <section
            ref={sectionRefs.rsvp}
            className="section-below-fold py-16 px-4 max-w-md mx-auto text-center pb-32"
          >
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-serif mb-2 text-pink-200"
            >
              Xác Nhận Tham Dự
            </m.h2>

            <p className="text-xs text-white/90 mb-8 italic">
              Để ngày vui được trọn vẹn, xin vui lòng phản hồi trước ngày lễ
              nhé! ❤️
            </p>

            {/* GIFT BOX QR */}
            <GiftBoxQR />

            <m.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onSubmit={handleRsvpSubmit}
              className="space-y-5 bg-neutral-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-left shadow-2xl"
            >
              <div>
                <label className="text-xs font-semibold text-pink-200 block mb-1.5 uppercase tracking-wide">
                  Họ và Tên của Bạn
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Anh Tuấn, Chị Lan..."
                  value={rsvpData.name}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, name: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-400 transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-200 block mb-2 uppercase tracking-wide">
                  Bạn là khách của ai?
                </label>
                <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-white/10 relative">
                  {["bride", "groom"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRsvpData({ ...rsvpData, side: s })}
                      className={`py-2 text-xs font-medium rounded-lg relative z-10 transition-colors ${
                        rsvpData.side === s
                          ? "text-neutral-900 font-bold"
                          : "text-white/60"
                      }`}
                    >
                      {rsvpData.side === s && (
                        <m.div
                          layoutId="activeSide"
                          className="absolute inset-0 bg-pink-300 rounded-lg -z-10"
                        />
                      )}
                      {s === "bride" ? "Nhà Gái (Cô dâu)" : "Nhà Trai (Chú rể)"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-200 block mb-1.5 uppercase tracking-wide">
                  Số lượng người tham dự
                </label>
                <select
                  value={rsvpData.guests}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, guests: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-400 transition"
                >
                  <option value="1" className="bg-neutral-900 text-white">
                    Đi 1 mình (Phần mình bạn)
                  </option>
                  <option value="2" className="bg-neutral-900 text-white">
                    Đi 2 người (Cùng người thương)
                  </option>
                  <option value="3" className="bg-neutral-900 text-white">
                    Cả gia đình nhỏ (3-4 người)
                  </option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-pink-200 block mb-1.5 uppercase tracking-wide">
                  Lời chúc gửi tới cô dâu & chú rể
                </label>
                <textarea
                  rows={3}
                  placeholder="Nhắn nhủ điều yêu thương ngọt ngào tại đây..."
                  value={rsvpData.message}
                  onChange={(e) =>
                    setRsvpData({ ...rsvpData, message: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-400 transition resize-none"
                />
              </div>
              <m.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(255,145,164,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold py-3.5 rounded-xl text-sm shadow-xl cursor-pointer relative overflow-hidden"
              >
                <m.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                />
                {isSubmitted
                  ? "🎉 Đã Gửi Xác Nhận Đăng Ký!"
                  : "✉️ Gửi Xác Nhận Ngay"}
              </m.button>
            </m.form>
          </section>
        </div>

        {/* ===== TAB BAR ===== */}
        <div className="fixed bottom-0 inset-x-0 bg-neutral-900/80 backdrop-blur-xl border-t border-white/10 z-50 py-2.5 px-4 flex justify-around max-w-md mx-auto md:rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          {(
            [
              { id: "home", label: "🏠 Home" },
              { id: "story", label: "📖 Story" },
              { id: "gallery", label: "🖼️ Album" },
              { id: "info", label: "📍 Lễ Cưới" },
              { id: "rsvp", label: "💌 RSVP" },
            ] as { id: TabKey; label: string }[]
          ).map((item) => (
            <RippleButton
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`text-[11px] md:text-xs font-medium px-3 py-1.5 rounded-xl transition relative cursor-pointer ${
                tab === item.id ? "text-pink-300 font-bold" : "text-white/60"
              }`}
            >
              {tab === item.id && (
                <m.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-white/5 rounded-xl -z-10"
                />
              )}
              {item.label}
            </RippleButton>
          ))}
        </div>

        {/* ===== LIGHTBOX ===== */}
        <AnimatePresence>
          {selectedPhoto && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/92 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
            >
              {[...Array(8)].map((_, i) => (
                <m.div
                  key={i}
                  style={{
                    position: "fixed",
                    left: `${10 + i * 12}%`,
                    top: "-20px",
                    fontSize: 16,
                    pointerEvents: "none",
                  }}
                  animate={{ y: "110vh", rotate: 360, opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: 3 + i * 0.5,
                    delay: i * 0.3,
                    ease: "easeIn",
                  }}
                >
                  🌸
                </m.div>
              ))}
              <m.img
                initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 250 }}
                src={selectedPhoto}
                alt="Phóng to ảnh cưới"
                className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute top-4 text-xs tracking-wider text-white/50 select-none">
                Chạm vào vùng trống bất kỳ để đóng lại
              </div>
              <m.button
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white/70 hover:bg-white/20 transition"
                onClick={() => setSelectedPhoto(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </m.button>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
