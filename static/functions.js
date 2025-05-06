document.addEventListener('DOMContentLoaded', () => {
    const Box = document.getElementById('interactive-box');
    const DiscordButton = document.getElementById('discord-button');
    let RotateX = 0,
        RotateY = 0;

    const HasFinePointer = () => {
        return window.matchMedia("(pointer: fine)").matches;
    };

    if (HasFinePointer()) {
        const CustomCursor = document.createElement('div');
        CustomCursor.classList.add('custom-cursor');
        document.body.appendChild(CustomCursor);

        document.addEventListener('mousemove', (e) => {
            const { innerWidth, innerHeight } = window;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            RotateY = ((mouseX - innerWidth / 2) / innerWidth) * 90; 
            RotateX = ((innerHeight / 2 - mouseY) / innerHeight) * 90; 

            Box.style.transform = `rotateY(${RotateY}deg) rotateX(${RotateX}deg) translateZ(50px) scale(1.2)`;
            Box.style.boxShadow = `${-RotateY / 2}px ${RotateX / 2}px 100px rgba(0, 255, 133, 0.5)`;

            CustomCursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        document.addEventListener('mouseleave', () => {
            Box.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)`;
            Box.style.boxShadow = `0 20px 50px rgba(0, 255, 133, 0.4)`;
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

        DiscordButton.addEventListener('click', () => {
            window.open('https://discord.gg/invitecode', '_blank');
        });

        DiscordButton.addEventListener('mouseenter', () => {
            CustomCursor.style.backgroundColor = '#000000';
        });

        DiscordButton.addEventListener('mouseleave', () => {
            CustomCursor.style.backgroundColor = '#00ff85';
        });

        window.addEventListener('mouseleave', () => {
            CustomCursor.style.opacity = '0';
        });

        window.addEventListener('mouseenter', () => {
            CustomCursor.style.opacity = '1';
        });
    }
});
