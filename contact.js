const contactWords = ["• Welcome", "• to", "• contact", "• graphic", "• section"];
let contactIndex = 0;
let contactInterval;
const contactTextElement = document.querySelector(".contactText");

gsap.fromTo(contactTextElement, 
    { opacity: 0 }, 
    { 
        opacity: 1, 
        duration: .5, 
        onStart: () => {
            contactTextElement.textContent = contactWords[contactIndex];
            contactIndex++;
        },
        onComplete: () => {
            // نبدأ التغيير بعد انتهاء أول كلمة
            contactInterval = setInterval(changeContactWord, 200);
        }
    }
);

function changeContactWord() {
    if (contactIndex < contactWords.length) {
        contactTextElement.textContent = contactWords[contactIndex];
        gsap.fromTo(contactTextElement, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.2 }
        );
        contactIndex++;
    } 
    
    if (contactIndex === contactWords.length) {
        clearInterval(contactInterval);

        setTimeout(() => {
            gsap.to(".contact-intro", {
                top: '-150%',
                transformOrigin: "top center",
                duration: 0.5,
                ease: "power3.in",
            });
        }, 200); 

        pro(); // الكولباك بتاعك

    }
}
