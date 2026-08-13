/** localStorage key for a manual theme override; absent = follow time of day. */
export const THEME_STORAGE_KEY = 'cm-theme'

/** Light 06:00–18:00 local time, dark otherwise. */
export function autoTheme(): 'light' | 'dark' {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18 ? 'light' : 'dark'
}

/**
 * Source for a blocking <script> in <head>, run before paint, so there's no
 * flash of the wrong theme. Reads the manual override if set, else falls
 * back to time-of-day. Kept as a plain string (not a React event handler)
 * because it has to run before hydration.
 */
export function themeInitScript(): string {
  return `(function(){try{
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark' ? stored : (function(){
      var h = new Date().getHours();
      return h >= 6 && h < 18 ? 'light' : 'dark';
    })();
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}})();`
}
