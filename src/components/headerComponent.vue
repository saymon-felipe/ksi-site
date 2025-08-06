<template>
    <header>
        <nav v-scroll-reveal="{ delay: 500, origin: 'top' }" class="menu">
            <ul>
                <li>Clientes</li>
                <li>Serviços</li>
                <li>Sobre nós</li>
                <li>KSI LAB</li>
            </ul>
        </nav>
        <div class="logo">
            <div class="corner-suavization-bottom-left"></div>
            <div class="corner-suavization-bottom-right"></div>
            <div class="corner-suavization-top-left"></div>
            <div class="corner-suavization-top-right"></div>
            <a href="/">
                <img src="../assets/img/ksi.png" v-scroll-reveal="{ delay: 500, origin: 'top' }" loading="lazy" alt="KSI - Kinetic Solutions"></img>
            </a>
        </div>
        <div>&nbsp;</div>
        <font-awesome-icon icon="bars" class="menu-responsive-button" v-on:click="showMenu = !showMenu" />
        <div class="right-content menu" v-scroll-reveal="{ delay: 500, origin: 'top' }">
            <span>Login</span>
            <button type="button" class="btn btn-primary">Cadastre-se</button>
        </div>
        <div class="responsive-menu-wrapper" v-on:click="showMenu = false" v-if="showMenu"></div>
        <div class="responsive-menu" :class="menuState">
            <ul>
                <li>Clientes</li>
                <li>Serviços</li>
                <li>Sobre nós</li>
                <li>KSI LAB</li>
                <li>
                    <span>Login</span>
                    <button type="button" class="btn btn-primary">Cadastre-se</button>
                </li>
            </ul>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            showMenu: false,
            menuState: ""
        }
    },
    watch: {
        showMenu: {
            handler() {
                if (this.showMenu) {
                    this.menuState = "open";
                } else {
                    this.menuState = "close";
                }
            },
            immediate: false
        }
    },
    mounted() {
        
    }
}
</script>
<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
    gap: var(--space-3);

    & li {
        margin: 0 var(--space-3);
        cursor: pointer;
    }
}

header {
    position: fixed;
    width: calc(100vw - 2.4rem);
    border-radius: 2rem 2rem 0 0;
    top: 1.2rem;
    left:  1.2rem;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: Ethnocentric;
    height: 84px;
    backdrop-filter: blur(5px);
    z-index: 9;

    & nav {
        position: relative;
        z-index: 2;
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
    }

    & .right-content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-6);
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
    }

    & a {
        padding: 0;
        line-height: 83%;

        &:hover {
            background: none;
            color: none;
        }

        & img {
            width: 100px;
            height: 32.61px;
            cursor: pointer;
        }
    }

    & .logo {
        background: #dde8f0;
        width: 25.5%;
        min-width: 200px;
        display: flex;
        justify-content: center;
        padding-bottom: var(--space-6);
        position: absolute;
        left: 0;
        right: 0;
        z-index: 1;
        margin: auto;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -44px;
            width: 45px;
            height: 100%;
            background-color: #ACC4D7; /* Cor mais escura para o chanfro */
            transform: skewX(39deg); /* Ângulo para o chanfro esquerdo */
            transform-origin: top left;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: -44px; /* Ajuste para o ângulo */
            width: 45px;
            height: 100%;
            background-color: #ACC4D7; /* Cor mais escura para o chanfro */
            transform: skewX(-39deg); /* Ângulo para o chanfro esquerdo */
            transform-origin: top left;
        }

        & .corner-suavization-bottom-left, & .corner-suavization-bottom-right {
            width: calc(100% - 90px);
            height: 100%;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;

            &::before {
                content: "";
                background: #ACC4D7;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                position: absolute;
                bottom: -10px;
                left: -10px;
            }

            &::after {
                content: "";
                background: #dde8f0;
                border-radius: 16px;
                transform: skewX(39deg);
                width: 20px;
                height: 20px;
                position: absolute;
                bottom: 0;
                left: -8px;
            }
        }

        & .corner-suavization-bottom-right {
            &::before {
                right: -10px;
                left: initial;
            }

            &::after {
                transform: skewX(-39deg);
                right: -8px;
                left: initial;
            }
        }

        & .corner-suavization-top-left, & .corner-suavization-top-right {
            width: calc(100% - 90px);
            height: 100%;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;

            &::before {
                content: "";
                background: #ACC4D7;
                border-radius: 113px;
                width: 43px;
                height: 40px;
                position: absolute;
                top: 0;
                left: -69px;
                z-index: 2;
                transform: skewX(34deg);
            }

            &::after {
                content: "";
                background: #dde8f0;
                border-radius: 50%;
                width: 40px;
                height: 30px;
                position: absolute;
                top: -7px;
                left: -65px;
                z-index: 1;
            }
        }

        & .corner-suavization-top-right {
            &::before {
                left: initial;
                right: -69px;
                transform: skewX(-34deg);
            }

            &::after {
                left: initial;
                right: -65px;
            }
        }
    }
}

.menu-responsive-button {
    display: none;
    z-index: 10;
    position: absolute;
    right: 1.5rem;   
    top: 1.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 12;
}

.responsive-menu-wrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 11;
}

.responsive-menu {
    z-index: 12;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px) saturate(180%);
    width: calc(100vw - 2.4rem);
    position: absolute;
    max-height: 300px;
    height: fit-content;
    top: 216px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 2rem;
    place-items: start;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 2rem;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2), 
                inset 0 4px 20px rgba(255, 255, 255, 0.3);

    width: 0;
    max-height: 0;
    opacity: 0;

    & ul {
        display: grid;
        place-items: start;
        padding: 0;
        transition: opacity .6s ease-in-out;
        opacity: 0;

        & li {
            display: grid;
            place-items: start;
            gap: var(--space-5);

            &:last-child {
                margin-top: var(--space-6);
            }
        }
    }

    &.close {
        animation: close 1s ease-in-out forwards;

        & ul {
            opacity: 0;
        }
    }

    &.open {
        animation: open 1s ease-in-out forwards;

        & ul {
            transition-delay: .8s;
            opacity: 1;
        }
    }
}

@keyframes open {
    0% {
        width: 0;
        max-height: 0;
        opacity: 0;
    }

    30% {
        opacity: 1;
    }

    100% {
        width: calc(100vw - 2.4rem);
        max-height: 300px;
        opacity: 1;
    }
}

@keyframes close {
    0% {
        width: calc(100vw - 2.4rem);
        max-height: 300px;
        opacity: 1;
    }

    /*50% {
        width: 0;
        max-height: 300px;
    }*/

    70% {
        opacity: 1;
    }

    100% {
        width: 0;
        max-height: 0;
        opacity: 0;
    }
}

@media (max-width: 896px) {
    header {
        backdrop-filter: none !important;
    }

    .menu {
        display: none !important;
    }

    .menu-responsive-button {
        display: block;
    }
}

@media (max-width: 768px) {
    .logo {
        &::before {
            left: -26px !important;
            width: 28px !important;
        }

        &::after {
            right: -26px !important;
            width: 28px !important;
        }

        & .corner-suavization-bottom-left {
            &::before {
                width: 76px !important;
                height: 25px !important;
                bottom: -7px !important;
                left: -63px !important;
                transform: skew(-20deg, 20deg) !important;
            }
        }

        & .corner-suavization-bottom-right {
            &::before {
                width: 76px !important;
                height: 25px !important;
                bottom: -7px !important;
                right: -63px !important;
                transform: skew(20deg, -20deg) !important;
            }
        }
    }
}
</style>