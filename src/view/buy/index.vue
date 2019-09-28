<style lang="less" scoped>
  @import './index.less';
</style>
<template>
  <div>
    <Card class="layout-card" :title="$route.meta.title">
      <Form :model="listData.filter" inline>
        <FormItem prop="payState" label="来源：" :label-width="60">
          <Select v-model="listData.filter.source">
            <Option value="">全部</Option>
            <Option :value="0">直营</Option>
            <Option :value="1">代理</Option>
          </Select>
        </FormItem>
        <FormItem prop="payState" label="支付状态：" :label-width="80">
          <Select v-model="listData.filter.payState">
            <Option value="">全部</Option>
            <Option :value="0">未支付</Option>
            <Option :value="1">购买成功</Option>
          </Select>
        </FormItem>
        <FormItem prop="buyTyp" label="类型：" :label-width="60">
          <Select v-model="listData.filter.buyTyp">
            <Option value="">全部</Option>
            <Option :value="0">充值</Option>
            <Option :value="1">续费</Option>
          </Select>
        </FormItem>
        <FormItem label="日期：" :label-width="60">
          <Row>
            <Col span="11">
              <DatePicker v-model="listData.filter.beginTime" type="datetime" placeholder="开始时间"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center;">—</Col>
            <Col span="11">
              <DatePicker v-model="listData.filter.endTime" type="datetime" placeholder="结束时间"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="keyWord">
          <Input type="text" v-model="listData.filter.keyWord" placeholder="手机号、单号、流水号"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSearch">查询</Button>
        </FormItem>
      </Form>
      <Table ref="listTable" :loading="listData.dataLoading" border :columns="listData.columns" :data="listData.list">
        <div v-show="listData.total > 0" slot="footer">
          <Table :show-header="false" border :columns="summaryData.columns" :data="summaryData.list" style="margin: -1px;"></Table>
        </div>
      </Table>
      <Page v-if="listData.total > 0" :total="listData.total" show-total show-sizer show-elevator @on-change="handleChangePage" @on-page-size-change="handleChangePageSize"/>
    </Card>
  </div>
</template>
<script>
import timeFormat from '@/filter/module/time'

export default {
  name: 'buy',
  data () {
    return {
      listData: {
        dataLoading: false,
        total: 0,
        filter: {
          keyWord: '',
          beginTime: '',
          endTime: '',
          payState: '',
          buyTyp: '',
          source: '',
          page: 1,
          pageSize: 10
        },
        columns: [
          {
            title: '序号',
            width: 80,
            key: 'rowIndex',
            align: 'center',
            render: (h, params) => {
              let _this = this
              return h('div', (_this.listData.filter.page - 1) * _this.listData.filter.pageSize + params.index + 1)
            }
          },
          {
            title: '单号',
            key: 'billNo'
          },
          {
            title: '购买人',
            key: 'userName'
          },
          {
            title: '手机号',
            key: 'userMobile'
          },
          {
            title: '分享人',
            key: 'cusName'
          },
          {
            title: '分享人手机号',
            key: 'cusMobile'
          },
          {
            title: '金额',
            key: 'money'
          },
          {
            title: '微信流水号',
            key: 'serialNo'
          },
          {
            title: '状态',
            key: 'payState'
          },
          {
            title: '下单时间',
            key: 'createTime'
          },
          {
            title: '支付时间',
            key: 'payTime'
          }
        ],
        list: [
          {
            billNo: '1125610651107348481',
            bonusMoney: 80,
            bonusType: 0,
            createTime: '2019-05-07 11:57:47',
            cusMobile: '123456',
            cusName: '秀秀123456',
            id: '1125610652453720065',
            money: 380,
            payState: '购买成功',
            payTime: '2019-05-07 11:58:00',
            serialNo: '4200000292201905076554615300',
            userMobile: '15602290373',
            userName: 'Forever Lengths Hair Pro'
          },
          {
            billNo: '1125610651107348481',
            bonusMoney: 80,
            bonusType: 0,
            createTime: '2019-05-07 11:57:47',
            cusMobile: '123456',
            cusName: '秀秀123456',
            id: '1125610652453720065',
            money: 380,
            payState: '购买成功',
            payTime: '2019-05-07 11:58:00',
            serialNo: '4200000292201905076554615300',
            userMobile: '15602290373',
            userName: 'Forever Lengths Hair Pro'
          },
          {
            billNo: '1125610651107348481',
            bonusMoney: 80,
            bonusType: 0,
            createTime: '2019-05-07 11:57:47',
            cusMobile: '123456',
            cusName: '秀秀123456',
            id: '1125610652453720065',
            money: 380,
            payState: '购买成功',
            payTime: '2019-05-07 11:58:00',
            serialNo: '4200000292201905076554615300',
            userMobile: '15602290373',
            userName: 'Forever Lengths Hair Pro'
          },
          {
            billNo: '1125610651107348481',
            bonusMoney: 80,
            bonusType: 0,
            createTime: '2019-05-07 11:57:47',
            cusMobile: '123456',
            cusName: '秀秀123456',
            id: '1125610652453720065',
            money: 380,
            payState: '购买成功',
            payTime: '2019-05-07 11:58:00',
            serialNo: '4200000292201905076554615300',
            userMobile: '15602290373',
            userName: 'Forever Lengths Hair Pro'
          },
          {
            billNo: '1125610651107348481',
            bonusMoney: 80,
            bonusType: 0,
            createTime: '2019-05-07 11:57:47',
            cusMobile: '123456',
            cusName: '秀秀123456',
            id: '1125610652453720065',
            money: 380,
            payState: '购买成功',
            payTime: '2019-05-07 11:58:00',
            serialNo: '4200000292201905076554615300',
            userMobile: '15602290373',
            userName: 'Forever Lengths Hair Pro'
          },
          {
            billNo: '1125610651107348481',
            bonusMoney: 80,
            bonusType: 0,
            createTime: '2019-05-07 11:57:47',
            cusMobile: '123456',
            cusName: '秀秀123456',
            id: '1125610652453720065',
            money: 380,
            payState: '购买成功',
            payTime: '2019-05-07 11:58:00',
            serialNo: '4200000292201905076554615300',
            userMobile: '15602290373',
            userName: 'Forever Lengths Hair Pro'
          }
        ]
      },
      summaryData: {
        columns: [
          {
            key: 'rowIndex',
            width: 80
          },
          {
            key: 'billNo',
            width: 157
          },
          {
            key: 'userName',
            width: 157
          },
          {
            key: 'userMobile',
            width: 157
          },
          {
            key: 'cusName',
            width: 157
          },
          {
            key: 'cusMobile',
            width: 157
          },
          {
            key: 'money',
            width: 157
          },
          {
            key: 'serialNo',
            width: 157
          },
          {
            key: 'payState',
            width: 80
          },
          {
            key: 'createTime',
            width: 158
          },
          {
            key: 'payTime',
            width: 158
          }

        ],
        list: [{rowIndex: '合计', money: 1111111}]
      },
      toDay: 0
    }
  },
  methods: {
    loadList () {},
    loadSummary (data) {
      // let _this = this
    },
    handleSearch () {
      let _this = this
      _this.listData.filter.page = 1
      _this.loadList()
    },
    handleChangePage (page) {
      let _this = this
      _this.listData.filter.page = page
      _this.loadList()
    },
    handleChangePageSize (pageSize) {
      let _this = this
      _this.listData.filter.pageSize = pageSize
      _this.loadList()
    }
  },
  created () {
    let _this = this
    if (_this.$route.query.time) {
      _this.toDay = 1
      _this.listData.filter.beginTime = timeFormat(new Date(), 'yyyy-MM-dd') + ' 00:00:00'
      _this.listData.filter.endTime = timeFormat(new Date(), 'yyyy-MM-dd') + ' 23:59:59'
    }
    _this.loadList()
  }
}
</script>
