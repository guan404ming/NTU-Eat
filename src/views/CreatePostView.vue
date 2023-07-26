<template>
    <div>
        <ne-header></ne-header>
        <div class="container">
            <h1>撰寫貼文</h1>

            <div class="inputsection">
                <h2>地點</h2>
                <input :placeholder="this.name" disabled />
            </div>

            <div class="inputsection">
                <h2>標籤</h2>
                <multiselect mode="tags" :options="tagsOptions" :create-tag="true" :searchable="true" :max-width="145"
                    placeholder="拜託標一下🥺 " v-model="tags"></multiselect>
            </div>

            <div class="inputsection">
                <div class="title">
                    <h2 id="content">內文</h2>
                    <button @click="isMarkdown = true" v-if="!isMarkdown">
                        <span class="material-symbols-outlined">visibility</span>
                    </button>
                    <button @click="isMarkdown = false" v-if="isMarkdown">
                        <span class="material-symbols-outlined">visibility_off</span>
                    </button>
                </div>
                <textarea placeholder="推一下喝價的食物們" v-model="content" v-if="!isMarkdown"></textarea>
                <VueShowdown class="textarea" :markdown="content" v-if="isMarkdown" />
            </div>

            <div class="inputsection">
                <h2>添加照片</h2>

                <div :class="{ uploaded: isUploaded }" class="uploadarea">
                    <span class="material-symbols-outlined">add_photo_alternate</span>
                    <input type="file" accept=".png, .jpeg, .gif, .jpg" @change="handleUploadPicture($event)" multiple
                        class="image-picker" />
                </div>

                <Swiper :modules="modules" :pagination="{ clickable: true }" :class="{ uploaded: isUploaded }"
                    class="preview">
                    <swiper-slide v-for="src in link" :key="src.id"><img :src="src" /></swiper-slide>
                </Swiper>

                <div :class="{ uploaded: isUploaded }" class="controlbar">
                    <button style="visibility: hidden;">
                        <span class="material-symbols-outlined">add_photo_alternate</span>
                    </button>
                    <button>
                        <span class="material-symbols-outlined" @click="deletePicture">delete</span>
                    </button>
                </div>
            </div>

            <ne-go-button @click="handleCreatePost()" :class="{ uploaded: isUploaded }"></ne-go-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin: 20px;
    border: 1px solid #707070;
    border-radius: 20px;
    text-align: center;

    h1 {
        text-align: center;
        margin-top: 38px auto 28px auto;
    }

    h2 {
        &#content {
            display: inline;
        }

        margin: 0px auto 6px 11vw;
        text-align: left;
        font-size: 16px;
        line-height: 19px;
        color: #707070;
    }

    .inputsection {
        display: block;

        .title {
            text-align: left;

            button {
                border: none;
                background-color: #fff;
                vertical-align: middle;
                opacity: 0.8;
                padding-bottom: 2px;
                margin-left: 0px;

                &:hover {
                    cursor: pointer;
                    opacity: 1;
                }

                span {
                    display: inline;
                    text-align: left;
                    font-size: 16px;
                    color: #707070;
                    font-variation-settings: "FILL" 1;
                }
            }
        }

        .textarea,
        input,
        textarea {
            text-align: left;
            margin: 0 auto 16px auto;
            padding: 0 18px;
            height: 48px;
            width: 76vw;
            border: none;
            border-radius: 24px;
            background-color: #f4f4f4;
            font-size: 14px;
            position: relative;
        }

        textarea,
        .textarea {
            min-height: 32vh;
            padding-top: 12px;

            &::placeholder {
                line-height: 20px;
                letter-spacing: 0px;
                color: #707070;
            }
        }

        .textarea {
            overflow: scroll;
            margin-bottom: 20px;
            color: #707070;
            font-size: 14px;
            margin-bottom: 20px;

            :deep h1,
            h2,
            h3 {
                margin-top: 0px;
            }

            :deep ul {
                padding-left: 20px;
            }
        }

        .uploadarea {
            &.uploaded {
                display: none;
            }

            display: flex;

            span {
                display: inline;
                margin: auto 0px;
                transform: translateX(calc((100vw - 52px) * 0.38 + 50%));
                position: relative;
                z-index: -1;
                font-size: 12vw;
                color: #000;
            }

            input {
                height: 32vh;
                width: 76vw;
                transform: translateX(-6vw);
                position: relative;
                color: transparent;
                opacity: 0.9;
                cursor: pointer;

                &::-webkit-file-upload-button {
                    visibility: hidden;
                }
            }
        }

        .preview {
            z-index: 0;
            display: none;
            margin: 0 auto 16px auto;
            justify-content: stretch;
            align-content: center;
            height: 32vh;
            width: 76vw;
            border-radius: 24px;

            &::-webkit-scrollbar {
                display: none;
            }

            &.uploaded {
                display: flex;
            }

            img {
                display: inline;
                border-radius: 24px;
                object-fit: fit;
                height: 32vh;
                width: 76vw;
            }

            :deep .swiper-pagination-bullets {
                .swiper-pagination-bullet {
                    background-color: #c9c9c9;
                }
            }
        }

        .controlbar {
            z-index: 200;
            display: none;
            margin-left: calc(76% - 64px);
            text-align: right;
            transform: translateY(-64px);

            &.uploaded {
                display: inline-block;
            }

            button {
                border: 1px solid #707070;
                padding: 0px;
                text-decoration: none;
                border-radius: 50%;
                background-color: #000;
                margin-right: 8px;
                height: 32px;
                width: 32px;

                &:hover {
                    opacity: 0.8;
                    cursor: pointer;
                }

                span {
                    margin: 0 auto;
                    text-align: center;
                    vertical-align: middle;
                    font-size: 16px;
                    color: #f4f4f4;
                }
            }
        }

        .multiselect {
            background-color: #f4f4f4;
            margin: 0 auto 16px auto;
            width: 76vw;
            border: none;
            border-radius: 20px;

            :deep .multiselect-tags {
                margin: 0px;
                margin-top: 8px;
                padding-left: 16px;

                input {
                    background-color: #f4f4f4;
                    font-size: 14px;
                    vertical-align: middle;
                    margin-top: auto;
                    margin-bottom: auto;
                    transform: translateY(-2px);
                }

                .multiselect-tag {
                    border-radius: 24px;
                    margin: 0px 8px 8px 0px;
                    color: #575757;
                    font-family: Montserrat, Noto Serif TC;
                    font-weight: 800;
                    background-color: #ebdece !important;
                }
            }

            :deep .multiselect-dropdown {
                border-radius: 16px;
                color: #575757;
            }

            :deep .multiselect-placeholder {
                font-size: 14px;
                padding-left: 20px;
            }
        }
    }

    button {
        &.uploaded {
            transform: translateY(-32px);
            margin-bottom: -8px;
        }
    }
}
</style>

<script>
import NeHeader from "@/components/NeHeader.vue";
import NeGoButton from "@/components/NeGoButton.vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import { getApi, popup } from "@/GlobalSettings.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
    name: "CreatePost",
    components: {
        NeHeader,
        NeGoButton,
        Multiselect,
        Swiper,
        SwiperSlide,
    },

    setup() {
        const api = getApi();
        return {
            api,
            popup,
            modules: [Navigation, Pagination],
        };
    },

    created() {
        this.placeId = this.$route.query.placeId;
        this.name = this.$route.query.name
    },

    data() {
        return {
            isMarkdown: false,
            place: null,
            content: "",
            photo: [],
            link: [],
            isUploaded: false,
            postId: null,
            tags: [],
            tagsOptions: [
                { value: "公館商圈", label: "公館商圈" },
                { value: "一一八巷", label: "一一八巷" },
                { value: "溫州街", label: "溫州街" },
            ],
        };
    },

    methods: {
        handleUploadPicture(event) {
            const filelist = event.target.files;
            for (var i = 0; i < filelist.length; i++) {
                this.photo.push(filelist[i]);
                if (this.photo[i]) {
                    this.link.push(URL.createObjectURL(this.photo[i]));
                }
            }
            event.target.value = "";
            this.isUploaded = true;
        },

    handleCreatePost() {
      let loader = this.$loading.show()
      const _this = this;
      const tagsString = this.getTagsString();
      const postformdata = new FormData();
      postformdata.append("placeId", _this.place.placeId);
      postformdata.append("content", _this.content);
      postformdata.append("tags", tagsString);
      postformdata.append("isPublic", true);
      for (var i = 0; i < _this.photo.length; i++) {
        postformdata.append("photo[]", this.photo[i]);
      }

      _this.axios
        .post(_this.api + "post/create/", postformdata, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.state === "success") {
            this.findNewestPost();
            loader.hide()
            _this.popup("文章已成功發布", "現在查看", "success");
            this.setRedirection();
          } else {
            const errorMsg = res.data.error;
            console.log(errorMsg);
            loader.hide()
            _this.checkError(errorMsg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

        checkError(errorMsg) {
            // check placeId error
            if (
                errorMsg.placeId === "notFound" ||
                errorMsg.placeId === "zeroResult"
            ) {
                this.popup("無此地點", "重新選擇", "question");
            }
            if (errorMsg.placeId === "tooFar") {
                this.popup("此餐廳離學校太遠了", "重新選擇", "warning");
            }
            if (errorMsg.placeId === "other") {
                this.popup("伺服器問題", "請洽客服", "warning");
            }

            // check if input
            if (errorMsg.placeId === "noInput") {
                this.popup("請回上一頁選取地點", "確認", "question");
                var checkbutton = this.$swal.getConfirmButton();
                checkbutton.addEventListener("click", () => {
                    this.$router.push("/getplaceid");
                });
            }

            if (errorMsg.content === "noInput") {
                this.popup("請輸入內文", "確認", "question");
            }
            if (errorMsg.photo === "noInput") {
                this.popup("請上傳圖片", "確認", "question");
            }

            // check general error
            if (errorMsg.general === "unauthorised") {
                this.popup("請先登入小編帳號", "確認", "warning");
            }
            if (errorMsg.general === "ServerError") {
                this.popup("伺服器問題", "請洽客服", "warning");
            }
        },

        deletePicture() {
            this.photo = [];
            this.link = [];
            this.isUploaded = false;
        },

        getUserId() {
            const _this = this;
            _this.axios
                .get(_this.api + "user/info/", { withCredentials: true })
                .then((res) => {
                    if (res.data.state === "success") {
                        var userId = res.data.data.user.id;
                        return userId;
                    } else {
                        const errorMsg = res.data.error;
                        console.log(errorMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        findNewestPost() {
            const _this = this;
            const userId = this.getUserId();
            _this.axios
                .get(_this.api + "post/list/?orderby=CR_DATE_DESC&a=" + userId, {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.data.state === "success") {
                        this.postId = res.data.data.posts[0].postId;
                        console.log(this.postId);
                    } else {
                        const errorMsg = res.data.error;
                        console.log(errorMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        setRedirection() {
            var checkbutton = this.$swal.getConfirmButton();
            checkbutton.addEventListener("click", () => {
                this.$router.push("/post/" + this.postId);
            });
        },

        getTagsString() {
            let tagsString = "";
            this.tags.forEach((element) => {
                tagsString += element + " ";
            });
            return tagsString.substring(0, tagsString.length - 1);
        },
    },

    watch: {
        photo: function () {
            for (var i = 0; i < this.photo.length; i++) {
                this.photo.push(this.photo[i]);
                if (this.photo[i]) {
                    this.link.push(URL.createObjectURL(this.photo[i]));
                }
            }
        },
    },
};
</script>

