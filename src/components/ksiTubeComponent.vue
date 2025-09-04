<template>
    <section id="ksi-lab">
        <div class="search" v-scroll-reveal="{ delay: 400, origin: 'bottom', container: '.app-box-content' }">
            <div class="glass ksi-lab-logo-container">
                <img src="../assets/img/ksi_lab.png" alt="KSI LAB">
            </div>
            <div class="input-search">
                <div class="form-group">
                    <input type="text" id="search" placeholder="" v-model="searchString" maxlength="5000"></input>
                    <label for="search">Pesquisar</label>
                </div>
                <button type="button" class="btn btn-primary" style="height: 60px;" v-on:click="search()">
                    <font-awesome-icon icon="magnifying-glass" />
                </button>
            </div>
        </div>
        <div class="videos-catalog" v-scroll-reveal="{ delay: 500, origin: 'bottom', container: '.app-box-content' }">
            <p class="primary-font" v-if="filteredResults.length > 0">{{ filteredResults.length }} resultados</p>
            <p class="primary-font" v-if="filteredResults.length == 0">Nenhum video encontrado</p>
            <div class="videos-container float">
                <div class="video glass hover" v-for="(video, index) in filteredResults" :key="index" v-on:click="showVideo(video)">
                    <img :src="video.thumbnail" loading="lazy" :alt="video.title">
                    <div class="video-informations">
                        <p class="primary-font" :title="video.title">{{ video.title }}</p>
                        <div class="video-subinformations">
                            <div class="user">
                                <img :src="video.user.image" loading="lazy" class="avatar" :alt="video.user.name">
                                <div class="user-informations">
                                    <p class="secondary-font">{{ video.user.name }}</p>
                                    <p class="secondary-font posted-in">{{ formatRelativeDate(video.date) }}</p>
                                </div>
                            </div>
                            <div class="video-statistics">
                                <div class="likes">
                                    <font-awesome-icon icon="thumbs-up" />
                                    <span>{{ video.statistics.likes }}</span>
                                </div>
                                <div class="views">
                                    <font-awesome-icon icon="eye" />
                                    <span>{{ video.statistics.views }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <videoModal :video="selectedVideo" @close="selectedVideo = null"></videoModal>
    </section>
</template>
<script>
import videoModal from "./videoModal.vue";

export default {
    data() {
        return {
            searchString: "",
            filteredResults: [],
            videos: [],
            selectedVideo: null
        }
    },
    components: {
        videoModal
    },
    methods: {
        search: function () {
            this.filteredResults = this.videos.filter((video) => {
                return (
                    video.title.includes(this.searchString.toLowerCase()) ||
                    video.description.includes(this.searchString.toLowerCase())
                )
            })
        },
        showVideo: function (video) {
            this.selectedVideo = video;
            this.api.get("utils/view-video/" + this.selectedVideo.id);
        },
        getVideos: function () {
            let self = this;

            this.api.get("utils/get-videos").then((response) => {
                self.videos = response.data.returnObj;
                self.filteredResults = response.data.returnObj;
            })            
        }
    },
    mounted: function () {
        setTimeout(() => {
            this.getVideos();
        }, 500)
    }
}
</script>
<style scoped>
.ksi-lab-logo-container {
    width: fit-content;
    padding: 0 var(--space-6);
    height: 60px;
    display: grid;
    place-items: center;

    & img {
        height: 40px;
    }
}

.search {
    width: fit-content;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: var(--space-6);
    flex-shrink: 0;
}

.input-search {
    display: flex;
    align-items: center;
    gap: var(--space-6);
}

.videos-catalog {
    display: flex;
    flex-direction: column;
    min-height: 0;
    position: relative;
    z-index: 1;

    & > p {
        margin-bottom: var(--space-4);
    }
}

.videos-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-6);
    padding-bottom: var(--space-10);
    flex-grow: 1;
    min-height: 0;
    overflow-y: auto;
    padding: var(--space-8) 0;
}

.video {
    width: 350px;
    padding: var(--space-6);
    display: grid;
    gap: var(--space-4);
    cursor: pointer;

    & img {
        width: 100%;
        min-height: 173.25px;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        background-color: white;
        border-radius: var(--radius-lg);
    }
}

.video-informations {
    display: grid;
    gap: var(--space-4);

    & > p {
        font-size: 16px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }
}

.avatar {
    width: 45px !important;
    height: 45px !important;
    min-width: 45px !important;
    min-height: 45px !important;
    object-fit: cover !important;
    background: var(--white) !important;
    border-radius: 50% !important;
}

.user, .video-subinformations, .video-statistics {
    display: flex;
    gap: var(--space-3);
    align-items: center;

    & .user-informations {
        text-align: left;
        line-height: 110%;

        & p:first-child {
            font-size: 16px;
        }

        & p:last-child {
            font-size: 12px;
        }
    }
}

.video-subinformations {
    justify-content: space-between;
}

.video-statistics {
    gap: var(--space-4);

    & > div {
        display: flex;
        align-items: center;
        gap: var(--space-1);
    }
}

@media (max-width: 768px) {
    .search {
        flex-direction: column;
    }
}
</style>