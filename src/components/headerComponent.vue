<template>
    <header>
        <nav>
            <ul>
                <li>Clientes</li>
                <li>Serviços</li>
                <li>Sobre nós</li>
            </ul>
        </nav>
        <div class="logo">
            <div class="corner-suavization-bottom-left"></div>
            <div class="corner-suavization-bottom-right"></div>
            <div class="corner-suavization-top-left"></div>
            <div class="corner-suavization-top-right"></div>
            <a href="/">
                <img src="../assets/img/ksi.png" loading="lazy" alt="KSI - Kinetic Solutions"></img>
            </a>
        </div>
        <div>&nbsp;</div>
        <div class="right-content">
            <span>Login</span>
            <button type="button" class="btn btn-primary">Cadastre-se</button>
        </div>
    </header>
</template>
<script>
export default {
    mounted() {
        
    }
}
</script>
<style scoped>
header {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: Ethnocentric;
    height: 53px;

    & nav {
        position: relative;
        z-index: 2;
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        margin-top: var(--space-3);

        & ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            list-style-type: none;
            gap: var(--space-3);

            & li {
                margin: 0 var(--space-3);
            }
        }
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
        margin-top: var(--space-3);
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
            left: -98px; /* Ajuste para o ângulo */
            width: 100px;
            height: 100%;
            background-color: #ACC4D7; /* Cor mais escura para o chanfro */
            transform: skewX(39deg); /* Ângulo para o chanfro esquerdo */
            transform-origin: top left;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: -98px; /* Ajuste para o ângulo */
            width: 100px;
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
                border-radius: 22px;
                width: 35px;
                height: 40px;
                position: absolute;
                top: -1px;
                left: -61px;
                z-index: 2;
                transform: skewX(34deg);
            }

            &::after {
                content: "";
                background: #dde8f0;
                border-radius: 50%;
                width: 25px;
                height: 25px;
                position: absolute;
                top: -17px;
                left: -52px;
                z-index: 1;
            }
        }

        & .corner-suavization-top-right {
            &::before {
                left: initial;
                right: -61px;
                transform: skewX(-34deg);
            }

            &::after {
                left: initial;
                right: -52px;
            }
        }
    }
}
</style>