<template>
    <section id="servicos">
        <div class="servicos text-left float" :class="list ? 'show' : 'hide'">
            <div class="title" v-scroll-reveal="{ delay: 400, origin: 'bottom', container: '.app-box-content' }">
                <h1 class="primary-font"><span class="blue">P</span>REPARE-SE PARA DECOLAR</h1>
                <p class="secondary-font">Selecione um serviço</p>
            </div>
            <ul v-scroll-reveal="{ delay: 800, origin: 'bottom', container: '.app-box-content' }">
                <li class="glass hover" v-on:click="select('web')">
                    <font-awesome-icon icon="globe" />
                    <span class="primary-font">CONSULTORIA WEB</span>
                </li>
                <li class="glass hover" v-on:click="select('mobile')">
                    <font-awesome-icon icon="mobile" />
                    <span class="primary-font">APLICATIVOS</span>
                </li>
                <li class="glass hover" v-on:click="select('outros')">
                    <font-awesome-icon icon="question" />
                    <span class="primary-font">OUTROS</span>
                </li>
            </ul>
        </div>
        <div class="formulario text-left float" :class="form ? 'show' : 'hide'">
            <div class="title">
                <h1 class="primary-font"><span class="blue">P</span>REPARE-SE PARA DECOLAR</h1>
                <p class="secondary-font">Preencha as informações</p>
            </div>
            <form @submit.prevent="sendContact()">
                <div class="two-inputs">
                    <div class="form-group">
                        <input type="text" placeholder="" id="name" v-model="name" maxlength="100" required>
                        <label for="name">Nome</label>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="" id="email" v-model="email" maxlength="100" required>
                        <label for="email">Email</label>
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" placeholder="" v-model="tel" id="tel" v-maska  data-maska="['(##) ####-####', '(##) # ####-####']" required>
                    <label for="tel">Telefone</label>
                </div>
                <div class="form-group textarea">
                    <textarea id="obs" placeholder="" v-model="obs" required></textarea>
                    <label for="obs">Conte-nos sobre sua ideia</label>
                </div>
                <button type="submit" class="btn btn-primary">Soliçitar orçamento</button>
            </form>
        </div>
        <div class="obrigado float text-center" :class="thanks ? 'show' : 'hide'">
            <div ref="thanks" id="thanks"></div>
            <p class="primary-font">Obrigado!</p>
            <span class="secondary-font">Nossa equipe já recebeu o seu contato e iremos responder em breve.</span>
        </div>
    </section>
</template>
<script>
import lottie from "lottie-web";
import animationData from "../assets/animations/thanks.json";

export default {
    data() {
        return {
            list: true,
            form: false,
            thanks: false,
            name: "",
            email: "",
            tel: "",
            obs: ""
        }
    },
    mounted: function () {
        this.lottieAnimation = lottie.loadAnimation({
            container: this.$refs.thanks,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData
        });
    },
    methods: {
        sendContact: function () {
            let data = {
                name: this.name,
                email: this.email,
                tel: this.tel.replace(/\D/g, ""),
                obs: this.obs,
                requestType: this.requestType
            }

            console.log("data: ", data);

            this.list = false;
            this.form = false;
            this.thanks = true;

            setTimeout(() => {
                this.list = true;
                this.form = false;
                this.thanks = false;
            }, 10 * 1000)
        },
        select: function (type) {
            this.list = false;
            this.form = true;
            this.requestType = type;
        }
    }
}
</script>
<style scoped>
#thanks {
  width: 20rem;
}

#servicos {
    position: relative;
}

.servicos, .formulario, .obrigado {
    width: 100%;
    max-width: 500px;
    margin: auto;
    margin-right: 15vw;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-right: 15vw;
    height: fit-content;
    transition: all 0.4s ease-in-out;
}

.obrigado {
    display: grid;
    place-items: center;

    & p {
        font-size: 2rem;
    }

    & span {
        font-size: 1.2rem;
    }
}

.formulario, .obrigado {
    margin-right: 10vw;

    & form {
        margin: var(--space-8) 0;
        display: grid;
        place-items: center;

        & button {
            width: 100%;
            margin-top: 1rem;
        }
    }
}

ul {
    margin: var(--space-8) 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: var(--space-6);

    & li {
        padding: var(--space-5);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--space-3);

        & svg {
            font-size: 1.2rem;
        }

        & span {
            transition: transform 0.4s ease-in-out;
        }

        &:hover span {
            transform: translateX(10px);
        }
    }
}

.show {
    margin-right: 15vw;
    opacity: 1;
    z-index: 10;
}

.hide {
    margin-right: 20vw;
    opacity: 0;
    z-index: 9;
}

@media (max-width: 768px) {
    .servicos, .formulario, .obrigado {
        margin-right: auto;
    }
}
</style>