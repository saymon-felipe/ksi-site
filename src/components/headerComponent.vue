<template>
    <header>
        <nav>
            <div class="slide glass without-animation"></div>
            <ul>
                <li class="menu-item">Início</li>
                <li class="menu-item">Sobre</li>
                <li class="menu-item">Clientes</li>
                <li class="menu-item">Serviços</li>
                <li class="menu-item">Contato</li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
nav {
    position: relative; /* Essential for positioning the slide */
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1; /* Puts the slide behind the menu items */
    transition: all 0.4s ease-in-out;
}

ul {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    color: var(--black);
}

ul li {
    cursor: pointer;
    padding: 1rem;
    margin: 0 .2rem;
    position: relative; /* Ensures li elements are above the slide */
    z-index: 2; /* Ensures li elements are above the slide */
}
</style>

<script>
export default {
    mounted() {
        this.$nextTick(() => {
            const slide = this.$el.querySelector('.slide');
            const menuItems = this.$el.querySelectorAll('.menu-item');

            const updateSlidePosition = (element) => {
                console.log(element.offsetHeight)
                slide.style.width = `${element.offsetWidth}px`;
                slide.style.height = `${element.offsetHeight}px`;
                slide.style.transform = `translateX(${element.offsetLeft}px)`;
            };

            // Set initial position to "Home"
            const homeMenuItem = this.$el.querySelector('.menu-item:first-child');
            if (homeMenuItem) {
                updateSlidePosition(homeMenuItem);
            }

            menuItems.forEach(item => {
                item.addEventListener('click', (event) => {
                    updateSlidePosition(event.target);
                });
            });

            // Recalculate slide position on window resize
            window.addEventListener('resize', () => {
                const currentActiveItem = this.$el.querySelector('.menu-item.active') || homeMenuItem;
                if (currentActiveItem) {
                    updateSlidePosition(currentActiveItem);
                }
            });
        });
    }
}
</script>