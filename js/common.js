document.addEventListener('DOMContentLoaded', async function () {
    const footerContainer = document.querySelector('footer .container');
    
    if (footerContainer) {
        try {
            // Fetch version info with cache busting
            const response = await fetch(`/version.json?t=${new Date().getTime()}`);
            if (response.ok) {
                const version = await response.json();
                
                const buildInfo = document.createElement('small');
                buildInfo.className = 'd-block text-white-50 mt-2';
                buildInfo.style.fontSize = '0.75rem';
                buildInfo.textContent = `Last Updated: ${version.date} at ${version.time}`;
                
                footerContainer.appendChild(buildInfo);
            }
        } catch (error) {
            console.error('Failed to load version info', error);
        }
    }
});