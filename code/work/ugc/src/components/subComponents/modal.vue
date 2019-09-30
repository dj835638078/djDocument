<template>
    <div class="modal-container">
        <div class="modal-background" @click='modalHidden'></div>
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'modal',
    data: function () {
        return {
        }
    },
    mounted: function () {},
    methods: {
        modalHidden () {
            this.$emit('modalHidden')
        }
    }
}
</script>
<style scoped>
.modal-container{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.modal-background {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: #999999;
    opacity: 0.4;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
.modal-content {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
}
</style>
