<template>
    <section id="clientes">
        <h1 class="primary-font text-center" v-scroll-reveal="{ delay: 400, origin: 'bottom', container: '.app-box-content' }"><span class="blue">C</span>LIENTES</h1>
        <carouselComponent :clientes="clientes"></carouselComponent>
    </section>
</template>
<script>

import carouselComponent from "./carouselComponent.vue";

export default {
    components: {
        carouselComponent
    },
    data() {
        return {
            clientes: [
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/agendaspro_otimizada.webp",
                    nome: "AgendasPRO",
                    link: "https://agendaspro.com/",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/agendaspro-logo.png"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/agendaspro-sistema_otimizada.webp",
                    nome: "Sistema AgendasPRO",
                    link: "https://dev.agendaspro.com/",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/agendaspro-logo.png"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/comprarapida-app_otimizada.webp",
                    nome: "Compra Rápida",
                    link: "",
                    icone: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/comprarapida-logo.webp"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/portal-aluno-thumb_otimizada.webp",
                    nome: "Solutto - Educacional",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/solutto-logo.png",
                    link: "https://solutto.com.br/segmento-franquia-educacional.aspx"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/portal-aluno-2-thumb_otimizada.webp",
                    nome: "Solutto - Educacional",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/solutto-logo.png",
                    link: "https://solutto.com.br/segmento-franquia-educacional.aspx"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/solutto-thumb_otimizada.webp",
                    nome: "Solutto - ERP para franquias",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/solutto-logo.png",
                    link: "https://solutto.com.br/"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/mokaly-thumb_otimizada.webp",
                    nome: "Mokaly",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/mokaly-logo.png",
                    link: "https://mokaly.com/"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/sistema-mokaly-thumb_otimizada.webp",
                    nome: "Mokaly - Sistema",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/mokaly-logo.png",
                    link: "https://mokaly.com/"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/cda-thumb_otimizada.webp",
                    nome: "CDA - Feito por KSI",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/ksi.png",
                    link: "https://kineticsolutions.com.br/"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/cademint-thumb_otimizada.webp",
                    nome: "Cademint",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/cademint-logo.png",
                    link: "https://cademint.netlify.app/"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/cademint-system_otimizada.webp",
                    nome: "Sistema Cademint",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/cademint-logo.png",
                    link: "https://app-cademint.netlify.app/"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/gourmetech_otimizada.webp",
                    nome: "Gourmetech",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/logo-gourmetech.svg",
                    link: "https://dev-gourmetech.netlify.app/"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/yuume_otimizada.webp",
                    nome: "Yuume",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/logo.png",
                    link: "https://yuume.netlify.app"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/ieq-farol-thumbs_otimizada.webp",
                    nome: "IEQ - Farol",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/ieq-farol-logo.png",
                    link: "https://ieq-farol.netlify.app/"
                },
                {
                    imagem: "https://kineticsolutions.s3.sa-east-1.amazonaws.com/saymon-felipe-thumb_otimizada.webp",
                    nome: "Saymon Felipe - Portfólio",
                    icone: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/ksi.png",
                    link: "https://saymon-felipe.netlify.app/"
                }
            ]
        }
    },
    
}
</script>
