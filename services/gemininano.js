import { languageOptions } from "./languageutils";
import { toast } from "sonner";

// Language Detector
export const detectLang = async (text, callbacks) => {
  const {
    setDetecting = () => {},
    setDetectedLangSymbol = () => {},
    setDetectedLang = () => {},
  } = callbacks;

  if (setDetecting) setDetecting(true);

  const available = (await ai.languageDetector.capabilities()).available;

  if (available === "no") {
    toast.error("Sorry, your device does not support language detection");
    setDetecting(false);
    return;
  }

  const detector = await ai.languageDetector.create();
  const detectedLanguages = await detector.detect(text);

  setDetectedLangSymbol(detectedLanguages[0]?.detectedLanguage);
  setDetectedLang(languageOptions[detectedLanguages[0].detectedLanguage]);

  setDetecting(false);
};

// Translator
export const translate = async ({
  detectedLangSymbol,
  targetLanguage,
  content,
  setTranslating,
  setDownloading,
  setDownloaded,
  setTranslation,
}) => {
  if (setTranslating) setTranslating(true);
  const available = (await ai.translator.capabilities()).available;

  if (available === "no") {
    toast.error("Sorry, your device does not support translation");
    return;
  }

  let translator = "";
  if (available === "readily") {
    translator = await ai.translator.create({
      sourceLanguage: detectedLangSymbol,
      targetLanguage: targetLanguage,
    });
  } else {
    setDownloading(true);
    translator = await ai.translator.create({
      sourceLanguage: detectedLangSymbol,
      targetLanguage: targetLanguage,
      monitor(m) {
        m.addEventListener("downloadprogress", (e) => {
          setDownloaded((e.loaded / e.total) * 100);
        });
      },
    });
    setDownloading(false);
    setDownloaded(0);
  }

  const response = await translator.translate(content);
  setTranslation(response);
  setTranslating(false);
};

// Summary
export const summarize = async (text) => {
  try {
    const available = (await ai.summarizer.capabilities()).available;
    if (available === "no") {
      toast.error("Summarization is not available on this device.");
      throw new Error("Summarization not supported.");
    }

    const response = await ai.summarizer.create({
      format: "plain-text",
      length: "short",
    });
    return await response.summarize(text);
  } catch (error) {
    toast.error("Summarization failed:", error);
    throw error;
  }
};
