# Pack illustrations

The Packs slide (`src/components/organisms/slides/PacksSlide/`) expects six
`.webp` illustrations at these exact paths:

```
public/pack-dailylife.webp              — Daily Life          (A1)
public/pack-officialappointments.webp   — Bürgeramt           (B2)
public/pack-hairdresser.webp            — Hairdresser         (A2)
public/pack-gesundheit.webp             — Pharmacy & Doctor   (C1)
public/pack-fooddrink.webp              — Food & Drink        (B1)
public/pack-shopping.webp               — Shopping            (C2)
```

Source files in the iOS app (`GenauApp/GenauApp/Assets.xcassets/Deck
Illustrations/`):

| Web file | iOS imageset |
|---|---|
| `pack-dailylife.webp` | `A1-DailyLife.imageset/` |
| `pack-officialappointments.webp` | `A1-OfficialAppointments.imageset/` |
| `pack-hairdresser.webp` | `A1-Hairdresser.imageset/` |
| `pack-gesundheit.webp` | `A1-Gesundheit.imageset/` |
| `pack-fooddrink.webp` | `A1 - Food and Drink.imageset/` |
| `pack-shopping.webp` | `A1-Shopping&Food.imageset/` |

Resample to a roughly square aspect ratio, export as webp. Target size
~10-20KB each (matching the current production landing's file sizes:
Daily Life 20KB, Food & Drink 21KB, Gesundheit 14KB, Hairdresser 8.6KB,
Official Appointments 10KB, Shopping 12KB).

Until the files land, each card renders a tinted "cover coming"
placeholder — the slide still runs, the marquee still measures and
loops seamlessly.
