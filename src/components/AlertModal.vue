<template>
    <transition name="modal-fade">
        <div class="alert-modal-overlay" v-if="isVisible" @click.self="closeModal">
            <div class="alert-modal-container glass">
                <div class="alert-modal-content">
                    <p>{{ message }}</p>
                    <div class="close-alert-modal glass hover" @click="closeModal">
                        <font-awesome-icon icon="xmark" />
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.alert-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    z-index: 1000;
}

.alert-modal-container {
    padding: var(--space-6);
    border-radius: 1rem;
    max-width: 80%;
    min-width: 300px;
    position: relative;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    animation: bounceIn 0.3s ease-out;
}

.alert-modal-content {
    color: var(--white);
    text-align: center;
    font-size: 1.2rem;
    position: relative;
}

.close-alert-modal {
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    font-size: 1.2rem;
    color: var(--white);
    position: absolute;
    right: -2rem;
    top: -2rem;
    border-radius: 50%;
}

.modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
}

@keyframes bounceIn {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
</style>
