<template>
    <div class="glass container">
        <div class="header" v-on:click="reset()">
            <font-awesome-icon icon="circle-arrow-left" />
            <h3 class="secondary-font">Enviar video</h3>
        </div>
        <div class="send-video" v-if="!videoPreviewUrl">
            <div class="send-button-container">
                <div class="send-button" v-on:click="triggerUploadInput()">
                    <font-awesome-icon icon="cloud-arrow-up" />
                    <h3 class="secondary-font">Clique para enviar um video</h3>
                </div>
                <input type="file" style="display: none;" id="videoInput" @change="handleSendVideoToUpload" accept="video/mp4">
            </div>
        </div>
        <div class="upload" v-else>
            <div class="video-data">
                <form @submit.prevent="upload()">
                    <h3 class="primary-font">Detalhes</h3>
                    <div class="form-group">
                        <input type="text" placeholder="" id="title" v-model="videoTitle" maxlength="100" required>
                        <label for="title">Título</label>
                    </div>
                    <div class="form-group textarea">
                        <textarea id="description" placeholder="" v-model="videoDescription" required></textarea>
                        <label for="description">Descrição</label>
                    </div>
                    <div class="form-group">
                        <h3 class="primary-font">Miniatura</h3>
                        <input type="text" id="thumbnail" required v-model="thumbnailSrc" style="width: 1px; height: 1px; padding: 0; opacity: 0;">
                        <div class="thumbnail-container" v-if="!thumbnailSrc">
                            <input type="file" style="display: none;" id="thumbnailInput" @change="handleSendVideoThumbnail" accept="image/jpeg, image/png">
                            <font-awesome-icon icon="upload" v-on:click="triggerUploadThumbnail()" />
                        </div>
                        <div class="thumbnail" v-else>
                            <div class="remove-button hover glass">
                                <font-awesome-icon icon="xmark" v-on:click="thumbnailSrc = null" />
                            </div>
                            <img :src="thumbnailSrc">
                        </div>
                    </div>
                    <button type="submit" style="display: none;" id="submit-form"></button>             
                </form>
                <video :src="videoPreviewUrl" controls></video>
            </div>
            <button type="button" class="btn btn-primary" v-on:click="handleSubmitUpload()">Confirmar envio</button>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            videoPreviewUrl: null,
            videoTitle: "",
            videoDescription: "",
            thumbnailSrc: null,
            videoFile: null,
            thumbnailFile: null
        }
    },
    methods: {
        reset: function () {
            this.videoPreviewUrl = null;
            this.videoTitle = "";
            this.videoDescription = "";
            this.thumbnailSrc = null;
            this.videoFile = null;
            this.thumbnailFile = null;
        },
        handleSendVideoThumbnail: function (event) {
            const file = event.target.files[0];
            
            if (file && file.type.startsWith('image/')) {
                this.thumbnailFile = file;
                this.thumbnailSrc = URL.createObjectURL(file);
            }
        },
        triggerUploadThumbnail: function () {
            document.getElementById("thumbnailInput").click();
        },
        handleSubmitUpload: function () {
            document.getElementById("submit-form").click();
        },
        triggerUploadInput: function () {
            document.getElementById("videoInput").click();
        },
        handleSendVideoToUpload: function (event) {
            const file = event.target.files[0];
            
            if (file && file.type.startsWith('video/')) {
                // Guarda o objeto File do vídeo
                this.videoFile = file;
                // Cria e guarda a URL de pré-visualização
                this.videoPreviewUrl = URL.createObjectURL(file);
            } else {
                this.videoPreviewUrl = null;
                this.videoFile = null;
            }
        },
        async upload() {
            // Verifica se todos os campos estão preenchidos
            if (!this.videoTitle || !this.videoDescription || !this.thumbnailFile || !this.videoFile) {
                alert("Por favor, preencha todos os campos e selecione os arquivos.");
                return;
            }
            
            // Cria uma nova instância de FormData
            const formData = new FormData();
            
            // Adiciona todos os dados ao FormData
            formData.append("thumbnail", this.thumbnailFile);
            formData.append("video", this.videoFile);
            formData.append("title", this.videoTitle);
            formData.append("description", this.videoDescription);

            try {
                // Envia a requisição
                const response = await this.api.post("utils/videos", formData, {
                    // O axios detecta automaticamente o 'Content-Type' como 'multipart/form-data'
                });
                
                // Trata a resposta de sucesso
                console.log("Upload bem-sucedido:", response.data);
                alert("Vídeo enviado com sucesso!");
                this.reset(); // Limpa o formulário após o sucesso
                
            } catch (error) {
                // Trata os erros
                console.error("Erro no upload:", error.response.data);
                alert("Ocorreu um erro ao enviar o vídeo.");
            }
        }
    },
    beforeUnmount() {
        if (this.videoPreviewUrl) {
            URL.revokeObjectURL(this.videoPreviewUrl);
        }
        if (this.thumbnailSrc) {
            URL.revokeObjectURL(this.thumbnailSrc);
        }
    }
}
</script>
<style scoped>
.container {
    padding: var(--space-6);
    height: 100%;
}

.send-video {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    align-items: center;
    gap: var(--space-5);

    & svg {
        font-size: 2rem;
    }
}

.send-button-container {
    display: grid;
    place-items: center;
    flex-grow: 1;

    & .send-button {
        width: fit-content;
        height: fit-content;
        margin: auto;
        cursor: pointer;
        gap: var(--space-6);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    & svg {
        font-size: 4rem;
        color: var(--blue);
    }
}
</style>
<style scoped>
.header {
    cursor: pointer;
}

.upload {
    display: grid;
    place-items: end;
    gap: var(--space-6);
}

.video-data {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    width: 100%;

    & form {
        flex-grow: 1;
    }

    & video {
        width: 400px;
        border-radius: 1rem;
        overflow: hidden;
    }

    & img {
        width: 200px;
        border-radius: 20px;
    }
}

.primary-font {
    margin: var(--space-6) 0 var(--space-3) 0;
}

.thumbnail-container {
    & svg {
        color: var(--blue);
        cursor: pointer;
        font-size: 2rem;
    }
}

.thumbnail {
    position: relative;
    width: fit-content;
}

.remove-button {
    position: absolute;
    top: var(--space-3);
    right: var(--space-3);
    width: fit-content;
    cursor: pointer;
    z-index: 2;
}
</style>