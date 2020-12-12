<template>
  <div class="search-wrap">
    <div class="search-head-wrap">
      <el-input placeholder="请输入好友名称" v-model="searchWord" clearable @input="inputWord">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="search-body-wrap">
      <template v-if="result.length">
        <div class="list-wrap">
          <template v-for="(item, index) in result">
            <div class="list-item" :key="item.userId" @click="goUserDetail(index)">
              <div class="item-icon" :style="{'background-image':`url(${item.avatar})`}"></div>
              <div class="item-text">
                <div class="item-text-title">{{item.username}}</div>
              </div>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="blank">暂无查询结果</div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'search',
  data () {
    return {
      searchWord: '',
      timer: null,
      result: [
        // {
        //   username: '小杜',
        //   userId: 'bxcbds',
        //   avatar: '//s3.qiufengh.com/avatar/16.jpeg'
        // },
        // {
        //   username: '小杜11',
        //   userId: 'asdasd',
        //   avatar: '//s3.qiufengh.com/avatar/15.jpeg'
        // },
        // {
        //   username: '小杜sss',
        //   userId: 'bxcbsfsds',
        //   avatar: '//s3.qiufengh.com/avatar/13.jpeg'
        // },
        // {
        //   username: '小杜ddd',
        //   userId: 'bxcbzcxzcds',
        //   avatar: '//s3.qiufengh.com/avatar/14.jpeg'
        // }
      ]
    }
  },
  components: {
  },
  computed: {

  },
  created () {

  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 在搜索栏输入值
    inputWord (value) {
      console.log('value: ', value)
      if (value) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => this.getData(value), 300)
      } else {
        // 清空结果
        this.result = []
      }
    },
    // 远程搜索
    async getData (value) {
      try {
        const { data } = await this.$request({
          url: '/api/searchUser',
          params: {
            username: value
          }
        })
        this.result = data
      } catch (error) {
        console.log('进行搜索时发生了错误', error)
      }
    },
    // 查看用户详细信息
    goUserDetail (index) {
      const { userId } = this.result[index]
      this.$router.push(`/home/user/${userId}`)
    }
  }
}
</script>

<style lang="scss">
$padding:12px;

.search-wrap{
  height: 100%;
  overflow: auto;
  .search-head-wrap{
    margin: $padding;
  }
  .search-body-wrap{
    .list-wrap{
      box-shadow: 0 0 3px #d1d1d1;
    }
    .list-item{
      height: 56px;
      display: flex;
      align-items: center;
      color: #666;
      padding: 0 $padding;
      background-color: #fff;
      cursor: pointer;
      &:hover{
        background-color: rgba(0,0,0,.1);
      }
      .item-icon{
        width: 40px;
        height: 40px;
        @include bg-icon;
        border-radius: 5px;
      }
      .item-text{
        width: 0; // 防止 flex 布局下 overflow 失效
        flex: 1;
        margin-left: 12px;
      }
      .item-text-title{
        @include text-overflow;
      }
      .item-text-message{
        @include text-overflow;
        font-size: 14px;
        height: 24px;
        color: rgba(0,0,0,.54);
        line-height: 2;
      }
    }
    .blank{
      @include flex-center;
      color: rgba(0,0,0,.54);
    }
  }
}
</style>
