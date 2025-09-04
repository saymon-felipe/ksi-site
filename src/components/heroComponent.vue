<template>
    <section id="hero" class="hero-content">
        <h1 v-scroll-reveal="{ delay: 500, origin: 'bottom', container: '.app-box-content' }" class="prevent-flicker">
            <span class="secondary-font" style="transition: all 0.4s ease-in-out;">FORÇA DA INOVAÇÃO. IDEIAS DO FUTURO.</span>
            
            <Transition name="fade-slide" mode="out-in">
                <span v-if="isFirstTextVisible" class="primary-font" key="1" style="min-width: 100%;">
                   KINETIC SOLUTIONS. 
                </span>
                <span v-else class="primary-font" key="2" style="min-width: 100%;">
                   DIGITAL CONCEPTS.
                </span>
            </Transition>
        </h1>
        
        <div class="hero-buttons prevent-flicker" v-scroll-reveal="{ delay: 500, origin: 'top', container: '.app-box-content' }">
            <a href="#servicos" class="btn btn-primary bounce-repeat">ORÇAMENTO GRATUITO</a>
            <a href="#clientes" class="btn">VER CLIENTES</a>
        </div>
        
        <div class="customers-container float prevent-flicker" v-scroll-reveal="{ delay: 500, origin: 'left', container: '.app-box-content' }">
            <div class="images-group">
                <img src="../assets/img/clientes/solutto.png" loading="lazy" class="avatar" title="Solutto" alt="Solutto" />
                <img src="../assets/img/clientes/mokaly.png" loading="lazy" class="avatar" title="Mokaly" alt="Mokaly" />
                <img src="../assets/img/clientes/cademint.png" loading="lazy" class="avatar" title="Cademint" alt="Cademint" />
                <img src="../assets/img/clientes/agendaspro.png" loading="lazy" class="avatar" title="AgendasPro" alt="AgendasPro" />
                <img src="../assets/img/clientes/comprarapida.png" loading="lazy" class="avatar" title="Compra Rápida" alt="Compra Rápida" />
            </div>
            <p class="secondary-font">
                <span class="space">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                Sua visão nos move, nossa expertise te guia. Entregamos soluções dinâmicas para o ritmo do seu negócio, garantindo a confiança que você precisa para ir além.
            </p>
        </div>

        <div ref="lottieContainer" id="lottieContainer" v-scroll-reveal="{ delay: 500, origin: 'right', container: '.app-box-content' }"></div>
    </section>
</template>

<script>
import lottie from "lottie-web";
import animationData from "../assets/animations/sphere.json";

export default {
    data() {
        return {
            isFirstTextVisible: true,
            intervalId: null
        };
    },
    mounted() {
        this.intervalId = setInterval(() => {
            this.isFirstTextVisible = !this.isFirstTextVisible;
        }, 5000); // Alterna a cada 5 segundos

        this.lottieAnimation = lottie.loadAnimation({
            container: this.$refs.lottieContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData
        });
    },
    unmounted() {
        this.lottieAnimation.destroy();
        clearInterval(this.intervalId);
    }
};
</script>

<style scoped>
#lottieContainer {
  width: calc(15vw + 2rem);
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}

/* Transição de entrada e saída para o loop de texto */
.fade-slide-enter-active {
  transition: all 0.5s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.5s ease-in;
}

.fade-slide-enter-from {
  transform: translateX(-50%) translateY(20px);
  opacity: 0;
}

.fade-slide-leave-to {
  transform: translateX(-50%) translateY(-20px);
  opacity: 0;
}

.hero-content {
  max-width: 700px !important;
}

.hero-buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-6);
    margin: var(--space-10) 0;
}

.customers-container {
    text-align: justify;
    width: 100%;
    max-width: 300px;
    display: grid;
    gap: var(--space-8);
    position: absolute;
    bottom: 5rem;
    left: 3rem;
}

.images-group {
    margin-left: 1rem;
    
    & img {
        margin-left: -1rem;
        animation: bounce 6s ease-in-out infinite;
        transition: all 0.4s ease-in-out;

        &:hover {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
        }
    }
}

.images-group img:nth-child(1) {
    animation-delay: 0ms;
}

.images-group img:nth-child(2) {
    animation-delay: 100ms;
}

.images-group img:nth-child(3) {
    animation-delay: 200ms;
}

.images-group img:nth-child(4) {
    animation-delay: 300ms;
}

.images-group img:nth-child(5) {
    animation-delay: 400ms;
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    10% {
        transform: translateY(-10px);
    }

    20% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(0);
    }
}

.bounce-repeat {
    animation: bounce-repeat 6s ease-in-out infinite;
    animation-delay: 2s;
}

@keyframes bounce-repeat {
    0% {
        transform: translateY(0);
    }

    5% {
        transform: translateY(-7px);
    }

    10% {
        transform: translateY(2px);
    }

    15% {
        transform: translateY(-7px);
    }

    20% {
        transform: translateY(2px);
    }

    100% {
        transform: translateY(0);
    }
}

@media (max-width: 541px) {
    .customers-container {
        left: 0;
        right: 0;
        margin: auto;

        & p {
            text-align: center;
        }
        
        & .space {
            display: none;
        }

        .images-group {
            margin: auto;
            transform: translateX(15px);
        }
    }

    .hero-buttons {
        margin-top: var(--space-5);
    }
}
</style>