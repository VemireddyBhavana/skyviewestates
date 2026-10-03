import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../constants/data';
import './ExplodedJourney.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 96;
const FRAME_DIRECTORY = '/journey/frames';
const POSTER = IMAGES.heroHome;

const STAGES = [
  { label: 'Bare Land', text: 'Every home starts as raw, surveyed earth.', progress: 0, frame: 2 },
  { label: 'Foundation', text: 'Rebar and deep foundations, built to outlast decades.', progress: 0.18, frame: 20 },
  { label: 'Structure', text: 'The concrete skeleton rises into view.', progress: 0.4, frame: 42 },
  { label: 'Facade', text: 'Hand-carved stone facades take their final shape.', progress: 0.62, frame: 62 },
  { label: 'Finishing', text: 'Windows, balconies, and ironwork fitted by hand.', progress: 0.8, frame: 82 },
  { label: 'Completion', text: 'A finished villa, golden hour, ready to call home.', progress: 0.95, frame: 96 },
];

function getFramePath(frame) {
  return `${FRAME_DIRECTORY}/frame-${String(frame).padStart(3, '0')}.jpg`;
}

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
  const [active, setActive] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? STAGES.length - 1 : 0
  ));
  const activeRef = useRef(active);
  const [imagesReady, setImagesReady] = useState(false);
  const [assetMessage, setAssetMessage] = useState('');
  const lastStage = STAGES.length - 1;

  useEffect(() => {
    let cancelled = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const framesToLoad = prefersReducedMotion
      ? [FRAME_COUNT]
      : Array.from({ length: FRAME_COUNT }, (_, index) => index + 1);

    const preloadFrames = async () => {
      const frames = new Array(FRAME_COUNT);
      const firstFrame = framesToLoad[0];

      try {
        frames[firstFrame - 1] = await loadFrame(firstFrame);
      } catch {
        if (!cancelled) {
          framesRef.current = frames;
          availableFramesRef.current = [];
          setAssetMessage(`Add the ${FRAME_COUNT} journey frames to public${FRAME_DIRECTORY} to enable the scroll animation.`);
          setImagesReady(true);
        }
        return;
      }

      const remainingFrames = framesToLoad.slice(1);
      const results = await Promise.allSettled(remainingFrames.map(loadFrame));
      if (cancelled) return;

      let failedFrames = 0;
      results.forEach((result, index) => {
        const frameIndex = remainingFrames[index] - 1;
        if (result.status === 'fulfilled') {
          frames[frameIndex] = result.value;
        } else {
          failedFrames += 1;
        }
      });

      framesRef.current = frames;
      availableFramesRef.current = frames.reduce((indices, image, index) => {
        if (image) indices.push(index);
        return indices;
      }, []);

      if (failedFrames > 0) {
        setAssetMessage(`${failedFrames} journey frame${failedFrames === 1 ? '' : 's'} could not load. Check the files in public${FRAME_DIRECTORY}.`);
      }

      setImagesReady(true);
    };

    preloadFrames();
    return () => { cancelled = true; };
  }, []);

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
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(bounds.width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(bounds.height * pixelRatio));
      drawFrame(Math.floor(progressRef.current * (FRAME_COUNT - 1)));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (availableFramesRef.current.length === 0) {
      return () => window.removeEventListener('resize', resizeCanvas);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressRef.current = 1;
      activeRef.current = lastStage;
      if (fillRef.current) fillRef.current.style.transform = 'scaleX(1)';
      drawFrame(FRAME_COUNT - 1);
      return () => window.removeEventListener('resize', resizeCanvas);
    }

    // On mobile (< 768px) skip the heavy 400vh scroll-pin — show final frame
    if (window.innerWidth < 768) {
      progressRef.current = 1;
      activeRef.current = lastStage;
      if (fillRef.current) fillRef.current.style.transform = 'scaleX(1)';
      drawFrame(FRAME_COUNT - 1);
      return () => window.removeEventListener('resize', resizeCanvas);
    }

    const contextScope = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (trigger) => {
          const progress = trigger.progress;
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
            setActive(nextStage);
          }
        },
      });
    }, sectionRef);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      window.removeEventListener('resize', resizeCanvas);
      contextScope.revert();
    };
  }, [imagesReady, lastStage]);


  const stage = STAGES[active];

  return (
    <section ref={sectionRef} className="ej" id="journey" aria-label="The construction journey">
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
              style={{ left: `${item.progress * 100}%` }}
              aria-current={index === active ? 'step' : undefined}
            >
              <i aria-hidden="true" />
              <span>{item.label}</span>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
