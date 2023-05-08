<template>
  <div class="about-module" ref="posterHtml" id="posterHtml">
    <Main />
    <img src="https://img2.baidu.com/it/u=3070842050,3388466746&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Main from './components/Main/index.vue'
import html2canvas from 'html2canvas'
import transferBlob from '@/bridge/uploadBlob'
console.info('loading')
export default defineComponent({
  components: {
    Main
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        const canvas = await (window.html2canvas || html2canvas)(this.$refs.posterHtml, {
          useCORS: true,
          backgroundColor: null
        })
        const blobStr = canvas.toDataURL('image/png')
        // 在微信里,可长按保存或转发
        const fileName = `${new Date().getTime()}.png`

        transferBlob({
          blobStr, fileName
        })
      }, 4000)
    })
  }
})
</script>

<style lang="less">
.about-module {
  color: #121212;
  font-size: 16px;
  text-align: center;
}
</style>
