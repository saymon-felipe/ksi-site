<template>
    <div class="hero-content">
        <h1 v-scroll-reveal="{ delay: 500, origin: 'bottom' }">
            <span class="secondary-font">FORÇA DA INOVAÇÃO. IDEIAS DO FUTURO.</span>
            <span class="primary-font" v-scroll-reveal="{ delay: 1000 }">KINETIC SOLUTIONS.</span>
        </h1>
        <div class="hero-buttons" v-scroll-reveal="{ delay: 500, origin: 'top' }">
            <button type="button" class="btn btn-primary">ORÇAMENTO GRATUITO</button>
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

}
</script>
<style scoped>
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
        transition: all 0.4s ease-in-out;

        &:hover {
            transform: translateX(-5px) scale(1.1);
            z-index: 10;
        }
    }
}
</style>