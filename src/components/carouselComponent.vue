<template>
    <section id="clientes">
        <div class="carrossel glass" v-scroll-reveal="{ delay: 700, origin: 'bottom', container: '.app-box-content' }">
            <div class="carousel-slides-container" :style="{ transform: `translateX(${slideTranslateX})` }">
                <a 
                    :href="cliente.link" 
                    target="_blank" 
                    v-for="(cliente, index) in clientes" 
                    :key="index"
                >
                    <div class="glass float icone">
                        <img :src="cliente.icone" loading="lazy" />
                    </div>
                    <div class="image-container">
                        <img :src="cliente.imagem" class="imagem"  loading="lazy" :alt="cliente.nome" />
                    </div>
                </a>
            </div>

            <div class="dots-container">
                <span 
                    v-for="(cliente, index) in clientes" 
                    :key="index"
                    :class="{ 'dot': true, 'active': index === currentSlideIndex }"
                    @click="jumpToSlide(index)"
                ></span>
            </div>

            <div class="responsive-navigation-buttons">
                <button class="glass button" v-on:click="prevSlide()">
                    <font-awesome-icon icon="angle-left" />
                </button>
                <button class="glass button" v-on:click="nextSlide()">
                    <font-awesome-icon icon="angle-right" />
                </button>
            </div>
            <div ref="lottieContainer2" class="glass button" id="lottieContainer2"></div>
        </div>
    </section>
</template>
<script>
import lottie from "lottie-web";
import animationData from "../assets/animations/pinch.json";

export default {
    props: ["clientes"],
    data() {
        return {
            currentSlideIndex: 0,
            lottieAnimation: null
        };
    },
    computed: {
        slideTranslateX() {
            // Calcula o valor do 'transform: translateX' para mover o carrossel
            return `${-100 * this.currentSlideIndex}%`;
        }
    },
    methods: {
        nextSlide() {
            // Avança para o próximo slide, voltando para o início se for o último
            this.currentSlideIndex = (this.currentSlideIndex + 1) % this.clientes.length;
        },
        prevSlide() {
            // Volta para o slide anterior, indo para o final se for o primeiro
            this.currentSlideIndex = (this.currentSlideIndex - 1 + this.clientes.length) % this.clientes.length;
        },
        jumpToSlide(index) {
            this.currentSlideIndex = index;
        }
    },
    mounted: function() {
        this.lottieAnimation = lottie.loadAnimation({
            container: this.$refs.lottieContainer2,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData,
            transparent: true
        });

        // Lógica do pinch-to-zoom (continua a mesma)
        const zoomElements = document.querySelectorAll('.imagem');
        const getDistance = (touch1, touch2) => {
            const dx = touch1.pageX - touch2.pageX;
            const dy = touch1.pageY - touch2.pageY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        zoomElements.forEach(element => {
            let initialPinchDistance = null;
            let currentImageWidth = 0;
            let currentImageHeight = 0;

            element.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    initialPinchDistance = getDistance(e.touches[0], e.touches[1]);
                    currentImageWidth = element.offsetWidth;
                    currentImageHeight = element.offsetHeight;

                    // Captura a proporção original
                    element.originalAspectRatio = currentImageWidth / currentImageHeight;

                    e.preventDefault();
                }
            }, { passive: false });

            element.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2 && initialPinchDistance !== null) {
                    const externalContainerWidth = document.querySelector(".carrossel").getBoundingClientRect().width;
                    const newPinchDistance = getDistance(e.touches[0], e.touches[1]);
                    const scaleFactor = newPinchDistance / initialPinchDistance;
                    const newWidth = currentImageWidth * scaleFactor;
                    const newHeight = newWidth / element.originalAspectRatio;
                    element.style.width = `${newWidth >= externalContainerWidth ? newWidth : externalContainerWidth}px`;

                    if (newWidth >= externalContainerWidth) {
                        element.style.height = `${newHeight}px`;
                    }
                    
                    e.preventDefault();
                }
            }, { passive: false });

            element.addEventListener('touchend', (e) => {
                if (e.touches.length < 2) {
                    initialPinchDistance = null;
                    currentImageWidth = element.offsetWidth;
                    currentImageHeight = element.offsetHeight;
                }
            });
        });
    }
}
</script>
<style scoped>
#lottieContainer2 {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 5rem;
    margin: auto;
    width: 60px;
    height: 60px;
    animation: reveal 4s ease infinite;
    opacity: 0;
    display: none;
    z-index: 11;
}

@keyframes reveal {
    0% {
        opacity: 0;
    }

    40% {
        opacity: 1;
    }

    80% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

.responsive-navigation-buttons {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & button {
        width: 70px;
        height: 70px;
        font-size: 1.2rem;
    }
}

.carrossel {
    width: calc(100% - 50px);
    height: 65vh;
    margin: auto;
    overflow: hidden;
    border-radius: 2rem;

    & .carousel-slides-container {
        width: 100%;
        height: 100%;
        transition: all 0.4s ease-in-out;
        display: flex;
    }

    & a, & .image-container {
        min-width: 100%;
        min-height: 100%;
        display: grid;
        position: relative;
    }

    & .image-container {
        height: 100%;
        place-items: center;
    }

    & img {
        object-fit: contain;
        box-shadow: var(--boxshadow-regular);
    }

    & .icone {
        position: absolute;
        top: 1rem;
        left: 1rem;
        padding: 1rem;
        z-index: 2;
        width: 200px;
        height: fit-content;
        object-fit: contain;
        display: grid;
        place-items: center;

        & img {
            width: 100%;
            box-shadow: none;
        }
    }
}

.dots-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: calc(100% - 200px);
    align-items: center;
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
    gap: 0.5rem;
    z-index: 10;
}

/* Estilo dos pontos (dots) */
.dot {
    width: 10px;
    height: 10px;
    background-color: var(--blue); /* Cor padrão */
    border-radius: 50%;
    transition: all 0.3s ease;
    cursor: pointer;
}

/* Estilo do ponto ativo */
.dot.active {
    background-color: var(--blue-low); /* Cor do ponto ativo */
    transform: scale(1.2);
}

@media (max-width: 768px) {
    .carrossel {
        width: 100%;

        & .image-container {
            overflow: auto;
        }

        & .imagem {
            max-height: 100%;
            width: 100%;
            max-width: unset;
            object-fit:unset;
        }
    }

    #lottieContainer2 {
        display: block;
    }
}
</style>