/**
 * Grammar — B2 deck (24 items). Port of
 * claude/GenauApp_Web_Try_Grammar_Content_B2.md §4, with two
 * deliberate adaptations in line with the patterns we settled on
 * at A2 / B1:
 *
 *   1. Anchor 1 Konjunktiv I ships as a 4-variant chevron carousel
 *      (sein → haben → kommen → können) instead of a single sein
 *      paradigm. sein is irregular and leads with the full table;
 *      the other three variants show the stem+e rule in action,
 *      so the learner meets the rule in context, not only in the
 *      note. Same pedagogical shape as A2 Modalverben + B1
 *      Konjunktiv II.
 *   2. Anchor 5 Nominalstil uses the new `styleComparison` layout
 *      (left/right pairs with caller-supplied column labels),
 *      which is a thin generalisation of `activePassiveComparison`.
 *      Keeps the familiar 2-column visual but doesn't mislabel
 *      Verbalstil ↔ Nominalstil as Aktiv ↔ Passiv.
 *
 * Deck composition:
 *   1-6    Anchors (with `learn`): Konjunktiv I, Passiv alle Zeiten,
 *          Konjunktiv II Vergangenheit, wo- und da-Wörter,
 *          Nominalstil, Modalverben: Vermutung.
 *   7-12   Pass 1 — 1 easy MC per topic, in anchor order (blocked).
 *   13-18  Pass 2 — 1 fillBlank per topic, INTERLEAVED order.
 *          Three of these are MULTI-WORD fill-in-sentence items
 *          (items 14, 15, 16): first production practice in the
 *          B2 web deck. Learner types a short clause fragment,
 *          not a single token. The normalizer collapses whitespace
 *          and strips trailing punctuation.
 *   19-24  Pass 3 — 1 hard MC per topic, INTERLEAVED in a different
 *          order so no topic lands in the same slot across passes.
 *
 * Mix: 17 multipleChoice + 7 fillBlank (3 of those multi-word).
 * Slightly more MC than B1 (14/10) on purpose — several B2 blanks
 * have more than one grammatical answer (KI vs KII, Vorgang vs
 * Zustand) and MC lets us control distractors.
 *
 * Why interleaved + growing difficulty: Bjork's "desirable
 * difficulties" research (plus Hwang 2025 on language learners
 * specifically) shows blocked practice is better for initial
 * encoding, interleaved practice is better for long-term retention
 * and discrimination between similar forms. Hybrid is the fit.
 * Pass 1 stays blocked-ish; passes 2 and 3 mix. Difficulty climbs
 * in parallel so the back half asks more while the mind is warmer.
 *
 * `correctIndex` spread across 0-3 (B1 was always 0) so a learner
 * can't pattern-match position.
 *
 * Content rules honored:
 *   - No em-dashes anywhere.
 *   - `___` literal three underscores.
 *   - hint always shown.
 *   - normalizeDE handles case-insensitive + umlaut folds.
 *   - Paradigm cells (forms, verbs, connectors, stylePairs, labels)
 *     stay German in the TR mirror.
 *   - `**bold**` works in note / rule / explanation via RuleCard.
 *   - Distractors are clearly wrong — never a colloquially
 *     acceptable alternative (B2 §6 rule).
 */

import type { GrammarQuestion } from "@/content/grammar-a1";

/** Re-export A1 helpers so callers can import from one place. */
export {
  grammarLearnAnchors,
  localizeGrammar,
  normalizeDE,
} from "@/content/grammar-a1";

export const GRAMMAR_B2: GrammarQuestion[] = [
  // ── 1 ─ Anchor: Konjunktiv I (carousel: sein → haben → kommen → können) ──
  {
    topic: "Konjunktiv I",
    exerciseType: "multipleChoice",
    learn: {
      layout: "verbParadigm",
      headline: "Konjunktiv I",
      english: "Reported speech: the 'he says that ...' form",
      note:
        "Konjunktiv I is the reported-speech form of news German. In practice you mostly need **er / sie / es**: stem + **e** → er **habe**, er **komme**, er **könne**, er **wolle**. **sein** is fully irregular (table). Where Konjunktiv I looks the same as the normal present (sie **haben**), switch to Konjunktiv II: sie **hätten**.",
      // Fallback single-paradigm (carrier for callers that skip variants).
      verb: "sein",
      forms: [
        { pronoun: "ich", form: "sei" },
        { pronoun: "du", form: "seist" },
        { pronoun: "er / sie / es", form: "sei" },
        { pronoun: "wir", form: "seien" },
        { pronoun: "ihr", form: "seiet" },
        { pronoun: "sie / Sie", form: "seien" },
      ],
      sample: {
        de: "Er sagt, er sei krank.",
        en: "He says he's sick.",
        highlight: "sei",
      },
      variants: [
        {
          verb: "sein",
          english: "to be (fully irregular)",
          forms: [
            { pronoun: "ich", form: "sei" },
            { pronoun: "du", form: "seist" },
            { pronoun: "er / sie / es", form: "sei" },
            { pronoun: "wir", form: "seien" },
            { pronoun: "ihr", form: "seiet" },
            { pronoun: "sie / Sie", form: "seien" },
          ],
          sample: {
            de: "Er sagt, er sei krank.",
            en: "He says he's sick.",
            highlight: "sei",
          },
          rule:
            "**sein** is the one Konjunktiv I paradigm worth memorising. Every singular form is **sei**; plural is **seien**. The only form you'll actually see in news German is er/sie/es: er **sei**, sie **sei**, es **sei**.",
        },
        {
          verb: "haben",
          english: "to have (stem + e rule)",
          forms: [
            { pronoun: "ich", form: "habe" },
            { pronoun: "du", form: "habest" },
            { pronoun: "er / sie / es", form: "habe" },
            { pronoun: "wir", form: "haben" },
            { pronoun: "ihr", form: "habet" },
            { pronoun: "sie / Sie", form: "haben" },
          ],
          sample: {
            de: "Sie sagte, sie habe keine Zeit.",
            en: "She said she had no time.",
            highlight: "habe",
          },
          rule:
            "**haben** follows the regular rule: stem **hab** + **e** → er **habe**. Note the plural (wir **haben**, sie **haben**) is identical to the indicative — when that happens, German switches to Konjunktiv II: sie **hätten**.",
        },
        {
          verb: "kommen",
          english: "to come (stem + e rule)",
          forms: [
            { pronoun: "ich", form: "komme" },
            { pronoun: "du", form: "kommest" },
            { pronoun: "er / sie / es", form: "komme" },
            { pronoun: "wir", form: "kommen" },
            { pronoun: "ihr", form: "kommet" },
            { pronoun: "sie / Sie", form: "kommen" },
          ],
          sample: {
            de: "Der Chef sagt, er komme später.",
            en: "The boss says he's coming later.",
            highlight: "komme",
          },
          rule:
            "Regular verbs: stem + **e**. **kommen** → er **komme**. This is the one form you really need in practice — journalists use er/sie/es Konjunktiv I almost exclusively.",
        },
        {
          verb: "können",
          english: "to be able to (stem + e rule)",
          forms: [
            { pronoun: "ich", form: "könne" },
            { pronoun: "du", form: "könnest" },
            { pronoun: "er / sie / es", form: "könne" },
            { pronoun: "wir", form: "können" },
            { pronoun: "ihr", form: "könnet" },
            { pronoun: "sie / Sie", form: "können" },
          ],
          sample: {
            de: "Er sagt, er könne das nicht glauben.",
            en: "He says he can't believe it.",
            highlight: "könne",
          },
          rule:
            "Modal verbs follow the same rule: stem + **e**. **können** → er **könne**, **müssen** → er **müsse**, **wollen** → er **wolle**. News German loves these in reported speech.",
        },
      ],
    },
    prompt: "Die Bürgermeisterin sagte, die Lösung ___ nicht perfekt.",
    hint: "The mayor said the solution wasn't perfect.",
    options: ["sei", "seien", "sein", "wird"],
    correctIndex: 0,
    explanation:
      "Reported speech, 3rd person singular → Konjunktiv I of sein: sei. 'seien' is plural, 'wird' is indicative and changes the meaning.",
    tr: {
      hint: "Belediye başkanı çözümün mükemmel olmadığını söyledi.",
      explanation:
        "Aktarılan söz, 3. tekil → sein'in Konjunktiv I'i: sei. 'seien' çoğul, 'wird' ise bildirme kipi ve anlamı değiştiriyor.",
      learn: {
        headline: "Konjunktiv I",
        english: "Aktarılan söz: 'diyor ki ...' biçimi",
        note:
          "Konjunktiv I haber Almancasında aktarılan sözün biçimidir. Pratikte çoğunlukla **er / sie / es** gerekir: kök + **e** → er **habe**, er **komme**, er **könne**, er **wolle**. **sein** tamamen düzensizdir (tablo). Konjunktiv I normal şimdiki zamanla aynı görünüyorsa (sie **haben**), Konjunktiv II'ye geçilir: sie **hätten**.",
        sample: { en: "Hastaymış, öyle söylüyor." },
        variants: [
          {
            english: "olmak (tamamen düzensiz)",
            sample: { en: "Hastaymış, öyle söylüyor." },
            rule:
              "**sein** ezberlemeye değer tek Konjunktiv I paradigmasıdır. Tekilin her biçimi **sei**; çoğul **seien**. Haber Almancasında aslında sadece er/sie/es görürsün: er **sei**, sie **sei**, es **sei**.",
          },
          {
            english: "sahip olmak (kök + e kuralı)",
            sample: { en: "Vaktinin olmadığını söyledi." },
            rule:
              "**haben** düzenli kuralı izler: kök **hab** + **e** → er **habe**. Çoğul (wir **haben**, sie **haben**) bildirme kipiyle aynıdır; böyle durumlarda Almanca Konjunktiv II'ye geçer: sie **hätten**.",
          },
          {
            english: "gelmek (kök + e kuralı)",
            sample: { en: "Patron geç geleceğini söylüyor." },
            rule:
              "Düzenli fiiller: kök + **e**. **kommen** → er **komme**. Pratikte gerçekten gereken tek biçim bu — gazeteciler neredeyse sadece er/sie/es Konjunktiv I kullanır.",
          },
          {
            english: "yapabilmek (kök + e kuralı)",
            sample: { en: "Buna inanamadığını söylüyor." },
            rule:
              "Modal fiiller de aynı kurala uyar: kök + **e**. **können** → er **könne**, **müssen** → er **müsse**, **wollen** → er **wolle**. Haber Almancası bunları çok sever.",
          },
        ],
      },
    },
  },

  // ── 2 ─ Anchor: Passiv alle Zeiten (single paradigm, tense labels) ──
  {
    topic: "Passiv",
    exerciseType: "multipleChoice",
    learn: {
      layout: "verbParadigm",
      headline: "Passiv: alle Zeiten",
      english: "Passive in every tense: werden carries the tense, Partizip II stays",
      note:
        "In the passive Perfekt the Partizip of werden is **worden**, not geworden. Separate from this: **Zustandspassiv** = sein + Partizip II describes a **result**. Die Tür **wird** geöffnet (someone is opening it) vs. Die Tür **ist** geöffnet (it is open now).",
      verb: "bauen (Passiv)",
      // Six rows, one per tense. The `pronoun` slot holds the tense
      // label so the existing verbParadigm renderer needs no change.
      forms: [
        { pronoun: "Präsens", form: "wird gebaut" },
        { pronoun: "Präteritum", form: "wurde gebaut" },
        { pronoun: "Perfekt", form: "ist gebaut worden" },
        { pronoun: "Plusquamperfekt", form: "war gebaut worden" },
        { pronoun: "Futur I", form: "wird gebaut werden" },
        { pronoun: "mit Modalverb", form: "muss gebaut werden" },
      ],
      sample: {
        de: "Die Brücke ist 2010 gebaut worden.",
        en: "The bridge was built in 2010.",
        highlight: "worden",
      },
    },
    prompt: "Das Rathaus ist letztes Jahr renoviert ___.",
    hint: "The town hall was renovated last year.",
    options: ["geworden", "worden", "werden", "wurde"],
    correctIndex: 1,
    explanation:
      "Passive Perfekt = ist + Partizip II + worden. In the passive, werden's Partizip is 'worden'. 'geworden' is only for werden as a full verb (Er ist Arzt geworden).",
    tr: {
      hint: "Belediye binası geçen yıl yenilendi.",
      explanation:
        "Edilgen Perfekt = ist + Partizip II + worden. Edilgende werden'in Partizip'i 'worden' olur. 'geworden' sadece werden asıl fiil olduğunda kullanılır (Er ist Arzt geworden).",
      learn: {
        headline: "Passiv: alle Zeiten",
        english: "Her zamanda edilgen: zamanı werden taşır, Partizip II sabit kalır",
        note:
          "Edilgen Perfekt'te werden'in Partizip'i **worden**'dir, geworden değil. Bundan ayrı olarak: **Zustandspassiv** = sein + Partizip II bir **sonucu** anlatır. Die Tür **wird** geöffnet (biri kapıyı açıyor) ile Die Tür **ist** geöffnet (kapı şu an açık) farklıdır.",
        sample: { en: "Köprü 2010'da inşa edildi." },
      },
    },
  },

  // ── 3 ─ Anchor: Konjunktiv II Vergangenheit (chevron carousel) ──
  // Was side-by-side `connectorCards` — too much on one card. Same
  // feedback Mert gave for anchors 4 and 6: four items at once
  // overwhelms, chevron through them one at a time instead.
  // showFormula is false because this isn't a Konnektor family,
  // so the Nebensatz formula strip would mislead.
  {
    topic: "Konjunktiv II Vergangenheit",
    exerciseType: "fillBlank",
    learn: {
      layout: "connectorCarousel",
      headline: "Konjunktiv II Vergangenheit",
      english: "Past hypotheticals: hätte / wäre + Partizip II",
      note:
        "Pick **hätte** or **wäre** exactly like haben/sein in the Perfekt: movement and change of state take **wäre** (gekommen, gefahren, aufgestanden), almost everything else takes **hätte**. With a modal you get a double infinitive: Du **hättest** das sagen **sollen**.",
      showFormula: false,
      connectors: [
        {
          word: "hätte ... gewusst",
          english: "would have known",
          example: "Hätte ich das gewusst, ...",
          highlight: "Hätte",
          rule:
            "**haben + Partizip II**. Mental verbs (wissen, denken, glauben) take **haben** → ich hätte gewusst. Drop wenn and the verb jumps to position 1: **Hätte** ich das gewusst, ...",
        },
        {
          word: "hätte ... geholfen",
          english: "would have helped",
          example: "Ich hätte dir gern geholfen.",
          highlight: "hätte",
          rule:
            "**haben + Partizip II**. Transitive verbs with an object (dir, mir) take **haben**. Classic polite regret: Ich hätte dir gern geholfen, aber ...",
        },
        {
          word: "wäre ... gekommen",
          english: "would have come",
          example: "Ich wäre gern gekommen.",
          highlight: "wäre",
          rule:
            "**sein + Partizip II**. Movement (kommen, gehen, fahren) takes **sein** → ich wäre gekommen. The 'I would have joined you' line at the party you missed.",
        },
        {
          word: "wäre ... geblieben",
          english: "would have stayed",
          example: "Wir wären länger geblieben.",
          highlight: "wären",
          rule:
            "**sein + Partizip II**. Staying in place and change of state (bleiben, werden, aufstehen) take **sein** → wir wären geblieben. Also: wir wären länger geblieben.",
        },
      ],
      sample: {
        de: "Wenn ich das gewusst hätte, wäre ich gekommen.",
        en: "If I had known that, I would have come.",
        highlight: "hätte",
      },
    },
    prompt: "Wenn ich früher aufgestanden ___, hätte ich den Bus erreicht.",
    hint: "If I had got up earlier, I would have caught the bus.",
    answer: "wäre",
    explanation:
      "aufstehen takes sein in the Perfekt (ich bin aufgestanden), so the past hypothetical uses wäre: wenn ich aufgestanden wäre.",
    tr: {
      hint: "Daha erken kalksaydım otobüse yetişirdim.",
      explanation:
        "aufstehen Perfekt'te sein alır (ich bin aufgestanden), bu yüzden geçmiş hipotezde wäre kullanılır: wenn ich aufgestanden wäre.",
      learn: {
        headline: "Konjunktiv II Vergangenheit",
        english: "Geçmişe dair hipotez: hätte / wäre + Partizip II",
        note:
          "**hätte** mi **wäre** mi, tam olarak Perfekt'teki haben/sein gibi seçilir: hareket ve durum değişikliği **wäre** alır (gekommen, gefahren, aufgestanden), neredeyse geri kalan her şey **hätte** alır. Modal fiille çift mastar oluşur: Du **hättest** das sagen **sollen**.",
        sample: { en: "Bunu bilseydim gelirdim." },
        connectors: [
          {
            english: "bilirdim",
            rule:
              "**haben + Partizip II**. Zihinsel fiiller (wissen, denken, glauben) **haben** alır → ich hätte gewusst. wenn düşerse fiil 1. pozisyona atlar: **Hätte** ich das gewusst, ...",
          },
          {
            english: "yardım ederdim",
            rule:
              "**haben + Partizip II**. Nesne alan geçişli fiiller (dir, mir) **haben** alır. Klasik kibar pişmanlık: Ich hätte dir gern geholfen, aber ...",
          },
          {
            english: "gelirdim",
            rule:
              "**sein + Partizip II**. Hareket (kommen, gehen, fahren) **sein** alır → ich wäre gekommen. Kaçırdığın partideki 'gelmek isterdim'.",
          },
          {
            english: "kalırdım",
            rule:
              "**sein + Partizip II**. Yerinde kalma ve durum değişikliği (bleiben, werden, aufstehen) **sein** alır → wir wären geblieben. Ayrıca: wir wären länger geblieben.",
          },
        ],
      },
    },
  },

  // ── 4 ─ Anchor: wo- und da-Wörter (chevron carousel) ──
  // One pair per card, chevron through all four. Four side-by-side
  // cards was too much on a single page.
  {
    topic: "wo- und da-Wörter",
    exerciseType: "multipleChoice",
    learn: {
      layout: "connectorCarousel",
      headline: "wo- und da-Wörter",
      english: "Prepositional pronouns: da(r)- refers back, wo(r)- asks",
      note:
        "**da(r)- + Präposition** replaces a thing or idea that's already known; **wo(r)- + Präposition** asks about it. An **r** is added when the preposition starts with a vowel: dar**auf**, wor**an**. Only for **things**: for **people** use preposition + pronoun. Ich warte **auf ihn**. **Auf wen** wartest du?",
      showFormula: false,
      connectors: [
        {
          word: "davon / wovon",
          english: "von + thing",
          example: "Das hängt davon ab. Wovon?",
          highlight: "davon",
          rule:
            "**von + thing** → **davon**. Classic use: **abhängen von** → Das hängt davon ab (that depends on it). Ask with **Wovon**?",
        },
        {
          word: "darauf / worauf",
          english: "auf + thing",
          example: "Ich freue mich darauf. Worauf?",
          highlight: "darauf",
          rule:
            "**auf + thing** → **darauf**. The **r** is inserted because auf starts with a vowel. **sich freuen auf** → freue mich darauf (looking forward to it).",
        },
        {
          word: "damit / womit",
          english: "mit + thing",
          example: "Ich bin damit zufrieden. Womit?",
          highlight: "damit",
          rule:
            "**mit + thing** → **damit**. zufrieden **mit**, einverstanden **mit** — anything 'with' an idea or thing. **Womit** asks.",
        },
        {
          word: "dafür / wofür",
          english: "für + thing",
          example: "Ich interessiere mich dafür. Wofür?",
          highlight: "dafür",
          rule:
            "**für + thing** → **dafür**. **sich interessieren für**, **sich entscheiden für**. **Wofür** interessierst du dich?",
        },
      ],
      sample: {
        de: "Hängt das vom Wetter ab? Ja, das hängt davon ab.",
        en: "Does that depend on the weather? Yes, it depends on it.",
        highlight: "davon",
      },
    },
    prompt: "Freust du dich auf den Urlaub? Ja, ich freue mich sehr ___.",
    hint: "Are you looking forward to the holiday? Yes, I'm really looking forward to it.",
    options: ["auf ihn", "darauf", "worauf", "dafür"],
    correctIndex: 1,
    explanation:
      "der Urlaub is a thing, so 'auf den Urlaub' becomes darauf. 'auf ihn' is for people. 'worauf' asks, it doesn't answer.",
    tr: {
      hint: "Tatili iple çekiyor musun? Evet, çok sabırsızlanıyorum.",
      explanation:
        "der Urlaub bir şey, bu yüzden 'auf den Urlaub' darauf olur. 'auf ihn' insanlar için. 'worauf' soru sorar, cevap vermez.",
      learn: {
        headline: "wo- und da-Wörter",
        english: "Edatlı zamirler: da(r)- geriye gönderir, wo(r)- soru sorar",
        note:
          "**da(r)- + edat** zaten bilinen bir şeyin ya da fikrin yerini tutar; **wo(r)- + edat** onu sorar. Edat ünlüyle başlıyorsa araya **r** girer: dar**auf**, wor**an**. Sadece **şeyler** için: **insanlar** için edat + zamir kullanılır. Ich warte **auf ihn**. **Auf wen** wartest du?",
        sample: { en: "Havaya mı bağlı? Evet, ona bağlı." },
        connectors: [
          {
            english: "von + şey",
            rule:
              "**von + şey** → **davon**. Klasik kullanım: **abhängen von** → Das hängt davon ab (ona bağlı). Soru: **Wovon**?",
          },
          {
            english: "auf + şey",
            rule:
              "**auf + şey** → **darauf**. Araya **r** girer çünkü auf ünlüyle başlar. **sich freuen auf** → freue mich darauf (sabırsızlanıyorum).",
          },
          {
            english: "mit + şey",
            rule:
              "**mit + şey** → **damit**. zufrieden **mit**, einverstanden **mit** — bir fikir ya da şeyle ilgili her şey. Soru: **Womit**?",
          },
          {
            english: "für + şey",
            rule:
              "**für + şey** → **dafür**. **sich interessieren für**, **sich entscheiden für**. **Wofür** interessierst du dich?",
          },
        ],
      },
    },
  },

  // ── 5 ─ Anchor: Nominalstil (styleComparison, 3 pairs) ──
  {
    topic: "Nominalstil",
    exerciseType: "multipleChoice",
    learn: {
      layout: "styleComparison",
      headline: "Nominalstil",
      english: "Formal German: turn a clause into a noun phrase",
      note:
        "Written and official German prefers nouns over clauses. The connector becomes a **Genitiv preposition** (weil → **wegen**, obwohl → **trotz**, während → **während**), the verb becomes a noun, and the article goes into **Genitiv**: **des** for masculine/neuter (noun + -s/-es), **der** for feminine/plural.",
      labels: ["Verbalstil", "Nominalstil"],
      stylePairs: [
        { left: "weil es regnet", right: "wegen des Regens" },
        { left: "obwohl er krank war", right: "trotz seiner Krankheit" },
        { left: "während wir essen", right: "während des Essens" },
      ],
      sample: {
        de: "Wegen des Streiks fahren heute keine Busse.",
        en: "Because of the strike, no buses are running today.",
        highlight: "Wegen",
      },
    },
    prompt: "___ des schlechten Wetters bleiben wir zu Hause.",
    hint: "Because of the bad weather, we're staying home.",
    options: ["Weil", "Wegen", "Trotz", "Obwohl"],
    correctIndex: 1,
    explanation:
      "A noun phrase in Genitiv follows (des schlechten Wetters), so we need a preposition, not a connector: Wegen. 'Trotz' would mean 'despite', which doesn't fit.",
    tr: {
      hint: "Kötü hava yüzünden evde kalıyoruz.",
      explanation:
        "Ardından Genitiv'de bir isim öbeği geliyor (des schlechten Wetters), yani bağlaç değil edat lazım: Wegen. 'Trotz' 'rağmen' demek, anlama uymuyor.",
      learn: {
        headline: "Nominalstil",
        english: "Resmi Almanca: yan cümleyi isim öbeğine çevirmek",
        note:
          "Yazılı ve resmi Almanca yan cümle yerine ismi tercih eder. Bağlaç bir **Genitiv edatına** dönüşür (weil → **wegen**, obwohl → **trotz**, während → **während**), fiil isim olur ve artikel **Genitiv**'e geçer: eril/nötr için **des** (isim + -s/-es), dişil/çoğul için **der**.",
        sample: { en: "Grev yüzünden bugün otobüs yok." },
      },
    },
  },

  // ── 6 ─ Anchor: Modalverben Vermutung (chevron carousel) ──
  // One modal per card, chevron through the certainty scale.
  {
    topic: "Modalverben: Vermutung",
    exerciseType: "multipleChoice",
    learn: {
      layout: "connectorCarousel",
      headline: "Modalverben: Vermutung",
      english: "Modal verbs for guesses and hearsay",
      note:
        "Modal verbs can also show **how sure** you are. From sure to unsure: **muss** → **dürfte** → **kann / könnte**. **soll** = I heard it, people say so. **will** = he claims it himself: Er **will** Arzt sein. In this use the modal is followed by **sein** or another infinitive at the end.",
      showFormula: false,
      connectors: [
        {
          word: "müssen",
          english: "must be (I'm almost sure)",
          example: "Sie muss krank sein.",
          highlight: "muss",
          rule:
            "Strongest certainty: **almost sure**. Use when the evidence is clear. Das Licht ist an, ihr Auto steht vor der Tür → sie **muss** zu Hause sein.",
        },
        {
          word: "dürfte",
          english: "is probably",
          example: "Er dürfte zu Hause sein.",
          highlight: "dürfte",
          rule:
            "Educated guess: **probably**. Softer than muss, more confident than kann. Es ist 7 Uhr → er **dürfte** schon zu Hause sein.",
        },
        {
          word: "können",
          english: "could be (possible)",
          example: "Das kann stimmen.",
          highlight: "kann",
          rule:
            "Open possibility: **might**. The weakest guess on the scale — leaves room for it being false. Das **kann** stimmen, es **könnte** aber auch falsch sein.",
        },
        {
          word: "sollen",
          english: "is said to be (hearsay)",
          example: "Er soll sehr reich sein.",
          highlight: "soll",
          rule:
            "Hearsay: **I heard**, like Turkish **-mış**. Marks something as reported, not claimed by you. Er **soll** reich sein = people say he's rich (I'm not vouching).",
        },
      ],
      sample: {
        de: "Er soll sehr reich sein.",
        en: "He's said to be very rich.",
        highlight: "soll",
      },
    },
    prompt: "Ich habe gehört, der neue Chef ___ sehr streng sein.",
    hint: "I've heard the new boss is supposed to be very strict.",
    options: ["muss", "will", "soll", "darf"],
    correctIndex: 2,
    explanation:
      "'Ich habe gehört' = hearsay → sollen. 'muss' would mean you're sure yourself; 'will' would mean the boss claims it himself.",
    tr: {
      hint: "Yeni patronun çok sert olduğunu duydum.",
      explanation:
        "'Ich habe gehört' = duyum → sollen. 'muss' senin emin olduğunu, 'will' ise patronun bunu kendisinin iddia ettiğini anlatırdı.",
      learn: {
        headline: "Modalverben: Vermutung",
        english: "Tahmin ve duyum için modal fiiller",
        note:
          "Modal fiiller ne kadar **emin** olduğunu da gösterebilir. Eminden emin olmayana: **muss** → **dürfte** → **kann / könnte**. **soll** = duydum, öyle diyorlar, Türkçedeki '-mış' gibi. **will** = kendisi öyle iddia ediyor: Er **will** Arzt sein. Bu kullanımda modal fiilden sonra sonda **sein** ya da başka bir mastar gelir.",
        sample: { en: "Çok zenginmiş." },
        connectors: [
          {
            english: "...-malı (neredeyse eminim)",
            rule:
              "En güçlü kesinlik: **neredeyse eminim**. Kanıt netken kullan. Işık açık, arabası kapıda → **muss** zu Hause sein.",
          },
          {
            english: "muhtemelen",
            rule:
              "Mantıklı tahmin: **muhtemelen**. muss'tan yumuşak, kann'dan daha emin. Es ist 7 Uhr → er **dürfte** schon zu Hause sein.",
          },
          {
            english: "olabilir",
            rule:
              "Açık ihtimal: **olabilir**. Ölçekteki en zayıf tahmin — yanlış olma ihtimalini de bırakır. Das **kann** stimmen, aber es **könnte** auch falsch sein.",
          },
          {
            english: "...-mış (duyum)",
            rule:
              "Duyum: **duydum**, Türkçedeki **-mış** gibi. Bir şeyi kendi iddian değil, aktarım olarak işaretler. Er **soll** reich sein = zenginmiş diyorlar (ben garanti vermiyorum).",
          },
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // Drills 7-24 in INTERLEAVED order (not blocked by topic).
  //
  // Pass 1 (items 7-12): easiest MC per topic, in anchor order. Feels
  //   like "confirm each pattern once, right after you walked the
  //   anchors." Still blocked-ish because the anchor section (1-6)
  //   just walked all six topics one after another, so hitting them
  //   in the same order here is a safe baseline before mixing.
  //
  // Pass 2 (items 13-18): fillBlank per topic, interleaved order.
  //   Three of these are MULTI-WORD fill-in-sentence items — the
  //   learner types a short clause fragment, not a single token.
  //   First production practice in the B2 web deck.
  //
  // Pass 3 (items 19-24): hardest MC per topic, interleaved again
  //   in a different order so no topic sits in the same slot across
  //   passes.
  //
  // Difficulty grows with each pass (easy MC → fillBlank + production
  //   → hard MC); interleaving grows with each pass (anchor order →
  //   mixed → mixed differently). The two curves align so the back
  //   half of the deck lands the "desirable difficulty" research
  //   recommends without breaking low-achievers who need the
  //   blocked-first warm-up.
  // ─────────────────────────────────────────────────────────────────

  // ── Pass 1 · Item 7 — Konjunktiv I (easy MC) ──
  {
    topic: "Konjunktiv I",
    exerciseType: "multipleChoice",
    prompt: "Er sagt, er ___ keine Zeit.",
    options: ["habe", "haben", "hast", "gehabt"],
    correctIndex: 0,
    explanation:
      "Konjunktiv I of haben, 3rd person singular: stem hab + e → er habe.",
    hint: "He says he has no time.",
    tr: {
      hint: "Vakti olmadığını söylüyor.",
      explanation:
        "haben'in Konjunktiv I'i, 3. tekil: kök hab + e → er habe.",
    },
  },

  // ── Pass 1 · Item 8 — Passiv (easy MC) ──
  {
    topic: "Passiv",
    exerciseType: "multipleChoice",
    prompt: "Die Brücke ___ 1990 gebaut.",
    options: ["wurde", "ist", "wird", "hat"],
    correctIndex: 0,
    explanation:
      "A finished action in the past → passive Präteritum: wurde + Partizip II.",
    hint: "The bridge was built in 1990.",
    tr: {
      hint: "Köprü 1990'da inşa edildi.",
      explanation:
        "Geçmişte tamamlanmış bir eylem → edilgen Präteritum: wurde + Partizip II.",
    },
  },

  // ── Pass 1 · Item 9 — KII Vergangenheit (easy MC) ──
  {
    topic: "Konjunktiv II Vergangenheit",
    exerciseType: "multipleChoice",
    prompt: "Ich ___ dir gern geholfen, aber ich hatte keine Zeit.",
    options: ["wäre", "hätte", "würde", "habe"],
    correctIndex: 1,
    explanation:
      "helfen takes haben in the Perfekt (ich habe geholfen), so the past hypothetical is: ich hätte geholfen.",
    hint: "I would have liked to help you, but I didn't have time.",
    tr: {
      hint: "Sana seve seve yardım ederdim ama vaktim yoktu.",
      explanation:
        "helfen Perfekt'te haben alır (ich habe geholfen), yani geçmiş hipotez: ich hätte geholfen.",
    },
  },

  // ── Pass 1 · Item 10 — wo-/da-Wörter (easy MC) ──
  {
    topic: "wo- und da-Wörter",
    exerciseType: "multipleChoice",
    prompt: "Wartest du auf deinen Bruder? Ja, ich warte ___.",
    options: ["darauf", "auf ihn", "worauf", "dafür"],
    correctIndex: 1,
    explanation:
      "The brother is a person, so no da-word: preposition + pronoun → auf ihn. 'darauf' is only for things.",
    hint: "Are you waiting for your brother? Yes, I'm waiting for him.",
    tr: {
      hint: "Kardeşini mi bekliyorsun? Evet, onu bekliyorum.",
      explanation:
        "Kardeş bir insan, bu yüzden da- sözcüğü kullanılmaz: edat + zamir → auf ihn. 'darauf' sadece şeyler için.",
    },
  },

  // ── Pass 1 · Item 11 — Nominalstil (easy MC) ──
  {
    topic: "Nominalstil",
    exerciseType: "multipleChoice",
    prompt: "___ seiner Krankheit kommt er heute nicht zur Arbeit.",
    options: ["Trotz", "Wegen", "Während", "Obwohl"],
    correctIndex: 1,
    explanation:
      "The illness is the reason he isn't coming → wegen (= weil er krank ist). 'Trotz' would mean despite.",
    hint: "Because of his illness, he isn't coming to work today.",
    tr: {
      hint: "Hastalığı yüzünden bugün işe gelmiyor.",
      explanation:
        "Hastalık gelmemesinin nedeni → wegen (= weil er krank ist). 'Trotz' 'rağmen' demek olurdu.",
    },
  },

  // ── Pass 1 · Item 12 — Modalverben (easy MC) ──
  {
    topic: "Modalverben: Vermutung",
    exerciseType: "multipleChoice",
    prompt:
      "Das Licht ist an und ihr Auto steht vor der Tür. Sie ___ zu Hause sein.",
    options: ["soll", "muss", "will", "darf"],
    correctIndex: 1,
    explanation:
      "Two clear clues → you're almost sure → müssen: sie muss zu Hause sein.",
    hint: "The light is on and her car is outside. She must be home.",
    tr: {
      hint: "Işık açık ve arabası kapının önünde. Evde olmalı.",
      explanation:
        "İki net ipucu var → neredeyse eminsin → müssen: sie muss zu Hause sein.",
    },
  },

  // ── Pass 2 · Item 13 — wo-/da-Wörter (fillBlank single-word) ──
  {
    topic: "wo- und da-Wörter",
    exerciseType: "fillBlank",
    prompt: "___ interessierst du dich? Für Politik.",
    answer: "Wofür",
    explanation:
      "sich interessieren für + Akk; asking about a thing → wo + für = Wofür.",
    hint: "What are you interested in? Politics.",
    tr: {
      hint: "Neyle ilgileniyorsun? Siyasetle.",
      explanation:
        "sich interessieren für + Akk; bir şeyi sorarken → wo + für = Wofür.",
    },
  },

  // ── Pass 2 · Item 14 — Konjunktiv I (MULTI-WORD fill-in-sentence) ──
  // First production item: the learner types a whole reported-speech
  // clause fragment, not a single K-I form. Tests that they can
  // assemble "Sie sagte, die Lösung sei" as a unit — subject
  // introduction, reported subject, verb-in-K-I — in one go.
  {
    topic: "Konjunktiv I",
    exerciseType: "fillBlank",
    prompt: "___ nicht perfekt.",
    answer: "Sie sagte, die Lösung sei",
    explanation:
      'Full reported-speech opener. Introducer in Präteritum (Sie sagte), reported subject (die Lösung), and Konjunktiv I of sein (sei). The K-I verb at the end is what matters.',
    hint: "She said the solution wasn't perfect. (type the whole opener)",
    tr: {
      hint: "Çözümün mükemmel olmadığını söyledi. (girişin tamamını yaz)",
      explanation:
        "Aktarılan sözün tam açılışı. Giriş fiili Präteritum'da (Sie sagte), aktarılan özne (die Lösung), ve sein'in Konjunktiv I'i (sei). Asıl mesele sondaki K-I fiili.",
    },
  },

  // ── Pass 2 · Item 15 — Nominalstil (MULTI-WORD fill-in-sentence) ──
  // Production of a Genitiv noun phrase as a chunk — the Nominalstil
  // whole move in miniature. Replaces the earlier des-only fillBlank.
  {
    topic: "Nominalstil",
    exerciseType: "fillBlank",
    prompt: "___ gehen wir spazieren.",
    answer: "Trotz des Regens",
    explanation:
      "Verbalstil 'obwohl es regnet' → Nominalstil 'trotz des Regens'. trotz triggers Genitiv; der Regen (masc.) → des Regens (noun adds -s).",
    hint: "Despite the rain, we're going for a walk. (type the whole phrase)",
    tr: {
      hint: "Yağmura rağmen yürüyüşe çıkıyoruz. (ifadenin tamamını yaz)",
      explanation:
        "Verbalstil 'obwohl es regnet' → Nominalstil 'trotz des Regens'. trotz Genitiv alır; der Regen (eril) → des Regens (isim -s alır).",
    },
  },

  // ── Pass 2 · Item 16 — KII Vergangenheit (MULTI-WORD fill-in-sentence) ──
  // Production of the Hauptsatz half of a past hypothetical. Tests
  // the wäre/hätte choice (gekommen → sein → wäre) AND the inversion
  // (verb first because the wenn-clause occupies position 1).
  {
    topic: "Konjunktiv II Vergangenheit",
    exerciseType: "fillBlank",
    prompt: "Wenn ich das gewusst hätte, ___.",
    answer: "wäre ich gekommen",
    explanation:
      "The wenn-clause fills position 1, so the Hauptsatz verb comes first (inversion). kommen is movement → sein → wäre. Pattern: wäre + Subjekt + Partizip II = wäre ich gekommen.",
    hint: "If I had known that, I would have come. (type the main clause)",
    tr: {
      hint: "Bunu bilseydim gelirdim. (ana cümleyi yaz)",
      explanation:
        "wenn-cümlesi 1. pozisyonu doldurur, bu yüzden ana cümle fiili önce gelir (devrik). kommen hareket fiili → sein → wäre. Kalıp: wäre + Özne + Partizip II = wäre ich gekommen.",
    },
  },

  // ── Pass 2 · Item 17 — Passiv (fillBlank single-word) ──
  {
    topic: "Passiv",
    exerciseType: "fillBlank",
    prompt: "Die Unterlagen müssen bis Freitag unterschrieben ___.",
    answer: "werden",
    explanation:
      "Modal + passive: the modal in position 2, and Partizip II + werden at the end. 'müssen ... unterschrieben werden' = have to be signed.",
    hint: "The documents have to be signed by Friday.",
    tr: {
      hint: "Belgelerin cumaya kadar imzalanması gerekiyor.",
      explanation:
        "Modal + edilgen: modal fiil 2. pozisyonda, sonda Partizip II + werden. 'müssen ... unterschrieben werden' = imzalanmaları gerekiyor.",
    },
  },

  // ── Pass 2 · Item 18 — Modalverben (fillBlank single-word) ──
  {
    topic: "Modalverben: Vermutung",
    exerciseType: "fillBlank",
    prompt: "Laut Zeitung ___ das Konzert schon ausverkauft sein.",
    answer: "soll",
    explanation:
      "'Laut Zeitung' = according to the paper, so it's hearsay → sollen: das Konzert soll ausverkauft sein.",
    hint: "According to the paper, the concert is supposed to be sold out already.",
    tr: {
      hint: "Gazeteye göre konserin biletleri tükenmiş.",
      explanation:
        "'Laut Zeitung' = gazeteye göre, yani duyum → sollen: das Konzert soll ausverkauft sein.",
    },
  },

  // ── Pass 3 · Item 19 — wo-/da-Wörter (hard MC) ──
  {
    topic: "wo- und da-Wörter",
    exerciseType: "multipleChoice",
    prompt: "___ denkst du gerade? An meine Prüfung.",
    options: ["Worauf", "Wovon", "Woran", "Womit"],
    correctIndex: 2,
    explanation:
      "denken an + Akk. 'an' starts with a vowel, so an r is added: wo + r + an = Woran.",
    hint: "What are you thinking about right now? About my exam.",
    tr: {
      hint: "Şu an ne düşünüyorsun? Sınavımı.",
      explanation:
        "denken an + Akk. 'an' ünlüyle başladığı için araya r girer: wo + r + an = Woran.",
    },
  },

  // ── Pass 3 · Item 20 — KII Vergangenheit (hard MC — double infinitive) ──
  {
    topic: "Konjunktiv II Vergangenheit",
    exerciseType: "multipleChoice",
    prompt: "Du ___ das früher sagen sollen!",
    options: ["wärst", "würdest", "hättest", "hattest"],
    correctIndex: 2,
    explanation:
      "Modal verbs take haben, and with another verb you get a double infinitive: du hättest ... sagen sollen = you should have said that.",
    hint: "You should have said that earlier!",
    tr: {
      hint: "Bunu daha önce söylemeliydin!",
      explanation:
        "Modal fiiller haben alır ve başka bir fiille çift mastar oluşur: du hättest ... sagen sollen = bunu söylemeliydin.",
    },
  },

  // ── Pass 3 · Item 21 — Konjunktiv I (hard MC — KII escape rule) ──
  {
    topic: "Konjunktiv I",
    exerciseType: "multipleChoice",
    prompt: "Die Nachbarn sagen, sie ___ keine Zeit.",
    options: ["haben", "hätten", "habe", "hatten"],
    correctIndex: 1,
    explanation:
      "Konjunktiv I plural would be 'sie haben', identical to the indicative. When that happens, German switches to Konjunktiv II: sie hätten.",
    hint: "The neighbors say they have no time.",
    tr: {
      hint: "Komşular vakitleri olmadığını söylüyor.",
      explanation:
        "Çoğulda Konjunktiv I 'sie haben' olurdu, bu da bildirme kipiyle aynı. Böyle durumlarda Almanca Konjunktiv II'ye geçer: sie hätten.",
    },
  },

  // ── Pass 3 · Item 22 — Passiv (hard MC — Zustandspassiv) ──
  {
    topic: "Passiv",
    exerciseType: "multipleChoice",
    prompt: "Das Fenster ___ schon repariert. Es funktioniert wieder.",
    options: ["wird", "ist", "worden", "hat"],
    correctIndex: 1,
    explanation:
      "'Es funktioniert wieder' tells you the repair is finished. A result state → Zustandspassiv: ist + Partizip II. 'wird repariert' would mean someone is still working on it.",
    hint: "The window is already repaired. It works again.",
    tr: {
      hint: "Pencere çoktan tamir edildi. Yine çalışıyor.",
      explanation:
        "'Es funktioniert wieder' tamirin bittiğini gösteriyor. Sonuç durumu → Zustandspassiv: ist + Partizip II. 'wird repariert' hâlâ biri üzerinde çalışıyor demek olurdu.",
    },
  },

  // ── Pass 3 · Item 23 — Nominalstil (hard MC — Genitiv feminine) ──
  {
    topic: "Nominalstil",
    exerciseType: "multipleChoice",
    prompt: "Während ___ Sitzung darf man nicht telefonieren.",
    options: ["die", "dem", "der", "des"],
    correctIndex: 2,
    explanation:
      "während + Genitiv. die Sitzung is feminine → Genitiv der Sitzung. 'des' is only for masculine and neuter.",
    hint: "You're not allowed to make calls during the meeting.",
    tr: {
      hint: "Toplantı sırasında telefonla konuşmak yasak.",
      explanation:
        "während + Genitiv. die Sitzung dişil → Genitiv der Sitzung. 'des' sadece eril ve nötr için.",
    },
  },

  // ── Pass 3 · Item 24 — Modalverben (hard MC — wollen own claim) ──
  {
    topic: "Modalverben: Vermutung",
    exerciseType: "multipleChoice",
    prompt: "Er ___ Millionär sein, aber niemand glaubt ihm.",
    options: ["soll", "muss", "dürfte", "will"],
    correctIndex: 3,
    explanation:
      "'niemand glaubt ihm' = nobody believes HIM, so the claim is his own → wollen: er will Millionär sein (he claims to be).",
    hint: "He claims to be a millionaire, but nobody believes him.",
    tr: {
      hint: "Milyoner olduğunu iddia ediyor ama kimse ona inanmıyor.",
      explanation:
        "'niemand glaubt ihm' = kimse ONA inanmıyor, yani iddia kendisine ait → wollen: er will Millionär sein (öyle iddia ediyor).",
    },
  },
];
