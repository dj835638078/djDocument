<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">{{titleName}}</div><div v-show='plaRequire' class="xing">*</div>
            <input type="text" class="place-content" v-if="!simple" v-model='place' :placeholder="plaholder" maxlength="200" @click='placeClick'>
            <input type="text" class="place-content" v-else v-model='place2' :placeholder="plaholder" maxlength="200">
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
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
    created: function () {
        console.log('place created')
    },
    mounted: function () {
        console.log('simple', this.simple)
        console.log('place mouned')
    },
    methods: {
        placeClick (e) {
            e.stopPropagation()
            e.preventDefault()
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
                console.log(result,'hello world addpoi里面的')
                if (result && result.poiName) {
                    self.place = result.poiName
                }
            })
        }
    },
    watch: {
        place: function () {
            console.log('placeChange emit')
            this.$emit('placeChange', this.place)
        },
        place2: function () {
            console.log('placeChange emit')
            this.$emit('placeChange', this.place2)
        },
        pla: function () {
            console.log('pla change')
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
