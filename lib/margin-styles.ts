// Shared inline style block for the margin pages, so every page looks the same
// without repeating it.
export const MARGIN_STYLES = `
  .m-wrap { max-width: 1060px; margin: 0 auto; padding: 0 20px; }
  .m-serif { font-family: Georgia, 'Times New Roman', serif; }
  .m-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
  .m-in, .m-sel { font: inherit; font-size: 14.5px; padding: 9px 11px; border-radius: 6px;
    border: 1px solid #DDD6CC; background: #fff; width: 100%; }
  .m-in:focus-visible, .m-sel:focus-visible { outline: 2px solid #C17D2E; outline-offset: 1px; }
  .m-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
    padding: 10px 18px; border: 1px solid transparent; background: #C17D2E; color: #fff; }
  .m-btn:hover { background: #A96C25; }
  .m-btn:disabled { opacity: .5; cursor: default; }
  .m-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
  .m-quiet:hover { background: #FDFCFA; }
  .m-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
    color: #C17D2E; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
  .m-link:focus-visible, .m-btn:focus-visible { outline: 2px solid #C17D2E; outline-offset: 2px; }
  .m-label { display: block; font-size: 12px; color: #8A8279; margin-bottom: 4px; }
  .m-tag { font-size: 11px; font-weight: 600; letter-spacing: .03em; border-radius: 3px;
    padding: 3px 8px; white-space: nowrap; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
`
