document.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('interactive-box');
    const discordButton = document.getElementById('discord-button');
    let rotateX = 0,
        rotateY = 0;

    const hasFinePointer = () => {
        return window.matchMedia("(pointer: fine)").matches;
    };

    if (hasFinePointer()) {
        const customCursor = document.createElement('div');
        customCursor.classList.add('custom-cursor');
        document.body.appendChild(customCursor);

        document.addEventListener('mousemove', (e) => {
            const { innerWidth, innerHeight } = window;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            rotateY = ((mouseX - innerWidth / 2) / innerWidth) * 90; 
            rotateX = ((innerHeight / 2 - mouseY) / innerHeight) * 90; 

            box.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(50px) scale(1.2)`;
            box.style.boxShadow = `${-rotateY / 2}px ${rotateX / 2}px 100px rgba(0, 255, 133, 0.5)`;

            customCursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        document.addEventListener('mouseleave', () => {
            box.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)`;
            box.style.boxShadow = `0 20px 50px rgba(0, 255, 133, 0.4)`;
        });

        document.addEventListener('contextmenu', (e) => e.preventDefault());

        window.onkeydown = function(e) {
            if (
                e.keyCode === 123 ||
                (e.ctrlKey && e.shiftKey && (
                    e.keyCode === 'I'.charCodeAt(0) ||
                    e.keyCode === 'C'.charCodeAt(0) ||
                    e.keyCode === 'J'.charCodeAt(0) ||
                    e.keyCode === 'U'.charCodeAt(0)
                ))
            ) {
                e.preventDefault();
                return false;
            }
        };

        discordButton.addEventListener('click', () => {
            window.open('https://dsc.gg/wuztools', '_blank');
        });

        discordButton.addEventListener('mouseenter', () => {
            customCursor.style.backgroundColor = '#000000';
        });

        discordButton.addEventListener('mouseleave', () => {
            customCursor.style.backgroundColor = '#00ff85';
        });

        window.addEventListener('mouseleave', () => {
            customCursor.style.opacity = '0';
        });

        window.addEventListener('mouseenter', () => {
            customCursor.style.opacity = '1';
        });
    }
});