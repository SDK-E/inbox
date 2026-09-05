export const STORAGE_KEY = "inbox:theme";

export const themeScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var r=document.documentElement;if(t==='dark'){r.classList.add('dark');}else if(t==='light'){r.classList.remove('dark');}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){r.classList.add('dark');}}catch(e){}})();`;
