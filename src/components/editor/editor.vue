<style lang="less">
  @import './index.less';
</style>
<template>
  <div>
    <quill-editor v-model="insideData[field]" :options="editorOption"></quill-editor>
  </div>
</template>
<script>
import { quillEditor, Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import imageFormat from '@/filter/module/image'
import { uploadConfig } from '@/api/common'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  name: 'editor',
  components: {
    quillEditor
  },
  props: {
    value: {
      type: Object,
      default () {
        return {
          content: ''
        }
      }
    },
    field: {
      type: String,
      default: 'content'
    }
  },
  data () {
    return {
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          ImageExtend: {
            loading: true,
            name: 'file',
            size: 2,
            action: uploadConfig.url,
            response: (res) => {
              return imageFormat(res.data)
            },
            headers: (xhr) => {
              xhr.setRequestHeader('Authorization', uploadConfig.authorization)
            },
            sizeError: () => {
              this.$Notice.warning({
                title: '文件大小超过限制',
                desc: '文件太大，请上传不超过2M的文件.'
              })
            },
            start: () => {},
            end: () => {},
            error: () => {},
            change: (xhr, formData) => {}
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      },
      insideData: {}
    }
  },
  watch: {
    value: {
      handler (val) {
        this.insideData = val
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
