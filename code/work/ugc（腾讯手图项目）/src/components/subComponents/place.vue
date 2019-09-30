<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">{{titleName}}</div><div v-show='plaRequire' class="xing">*</div>
            <div class="place-content special" v-if="!simple" @click='placeClick'>{{place}}<span v-if="!place" style="color:#888">{{plaholder}}</span></div>
            <!-- <input type="text" class="place-content" v-if="!simple" v-model='place' :placeholder="plaholder" maxlength="200" @focus='placeClick'> -->
            <input type="text" class="place-content" v-else v-model='place2' :placeholder="plaholder" maxlength="200">
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
/* 地点 */
export default {
    name: 'place',
    props: {
        pla: {
            default: ''
        },
        plaRequire: {
            default: true
        },
        titleName: {
            default: ''
        },
        plaholder: {
            default: ''
        },
        simple: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            place: '',
            place2: ''
        }
    },
    mounted: function () {},
    methods: {
        placeClick () {
            var self = this
            window.mqq.invoke('ugc', 'searchPoi', {
                'type': 11,
                'poiName': '',
                'poiAddr': '',
                'isMerchant': '',
                'poiTel': '',
                'desc': '',
                'contacts': ''
            }, function (result) {
                if (result && result.poiName) {
                    self.place = result.poiName
                }
            })
        }
    },
    watch: {
        place: function () {
            this.$emit('placeChange', this.place)
        },
        place2: function () {
            this.$emit('placeChange', this.place2)
        },
        pla: function () {
            this.place = this.pla
            this.place2 = this.pla
        }
    }
}
</script>
<style scoped>
.place-content {
    font-size: 0.13rem;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.1rem;
    /* text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;  */
    width:2.3rem;
    line-height:0.22rem;
}
.special{
    width: calc(100% - 1rem);
    height: .2rem;
}
</style>
