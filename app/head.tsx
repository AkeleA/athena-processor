export default function Head() {
  return (
    <>
      <meta
        httpEquiv="origin-trial"
        content={process.env.GEMINI_LANGUAGE_DETECTOR}
      />
      <meta httpEquiv="origin-trial" content={process.env.GEMINI_TRNASLATOR} />
      <meta httpEquiv="origin-trial" content={process.env.GEMINI_SUMMARIZER} />
    </>
  );
}
