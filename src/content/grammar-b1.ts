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
      // Shared note stays as a safety net for callers that drop
      // the variants, but each variant below overrides it with
      // its own one-liner so the rule tile speaks to the verb the
      // learner is looking at.
      note:
        "**würde + Infinitiv** works with any verb (ich würde reisen). For **haben** and **sein** use the direct forms **hätte** and **wäre**.",
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
          rule:
            "**würde + Infinitiv** is the all-purpose Konjunktiv II: pair it with any main verb and you've got the hypothetical. Ich würde reisen, du würdest kochen, wir würden bleiben.",
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
          rule:
            "**hätte** is the direct Konjunktiv II of **haben** — no würde needed. Backbone of polite requests at the counter: Ich hätte gerne…, hätten Sie…?",
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
          rule:
            "**wäre** is the direct Konjunktiv II of **sein** — again no würde. Classic 'if I were…' construction: Wenn ich du wäre, wäre das anders.",
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
          "**würde + mastar** her fiille çalışır (ich würde reisen). **haben** ve **sein** için doğrudan **hätte** ve **wäre** formlarını kullan.",
        sample: { en: "Daha fazla zamanım olsun isterim." },
        variants: [
          {
            english: "-rdim (herhangi bir fiille)",
            sample: { en: "Daha fazla zamanım olsun isterim." },
            rule:
              "**würde + mastar** her amaca uyan Konjunktiv II: herhangi bir ana fiille birleştir, hipotetik hazır. Ich würde reisen, du würdest kochen, wir würden bleiben.",
          },
          {
            english: "sahip olurdum / ... isterim",
            sample: { en: "Bir kahve alabilir miyim." },
            rule:
              "**hätte**, **haben** fiilinin doğrudan Konjunktiv II hâlidir — würde'ye gerek yok. Kibar isteğin bel kemiği: Ich hätte gerne…, hätten Sie…?",
          },
          {
            english: "... olsam / ... olurdu",
            sample: { en: "Yerinde olsam onu yapardım." },
            rule:
              "**wäre**, **sein** fiilinin doğrudan Konjunktiv II hâlidir — yine würde yok. Klasik 'olsam' kalıbı: Wenn ich du wäre, wäre das anders.",
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

  // ── 5 ─ Anchor: Dativ-Präpositionen (green carousel, 9 preps) ────
  //
  // Prep-verb carousel split into two case-coloured anchors so the
  // learner internalises "which prep → which case" visually: Dativ
  // preps ride the green (--article-das) hero, Akkusativ preps ride
  // the red (--article-die). Matches the app's established case
  // colour convention (Akkusativ = red, Dativ = green). Chevron +
  // ← → walks through all 9 Dativ preps in textbook order (an →
  // aus → bei → mit → nach → von → vor → unter → zu). Each step
  // shows: the prep as hero, 3-6 sample verbs that take it, a
  // short meaning + case rule, and one example sentence with the
  // prep bold-tinted.
  {
    topic: "Dativ-Präpositionen",
    exerciseType: "multipleChoice",
    learn: {
      layout: "verbCards",
      headline: "Dativ-Präpositionen",
      english: "Verbs that always take this preposition + Dativ",
      tint: "var(--article-das)",
      prefixes: [
        {
          prefix: "an",
          samples: ["arbeiten", "erkennen", "sterben", "teilnehmen", "zweifeln"],
          rule:
            "**an + Dativ** verbs are about **being attached to** or working at something.",
          sample: {
            de: "Ich arbeite an einem Projekt.",
            en: "I'm working on a project.",
            highlight: "an",
          },
        },
        {
          prefix: "aus",
          samples: ["bestehen", "entstehen", "übersetzen"],
          rule: "**aus + Dativ** verbs are about **origin** or **composition**.",
          sample: {
            de: "Das Buch besteht aus zehn Kapiteln.",
            en: "The book consists of ten chapters.",
            highlight: "aus",
          },
        },
        {
          prefix: "bei",
          samples: ["anrufen", "sich bewerben"],
          rule: "**bei + Dativ** marks the **place** or **company** you're at.",
          sample: {
            de: "Sie bewirbt sich bei der Firma.",
            en: "She applies at the company.",
            highlight: "bei",
          },
        },
        {
          prefix: "mit",
          samples: [
            "anfangen",
            "aufhören",
            "handeln",
            "sich beschäftigen",
            "rechnen",
          ],
          rule:
            "**mit + Dativ** marks **accompaniment**, the **tool** or the **topic** you're engaged with.",
          sample: {
            de: "Ich rechne mit ihm.",
            en: "I'm counting on him.",
            highlight: "mit",
          },
        },
        {
          prefix: "nach",
          samples: ["fragen", "riechen", "schmecken", "suchen"],
          rule:
            "**nach + Dativ** marks the **thing you're reaching for** — asking for, searching for, smelling of.",
          sample: {
            de: "Er fragt nach dem Weg.",
            en: "He asks for directions.",
            highlight: "nach",
          },
        },
        {
          prefix: "von",
          samples: [
            "abhängen",
            "berichten",
            "erzählen",
            "hören",
            "leben",
            "verlangen",
          ],
          rule:
            "**von + Dativ** marks the **source** — depending on, hearing from, reporting about.",
          sample: {
            de: "Alles hängt von dir ab.",
            en: "Everything depends on you.",
            highlight: "von",
          },
        },
        {
          prefix: "vor",
          samples: ["fliehen", "warnen"],
          rule:
            "**vor + Dativ** marks the **thing you're fleeing from** or **warned about**.",
          sample: {
            de: "Er warnt mich vor der Gefahr.",
            en: "He warns me about the danger.",
            highlight: "vor",
          },
        },
        {
          prefix: "unter",
          samples: ["leiden"],
          rule: "**unter + Dativ** marks the **condition one suffers under**.",
          sample: {
            de: "Sie leidet unter dem Stress.",
            en: "She suffers from the stress.",
            highlight: "unter",
          },
        },
        {
          prefix: "zu",
          samples: [
            "einladen",
            "auffordern",
            "gehören",
            "kommen",
            "passen",
            "überreden",
          ],
          rule:
            "**zu + Dativ** marks the **belonging** or **invitation** — belongs to, invited to, fits with.",
          sample: {
            de: "Sie gehört zu unserer Gruppe.",
            en: "She belongs to our group.",
            highlight: "zu",
          },
        },
      ],
      sample: {
        de: "Ich arbeite an einem Projekt.",
        en: "I'm working on a project.",
        highlight: "an",
      },
    },
    prompt: "Ich arbeite ___ einem Projekt.",
    hint: "I'm working on a project.",
    options: ["an", "auf", "für", "um"],
    correctIndex: 0,
    explanation: '"arbeiten an + Dativ" — fixed combination.',
    tr: {
      hint: "Bir projede çalışıyorum.",
      explanation: '"arbeiten an + Dativ" — sabit kalıp.',
      learn: {
        headline: "Dativ-Präpositionen",
        english: "Her zaman bu edat + Dativ alan fiiller",
        prefixes: [
          {
            rule:
              "**an + Dativ** fiilleri **bir şeye tutunma** veya o şey üzerinde çalışma anlamı taşır.",
            sample: { en: "Bir projede çalışıyorum." },
          },
          {
            rule:
              "**aus + Dativ** fiilleri **kaynak** veya **bileşim** anlamı taşır.",
            sample: { en: "Kitap on bölümden oluşuyor." },
          },
          {
            rule:
              "**bei + Dativ** bulunulan **yer** veya **yanında olunan kişi/kurum**.",
            sample: { en: "Firmaya başvuruyor." },
          },
          {
            rule:
              "**mit + Dativ** **eşlik**, kullanılan **araç** ya da **ilgilenilen konu**.",
            sample: { en: "Ona güveniyorum." },
          },
          {
            rule:
              "**nach + Dativ** **ulaşılmak istenen şey** — sormak, aramak, kokmak.",
            sample: { en: "Yolu soruyor." },
          },
          {
            rule:
              "**von + Dativ** **kaynak** — bağlı olmak, duymak, bahsetmek.",
            sample: { en: "Her şey sana bağlı." },
          },
          {
            rule:
              "**vor + Dativ** **kaçtığın** veya **uyarıldığın** şey.",
            sample: { en: "Beni tehlikeye karşı uyarıyor." },
          },
          {
            rule:
              "**unter + Dativ** **altında çekilen durum**.",
            sample: { en: "Stresten muzdarip." },
          },
          {
            rule:
              "**zu + Dativ** **aidiyet** ya da **davet** — ait olmak, davet edilmek, uymak.",
            sample: { en: "Grubumuza ait." },
          },
        ],
        sample: { en: "Bir projede çalışıyorum." },
      },
    },
  },

  // ── 6 ─ Anchor: Akkusativ-Präpositionen (red carousel, 6) ────────
  {
    topic: "Akkusativ-Präpositionen",
    exerciseType: "multipleChoice",
    learn: {
      layout: "verbCards",
      headline: "Akkusativ-Präpositionen",
      english: "Verbs that always take this preposition + Akkusativ",
      tint: "var(--article-die)",
      prefixes: [
        {
          prefix: "auf",
          samples: ["achten", "antworten", "zielen", "hoffen", "aufpassen"],
          rule:
            "**auf + Akkusativ** — paying attention to, answering, aiming at, hoping for.",
          sample: {
            de: "Ich achte auf die Zeit.",
            en: "I pay attention to the time.",
            highlight: "auf",
          },
        },
        {
          prefix: "an",
          samples: [
            "denken",
            "glauben",
            "sich erinnern",
            "sich gewöhnen",
            "sich wenden",
          ],
          rule:
            "**an + Akkusativ** — thinking of, believing in, remembering, getting used to.",
          sample: {
            de: "Ich denke oft an dich.",
            en: "I often think about you.",
            highlight: "an",
          },
        },
        {
          prefix: "für",
          samples: ["danken", "kämpfen", "stimmen", "sein", "ausgeben"],
          rule:
            "**für + Akkusativ** — thanking for, fighting for, voting for, being in favour.",
          sample: {
            de: "Danke für das Geschenk.",
            en: "Thanks for the gift.",
            highlight: "für",
          },
        },
        {
          prefix: "gegen",
          samples: ["protestieren", "kämpfen", "verstoßen", "stimmen", "sein"],
          rule:
            "**gegen + Akkusativ** — protesting against, fighting against, voting against.",
          sample: {
            de: "Wir protestieren gegen den Krieg.",
            en: "We're protesting against the war.",
            highlight: "gegen",
          },
        },
        {
          prefix: "über",
          samples: [
            "berichten",
            "erzählen",
            "sprechen",
            "herrschen",
            "lachen",
            "regieren",
          ],
          rule:
            "**über + Akkusativ** — talking about, reporting on, laughing at, ruling over.",
          sample: {
            de: "Wir sprechen über das Problem.",
            en: "We're talking about the problem.",
            highlight: "über",
          },
        },
        {
          prefix: "um",
          samples: ["bitten", "gehen", "kämpfen", "spielen", "wetten"],
          rule:
            "**um + Akkusativ** — asking for, dealing with, betting on, playing for.",
          sample: {
            de: "Ich bitte dich um Hilfe.",
            en: "I'm asking you for help.",
            highlight: "um",
          },
        },
      ],
      sample: {
        de: "Ich denke oft an dich.",
        en: "I often think about you.",
        highlight: "an",
      },
    },
    prompt: "Ich denke oft ___ dich.",
    hint: "I often think about you.",
    options: ["an", "auf", "mit", "von"],
    correctIndex: 0,
    explanation: '"denken an + Akkusativ" — fixed combination.',
    tr: {
      hint: "Sık sık seni düşünüyorum.",
      explanation: '"denken an + Akkusativ" — sabit kalıp.',
      learn: {
        headline: "Akkusativ-Präpositionen",
        english: "Her zaman bu edat + Akkusativ alan fiiller",
        prefixes: [
          {
            rule:
              "**auf + Akkusativ** — dikkat etmek, cevaplamak, nişan almak, ummak.",
            sample: { en: "Zamana dikkat ediyorum." },
          },
          {
            rule:
              "**an + Akkusativ** — düşünmek, inanmak, hatırlamak, alışmak.",
            sample: { en: "Sık sık seni düşünüyorum." },
          },
          {
            rule:
              "**für + Akkusativ** — teşekkür etmek, mücadele etmek, lehte oy vermek.",
            sample: { en: "Hediye için teşekkürler." },
          },
          {
            rule:
              "**gegen + Akkusativ** — protesto etmek, karşı mücadele, aleyhte oy.",
            sample: { en: "Savaşa karşı protesto ediyoruz." },
          },
          {
            rule:
              "**über + Akkusativ** — bahsetmek, haber vermek, gülmek, hüküm sürmek.",
            sample: { en: "Sorundan bahsediyoruz." },
          },
          {
            rule:
              "**um + Akkusativ** — bir şey istemek, söz konusu olmak, oyun oynamak.",
            sample: { en: "Senden yardım istiyorum." },
          },
        ],
        sample: { en: "Sık sık seni düşünüyorum." },
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

  // ── 19 ─ Drills: Dativ-Präpositionen ─────────────────────────────
  {
    topic: "Dativ-Präpositionen",
    exerciseType: "multipleChoice",
    prompt: "Sie nimmt ___ dem Kurs teil.",
    options: ["an", "auf", "für", "um"],
    correctIndex: 0,
    explanation: '"teilnehmen an + Dat" — fixed combination.',
    hint: "She's participating in the course.",
    tr: {
      hint: "Kursa katılıyor.",
      explanation: '"teilnehmen an + Dat" — sabit kalıp.',
    },
  },
  {
    topic: "Dativ-Präpositionen",
    exerciseType: "fillBlank",
    prompt: "Er fragt mich ___ dem Weg.",
    answer: "nach",
    explanation: '"fragen nach + Dat" — to ask for / about something.',
    hint: "He asks me for directions.",
    tr: {
      hint: "Bana yolu soruyor.",
      explanation: '"fragen nach + Dat" — bir şey sormak / hakkında sormak.',
    },
  },
  {
    topic: "Dativ-Präpositionen",
    exerciseType: "multipleChoice",
    prompt: "Alles hängt ___ dir ab.",
    options: ["von", "an", "mit", "zu"],
    correctIndex: 0,
    explanation: '"abhängen von + Dat" — fixed combination.',
    hint: "Everything depends on you.",
    tr: {
      hint: "Her şey sana bağlı.",
      explanation: '"abhängen von + Dat" — sabit kalıp.',
    },
  },

  // ── 22 ─ Drills: Akkusativ-Präpositionen ─────────────────────────
  {
    topic: "Akkusativ-Präpositionen",
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
    topic: "Akkusativ-Präpositionen",
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
    topic: "Akkusativ-Präpositionen",
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
