# Design

The design comes from PRATHEEK's Google Stitch project "MediPulse PRD", which uses the "Aura Med" design system (Material 3). Everything here was exported on 25 Oct 2026.

- `DESIGN.md`: Stitch's design system guidelines ("The Clinical Sanctuary"). Note its "no-line" rule: separate sections with background shades, not 1 px borders.
- `tokens.json`: Material 3 colour roles, fonts and roundness from Stitch.
- `tailwind-preset.js`: the same tokens as a Tailwind preset for NativeWind and the future doctor web app.
- `stitch/*.png` and `stitch/*.html`: a screenshot and Stitch's HTML/Tailwind export for each screen. Use the HTML for spacing and class names. It's a reference, not production code.

## Which screens to build from

The `(v2)` screens add things the pilot needs: Snooze and Skip, the 1-0-1 notation, the language and font-size requirements, and the 112 safety note. Where an original and a v2 screen overlap, take the layout and visual style from the original and the features from v2.

| Screen | Primary reference | Also see |
| --- | --- | --- |
| Today | `today-v2` | `home-default`, `home-low-stock`, `home-success` |
| Reminder alert | `reminder-alert-v2` | |
| Add medicine | `add-medicine-v2` | `add-medication-fixed`, `add-medication-innovative` |
| My medicines | `my-medicines-v2` | `medications-list`, `medications-empty` |
| History | `history-v2` | `history`, `history-empty` |
| Settings | `settings-warm` | `navigation-drawer` |
| Sharing (Phase 1b) | `sharing-v2` | |
| Landing page (marketing, not in the app) | `landing-page-mobile` | |

Known fixes to make while building:
- On Home, the + button covers the stock card.
- On Medications, the delete icon sits right next to Edit. Use a confirmation step or move it into the edit screen.
- On Sharing (v2), Stitch invented names ("Dr. Rajesh Sharma", "Amit Sharma"). Replace them with real data.
- Use the bottom navigation from the v2 screens: Today, History, Medicines and Share. Share is hidden in Phase 1a, or replaced by a share-summary action.
