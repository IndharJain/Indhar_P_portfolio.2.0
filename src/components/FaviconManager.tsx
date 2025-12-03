import { useEffect } from 'react';

const FaviconManager = () => {
    useEffect(() => {
        const updateFavicon = () => {
            const theme = document.documentElement.getAttribute('data-theme') || 'light';
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;

            if (link) {
                // Use the renamed file for dark mode and the existing one for light mode
                const faviconUrl = theme === 'dark' ? '/dark-bg.png' : '/light-bg.png';
                link.href = faviconUrl;
            } else {
                // Create if it doesn't exist (though index.html usually has one)
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = theme === 'dark' ? '/dark-bg.png' : '/light-bg.png';
                document.head.appendChild(newLink);
            }
        };

        // Initial update
        updateFavicon();

        // Observer for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    updateFavicon();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    return null;
};

export default FaviconManager;
