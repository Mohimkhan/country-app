const scrollAnimation = (elements = [], options) => {
    let delay = 0;
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                delay = delay <= 4 ? delay + 1 : 0;
                entry.target.style.setProperty('--delay', `${delay * 500}ms`);
                entry.target.classList.add('animation-delay');
                entry.target.classList.add('animate-[flip_2s_ease]');
                observer.unobserve(entry.target);
            }
        })
    }, options);

    elements.forEach((country) => {
        observer.observe(country);
    })
}

module.exports = {
    scrollAnimation
}

