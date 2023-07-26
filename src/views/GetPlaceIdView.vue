<template>
    <ne-header></ne-header>
    <div class='container'>

        <h1>選擇地點</h1>

        <div id="app">
            <div id="map">
                <button @click="initMap">打開地圖，選取地點</button>
            </div>
            <div id="info-block-content">
                <img id="place-icon" :src="placeSelector.icon" />
                <span id="place-name" class="title">{{ placeSelector.name }}</span><br />
                <span id="place-address">{{ placeSelector.address }}</span>
            </div>
        </div>

        <ne-go-button @click="redirection()"></ne-go-button>
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

    #map {
        display: block;
        margin: auto 20px;
        height: 50vh;
        background-color: #F4F4F4;

        button {
            margin: 25vh auto;
            border: none;
            background-color: #F4F4F4;
            width: 50%;
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 20px;
            text-align: center;
            line-height: 30px;
            color: #000000;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
        }
    }

    #info-block-content {
        display: block;
        margin-top: 20px;

        #place-icon {
            height: 16px;
            width: 16px;
            margin-right: 10px;
            transform: translateY(2px);
        }
    }
}
</style>

<script>

import NeHeader from '@/components/NeHeader.vue'
import NeGoButton from '@/components/NeGoButton.vue'
import { popup } from '@/GlobalSettings.js'
var script = document.createElement('script')
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBv1bZpr-pLSgw6cnTkpexgcFgY40F3j0w&region=TW&language=zh-TW&libraries=places&v=weekly'
script.async = true;
document.head.appendChild(script);

export default {
    name: 'GetPlaceIdPost',
    components: {
        NeHeader,
        NeGoButton
    },

    setup() {
        return {
            popup
        }
    },

    data() {
        return {
            placeSelector: {
                icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png',
                name: '台灣大學',
                placeId: '',
                address: '台北市大安區長興街50號'
            }
        }
    },

    created() {

    },

    methods: {

        initMap() {
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                mapId: "7f8aa481b333861a",
                center: { lat: 25.017951, lng: 121.539625 },
            });
            new this.ClickEventHandler(map, this);
        },

        ClickEventHandler: class {
            map;
            placesService;
            infowindow;
            infowindowContent;
            app;
            constructor(map, app) {
                this.map = map;
                this.placesService = new google.maps.places.PlacesService(map);
                this.map.addListener("click", this.handleClick.bind(this));
                this.app = app
            }
            isIconMouseEvent(e) {
                return "placeId" in e;
            }
            handleClick(event) {
                console.log("You clicked on: " + event.latLng);
                if (this.isIconMouseEvent(event)) {
                    console.log("You clicked on place:" + event.placeId);
                    event.stop();
                    if (event.placeId) {
                        this.getPlaceInformation(event.placeId);
                    }
                }
            }
            getPlaceInformation(placeId) {
                this.placesService.getDetails({ placeId: placeId }, (place, status) => {
                    if (
                        status === "OK" &&
                        place &&
                        place.geometry &&
                        place.geometry.location
                    ) {
                        this.app.placeSelector.icon = place.icon;
                        this.app.placeSelector.name = place.name;
                        this.app.placeSelector.placeId = place.place_id;
                        this.app.placeSelector.address = place.formatted_address;
                    }
                });
            }
        },

        redirection() {
            this.popup('成功選擇地點', '建立貼文', 'success')
            var checkbutton = this.$swal.getConfirmButton()
            checkbutton.addEventListener('click', () => {
                this.$router.push({
                    name: 'CreatePost',
                    query: {
                        placeId: this.placeSelector.placeId,
                        name: this.placeSelector.name
                    }
                })
            })
        }
    }
}
</script>
