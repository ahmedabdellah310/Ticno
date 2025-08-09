function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}



const enterSound = new Audio('a.mp3');
const leaveSound = new Audio('a.mp3');
const navSound = new Audio('nav.mp3');
const reverse = new Audio('reverse.mp3');

// نحمل الأصوات عشان متبقاش تقيلة وقت التشغيل
enterSound.load();
leaveSound.load();
navSound.load();
reverse.load();

function updateActiveLink() {
    const links = document.querySelectorAll('nav a'); // غير `nav a` حسب تصميمك
    const path = window.location.pathname;

    links.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


// Menu toggle animation
const toggleBtn = document.getElementById("menu-toggle");
const overlay = document.getElementById("overlay");
const items = document.querySelectorAll(".fade-item");
let isOpen = false;

    gsap.set(items, { opacity: 0, y: 40 });
  
    gsap.set(overlay, { scaleY: 0, transformOrigin: "top",    borderBottomLeftRadius: "100% 100%",
     borderBottomRightRadius: "100% 100%"
    });
    const lines = document.querySelectorAll(".line");
    
    gsap.set(lines, { scaleX: 0, transformOrigin: "left" });
    gsap.set(".overlay p", { y: 20,opacity:0 });
    
    const tl = gsap.timeline({ paused: true });
    
    tl.to(overlay, {
      scaleY: 1,
      duration: 0.5,
      ease: "power4.out",
      borderBottomLeftRadius: "0%",
      borderBottomRightRadius: "0%"
    })
    
    
    .to(lines, {
      scaleX: 1,
      duration: 0.7,
      ease: "power4.out"
    }, "-=0.3") // في نفس توقيت ظهور الكلام
    
    .to(".overlay p", {
        opacity:1,
        y:0,
        duration: 0.7,
        ease: "power4.out"
      }, "-=0.6") // في نفس توقيت ظهور الكلام
      
    .to(items, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.7,
      ease: "power4.out"
    }, "-=0.4"); // برضو بنفس التوقيت
    
    
    toggleBtn.addEventListener("click", () => {
        toggleBtn.classList.toggle("open");
        if (!isOpen) {
            gsap.set(items, { opacity: 0, y: 40 });
            gsap.fromTo(".overlay-content",{opacity:0,scaleX:0, duration:2,ease:"power4.inOut"},{opacity:1,scaleX:1})
     navSound.currentTime = 0; // يبدأ من الأول
    navSound.play();
            tl.play();
        } else {
            tl.reverse();
        reverse.currentTime = 0; // يبدأ من الأول
    reverse.play();
        }
        isOpen = !isOpen;
    });
   
     
// ✅ دي هي اللي هنشتغل بيها
function updateActiveLink() {
    const currentPath = window.location.pathname.replace(/^\//, '');
    const navLinks = document.querySelectorAll(".nav-link");
  
    navLinks.forEach(link => {
      const anchor = link.querySelector("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href === currentPath || (href === "index.html" && currentPath === "")) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      } else {
        link.classList.remove("active");
      }
    });
  }
  
  
// barba

function overlayLink(){
  if (isOpen) {
      gsap.to(items, {
          opacity: 0,
          y: 40,
          duration: 0.3,
          stagger: { each: 0.05, from: "end" },
          ease: "power1.in",
      });
      gsap.to(overlay, {
          scaleY: 0,
          duration: 0.3,
          ease: "power2.inOut",
      });
      toggleBtn.classList.remove("open");
      isOpen = false;
      tl.progress(0).pause();
      
  }
}

$(function () {
  barba.init({
      sync: true,

      transitions: [
          {
              async leave(data) {
              

                leaveSound.currentTime = 0; // يبدأ من الأول
                leaveSound.play();
              const done = this.async();
              pageTransition();
              await delay(1000);

              overlayLink()
              done();

              },

              async enter(data) {

                enterSound.currentTime = 0; // يبدأ من الأول
                enterSound.play();
                  contentAnimation();
                  pro()
                  updateActiveLink(); // ✅ ضفها هنا
                  initAutoplayVideos() 
                  initCopyAndShareButtons();
                  if (document.querySelector(".scrolling-text")) {
                    marque();
                  }
              },
              async once(data) {
                if (document.querySelector(".scrolling-text")) {
                  marque();
                }
                  contentAnimation();
                  pro()
                  reInit()
                  updateActiveLink(); // ✅ ضفها هنا
                  butter.refresh(); // تحديث Butter.js بعد الانتقال

              },
          },
      ],
      
  });


});


 function pageTransition() {
    const tl = gsap.timeline();
  
   // 🟢 دخول شاشة الترانزشن باستخدام clip-path
tl.to(".loading-screen", {
  duration: .7,
  clipPath: "inset(0% 0% 0% 0%)", // يغطي كل الشاشة
  ease: "Expo.easeInOut"
}, 0); // يبدأ فورًا

tl.call(() => {
  window.scrollTo(0, 0);
});

// 🟢 دخول اللوجو بعد شوية
tl.fromTo(".loading-screen img",
  { x: -100,  },
  { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
  0.2
);

// 🔴 خروج اللوجو قبل ما الترانزشن يخلص بشوية
tl.to(".loading-screen img", {
  x: 100,
  duration: 0.7,
  ease: "power3.in"
}, 1);

// 🔴 خروج شاشة الترانزشن باستخدام clip-path
tl.to(".loading-screen", {
  duration: 1,
  clipPath: "inset(0% 0% 0% 100%)", // يخرج من اليمين
  ease: "Expo.easeInOut"
}, 1);

// 🧼 إعادة تعيين الوضع
tl.set(".loading-screen", { clipPath: "inset(0% 100% 0% 100%)" }); // يبقى مختفي من الجانبين
 
}


function contentAnimation() {
    var tl = gsap.timeline();
    tl.from(".animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2 });

}

function initAutoplayVideos() {
    const videos = document.querySelectorAll('video[autoplay]');
  
    videos.forEach(video => {
      // إعادة تشغيل الفيديو إذا كان متوقف
      if (video.paused) {
        video.play().catch(err => {
          console.warn('Autoplay error:', err);
        });
      }
    });


    document.querySelectorAll("video").forEach(video => {
        ScrollTrigger.create({
          trigger: video,
          start: "top center", // لما أول جزء من الفيديو يوصل لنص الشاشة
          end: "bottom -20%", // لما آخر جزء من الفيديو يعدي نص الشاشة
          onEnter: () => {
            video.play();
          },
          onEnterBack: () => {
            video.play();
          },
          onLeave: () => {
            video.pause();
          },
          onLeaveBack: () => {
            video.pause();
          },
          // optional:
          markers: false // لو حابب تشوف بداية ونهاية التريجر
        });
      });
    

   
  }




  




const words = ["• Hello", "• Bonjour", "• 你好", "• Hola", "• Ciao", "• Olá", "• أهلًا "];
const textElement = document.querySelector(".text");

async function showWordsFast() {
    for (let i = 0; i < words.length; i++) {
        textElement.textContent = words[i];
        await gsap.fromTo(textElement, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.12 }
        );
        await delay(50); // فرق صغير جدًا بين كل كلمة (سريع)
    }
    pro(); // تشتغل أول ما يبدأ التحريك

    await delay(100);
    await gsap.to(".intro", {
        top: '-150%',
        transformOrigin: "top center",
        duration: 0.7,
        ease: "power3.in",
    });

}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// أول كلمة تظهر يدويًا
setTimeout(() => {
    textElement.textContent = words[0];
    gsap.fromTo(textElement, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4 }
    );

    // بعد شوية نبدأ الباقي بسرعة
    setTimeout(() => {
        words.shift(); // شيل أول كلمة
        showWordsFast();
    }, 1000);

}, 500);


function pro() {
    requestAnimationFrame(() => {
        setTimeout(() => {

     // ✂️ SplitText للكلمات
var title = new SplitText("#title", { type: "words" });

// 🧩 نغلف كل كلمة في span جديد يكون ليه overflow: hidden
title.words.forEach((word, index) => {
  const wrapper = document.createElement("span");
  wrapper.style.display = "inline-block";
  wrapper.style.overflow = "hidden";

  // نخلي الكلمة نفسها جوا span داخل الـ wrapper
  const inner = document.createElement("span");
  inner.style.display = "inline-block";
  inner.appendChild(word.cloneNode(true));

  wrapper.appendChild(inner);
  word.parentNode.replaceChild(wrapper, word);

  // نخزن العنصر الداخلي للحركة
  title.words[index] = inner;
});

// 🌀 الأنيميشن على الكلمات داخل الـ wrappers
gsap.fromTo(
  title.words,
  { autoAlpha: 1, y: 300 },
  {
    autoAlpha: 1,
    y: 0,
    stagger: 0.2,
    duration: 1.5,
    delay:0.2,
    ease: "power3.out",
  }
);

            gsap.fromTo("#title", { autoAlpha: 0.5 }, 
                        { autoAlpha: 1, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut" });

            gsap.fromTo(".me", { y: 20, }, { y: 0, duration: 2,    delay:0.5,
              ease: "power3.out" });
            gsap.fromTo(".icn", { y: 10, opacity: 0 }, { autoAlpha: 1, y: 0, duration: 2, delay: 0.2, ease: "power3.out" });

            var about = new SplitText("#about", { type: "lines" });
          
              about.lines.forEach(aline => {
                  var awrapper = document.createElement('div');
                  awrapper.style.overflow = 'hidden';
                  aline.parentNode.insertBefore(awrapper, aline);
                  awrapper.appendChild(aline);
              });
          
              gsap.from(about.lines, {
                  duration: 1,
                  y: 50,
                  autoAlpha: 0,
                  stagger: .15,
                  
                  ease: "power4.Out",
           
              });
        
          

            const arrow = document.querySelector("#arrow");
            if (arrow) {
                gsap.fromTo(arrow, { autoAlpha: 0, rotate: 360, y: 50 }, 
                            { rotate: 0, x: 0, autoAlpha: 1, y: 0, duration: 1, delay: 1, ease: "power1.out",
                              onComplete: () => arrow.setAttribute('trigger', 'loop') });
            }

            // 🌀 ScrollTrigger-linked animations هنا
            initScrollAnimations(); // ⬅️ دي دالة خارجية تحط فيها كل scrollTrigger بتاعك

            // 🧠 لازم دايمًا نعمل refresh
            ScrollTrigger.refresh();
        }, 100);
    });
}
function initScrollAnimations() {
    // كل مجموعة بناخدها بـ scroll parallax مميز
  // ✅ كل العناصر ما عدا .creation .software-item
const parallaxItems = document.querySelectorAll(".symbol, work a,.tech-item, .ex-text, .ex-btn .arrow, .agency, .film,.thumb, .software-item:not(.creation .software-item, .creation .ex-btn)");

parallaxItems.forEach((el) => {
    gsap.fromTo(el, {
        opacity: 0,
    }, {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 3,
        },
    });
});

// ✅ تأثير مخصص لـ .creation .software-item
const specialEl = document.querySelector(".creation .software-item");
if (specialEl) {
    gsap.fromTo(specialEl, {
        y: 0,
        scale: 1,
        opacity:0 ,
        transformPerspective: 1000,
    }, {
        rotateY: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: specialEl,
            start: "top 190%", // 👈 عشان هو آخر واحد
            end: "top 10%",
        },
    });
}

   
document.querySelectorAll(".note ,.wop").forEach(noteElement => {
    var note = new SplitText(noteElement, { type: "lines" });

    note.lines.forEach(line => {
        var wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
    });

    gsap.from(note.lines, {
        duration: 2,
        y: 10,
        autoAlpha: 0,
        stagger: .5,
        
        ease: "power4.inOut",
        transformOrigin: "center center",
        scrollTrigger: {
            trigger: noteElement,
            start: "top 100%", // 👈 عشان هو آخر واحد
            end: "bottom 80%",
            scrub:2
        }
    });
});

    

      
    ScrollTrigger.refresh();
}



function sectionNotFound() {
    Swal.fire({
        icon: "warning",
        title:  "This Section is not available right now!",
        text: "Go to The Graphic design section",
        iconColor: "white",
        color: "white",
        background: "black",
        showCancelIcon: true, // ✅ إضافة زر إلغاء
        confirmButtonText:  "Go Now",
        cancelButtonText: "Cancel",
        customClass: {
            popup: "custom-swal",
            confirmButton: "custom-button",
            cancelButton: "custom-cancel-button" // ✅ تطبيق ستايل مخصص لزر الإلغاء
        }
    }).then((result) => {
        if (result.isConfirmed) {
            barba.go("design.html"); // ✅ الانتقال بالاعتماد على Barba.js
        }
    });
}

// ScrollTrigger.create({
//     trigger: "#whiteSlides",
//     start: "top:0% ",  
//     onEnter: () => {
//       gsap.to("#butter", { backgroundColor: "#fff", duration: 0.5 });
//     },
//     onLeaveBack: () => {
//       gsap.to("#butter", { backgroundColor: "#000", duration: 0.5 }); // أو اللون القديم
//     }
//   });



  gsap.fromTo("#whiteSlides",{ 
    duration: 0.5 ,
    y:150,
    },
    {
        duration: 0.5 ,
        y:0,
    scrollTrigger:{
        trigger: "#whiteSlides",
        start: "top 90%",
        scrub: 1,
    }
    });


    function initCopyAndShareButtons() {
        // Copy Link
        const copyButtons = document.querySelectorAll(".copy-btn");
        copyButtons.forEach(btn => {
          btn.addEventListener("click", () => {
            const link = btn.getAttribute("data-link");
            navigator.clipboard.writeText(window.location.origin + "/" + link)
              .then(() => {
                btn.innerHTML = "Copied!";
                setTimeout(() => btn.innerHTML = `<i class="bi bi-link-45deg"></i>Link`, 2000);
              });
          });
        });
      
        // Share
        const shareButtons = document.querySelectorAll(".share-btn");
        shareButtons.forEach(btn => {
          btn.addEventListener("click", async () => {
            const link = window.location.origin + "/" + btn.getAttribute("data-link");
      
            Swal.fire({
              title: "Share via",
              background: "#000",
              color: "#fff",
              customClass: {
                popup: 'bordered-popup'
              },
              html: `
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 10px;">
                  <a href="https://wa.me/?text=${encodeURIComponent(link)}" target="_blank" title="واتساب">
                    <i class="fab fa-whatsapp" style="font-size: 28px; color: white;"></i>
                  </a>
                  <a href="https://t.me/share/url?url=${encodeURIComponent(link)}" target="_blank" title="تليجرام">
                    <i class="fab fa-telegram" style="font-size: 28px; color: white;"></i>
                  </a>
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}" target="_blank" title="فيسبوك">
                    <i class="fab fa-facebook" style="font-size: 28px; color: white;"></i>
                  </a>
                  <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}" target="_blank" title="تويتر">
                    <i class="fab fa-twitter" style="font-size: 28px; color: white;"></i>
                  </a>
                </div>
              `,
              showConfirmButton: false,
              showCloseButton: true,
              didOpen: () => {
                const copyBtn = document.getElementById("copyLinkBtn");
                if (copyBtn) {
                  copyBtn.addEventListener("click", async () => {
                    try {
                      await navigator.clipboard.writeText(link);
                      copyBtn.style.color = "lime";
                      copyBtn.title = "Copied";
                    } catch (err) {
                      copyBtn.style.color = "red";
                      copyBtn.title = "Failed";
                    }
                  });
                }
              }
            });
          });
        });
      }
      
      // أول مرة تتحمل الصفحة
      document.addEventListener("DOMContentLoaded", initCopyAndShareButtons);

    


  initAutoplayVideos()




//   const videosA = document.querySelectorAll(".videos a");

//   videosA.forEach((va) => {
//     gsap.fromTo(va, {
//         opacity: 0,
//         y:150,
//         duration:1,
//     }, {
//         opacity: 1,
//         duration: 1,
//         y:0,

//         ease: "power3.out",
//         scrollTrigger: {
//             trigger: va,
//             start: "top 150%",
//             end: "bottom 50%",
//             scrub: 3,
//         },
//     });
// });

function marque(){
  console.clear();

gsap.registerPlugin(ScrollTrigger);

const scrollingText = gsap.utils.toArray('.rail h4');

const tl = horizontalLoop(scrollingText, {
  repeat: -1,
});

let speedTween;

ScrollTrigger.create({
  trigger: ".scrolling-text",
  start: "top bottom",
  end: "bottom top",
  onUpdate: (self) => {
    speedTween && speedTween.kill();
    speedTween = gsap.timeline()
    .to(tl, {
      timeScale: 3 * self.direction,
      duration: 0.25
    })
    .to(tl, {
      timeScale: 1 * self.direction,
      duration: 1.5
    }, "+=0.5")
  },
})

/*
Observer.create({
  onChangeY(self) {
    let factor = 2.5;
    if (self.deltaY < 0) {
      factor *= -1;
    } 
    gsap.timeline({
      defaults: {
        ease: "none",
      }
    })
      .to(tl, { timeScale: factor * 2.5, duration: 0.2 })
      .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
  }
});
*/

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
  gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    }
  });
  gsap.set(items, {x: 0});
  totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
      .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex+1, vars);
  tl.previous = vars => toIndex(curIndex-1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}
}