/**
 * grammar-topic-descriptions — one-line descriptions used in the
 * Grammar SkillSheet topic cards (iOS parity). Each description
 * mirrors the "say what it is in plain language, give a tiny
 * example or anchor" shape from the app, so a topic the user
 * doesn't immediately recognise still reads at a glance.
 *
 * Keyed by the EXACT `topic` string used in the grammar-a1/a2/b1.ts
 * content files — collect them with:
 *   grep -rh '^\s*topic:' src/content/grammar-*.ts | sort -u
 * and make sure every key here appears there verbatim. Topics
 * without an entry fall back to an empty description (the card
 * still renders cleanly).
 *
 * Keep each description to one line of ~60 chars. Example first,
 * then plain-English anchor — e.g. "aufstehen → ich stehe auf. The
 * prefix flies off." reads faster than a dry definition.
 */

export interface GrammarTopicDescription {
  en: string;
  tr: string;
}

export const GRAMMAR_TOPIC_DESCRIPTIONS: Record<
  string,
  GrammarTopicDescription
> = {
  // ─── A1 ────────────────────────────────────────────────────────
  "Articles (der / die / das)": {
    en: "der, die, das. German's three grammatical genders.",
    tr: "der, die, das. Almancanın üç dilbilgisi cinsiyeti.",
  },
  "Articles (der)": {
    en: "Masculine: der Mann, der Tisch, der Tag.",
    tr: "Eril: der Mann, der Tisch, der Tag.",
  },
  "Articles (die)": {
    en: "Feminine: die Frau, die Tür, die Zeit.",
    tr: "Dişil: die Frau, die Tür, die Zeit.",
  },
  "Articles (das)": {
    en: "Neuter: das Kind, das Haus, das Buch.",
    tr: "Cinsiyetsiz: das Kind, das Haus, das Buch.",
  },
  "Akkusativ-Artikel": {
    en: "der → den. The article changes when it's the object.",
    tr: "der → den. Nesne olunca artikel değişiyor.",
  },
  "Verb sein": {
    en: "ich bin, du bist, er ist. The spine of every sentence.",
    tr: "ich bin, du bist, er ist. Her cümlenin omurgası.",
  },
  "Verb haben": {
    en: "ich habe, du hast, er hat. For 'have' and Perfekt.",
    tr: "ich habe, du hast, er hat. 'Sahip olmak' ve Perfekt için.",
  },
  "Regular verbs": {
    en: "ich -e, du -st, er -t. The endings that cover most verbs.",
    tr: "ich -e, du -st, er -t. Fiillerin çoğunun aldığı ekler.",
  },
  "Personalpronomen": {
    en: "ich, du, er, sie, wir, ihr. Who's doing what.",
    tr: "ich, du, er, sie, wir, ihr. Kim ne yapıyor.",
  },
  "Pronouns": {
    en: "ich, du, er, sie, es. The subject pronouns you start with.",
    tr: "ich, du, er, sie, es. İlk öğrendiğin özne zamirleri.",
  },

  // ─── A2 ────────────────────────────────────────────────────────
  "Modalverben": {
    en: "können, müssen, wollen. Modals push the verb to the end.",
    tr: "können, müssen, wollen. Modal fiiller esas fiili sona atar.",
  },
  "Trennbare Verben": {
    en: "aufstehen → ich stehe auf. The prefix flies off.",
    tr: "aufstehen → ich stehe auf. Ön ek cümlenin sonuna uçar.",
  },
  "Perfekt": {
    en: "ich habe gemacht. German's everyday past tense.",
    tr: "ich habe gemacht. Almancanın günlük geçmiş zamanı.",
  },

  // ─── B1 ────────────────────────────────────────────────────────
  "Konjunktiv II": {
    en: "ich würde, ich hätte, ich wäre. Would, could, should.",
    tr: "ich würde, ich hätte, ich wäre. Olsa, yapsa, etse.",
  },
  "Vorgangspassiv": {
    en: "Das Haus wird gebaut. Who-done-it fades out.",
    tr: "Das Haus wird gebaut. Fail arka plana çekiliyor.",
  },
  "Komparativ / Superlativ": {
    en: "schnell → schneller → am schnellsten. Compare and rank.",
    tr: "schnell → schneller → am schnellsten. Kıyasla ve sırala.",
  },
  "Relativsätze": {
    en: "der Mann, der dort steht. Clauses that describe a noun.",
    tr: "der Mann, der dort steht. İsmi niteleyen yan cümleler.",
  },
  "Dativ-Präpositionen": {
    en: "mit, bei, zu, von, nach. Always trigger Dativ.",
    tr: "mit, bei, zu, von, nach. Her zaman Dativ isterler.",
  },
  "Akkusativ-Präpositionen": {
    en: "für, ohne, durch, gegen, um. Always trigger Akkusativ.",
    tr: "für, ohne, durch, gegen, um. Her zaman Akkusativ isterler.",
  },
  "Konnektoren": {
    en: "weil, dass, obwohl. Connectors that bend word order.",
    tr: "weil, dass, obwohl. Kelime sırasını değiştiren bağlaçlar.",
  },
};

/** Lookup helper: returns an empty string if the topic has no entry. */
export function describeGrammarTopic(
  topic: string,
  locale: "en" | "tr",
): string {
  const entry = GRAMMAR_TOPIC_DESCRIPTIONS[topic];
  if (!entry) return "";
  return entry[locale] ?? entry.en;
}
