# DARELIEF WALKWEAR — Design System & Style Tokens

## 1. Color Palette Tokens

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `Ivory Canvas` | `#FAF7F2` | Primary application background |
| `Ivory Secondary` | `#EFE8DA` | Card backgrounds, badge fills, subtle surface accents |
| `Deep Maroon` | `#701A2B` | Brand signature accent, primary buttons, active states, icons |
| `Maroon Dark` | `#56121F` | Button active states, deep shadows |
| `Maroon Light` | `#8E2337` | Hover states, pill borders |
| `Near-Black` | `#181615` | Major typography, primary CTA buttons |
| `Charcoal Soft` | `#242220` | Secondary headings, form labels |
| `Muted Gray` | `#77716A` | Subtitles, helper text, breadcrumbs |
| `Border Beige` | `#E5DED4` | Section dividers, card borders |
| `Champagne Gold`| `#C5A059` | Star ratings, luxury metallic accents, buckles |

---

## 2. Typography Hierarchy

### Google Fonts Configured in `app/layout.jsx`:
- **Serif Headline Font**: `Playfair Display` (`var(--font-serif)`)
- **Sans-Serif Body Font**: `Outfit` (`var(--font-sans)`)

### Typographic Scales:
- **Hero Display Heading**: `font-serif text-4xl sm:text-5xl lg:text-[3.75rem] font-normal leading-[1.04] tracking-[-0.02em]`
- **Section Heading 1**: `font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#181615]`
- **Section Heading 2**: `font-serif text-2xl sm:text-3xl font-bold text-[#181615]`
- **Card Titles**: `text-xs sm:text-sm font-bold uppercase tracking-wider`
- **Badges & Overlines**: `text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase`
- **Body & Descriptions**: `text-xs sm:text-sm text-[#77716A] leading-relaxed`

---

## 3. UI Component Tokens

### Buttons:
- **Primary CTA**:
  `px-8 py-4 bg-[#181615] hover:bg-[#701A2B] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-[0.15em] transition-all shadow-md hover:shadow-xl`
- **Secondary CTA**:
  `px-4.5 py-3.5 bg-white hover:bg-[#EFE8DA] text-[#181615] border border-[#E5DED4] rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs`
- **Maroon Accent Button**:
  `px-6 py-3 bg-[#701A2B] hover:bg-[#8E2337] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-md`

### Glassmorphism & Cards:
- **Glass Panel**: `bg-white/95 backdrop-blur-md border border-[#E5DED4] shadow-sm`
- **Card Hover Elevation**: `transition-all duration-300 hover:shadow-lg hover:-translate-y-1`
- **Pill Badge**: `px-3.5 py-1.5 rounded-full bg-[#EFE8DA] border border-[#E5DED4] text-[#701A2B] text-[11px] font-bold tracking-[0.18em] uppercase`
