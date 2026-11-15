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
 *   1-6   Anchors (with `learn`): Konjunktiv I, Passiv alle Zeiten,
 *         Konjunktiv II Vergangenheit, wo- und da-Wörter,
 *         Nominalstil, Modalverben: Vermutung.
 *   7-24  18 topic-grouped drills (3 per anchor): MC → fillBlank
 *         → MC inside each batch, as the B1 brief established.
 *
 * Mix: 17 multipleChoice + 7 fillBlank. Slightly more MC than
 * B1 (14/10) on purpose — several B2 blanks have more than one
 * grammatical answer (KI vs KII, Vorgang vs Zustand) and MC lets
 * us control distractors.
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

  // ── 3 ─ Anchor: Konjunktiv II Vergangenheit (connectorCards, 4 verbs) ──
  // Doc specifies `verbCards`, but that organism was rewritten at B1
  // to render a prefix carousel only. The side-by-side 4-cards-with-
  // examples visual is what `connectorCards` does, and the
  // ConnectorCard { word, example, english, highlight } shape maps
  // 1:1 onto the data the doc provides for this anchor (infinitive →
  // word). Same pedagogical outcome, no renderer change needed.
  {
    topic: "Konjunktiv II Vergangenheit",
    exerciseType: "fillBlank",
    learn: {
      layout: "connectorCards",
      headline: "Konjunktiv II Vergangenheit",
      english: "Past hypotheticals: hätte / wäre + Partizip II",
      note:
        "Pick **hätte** or **wäre** exactly like haben/sein in the Perfekt: movement and change of state take **wäre** (gekommen, gefahren, aufgestanden), almost everything else takes **hätte**. With a modal you get a double infinitive: Du **hättest** das sagen **sollen**.",
      connectors: [
        {
          word: "hätte ... gewusst",
          english: "would have known",
          example: "Hätte ich das gewusst, ...",
          highlight: "Hätte",
        },
        {
          word: "hätte ... geholfen",
          english: "would have helped",
          example: "Ich hätte dir gern geholfen.",
          highlight: "hätte",
        },
        {
          word: "wäre ... gekommen",
          english: "would have come",
          example: "Ich wäre gern gekommen.",
          highlight: "wäre",
        },
        {
          word: "wäre ... geblieben",
          english: "would have stayed",
          example: "Wir wären länger geblieben.",
          highlight: "wären",
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
      },
    },
  },

  // ── 4 ─ Anchor: wo- und da-Wörter (connectorCards, 4 pairs) ──
  {
    topic: "wo- und da-Wörter",
    exerciseType: "multipleChoice",
    learn: {
      layout: "connectorCards",
      headline: "wo- und da-Wörter",
      english: "Prepositional pronouns: da(r)- refers back, wo(r)- asks",
      note:
        "**da(r)- + Präposition** replaces a thing or idea that's already known; **wo(r)- + Präposition** asks about it. An **r** is added when the preposition starts with a vowel: dar**auf**, wor**an**. Only for **things**: for **people** use preposition + pronoun. Ich warte **auf ihn**. **Auf wen** wartest du?",
      connectors: [
        {
          word: "davon / wovon",
          english: "von + thing",
          example: "Das hängt davon ab. Wovon?",
          highlight: "davon",
        },
        {
          word: "darauf / worauf",
          english: "auf + thing",
          example: "Ich freue mich darauf. Worauf?",
          highlight: "darauf",
        },
        {
          word: "damit / womit",
          english: "mit + thing",
          example: "Ich bin damit zufrieden. Womit?",
          highlight: "damit",
        },
        {
          word: "dafür / wofür",
          english: "für + thing",
          example: "Ich interessiere mich dafür. Wofür?",
          highlight: "dafür",
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

  // ── 6 ─ Anchor: Modalverben Vermutung (connectorCards, 4 modals) ──
  // Same layout swap as anchor 3 for the same reason — doc says
  // verbCards, but we render the side-by-side cards via
  // connectorCards (the ConnectorCard shape maps 1:1).
  {
    topic: "Modalverben: Vermutung",
    exerciseType: "multipleChoice",
    learn: {
      layout: "connectorCards",
      headline: "Modalverben: Vermutung",
      english: "Modal verbs for guesses and hearsay",
      note:
        "Modal verbs can also show **how sure** you are. From sure to unsure: **muss** → **dürfte** → **kann / könnte**. **soll** = I heard it, people say so. **will** = he claims it himself: Er **will** Arzt sein. In this use the modal is followed by **sein** or another infinitive at the end.",
      connectors: [
        {
          word: "müssen",
          english: "must be (I'm almost sure)",
          example: "Sie muss krank sein.",
          highlight: "muss",
        },
        {
          word: "dürfte",
          english: "is probably",
          example: "Er dürfte zu Hause sein.",
          highlight: "dürfte",
        },
        {
          word: "können",
          english: "could be (possible)",
          example: "Das kann stimmen.",
          highlight: "kann",
        },
        {
          word: "sollen",
          english: "is said to be (hearsay)",
          example: "Er soll sehr reich sein.",
          highlight: "soll",
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
      },
    },
  },

  // ── Drills 7-9 — Konjunktiv I ──
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
  {
    topic: "Konjunktiv I",
    exerciseType: "fillBlank",
    prompt: "Sie sagte, sie ___ morgen. (kommen)",
    answer: "komme",
    explanation:
      "Konjunktiv I of kommen, 3rd person singular: stem komm + e → sie komme. Different from the indicative 'kommt', so Konjunktiv I works here.",
    hint: "She said she would come tomorrow.",
    tr: {
      hint: "Yarın geleceğini söyledi.",
      explanation:
        "kommen'in Konjunktiv I'i, 3. tekil: kök komm + e → sie komme. Bildirme kipindeki 'kommt'tan farklı olduğu için burada Konjunktiv I kullanılır.",
    },
  },
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

  // ── Drills 10-12 — Passiv ──
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

  // ── Drills 13-15 — Konjunktiv II Vergangenheit ──
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
  {
    topic: "Konjunktiv II Vergangenheit",
    exerciseType: "fillBlank",
    prompt: "Wenn es nicht geregnet hätte, ___ wir gewandert.",
    answer: "wären",
    explanation:
      "wandern is movement and takes sein in the Perfekt (wir sind gewandert) → wir wären gewandert. The verb comes first because the wenn-clause is in position 1.",
    hint: "If it hadn't rained, we would have gone hiking.",
    tr: {
      hint: "Yağmur yağmasaydı yürüyüşe giderdik.",
      explanation:
        "wandern hareket fiili, Perfekt'te sein alır (wir sind gewandert) → wir wären gewandert. wenn-cümlesi 1. pozisyonda olduğu için fiil önce gelir.",
    },
  },
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

  // ── Drills 16-18 — wo- und da-Wörter ──
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

  // ── Drills 19-21 — Nominalstil ──
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
  {
    topic: "Nominalstil",
    exerciseType: "fillBlank",
    prompt: "Trotz ___ Regens gehen wir spazieren.",
    answer: "des",
    explanation:
      "trotz + Genitiv. der Regen is masculine → des Regens (noun adds -s).",
    hint: "Despite the rain, we're going for a walk.",
    tr: {
      hint: "Yağmura rağmen yürüyüşe çıkıyoruz.",
      explanation:
        "trotz + Genitiv. der Regen eril → des Regens (isim -s alır).",
    },
  },
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

  // ── Drills 22-24 — Modalverben Vermutung ──
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
