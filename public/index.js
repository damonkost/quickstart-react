// Add interactive bubble effect
document.addEventListener('DOMContentLoaded', () => {
    const gradientBg = document.querySelector('.gradient-bg');
    
    // Optional: Add subtle parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach((bubble, index) => {
            const factor = (index + 1) * 0.1;
            bubble.style.transform = `translate(${mouseX * 20 * factor}px, ${mouseY * 20 * factor}px)`;
        });
    });
});
