# Design System Document

## 1. Overview & Creative North Star: "The Clinical Sanctuary"
This design system moves away from the sterile, utilitarian aesthetic of traditional medical apps. Our Creative North Star is **"The Clinical Sanctuary"**—an environment that feels authoritative yet deeply calming. We achieve this by blending the precision of healthcare with high-end editorial layouts.

To break the "template" look, we utilize **Intentional Asymmetry**. Rather than perfectly centered grids, we use generous whitespace (the "Breathing Room" principle) and overlapping elements—such as a pill bottle image breaking the boundary of a hero card—to create a sense of tactile depth. This is not just an interface; it is a premium wellness companion.

---

## 2. Colors & Tonal Architecture
The palette is rooted in a sophisticated Teal, balanced by a "clinical white" surface that avoids the harshness of pure #FFFFFF.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Boundaries must be defined solely through background color shifts or subtle tonal transitions. 
- Use `surface-container-low` (#f1f4f5) to set apart a section from the main `surface` (#f7fafb).
- Content groups are separated by space (8dp/16dp increments), never by lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#f7fafb).
- **Secondary Content:** `surface-container` (#ebeeef).
- **Interactive Elevated Elements:** `surface-container-lowest` (#ffffff) to create a "pop" against the darker container backgrounds.
- **Nesting:** A `primary-container` (#0ea5a0) card should sit on a `surface-container-low` background to create natural, soft depth.

### The "Glass & Gradient" Rule
To elevate CTAs, use **Signature Textures**. 
- **Hero Backgrounds:** Use a linear gradient from `primary` (#006a66) to `primary-container` (#0ea5a0) at a 135° angle.
- **Floating Elements:** Use Glassmorphism for overlays (e.g., a "Dose Taken" confirmation). Apply the `surface` color at 70% opacity with a `20px` backdrop-blur.

---

## 3. Typography: Editorial Authority
We use **Plus Jakarta Sans** (interpreting the Nunito request through a premium lens) to provide a modern, geometric clarity that feels more "high-end boutique" than "rounded consumer."

*   **Display & Headlines:** Use `headline-lg` (2rem) and `headline-md` (1.75rem) with -2% letter spacing. This creates a dense, editorial "voice" for health summaries.
*   **Titles:** `title-md` (1.125rem) is the workhorse for card headings. It should always be high-contrast (`on-surface`).
*   **Body:** `body-md` (0.875rem) provides maximum readability for dosage instructions.
*   **Labels:** Use `label-sm` (0.6875rem) in All Caps with +5% letter spacing for secondary metadata like "EXPIRY DATE" or "STOCK LEVEL."

---

## 4. Elevation & Depth: Tonal Layering
Traditional Material Design relies on heavy shadows. We move beyond this by using **Tonal Layering**.

*   **The Layering Principle:** Achieve lift by stacking. Place a `surface-container-lowest` (#ffffff) card on a `surface-container-high` (#e5e9ea) section. The color contrast replaces the need for a shadow.
*   **Ambient Shadows:** If an element must "float" (like a FAB), use a custom shadow: `0px 12px 24px rgba(24, 28, 29, 0.06)`. The shadow color is a tint of `on-surface`, not black.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use `outline-variant` (#bcc9c8) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Primitive Styling

### Buttons (The Pill Motif)
*   **Primary:** Pill-shaped (999px radius). Use the Signature Gradient (Teal). High-contrast white text.
*   **Secondary:** `surface-container-highest` (#e0e3e4) background with `on-surface` text. No border.
*   **States:** On hover/tap, the background should shift 10% darker using a tonal overlay, never a "glow."

### Cards & Lists (The "No Divider" Mandate)
*   **Standard Cards:** 12dp corner radius.
*   **Hero Cards:** 28dp corner radius. 
*   **Lists:** Forbid divider lines. Separate medication entries using 12dp of vertical white space and a subtle background shift to `surface-container-low` for every second item (zebra striping, but sophisticated).

### Signature Component: The Stock Pulse
A custom progress bar for medication stock. Instead of a flat bar, use a `primary-container` track with a `primary` indicator. Add a subtle "glow" (4% opacity shadow) to the indicator head to signify "active health."

### Input Fields
*   **Style:** Filled containers with `surface-container-high`. 
*   **Focus State:** Instead of a thick border, the background shifts to `surface-container-lowest` and the label slides up in the `primary` color.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., 24dp on the left, 16dp on the right) for headline sections to create an editorial look.
*   **Do** use semi-transparent `primary` containers (10-15% opacity) for "Success" or "Warning" backgrounds to keep the palette cohesive.
*   **Do** lean into the "Pill" shape for all interactive targets to reinforce the app's purpose.

### Don’t
*   **Don’t** use 1px solid lines. Ever. Use space or color shifts.
*   **Don’t** use standard Material "Drop Shadows." Use tonal elevation.
*   **Don’t** crowd the interface. If a screen feels "busy," increase the vertical spacing by 1 step in the scale (e.g., move from 16dp to 20dp).
*   **Don’t** use high-saturation reds for "Error" states. Use the `error` token (#ba1a1a) which is more sophisticated and less "alarming."