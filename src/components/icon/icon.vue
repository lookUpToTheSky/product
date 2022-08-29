<template>
  <i v-if="!svg" :class="classes" :style="styles" @click="handleClick"></i>
  <svg v-else :class="classes" aria-hidden="true" :style="styles">
    <use :xlink:href="svgIcon" />
  </svg>
</template>
<script>
// TODO：直接拷贝iview源码
  const prefixCls = 'sw-icon'

  export default {
    name: 'SWIcon',
    props: {
      type: {
        type: String,
        default: ''
      },
      size: {
        type: [Number, String],
        default: 14
      },
      color: String,
      custom: {
        type: String,
        default: ''
      },
      svg: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      svgIcon() {
        return `#${prefixCls}-${this.type}`
      },
      classes() {
        return [
          `${prefixCls}`,
          {
            'sw-svg-icon': this.svg,
            [`${prefixCls}-${this.type}`]: this.type !== '',
            [`${this.custom}`]: this.custom !== ''
          }
        ]
      },
      styles() {
        const style = {}

        if (this.size) {
          style['font-size'] = `${this.size}px`
        }

        if (this.color) {
          style.color = this.color
        }

        return style
      }
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event)
      }
    }
  }
</script>
