// Se inyecta en <head> y se ejecuta antes del primer pintado para evitar un destello del tema equivocado
export const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`
