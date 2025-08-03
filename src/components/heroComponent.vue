<template>
    <div class="hero-content">
        <h1 v-scroll-reveal="{ delay: 500, origin: 'bottom' }">
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
        
        <div class="hero-buttons" v-scroll-reveal="{ delay: 500, origin: 'top' }">
            <button type="button" class="btn btn-primary bounce-repeat">ORÇAMENTO GRATUITO</button>
            <button type="button" class="btn">VER CLIENTES</button>
        </div>
        
        <div class="customers-container" v-scroll-reveal="{ delay: 500, origin: 'left' }">
            <div class="images-group">
                <img src="../assets/img/clientes/solutto.png" class="avatar" title="Solutto" alt="Solutto" />
                <img src="../assets/img/clientes/mokaly.png" class="avatar" title="Mokaly" alt="Mokaly" />
                <img src="../assets/img/clientes/cademint.png" class="avatar" title="Cademint" alt="Cademint" />
                <img src="../assets/img/clientes/agendaspro.png" class="avatar" title="AgendasPro" alt="AgendasPro" />
                <img src="../assets/img/clientes/comprarapida.png" class="avatar" title="Compra Rápida" alt="Compra Rápida" />
            </div>
            <p class="secondary-font">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Sua visão nos move, nossa expertise te guia. Entregamos soluções dinâmicas para o ritmo do seu negócio, garantindo a confiança que você precisa para ir além.
            </p>
        </div>
    </div>
</template>

<script>
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
    },
    unmounted() {
        clearInterval(this.intervalId);
    }
};
</script>

<style scoped>
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
  width: 95vw;
  max-width: 700px;
  text-align: center;

  & h1 {
    font-size: 2.7rem;
  }
}

.hero-buttons {
    display: flex;
    justify-content: center;
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
</style>