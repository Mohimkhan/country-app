const darkAndLightBtn = document.querySelector("#ColorSwitchBtn");


// dark and light mode implementation
darkAndLightBtn.addEventListener('click', themeSwitcher)
// toggle between dark and light mode
function themeSwitcher() {
    // check if any default theme is set on localstorage
    const theme = localStorage.getItem('theme') || 'dark';

    // element.dataset.mode
    if (theme === 'dark') {
        localStorage.setItem('theme', 'light');
        darkAndLightBtn.innerHTML = `<i class="fa-solid fa-sun"></i>
        Light Mode`;
    } else {
        localStorage.setItem('theme', 'dark');
        darkAndLightBtn.innerHTML = `<i class="fa-solid fa-moon"></i>Dark Mode`;
    }

    // change theme according to mode
    themeChecker();
}

function themeChecker() {
    // check if any default theme is set on localstorage
    const theme = localStorage.getItem('theme') || 'dark';
    console.log(theme);
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (theme === 'dark' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (!document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            // console.log(document.documentElement.classList.contains('dark'));
            document.documentElement.classList.remove('dark');
        }
    }

}

window.addEventListener('load', () => {
    // console.log(`Here`);
    themeChecker();
});