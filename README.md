# Royal Wedding Invitation replica

Faithful copy of https://global0809.github.io/royal-wedding-invite/ using its publicly available source and assets (revision 0bd7fab072a531c88577281a352575ac21a94c86).

Serve `dist` with any static web server. Edit `dist/config.js` to customize the couple, date, events, location, and RSVP form. The original RSVP URL is a placeholder and does not collect responses.

The original source checkout is retained in `reference` for reference, including the editable 3D world project.
Performance tuning: bounded frame caches, direction-aware prefetch, redraw on frame arrival, idle-only high-resolution upgrades, smoother petals, hidden-tab suspension, adaptive 3D resolution, and 30 Hz shadow updates. Run node tests/frame-ring.mjs to check streaming behavior. Editable 3D source lives in world-source.
