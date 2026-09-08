/** Which language the code sample is showing. */
export type CodeLang = "jsx" | "css";

/** Tab order. */
export const CODE_LANGS: CodeLang[] = ["jsx", "css"];

export const CODE_LANG_LABEL: Record<CodeLang, string> = {
  jsx: "JSX",
  css: "CSS",
};

/**
 * The stripped-down version of this experiment — just enough to reproduce the
 * effect: an opaque stage, a rotating colour layer, and the blend-mode text.
 */
export const CODE_SAMPLES: Record<CodeLang, string> = {
  jsx: `function InvertedText() {
  return (
    <div className="stage">
      <div className="swirl" />
      <h1 className="invert-text">INVERTED</h1>
    </div>
  );
}`,
  css: `.stage {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
  background: #0b1220;
}

/* white text minus whatever is behind it */
.invert-text {
  color: #fff;
  mix-blend-mode: difference;
}

/* oversized + blurred so the blobs are amorphous and bleed together */
.swirl {
  position: absolute;
  inset: -80%;
  filter: blur(60px) saturate(1.7);
  background-blend-mode: screen;
  background:
    radial-gradient(38% 46% at 30% 26%, #00e35c 0, #00e35c 16%, transparent 72%),
    radial-gradient(42% 32% at 72% 32%, #9d1cff 0, #9d1cff 16%, transparent 74%),
    radial-gradient(46% 42% at 54% 70%, #1a5cff 0, #1a5cff 16%, transparent 72%),
    radial-gradient(30% 38% at 24% 76%, #00e35c 0, #00e35c 16%, transparent 78%);
  animation: swirl 18s linear infinite;
}

@keyframes swirl {
  to { transform: rotate(360deg); }
}`,
};
