import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ExplodedJourney.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
const FRAME_DIRECTORY = '/journey/frames';

// `progress` = scroll point where the stage becomes active.
// `dot` = marker position on the track, spaced so labels never crowd each other.
const STAGES = [
  { label: 'Bare Land', text: 'Every home starts as raw, surveyed earth.', progress: 0, dot: 0, frame: 2 },
  { label: 'Foundation', text: 'Rebar and deep foundations, built to outlast decades.', progress: 0.23, dot: 0.23, frame: 20 },
  { label: 'Structure', text: 'The concrete skeleton rises into view.', progress: 0.42, dot: 0.42, frame: 42 },
  { label: 'Facade', text: 'Hand-carved stone facades take their final shape.', progress: 0.6, dot: 0.6, frame: 62 },
  { label: 'Finishing', text: 'Windows, balconies, and ironwork fitted by hand.', progress: 0.77, dot: 0.77, frame: 82 },
  { label: 'Completion', text: 'A finished villa, golden hour, ready to call home.', progress: 0.94, dot: 1, frame: 96 },
];

function getFramePath(frame) {
  return `${FRAME_DIRECTORY}/frame-${String(frame).padStart(3, '0')}.jpg`;
}

const POSTER = getFramePath(2);

function loadFrame(frame) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load journey frame ${frame}.`));
    image.src = getFramePath(frame);
  });
}

export default function ExplodedJourney() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const fillRef = useRef(null);
  const framesRef = useRef([]);
  const availableFramesRef = useRef([]);
  const progressRef = useRef(0);
  const initialFrameIndex = STAGES[0].frame - 1;
  const requestedFrameRef = useRef(initialFrameIndex);
  const renderedFrameRef = useRef(-1);
  const drawFrameRef = useRef(null);
  const [prefersReducedMotion] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));
  // Stage index driven by ScrollTrigger on wide screens, by the tap/swipe stepper on small ones.
  const [scrollStage, setScrollStage] = useState(0);
  const activeRef = useRef(0);
  const goToStageRef = useRef(null);
  const touchXRef = useRef(null);
  const [isWide, setIsWide] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  const [imagesReady, setImagesReady] = useState(false);
  const [assetMessage, setAssetMessage] = useState('');
  const lastStage = STAGES.length - 1;
  // Reduced-motion users always see the final stage; everyone else follows scrollStage,
  // which ScrollTrigger drives on wide screens and the tap/swipe stepper on small ones.
  const active = prefersReducedMotion ? lastStage : scrollStage;
  const stepperActive = !isWide && !prefersReducedMotion;
  const handleStep = (index) => {
    if (!stepperActive) return;
    goToStageRef.current?.(index);
  };

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const handleChange = (event) => setIsWide(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const preloadFrames = async () => {
      const frames = new Array(FRAME_COUNT);
      const firstFrame = prefersReducedMotion ? FRAME_COUNT : STAGES[0].frame;

      try {
        frames[firstFrame - 1] = await loadFrame(firstFrame);
      } catch {
        if (!cancelled) {
          setAssetMessage(`The journey could not load ${getFramePath(firstFrame)}. Check that the animation images are available.`);
          setImagesReady(true);
        }
        return;
      }

      if (cancelled) return;

      framesRef.current = frames;
      availableFramesRef.current = [firstFrame - 1];
      requestedFrameRef.current = prefersReducedMotion
        ? FRAME_COUNT - 1
        : initialFrameIndex;

      // Start the pinned animation as soon as its first meaningful frame is ready.
      setImagesReady(true);

      if (prefersReducedMotion) return;

      const priorityFrames = STAGES.slice(1).map((stage) => stage.frame);
      const remainingFrames = [
        ...priorityFrames,
        ...Array.from({ length: FRAME_COUNT }, (_, index) => index + 1)
          .filter((frame) => frame !== firstFrame && !priorityFrames.includes(frame)),
      ];
      let failedFrames = 0;

      for (let start = 0; start < remainingFrames.length; start += 12) {
        const batch = remainingFrames.slice(start, start + 12);
        const results = await Promise.allSettled(batch.map(loadFrame));
        if (cancelled) return;

        results.forEach((result, index) => {
          const frameIndex = batch[index] - 1;
          if (result.status === 'fulfilled') {
            frames[frameIndex] = result.value;
          } else {
            failedFrames += 1;
          }
        });

        availableFramesRef.current = frames.reduce((indices, image, index) => {
          if (image) indices.push(index);
          return indices;
        }, []);

        drawFrameRef.current?.(requestedFrameRef.current);
      }

      if (!cancelled && failedFrames > 0) {
        setAssetMessage(`${failedFrames} journey frame${failedFrames === 1 ? '' : 's'} could not load. Check the files in public${FRAME_DIRECTORY}.`);
      }
    };

    preloadFrames();
    return () => { cancelled = true; };
  }, [initialFrameIndex]);

  useEffect(() => {
    if (!imagesReady || !canvasRef.current || !sectionRef.current) return undefined;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) {
      setAssetMessage('The journey animation could not start because this browser does not support canvas.');
      return undefined;
    }

    const drawFrame = (requestedIndex) => {
      const availableFrames = availableFramesRef.current;
      if (availableFrames.length === 0) return;

      let frameIndex = requestedIndex;
      if (!framesRef.current[frameIndex]) {
        frameIndex = availableFrames.reduce((closest, candidate) => (
          Math.abs(candidate - requestedIndex) < Math.abs(closest - requestedIndex) ? candidate : closest
        ), availableFrames[0]);
      }

      const image = framesRef.current[frameIndex];
      if (!image) return;
      requestedFrameRef.current = requestedIndex;
      if (renderedFrameRef.current === frameIndex) return;
      renderedFrameRef.current = frameIndex;

      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = image.width / image.height;
      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      if (canvasRatio > imageRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imageRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(bounds.width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(bounds.height * pixelRatio));
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      renderedFrameRef.current = -1;
      drawFrame(requestedFrameRef.current);
    };

    drawFrameRef.current = drawFrame;
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (availableFramesRef.current.length === 0) {
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        drawFrameRef.current = null;
      };
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressRef.current = 1;
      if (fillRef.current) fillRef.current.style.transform = 'scaleX(1)';
      drawFrame(FRAME_COUNT - 1);
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        drawFrameRef.current = null;
      };
    }

    // Small screens skip the 400vh pin: a tap/swipe stepper drives the frames instead.
    if (!isWide) {
      const showStage = (index) => {
        const next = Math.max(0, Math.min(lastStage, index));
        const target = STAGES[next];
        activeRef.current = next;
        setScrollStage(next);
        progressRef.current = target.progress;
        drawFrame(target.frame - 1);
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${target.progress})`;
      };

      showStage(activeRef.current);
      goToStageRef.current = showStage;
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        goToStageRef.current = null;
        drawFrameRef.current = null;
      };
    }

    const applyProgress = (progress) => {
      progressRef.current = progress;
      drawFrame(Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT)));

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${progress})`;
      }

      let nextStage = 0;
      STAGES.forEach((stage, index) => {
        if (progress >= stage.progress) nextStage = index;
      });

      if (nextStage !== activeRef.current) {
        activeRef.current = nextStage;
        setScrollStage(nextStage);
      }
    };

    const contextScope = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (instance) => applyProgress(instance.progress),
      });
      // Sync card, fill and dots when the trigger is (re)created mid-scroll,
      // e.g. right after the viewport crosses the 768px breakpoint.
      if (typeof trigger.progress === 'number') applyProgress(trigger.progress);
    }, sectionRef);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      window.removeEventListener('resize', resizeCanvas);
      goToStageRef.current = null;
      drawFrameRef.current = null;
      contextScope.revert();
    };
  }, [imagesReady, lastStage, isWide]);


  const stage = STAGES[active];

  return (
    <section
      ref={sectionRef}
      className="ej"
      id="journey"
      aria-label="The construction journey"
      onTouchStart={(event) => {
        if (stepperActive) touchXRef.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (!stepperActive || touchXRef.current === null) return;
        const deltaX = event.changedTouches[0].clientX - touchXRef.current;
        touchXRef.current = null;
        if (Math.abs(deltaX) < 50) return;
        handleStep(active + (deltaX < 0 ? 1 : -1));
      }}
    >
      <img className="ej__poster" src={POSTER} alt="" aria-hidden="true" />
      <canvas ref={canvasRef} className="ej__canvas" aria-hidden="true" />
      <div className="ej__shade" aria-hidden="true" />

      <div className="ej__heading">
        <h2>The Exploded<br />Journey</h2>
        <p>Witness the metamorphosis from raw earth to architectural masterpiece.</p>
      </div>

      {assetMessage && (
        <p className="ej__asset-message" role="status">{assetMessage}</p>
      )}

      <div key={active} className="ej__card" aria-live="polite">
        <img
          src={getFramePath(stage.frame)}
          alt=""
          className="ej__thumb"
          onError={(event) => { event.currentTarget.src = POSTER; }}
        />
        <div className="ej__card-copy">
          <span className="ej__kicker">
            Stage {active + 1} / {STAGES.length} - {stage.label}
          </span>
          <p>{stage.text}</p>
        </div>
      </div>

      <nav className="ej__progress" aria-label="Construction journey stages">
        <div className="ej__track" aria-hidden="true">
          <div ref={fillRef} className="ej__fill" />
        </div>
        <ol>
          {STAGES.map((item, index) => (
            <li
              key={item.label}
              className={index <= active ? 'is-on' : ''}
              style={{ left: `${item.dot * 100}%` }}
              aria-current={index === active ? 'step' : undefined}
            >
              <button
                type="button"
                className="ej__step"
                onClick={() => handleStep(index)}
                disabled={!stepperActive}
                aria-label={`Stage ${index + 1}: ${item.label}`}
              >
                <i aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
