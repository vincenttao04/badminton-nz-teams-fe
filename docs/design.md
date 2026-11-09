# Design foundation

The UI is for Badminton New Zealand officials working under time pressure at a venue. Design for speed and certainty, not decoration.

## Principles

- Clarity first: one primary action per screen, obvious status, no clutter.
- Large, reachable targets for quick use on laptops and tablets at the desk.
- Show state plainly: what is open, what is submitted, what blocks a submission.
- Accessible by default: WCAG AA contrast, labelled controls, full keyboard support.
- The frontend hides what a role cannot do, but it is never the security boundary. The backend enforces access and validation on every request.

The visual system (colour tokens, typography, components) is intentionally left until the real screens take shape, likely with shadcn/ui. Until then, styling stays close to the scaffold defaults and plain Tailwind utilities.
