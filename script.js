// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // 在移动端切换显示导航链接和操作按钮
                const isVisible = navLinks.style.display === 'flex';

                if (isVisible) {
                    navLinks.style.display = 'none';
                    navActions.style.display = 'none';
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                } else {
                    navLinks.style.display = 'flex';
                    navActions.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.width = '100%';
                    navLinks.style.backgroundColor = 'white';
                    navLinks.style.padding = '20px';
                    navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    navLinks.style.gap = '20px';

                    navActions.style.flexDirection = 'column';
                    navActions.style.position = 'absolute';
                    navActions.style.top = 'calc(100% + 200px)'; // 根据导航链接高度调整
                    navActions.style.left = '0';
                    navActions.style.width = '100%';
                    navActions.style.backgroundColor = 'white';
                    navActions.style.padding = '20px';
                    navActions.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';

                    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                }
            }
        });
    }

    // 窗口大小调整时重置菜单状态
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = '';
            navActions.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.width = '';
            navLinks.style.backgroundColor = '';
            navLinks.style.padding = '';
            navLinks.style.boxShadow = '';
            navLinks.style.gap = '';

            navActions.style.flexDirection = '';
            navActions.style.position = '';
            navActions.style.top = '';
            navActions.style.left = '';
            navActions.style.width = '';
            navActions.style.backgroundColor = '';
            navActions.style.padding = '';
            navActions.style.boxShadow = '';

            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // 解决方案轮播
    const solutionSlides = document.querySelectorAll('.solution-slide');
    const carouselDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;

    function updateCarousel() {
        // 隐藏所有幻灯片
        solutionSlides.forEach(slide => {
            slide.classList.remove('active');
        });

        // 显示当前幻灯片
        solutionSlides[currentSlide].classList.add('active');

        // 更新指示点
        carouselDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // 下一个幻灯片
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % solutionSlides.length;
            updateCarousel();
        });
    }

    // 上一个幻灯片
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + solutionSlides.length) % solutionSlides.length;
            updateCarousel();
        });
    }

    // 点击指示点切换幻灯片
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
        });
    });

    // 自动轮播（每5秒切换一次）
    let carouselInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % solutionSlides.length;
        updateCarousel();
    }, 5000);

    // 鼠标悬停时暂停自动轮播
    const carouselContainer = document.querySelector('.solution-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });

        carouselContainer.addEventListener('mouseleave', function() {
            carouselInterval = setInterval(function() {
                currentSlide = (currentSlide + 1) % solutionSlides.length;
                updateCarousel();
            }, 5000);
        });
    }

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // 浮动卡片动画
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        // 为每个卡片添加随机动画延迟
        const delay = Math.random() * 2;
        card.style.animationDelay = `${delay}s`;
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 忽略空链接或非锚点链接
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();

                // 计算偏移量（考虑固定导航栏）
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 页面加载动画
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);

    // 初始化页面不透明度
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});