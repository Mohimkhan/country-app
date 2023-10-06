// Variables
const darkAndLightBtn = document.querySelector("#ColorSwitchBtn");
const faviconElement = document.getElementById('favicon');
import faviconLight from '../assets/mobile-design-detail-light.jpg';
import faviconDark from '../assets/mobile-design-detail-dark.jpg';

// Dark and light mode implementation
darkAndLightBtn.addEventListener('click', themeSwitcher);

// initial favicon 
faviconElement.href = faviconDark;

// Toggle between dark and light mode
function themeSwitcher() {
    // Check if any default theme is set in localStorage
    const theme = localStorage.getItem('theme') || 'dark';

    // Change theme and update button text accordingly
    if (theme === 'dark') {
        localStorage.setItem('theme', 'light');
        darkAndLightBtn.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
    } else {
        localStorage.setItem('theme', 'dark');
        darkAndLightBtn.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    }

    // Update theme based on mode
    themeChecker();
}

// Check and update theme based on mode
function themeChecker() {
    // Check if any default theme is set in localStorage
    const theme = localStorage.getItem('theme') || 'dark';

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (theme === 'dark' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (!document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark');
            faviconElement.href = faviconDark;
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            faviconElement.href = faviconLight;
        }
    }
}

// Call themeChecker on page load
window.addEventListener('load', () => {
    themeChecker();
});
