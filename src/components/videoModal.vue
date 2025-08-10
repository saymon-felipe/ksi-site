<template>
    <div class="modal-wrapper" :class="showModalClass">
        <div class="modal-container glass">
            <div class="modal-header">
                <div class="close-modal glass hover" v-on:click="$emit('close')">
                    <font-awesome-icon icon="xmark" />
                </div>
            </div>
            <div class="modal-body">
                <div class="video-wrapper" ref="videoContainer">
                    <div class="video-loading">
                        <div ref="videoloadingAnimation" id="video-loading-animation"></div>
                    </div>
                    <video ref="video" :src="video?.video" @timeupdate="updateProgress" @loadedmetadata="handleVideoLoaded(); setVideoDuration()"></video>
                    <div class="controls" ref="controls">
                        <div class="play-volume glass">
                            <button id="play-pause" class="hover">
                                <font-awesome-icon icon="play" v-on:click="videoState.playing = !videoState.playing" v-if="!videoState.playing" />
                                <font-awesome-icon icon="pause" v-on:click="videoState.playing = !videoState.playing" v-if="videoState.playing" />
                            </button>
                            <div class="volume-container">
                                <button id="volume" class="hover">
                                    <font-awesome-icon v-on:click="videoState.muted = !videoState.muted" icon="volume-high" v-if="videoState.volume >= 70 && !videoState.muted" />
                                    <font-awesome-icon v-on:click="videoState.muted = !videoState.muted" icon="volume-low" v-if="videoState.volume > 1 && videoState.volume < 70 && !videoState.muted" />
                                    <font-awesome-icon v-on:click="videoState.muted = !videoState.muted" icon="volume-off" v-if="videoState.volume == 1 && !videoState.muted" />
                                    <font-awesome-icon v-on:click="videoState.muted = !videoState.muted" icon="volume-xmark" v-if="videoState.muted" />
                                </button>
                                <div class="volume-range">
                                    <input type="range" class="custom-range" min="1" max="100" step="1" v-model="videoState.volume">
                                </div>
                            </div>
                        </div>
                        <div class="video-track glass">
                            <div class="custom-range-wrapper" ref="rangeWrapperRef" @mousedown="handleMouseDown">
                                <div class="custom-range-track">
                                    <div class="custom-range-buffer" :style="{ width: bufferProgress + '%' }"></div>
                                    <div class="custom-range-fill" :style="{ width: progress + '%' }"></div>
                                </div>
                                <div class="custom-range-thumb" :style="{ left: `calc(${progress}% - 10px)` }"></div>
                            </div>
                        </div>
                        <div class="fullscreen glass">
                            <button class="hover no-margin" v-on:click="toggleFullscreen()">
                                <font-awesome-icon :icon="fullscreen ? 'compress' : 'expand'" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="video-data-container" v-if="video">
                    <div class="user">
                        <img :src="video.user.image" loading="lazy" class="avatar" :alt="video.user.name">
                        <div class="user-informations">
                            <p class="secondary-font">{{ video.user.name }}</p>
                            <p class="secondary-font posted-in">{{ formatRelativeDate(video.date) }}</p>
                            <div class="views">
                                <font-awesome-icon icon="eye" />
                                <span>{{ video.statistics.views }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="video-informations">
                        <h2 class="primary-font">{{ video.title }}</h2>
                        <p class="secondary-font">{{ video.description }}</p>
                    </div>
                    <div class="video-statistics">
                        <button class="like btn btn-primary">
                            <font-awesome-icon icon="thumbs-up" />
                        </button>
                        <button class="deslike btn">
                            <font-awesome-icon icon="thumbs-down" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import lottie from "lottie-web";
import animationData from "../assets/animations/loading-video.json";

export default {
    props: ["video"],
    data() {
        return {
            showModalClass: "hide",
            videoState: {
                playing: false,
                volume: 70,
                muted: false
            },
            fullscreen: false,
            progress: 0,
            videoDuration: 0,
            isDragging: false,
            hideControlsTimer: null,
            bufferProgress: 0
        }
    },
    methods: {
        updateBufferProgress() {
            if (this.$refs.video && this.$refs.video.duration > 0) {
                const buffered = this.$refs.video.buffered;
                if (buffered.length > 0) {
                    // Pega o final do primeiro (e único) trecho carregado
                    this.bufferProgress = (buffered.end(0) / this.$refs.video.duration) * 100;
                }
            }
        },
        hideControls: function() {
            if (this.$refs.controls) {
                this.$refs.controls.style.opacity = 0;
                this.$refs.controls.style.pointerEvents = 'none';
            }
        },
        showControls: function() {
            if (this.$refs.controls) {
                this.$refs.controls.style.opacity = 1;
                this.$refs.controls.style.pointerEvents = 'auto';
            }
        },
        handleMouseMoveOnVideo: function() {
            clearTimeout(this.hideControlsTimer);
            this.showControls();
            this.hideControlsTimer = setTimeout(() => {
                this.hideControls();
            }, 3500);
        },
        toggleFullscreen: function () {
            let element = this.$refs.videoContainer;

            if (!document.fullscreenElement) {
                this.fullscreen = true;

                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) { 
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) { 
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            } else {
                this.fullscreen = false;
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { 
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { 
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { 
                    document.msExitFullscreen();
                }
            }
        },
        handleVideoLoaded: function () {
            let loading = document.querySelector(".video-loading");

            loading.style.opacity = 0;

            setTimeout(() => {
                loading.style.display = "none";    
            }, 400)
        },
        updateProgress() {
            if (this.isDragging) return;
            if (this.$refs.video && this.videoDuration > 0) {
                this.progress = (this.$refs.video.currentTime / this.videoDuration) * 100;
            }
        },
        setVideoDuration() {
            if (this.$refs.video) {
                this.videoDuration = this.$refs.video.duration;
            }
        },
        handleMouseDown(e) {
            e.preventDefault();
            this.isDragging = true;
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp); // Adicionar este listener
            this.handleMouseMove(e); 
        },
        handleMouseMove(e) {
            if (!this.isDragging || !this.$refs.rangeWrapperRef || !this.$refs.video) return;
            
            const rect = this.$refs.rangeWrapperRef.getBoundingClientRect();
            let newX = e.clientX - rect.left;

            if (newX < 0) newX = 0;
            if (newX > rect.width) newX = rect.width;

            const percentage = (newX / rect.width);
            this.progress = percentage * 100;

            if (this.videoDuration > 0) {
                this.$refs.video.currentTime = this.videoDuration * percentage;
            }
        },
        handleMouseUp() {
            this.isDragging = false;
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
        }
    },
    watch: {
        videoState: {
            handler() {
                if (this.videoState.playing) {
                    this.$refs.video.play();
                } else {
                    this.$refs.video.pause();
                }

                this.$refs.video.muted = this.videoState.muted;

                this.$refs.video.volume = (this.videoState.volume / 100);
            },
            deep: true
        },
        showModalClass: function () {
            let modalBody = document.querySelector(".modal-body");
            let loading = document.querySelector(".video-loading");

            if (this.showModalClass == "show") {
                setTimeout(() => {
                    modalBody.style.opacity = 1;
                }, 100)
            } else {
                loading.style.display = "grid";

                setTimeout(() => {
                    loading.style.opacity = 1;
                    
                    setTimeout(() => {
                        modalBody.style.opacity = 0;
                    }, 300)
                }, 1)
            }
        },
        video: function () {
            let wrapper = document.querySelector(".modal-wrapper");

            if (this.video) {
                wrapper.style.display = "grid";

                setTimeout(() => {
                    wrapper.style.opacity = 1;

                    setTimeout(() => {
                        this.showModalClass = "show";
                    }, 100)
                }, 10)
            } else {
                this.showModalClass = "hide";

                setTimeout(() => {
                    wrapper.style.opacity = 0;

                    setTimeout(() => {
                        wrapper.style.display = "none";
                    }, 400)
                }, 400)
            }
        }
    },
    mounted: function () {
        this.lottieAnimation = lottie.loadAnimation({
            container: this.$refs.videoloadingAnimation,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData
        });

        this.$refs.video.addEventListener('ended', () => {
            this.videoState.playing = false;
            this.$refs.video.currentTime = 0;
        });

        this.$refs.video.addEventListener('progress', this.updateBufferProgress);

        document.addEventListener('mouseup', this.handleMouseUp);

        if (this.$refs.videoContainer) {
            this.$refs.videoContainer.addEventListener('mousemove', this.handleMouseMoveOnVideo);
        }
    },
    beforeUnmount() {
        document.removeEventListener('mouseup', this.handleMouseUp);

        if (this.$refs.videoContainer) {
            this.$refs.videoContainer.removeEventListener('mousemove', this.handleMouseMoveOnVideo);
        }

        clearTimeout(this.hideControlsTimer);

        if (this.$refs.video) {
            this.$refs.video.removeEventListener('progress', this.updateBufferProgress);
        }
    }
}
</script>
<style scoped>
#video-loading-animation {
    width: 130px;
}

.close-modal {
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    color: var(--white);
    position: absolute;
    right: -1rem;
    top: -1rem;
}

.modal-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
    z-index: 999;
    transition: opacity 0.4s ease-in-out;
    opacity: 0;
    display: none;

    &.show .modal-container {
        width: 100%;
        height: 100%;
        opacity: 1;
    }

    &.hide .modal-container {
        width: 10%;
        height: 10%;
        opacity: 0;
    }
}

.modal-container {
    max-width: 95vw;
    max-height: 95vh;
    transition: all .8s ease-in-out;
    width: 10%;
    height: 10%;
    opacity: 0;
    position: relative;
    padding: var(--space-4);
}

.modal-body {
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    overflow-y: auto;
    transition: opacity 0.4s ease-in-out;
}

.video-loading {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: rgba(23, 81, 126, 0.3);
    backdrop-filter: blur(4px);
    position: absolute;
    z-index: 3;
    transition: opacity 0.4s ease-in-out;
}

.video-wrapper {
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    border-radius: 1.5rem;
    aspect-ratio: 16 / 9;
    overflow: hidden;

    & video {
        width: 100%;
        position: absolute;
        z-index: 1;
    }

    & .controls {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 2rem;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-6);
        transition: opacity 0.4s ease-in-out;
        padding: 0 var(--space-4);
    }
}

.play-volume, .volume-container, .fullscreen {
    display: flex;
    align-items: center;
    overflow: hidden;

    & button {
        background: none;
        color: var(--white);
        font-size: 2rem;
        border: none;
        cursor: pointer;
        padding: var(--space-3) var(--space-6);
        min-width: 80px;
        
        &:not(.no-margin):first-child {
            margin-left: var(--space-3);
        }
    }
}

.video-track {
    height: 53px;
    width: 50%;
    display: grid;
    place-items: center;
    padding-left: var(--space-3);
    padding-right: var(--space-8);
}

#volume {
    margin-right: var(--space-3);
}

.volume-container {
    width: fit-content;
    position: relative;

    &:hover .volume-range {
        max-width: 200px;
        padding-left: var(--space-3);
        padding-right: var(--space-8);
    }
}

.volume-range {
    transition: all 0.4s ease-in-out;
    max-width: 0px;
}

.video-data-container {
    display: grid;
    /* Define o layout padrão para telas maiores */
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas: "user info stats";
    gap: var(--space-6); /* Espaçamento entre os itens */
    align-items: center; /* Alinha verticalmente os itens */
    margin: var(--space-6) 0;
}

/* Atribui cada área de grade aos seus respectivos filhos */
.video-data-container > .user {
    grid-area: user;
}

.video-data-container > .video-informations {
    grid-area: info;
}

.video-data-container > .video-statistics {
    grid-area: stats;
}

@media (pointer: coarse) {
    .volume-container {
        display: none;
    }

    .play-volume {
        & button {
            margin: 0 !important;
        }
    }
}

@media (pointer: coarse) and (orientation: landscape) {
    .video-wrapper {
        width: initial !important;
        height: 70vh;
        margin: auto;
    }

    .modal-wrapper {
        height: 60vh;
    }
}

/* Media query para telas menores que 768px */
@media (max-width: 768px) {
    .video-data-container {
        /* Muda o layout para uma única coluna */
        grid-template-columns: 1fr;
        /* Define a nova ordem das áreas */
        grid-template-areas: 
            "info"
            "user"
            "stats";
    }

    .video-data-container {
        text-align: left;
    }

    .video-data-container > .user,
    .video-data-container > .video-informations,
    .video-data-container > .video-statistics {
        justify-self: start;
    }

    .volume-container {
        display: none;
    }

    .play-volume {
        & button {
            margin: 0 !important;
        }
    }
}

.user, .views, .video-statistics {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    line-height: 130%;
}

.video-track .custom-range-track {
    /* Mantenha o background para a parte não carregada */
    position: relative;
    width: 100%;
    height: 6px;
    background: #ccc;
    border-radius: 3px;
    overflow: hidden;
}

.video-track .custom-range-buffer {
    /* A nova barra de buffer */
    position: absolute;
    top: 0;
    left: 0;
    width: 0%; /* Será controlado pelo JS */
    height: 100%;
    background-color: #a0a0a0; /* Uma cor cinza mais escura */
    z-index: 1; /* Garante que fique abaixo do 'fill' */
}

/* O preenchimento do vídeo */
.video-track .custom-range-fill {
    position: absolute; /* Torna-o absoluto para ficar acima do buffer */
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #1a4d7d;
    border-radius: 3px;
    z-index: 2; /* Fica acima do buffer */
}

.video-track .custom-range-wrapper {
    height: 8px;
}
</style>