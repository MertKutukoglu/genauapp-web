/**
 * Grammar — B1 deck (24 items). Verbatim port of
 * claude/GenauApp_Web_Try_Grammar_Content_B1.md §4.
 *
 * Deck composition:
 *   1-6   Anchors (with `learn`): Konjunktiv II, Vorgangspassiv,
 *         Dativ-Artikel, Relativsätze, Verben mit festen
 *         Präpositionen, Konnektoren extended.
 *   7-24  18 topic-grouped drills (3 per anchor).
 *
 * Mix: 14 multipleChoice + 10 fillBlank (close to A1/A2 ratio).
 *
 * Shares types + helpers with grammar-a1.ts (GrammarQuestion,
 * normalizeDE, localizeGrammar, grammarLearnAnchors). Three new
 * layouts for B1 landed in grammar-a1.ts alongside two new type
 * families (PassiveComparisonPair, RelativePronounRow +
 * RelativePronounExample, ConnectorCard), plus a dat + plural
 * extension on ArticleCaseForm.
 *
 * Content rules honored (§6 of the brief):
 *   - No em-dashes.
 *   - `___` literal three underscores.
 *   - hint always shown.
 *   - normalizeDE handles case-insensitive + umlaut folds.
 *   - Paradigm cells stay German in the TR mirror; only
 *     learner-facing English (hint, explanation, options when
 *     semantic, learn.english/note/sample.en/headline) swap.
 *   - `**bold**` works in note / rule / explanation via the
 *     RuleCard split-on-** parser added for the Trennbare Verben
 *     carousel at A2.
 *   - Vorgangspassiv highlight falls back to single-token "wird"
 *     (doc §6 flag; renderer's indexOf cannot span non-adjacent
 *     tokens).
 */

import type { GrammarQuestion } from "@/content/grammar-a1";

/** Re-export A1 helpers so callers can import from one place. */
export {
  grammarLearnAnchors,
  localizeGrammar,
  normalizeDE,
} from "@/content/grammar-a1";

export const GRAMMAR_B1: GrammarQuestion[] = [
  // ── 1 ─ Anchor: Konjunktiv II (carousel: würden → haben → sein) ──
  //
  // Modal-verb style: one card walks the learner through the three
  // high-frequency Konjunktiv II paradigms:
  //
  //   würden (works with any main verb as "würde + Infinitiv")
  //   haben → hätte  (polite "Ich hätte gerne ...")
  //   sein  → wäre   ("Wenn ich du wäre, ...")
  //
  // Chevron + ← → cycles between them; the shared "position 2 /
  // würde-or-direct" rule moves into the anchor's purple RuleCard
  // so it doesn't repeat per variant.
  {
    topic: "Konjunktiv II",
    exerciseType: "multipleChoice",
    learn: {
      layout: "verbParadigm",
      headline: "Konjunktiv II",
      english: "Hypothetical mood: würde + Infinitiv, or hätte / wäre",
      note:
        "**würde + Infinitiv** works with any verb (ich würde reisen). For **haben** and **sein** use the direct forms **hätte** and **wäre**. Tap the chevrons (or use ← →) to walk through all three.",
      // Top-level fields stay populated as graceful fallback for a
      // caller that ignores variants.
      verb: "würden",
      forms: [
        { pronoun: "ich", form: "würde" },
        { pronoun: "du", form: "würdest" },
        { pronoun: "er / sie / es", form: "würde" },
        { pronoun: "wir", form: "würden" },
        { pronoun: "ihr", form: "würdet" },
        { pronoun: "sie / Sie", form: "würden" },
      ],
      sample: {
        de: "Ich würde gerne mehr Zeit haben.",
        en: "I would like to have more time.",
        highlight: "würde",
      },
      variants: [
        {
          verb: "würden",
          english: "would (+ any main verb)",
          forms: [
            { pronoun: "ich", form: "würde" },
            { pronoun: "du", form: "würdest" },
            { pronoun: "er / sie / es", form: "würde" },
            { pronoun: "wir", form: "würden" },
            { pronoun: "ihr", form: "würdet" },
            { pronoun: "sie / Sie", form: "würden" },
          ],
          sample: {
            de: "Ich würde gerne mehr Zeit haben.",
            en: "I would like to have more time.",
            highlight: "würde",
          },
        },
        {
          verb: "haben → hätte",
          english: "would have",
          forms: [
            { pronoun: "ich", form: "hätte" },
            { pronoun: "du", form: "hättest" },
            { pronoun: "er / sie / es", form: "hätte" },
            { pronoun: "wir", form: "hätten" },
            { pronoun: "ihr", form: "hättet" },
            { pronoun: "sie / Sie", form: "hätten" },
          ],
          sample: {
            de: "Ich hätte gerne einen Kaffee.",
            en: "I'd like a coffee.",
            highlight: "hätte",
          },
        },
        {
          verb: "sein → wäre",
          english: "would be",
          forms: [
            { pronoun: "ich", form: "wäre" },
            { pronoun: "du", form: "wärst" },
            { pronoun: "er / sie / es", form: "wäre" },
            { pronoun: "wir", form: "wären" },
            { pronoun: "ihr", form: "wärt" },
            { pronoun: "sie / Sie", form: "wären" },
          ],
          sample: {
            de: "Wenn ich du wäre, würde ich das machen.",
            en: "If I were you, I would do that.",
            highlight: "wäre",
          },
        },
      ],
    },
    prompt: "Ich ___ gerne nach Berlin reisen.",
    hint: "I would like to travel to Berlin.",
    options: ["würde", "werde", "würdest"],
    correctIndex: 0,
    explanation: "Konjunktiv II of werden, 1st person singular: ich würde.",
    tr: {
      hint: "Berlin'e seyahat etmek isterdim.",
      explanation: "werden'in Konjunktiv II'si, 1. tekil: ich würde.",
      learn: {
        headline: "Konjunktiv II",
        english: "Dilek/kibar kip: würde + mastar veya hätte / wäre",
        note:
          "**würde + mastar** her fiille çalışır (ich würde reisen). **haben** ve **sein** için doğrudan **hätte** ve **wäre** formlarını kullan. Chevron'lara dokun (ya da ← → tuşlarıyla) üçünü de gez.",
        sample: { en: "Daha fazla zamanım olsun isterim." },
        variants: [
          {
            english: "-rdim (herhangi bir fiille)",
            sample: { en: "Daha fazla zamanım olsun isterim." },
          },
          {
            english: "sahip olurdum / ... isterim",
            sample: { en: "Bir kahve alabilir miyim." },
          },
          {
            english: "... olsam / ... olurdu",
            sample: { en: "Yerinde olsam onu yapardım." },
          },
        ],
      },
    },
  },

  // ── 2 ─ Anchor: Vorgangspassiv ───────────────────────────────────
  {
    topic: "Vorgangspassiv",
    exerciseType: "multipleChoice",
    learn: {
      layout: "activePassiveComparison",
      headline: "Vorgangspassiv",
      english: "Action focus on the receiver: werden + Partizip II",
      note:
        "The agent (doer) often disappears or appears with **von + Dativ**. Use when the action matters more than who does it. Tense is carried by **werden**: wird (Präsens), wurde (Präteritum), ist ... worden (Perfekt).",
      pairs: [
        {
          aktiv: "Der Lehrer korrigiert die Tests.",
          passiv: "Die Tests werden korrigiert.",
        },
        {
          aktiv: "Das Team hat das Haus gebaut.",
          passiv: "Das Haus wurde gebaut.",
        },
        {
          aktiv: "Niemand hat ihn gesehen.",
          passiv: "Er wurde nicht gesehen.",
        },
      ],
      sample: {
        de: "Das Haus wird von Architekten gebaut.",
        en: "The house is being built by architects.",
        // Doc §6 fallback: "wird gebaut" spans non-adjacent tokens;
        // GrammarSampleSentence uses indexOf, so stick to one.
        highlight: "wird",
      },
    },
    prompt: "Das Haus ___ gebaut.",
    hint: "The house is being built.",
    options: ["wird", "ist", "hat", "sein"],
    correctIndex: 0,
    explanation:
      "Vorgangspassiv Präsens = werden + Partizip II. 3rd person singular: wird.",
    tr: {
      hint: "Ev inşa ediliyor.",
      explanation: "Vorgangspassiv Präsens = werden + Partizip II. 3. tekil: wird.",
      learn: {
        headline: "Vorgangspassiv",
        english: "Eylemin alıcıya odaklı hâli: werden + Partizip II",
        note:
          "Eylemi yapan genellikle kaybolur ya da **von + Dativ** ile geçer. Kim yaptığından çok eylemin kendisi önemli olduğunda kullanılır. Zaman **werden** ile taşınır: wird (Präsens), wurde (Präteritum), ist ... worden (Perfekt).",
        sample: { en: "Ev mimarlar tarafından inşa ediliyor." },
      },
    },
  },

  // ── 3 ─ Anchor: Dativ-Artikel (4-card extended articleCards) ─────
  {
    topic: "Dativ-Artikel",
    exerciseType: "multipleChoice",
    learn: {
      layout: "articleCards",
      headline: "Dativ",
      english: "Indirect object case: all genders change",
      note:
        "Dativ changes ALL genders: der → **dem**, die → **der**, das → **dem**, die (Pl.) → **den** (and the plural noun adds **-n**: den Kinder**n**).",
      articles: [
        {
          article: "der",
          role: "masculine",
          nom: { de: "der Mann", en: "the man" },
          akk: { de: "den Mann", en: "the man (direct object)" },
          dat: { de: "dem Mann", en: "to the man (indirect)" },
          change: true,
        },
        {
          article: "die",
          role: "feminine",
          nom: { de: "die Frau", en: "the woman" },
          akk: { de: "die Frau", en: "the woman" },
          dat: { de: "der Frau", en: "to the woman" },
          change: true,
        },
        {
          article: "das",
          role: "neuter",
          nom: { de: "das Kind", en: "the child" },
          akk: { de: "das Kind", en: "the child" },
          dat: { de: "dem Kind", en: "to the child" },
          change: true,
        },
        {
          article: "die",
          role: "plural",
          nom: { de: "die Kinder", en: "the children" },
          akk: { de: "die Kinder", en: "the children" },
          dat: { de: "den Kindern", en: "to the children" },
          change: true,
          pluralNoteN: true,
        },
      ],
      sample: {
        de: "Ich helfe dem Mann.",
        en: "I help the man.",
        highlight: "dem",
      },
    },
    prompt: "Ich gebe ___ Mann das Buch.",
    hint: "I give the man the book.",
    options: ["dem", "den", "der", "die"],
    correctIndex: 0,
    explanation: "Mann is masculine; 'to the man' → Dativ: der → dem.",
    tr: {
      hint: "Adama kitabı veriyorum.",
      explanation: "Mann eril; 'adama' → Dativ: der → dem.",
      learn: {
        headline: "Dativ",
        english: "Dolaylı nesne hâli: tüm cinsler değişir",
        note:
          "Dativ TÜM cinsleri değiştirir: der → **dem**, die → **der**, das → **dem**, die (çoğul) → **den** (çoğul isim ayrıca **-n** alır: den Kinder**n**).",
        sample: { en: "Adama yardım ediyorum." },
      },
    },
  },

  // ── 4 ─ Anchor: Relativsätze ─────────────────────────────────────
  {
    topic: "Relativsätze",
    exerciseType: "multipleChoice",
    learn: {
      layout: "relativePronounGrid",
      headline: "Relativsätze",
      english: "Relative clauses: pronoun carries gender + case",
      note:
        "**Gender** matches the NOUN in the main clause. **Case** matches the pronoun's role in the RELATIVE clause. Comma before the pronoun; verb at the **end** of the relative clause.",
      columns: ["Nominativ", "Akkusativ", "Dativ"],
      rows: [
        {
          gender: "masc",
          label: "masculine",
          forms: { nom: "der", akk: "den", dat: "dem" },
        },
        {
          gender: "fem",
          label: "feminine",
          forms: { nom: "die", akk: "die", dat: "der" },
        },
        {
          gender: "neut",
          label: "neuter",
          forms: { nom: "das", akk: "das", dat: "dem" },
        },
        {
          gender: "plural",
          label: "plural",
          forms: { nom: "die", akk: "die", dat: "denen" },
        },
      ],
      examples: [
        {
          de: "Das ist der Mann, der mir geholfen hat.",
          en: "That's the man who helped me.",
          highlight: "der",
          role: "Nominativ (he is the subject of 'helped')",
        },
        {
          de: "Das ist das Buch, das ich gelesen habe.",
          en: "That's the book I read.",
          highlight: "das",
          role: "Akkusativ (I read it)",
        },
      ],
      sample: {
        de: "Die Frau, die dort steht, ist meine Mutter.",
        en: "The woman standing there is my mother.",
        highlight: "die",
      },
    },
    prompt: "Das ist der Mann, ___ ich gestern gesehen habe.",
    hint: "That's the man I saw yesterday.",
    options: ["den", "der", "dem", "die"],
    correctIndex: 0,
    explanation:
      "Mann is masculine; the pronoun is the direct object of 'sehen' → Akkusativ: der → den.",
    tr: {
      hint: "Dün gördüğüm adam bu.",
      explanation: "Mann eril; zamir sehen'in nesnesi → Akkusativ: der → den.",
      learn: {
        headline: "Relativsätze",
        english: "İlgi tümcecikleri: zamir cinsi + hâli taşır",
        note:
          "**Cins** ana cümledeki İSME göre, **hâl** zamirin İLGİ TÜMCESİNDEKİ rolüne göre. Zamirden önce virgül; ilgi tümcesinde fiil **sonda**.",
        sample: { en: "Orada duran kadın annem." },
      },
    },
  },

  // ── 5 ─ Anchor: Verben mit festen Präpositionen ──────────────────
  {
    topic: "Verben mit festen Präpositionen",
    exerciseType: "fillBlank",
    learn: {
      layout: "connectorCards",
      headline: "Verben mit festen Präpositionen",
      english:
        "Verbs with fixed prepositions: verb + prep + case as a unit",
      note:
        "The preposition and its case are part of the verb's lexical entry. Memorize as a unit: **sich bewerben UM + Akk**, **teilnehmen AN + Dat**, **warten AUF + Akk**, **sich freuen AUF + Akk** (future-focused).",
      connectors: [
        {
          word: "sich bewerben um",
          example: "Ich bewerbe mich um die Stelle.",
          english: "to apply for",
          highlight: "um",
        },
        {
          word: "teilnehmen an",
          example: "Ich nehme an dem Kurs teil.",
          english: "to participate in",
          highlight: "an",
        },
        {
          word: "warten auf",
          example: "Ich warte auf dich.",
          english: "to wait for",
          highlight: "auf",
        },
        {
          word: "sich freuen auf",
          example: "Ich freue mich auf das Wochenende.",
          english: "to look forward to",
          highlight: "auf",
        },
      ],
      sample: {
        de: "Ich bewerbe mich um die Stelle.",
        en: "I'm applying for the position.",
        highlight: "um",
      },
    },
    prompt: "Ich warte ___ dich.",
    hint: "I'm waiting for you.",
    answer: "auf",
    explanation:
      '"warten auf + Akk" is a fixed combination. The preposition \'auf\' is lexically tied to warten.',
    tr: {
      hint: "Seni bekliyorum.",
      explanation:
        '"warten auf + Akk" sabit kalıptır. Edat \'auf\' sözlüksel olarak warten\'e bağlıdır.',
      learn: {
        headline: "Verben mit festen Präpositionen",
        english: "Sabit edatlı fiiller: fiil + edat + hâl tek bir birim olarak",
        note:
          "Edat ve hâli kelimenin ayrılmaz parçasıdır. Birim olarak ezberle: **sich bewerben UM + Akk**, **teilnehmen AN + Dat**, **warten AUF + Akk**, **sich freuen AUF + Akk** (gelecek odaklı).",
        sample: { en: "Pozisyona başvuruyorum." },
      },
    },
  },

  // ── 6 ─ Anchor: Konnektoren extended ─────────────────────────────
  {
    topic: "Konnektoren",
    exerciseType: "multipleChoice",
    learn: {
      layout: "connectorCards",
      headline: "Konnektoren",
      english: "Subordinate connectors: comma + connector + ... + verb at the end",
      note:
        "All these push the verb to the **end** of the subordinate clause. **als** = past one-time event (Als ich klein war, ...). **wenn** = present / general / hypothetical (Wenn es regnet, ...).",
      connectors: [
        {
          word: "obwohl",
          example: "Er geht spazieren, obwohl es regnet.",
          english: "although (concessive)",
        },
        {
          word: "damit",
          example: "Ich lerne Deutsch, damit ich arbeiten kann.",
          english: "so that (purpose)",
        },
        {
          word: "nachdem",
          example: "Nachdem ich gegessen habe, gehe ich ins Bett.",
          english: "after (temporal)",
        },
        {
          word: "seit",
          example: "Seit ich hier wohne, bin ich glücklich.",
          english: "since (duration)",
        },
      ],
      sample: {
        de: "Ich bleibe zu Hause, obwohl das Wetter schön ist.",
        en: "I'm staying home even though the weather is nice.",
        highlight: "obwohl",
      },
    },
    prompt: "Er lernt viel, ___ er die Prüfung besteht.",
    hint: "He studies a lot so that he passes the exam.",
    options: ["damit", "weil", "obwohl", "seit"],
    correctIndex: 0,
    explanation: "The meaning is 'in order that' → damit (purpose connector).",
    tr: {
      hint: "Sınavı geçmek için çok çalışıyor.",
      explanation: "Anlam '-sin diye' → damit (amaç bağlacı).",
      learn: {
        headline: "Konnektoren",
        english: "Alt bağlaçlar: virgül + bağlaç + ... + fiil sonda",
        note:
          "Hepsi çekimli fiili yan cümlenin **sonuna** gönderir. **als** = geçmişte tek seferlik (Als ich klein war, ...). **wenn** = şimdiki/genel/hipotetik (Wenn es regnet, ...).",
        sample: { en: "Hava güzel olmasına rağmen evde kalıyorum." },
      },
    },
  },

  // ── 7 ─ Drills: Konjunktiv II ────────────────────────────────────
  {
    topic: "Konjunktiv II",
    exerciseType: "fillBlank",
    prompt: "Wenn ich mehr Geld ___, würde ich reisen.",
    answer: "hätte",
    explanation:
      "Konjunktiv II of haben, 1st person: ich hätte. Classic 'wenn + hätte' hypothetical.",
    hint: "If I had more money, I would travel.",
    tr: {
      hint: "Daha çok param olsa seyahat ederdim.",
      explanation:
        "haben'in Konjunktiv II'si, 1. tekil: ich hätte. Klasik 'wenn + hätte' hipotetiği.",
    },
  },
  {
    topic: "Konjunktiv II",
    exerciseType: "multipleChoice",
    prompt: "Ich ___ gerne einen Kaffee, bitte.",
    options: ["hätte", "habe", "hat", "hätten"],
    correctIndex: 0,
    explanation: "Polite request → Konjunktiv II of haben: ich hätte gerne.",
    hint: "I would like a coffee, please.",
    tr: {
      hint: "Lütfen bir kahve alabilir miyim.",
      explanation: "Kibar istek → haben'in Konjunktiv II'si: ich hätte gerne.",
    },
  },
  {
    topic: "Konjunktiv II",
    exerciseType: "multipleChoice",
    prompt: "Wenn ich du ___, würde ich das machen.",
    options: ["wäre", "bin", "war", "bist"],
    correctIndex: 0,
    explanation:
      "Konjunktiv II of sein, 1st person: ich wäre. 'If I were you' construction.",
    hint: "If I were you, I would do that.",
    tr: {
      hint: "Yerinde olsam onu yapardım.",
      explanation:
        "sein'in Konjunktiv II'si, 1. tekil: ich wäre. 'Yerinde olsam' kalıbı.",
    },
  },

  // ── 10 ─ Drills: Vorgangspassiv ──────────────────────────────────
  {
    topic: "Vorgangspassiv",
    exerciseType: "multipleChoice",
    prompt: "Der Brief ___ gestern geschrieben.",
    options: ["wurde", "war", "wird", "hat"],
    correctIndex: 0,
    explanation:
      "Vorgangspassiv Präteritum = wurde + Partizip II. 3rd person singular: wurde.",
    hint: "The letter was written yesterday.",
    tr: {
      hint: "Mektup dün yazıldı.",
      explanation:
        "Vorgangspassiv Präteritum = wurde + Partizip II. 3. tekil: wurde.",
    },
  },
  {
    topic: "Vorgangspassiv",
    exerciseType: "fillBlank",
    prompt: "In Deutschland ___ viel Bier getrunken.",
    answer: "wird",
    explanation:
      "Vorgangspassiv Präsens 3rd person: wird + Partizip II (getrunken).",
    hint: "In Germany, a lot of beer is drunk.",
    tr: {
      hint: "Almanya'da çok bira içilir.",
      explanation:
        "Vorgangspassiv Präsens 3. tekil: wird + Partizip II (getrunken).",
    },
  },
  {
    topic: "Vorgangspassiv",
    exerciseType: "multipleChoice",
    prompt: "Die Fenster ___ jeden Monat geputzt.",
    options: ["werden", "sind", "haben", "sein"],
    correctIndex: 0,
    explanation: "Vorgangspassiv Präsens plural: werden + Partizip II.",
    hint: "The windows are cleaned every month.",
    tr: {
      hint: "Pencereler her ay temizleniyor.",
      explanation: "Vorgangspassiv Präsens çoğul: werden + Partizip II.",
    },
  },

  // ── 13 ─ Drills: Dativ-Artikel ───────────────────────────────────
  {
    topic: "Dativ-Artikel",
    exerciseType: "multipleChoice",
    prompt: "Ich helfe ___ Frau.",
    options: ["der", "die", "den", "dem"],
    correctIndex: 0,
    explanation: "Frau is feminine; helfen takes Dativ: die → der.",
    hint: "I help the woman.",
    tr: {
      hint: "Kadına yardım ediyorum.",
      explanation: "Frau dişil; helfen Dativ alır: die → der.",
    },
  },
  {
    topic: "Dativ-Artikel",
    exerciseType: "fillBlank",
    prompt: "Sie wohnt bei ___ Eltern.",
    answer: "den",
    explanation:
      "Eltern is plural; bei + Dativ → die → den. The plural noun also adds -n when possible (Eltern already ends in -n).",
    hint: "She lives with her parents.",
    tr: {
      hint: "Ebeveynleriyle yaşıyor.",
      explanation:
        "Eltern çoğul; bei + Dativ → die → den. Çoğul isim mümkünse -n alır (Eltern zaten -n ile bitiyor).",
    },
  },
  {
    topic: "Dativ-Artikel",
    exerciseType: "multipleChoice",
    prompt: "Das Buch gehört ___ Kind.",
    options: ["dem", "das", "den", "der"],
    correctIndex: 0,
    explanation: "Kind is neuter; gehören takes Dativ: das → dem.",
    hint: "The book belongs to the child.",
    tr: {
      hint: "Kitap çocuğa ait.",
      explanation: "Kind nötr; gehören Dativ alır: das → dem.",
    },
  },

  // ── 16 ─ Drills: Relativsätze ────────────────────────────────────
  {
    topic: "Relativsätze",
    exerciseType: "multipleChoice",
    prompt: "Das ist die Frau, ___ dort steht.",
    options: ["die", "der", "das", "den"],
    correctIndex: 0,
    explanation:
      "Frau is feminine; the pronoun is the subject of 'steht' → Nominativ: die.",
    hint: "That's the woman who's standing there.",
    tr: {
      hint: "Orada duran kadın bu.",
      explanation: "Frau dişil; zamir 'steht'in öznesi → Nominativ: die.",
    },
  },
  {
    topic: "Relativsätze",
    exerciseType: "fillBlank",
    prompt: "Der Mann, ___ ich gestern getroffen habe, ist Lehrer.",
    answer: "den",
    explanation:
      "Mann is masculine; the pronoun is direct object of 'treffen' → Akkusativ: der → den.",
    hint: "The man I met yesterday is a teacher.",
    tr: {
      hint: "Dün karşılaştığım adam öğretmen.",
      explanation: "Mann eril; zamir treffen'in nesnesi → Akkusativ: der → den.",
    },
  },
  {
    topic: "Relativsätze",
    exerciseType: "multipleChoice",
    prompt: "Die Kinder, ___ ich geholfen habe, sind glücklich.",
    options: ["denen", "die", "der", "dem"],
    correctIndex: 0,
    explanation:
      "Kinder is plural; helfen takes Dativ → plural Dativ: die → denen.",
    hint: "The children I helped are happy.",
    tr: {
      hint: "Yardım ettiğim çocuklar mutlu.",
      explanation: "Kinder çoğul; helfen Dativ alır → çoğul Dativ: die → denen.",
    },
  },

  // ── 19 ─ Drills: Prep-verbs ──────────────────────────────────────
  {
    topic: "Verben mit festen Präpositionen",
    exerciseType: "multipleChoice",
    prompt: "Ich warte ___ dich.",
    options: ["auf", "an", "für", "um"],
    correctIndex: 0,
    explanation: '"warten auf + Akk" — fixed combination.',
    hint: "I'm waiting for you.",
    tr: {
      hint: "Seni bekliyorum.",
      explanation: '"warten auf + Akk" — sabit kalıp.',
    },
  },
  {
    topic: "Verben mit festen Präpositionen",
    exerciseType: "fillBlank",
    prompt: "Sie denkt oft ___ ihre Familie.",
    answer: "an",
    explanation: '"denken an + Akk" — to think about someone/something.',
    hint: "She often thinks about her family.",
    tr: {
      hint: "Sık sık ailesini düşünüyor.",
      explanation: '"denken an + Akk" — birini/bir şeyi düşünmek.',
    },
  },
  {
    topic: "Verben mit festen Präpositionen",
    exerciseType: "multipleChoice",
    prompt: "Er bedankt sich ___ das Geschenk.",
    options: ["für", "an", "auf", "um"],
    correctIndex: 0,
    explanation: '"sich bedanken für + Akk" — to thank someone FOR something.',
    hint: "He thanks (them) for the gift.",
    tr: {
      hint: "Hediye için teşekkür ediyor.",
      explanation: '"sich bedanken für + Akk" — bir şey için teşekkür etmek.',
    },
  },

  // ── 22 ─ Drills: Konnektoren ─────────────────────────────────────
  {
    topic: "Konnektoren",
    exerciseType: "multipleChoice",
    prompt: "Ich komme morgen, ___ ich dich sehen kann.",
    options: ["damit", "weil", "obwohl", "seit"],
    correctIndex: 0,
    explanation: "Purpose/intention → damit ('so that I can see you').",
    hint: "I'm coming tomorrow so that I can see you.",
    tr: {
      hint: "Yarın geliyorum ki seni görebileyim.",
      explanation: "Amaç/niyet → damit ('seni görebileyim diye').",
    },
  },
  {
    topic: "Konnektoren",
    exerciseType: "fillBlank",
    prompt: "___ ich klein war, habe ich oft in diesem Park gespielt.",
    answer: "Als",
    explanation:
      "Past one-time event / childhood memory → Als (NOT wenn). 'Als' is for single past events; 'wenn' is for present / general / hypothetical.",
    hint: "When I was little, I often played in this park.",
    tr: {
      hint: "Küçükken bu parkta sık oynardım.",
      explanation:
        "Geçmişte tek seferlik olay / çocukluk anısı → Als (wenn DEĞİL). 'Als' tek seferlik geçmiş; 'wenn' şimdiki/genel/hipotetik.",
    },
  },
  {
    topic: "Konnektoren",
    exerciseType: "multipleChoice",
    prompt: "Sie geht spazieren, ___ es regnet.",
    options: ["obwohl", "weil", "damit", "seit"],
    correctIndex: 0,
    explanation:
      "Concessive (she goes walking DESPITE the rain) → obwohl ('although').",
    hint: "She goes for a walk even though it's raining.",
    tr: {
      hint: "Yağmur yağmasına rağmen yürüyüşe çıkıyor.",
      explanation:
        "Beklentinin aksine (yağmura RAĞMEN yürüyüş) → obwohl ('rağmen').",
    },
  },
];
