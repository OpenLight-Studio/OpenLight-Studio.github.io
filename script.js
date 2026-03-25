document.addEventListener("DOMContentLoaded", () => {
  // 1. 打字机效果
  const typewriterElement = document.getElementById("typewriter");
  const texts = [
    "Building BrightS Kernel...",
    "Designing D-- for Teens...",
    "Visualizing Data with FH Clac...",
    "OpenLight Studio: Est. 2022",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typeSpeed = 2000; // 停顿时间
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // 启动打字机
  setTimeout(type, 1000);

  // 2. 滚动显现动画 (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // 如果只需要动画一次，可以取消观察
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 观察所有带有 .fade-in 的元素
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });

  // 观察项目卡片 (自定义动画类名可根据需要扩展)
  document.querySelectorAll(".project-card").forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `all 0.6s ease-out ${index * 0.1}s`; // 阶梯延迟

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    cardObserver.observe(el);
  });

  // 3. 导航栏滚动效果
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(11, 12, 16, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
    } else {
      navbar.style.background = "rgba(11, 12, 16, 0.8)";
      navbar.style.boxShadow = "none";
    }
  });

  // 4. 平滑滚动锚点 (兼容旧浏览器)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
