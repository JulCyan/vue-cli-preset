import { BaseNS } from '@/configs/type'
import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment'
@Component
export default class Moment extends Vue {
  //格式化日期
  public formatDate(time: BaseNS, formatValue: string = 'YYYY-MM-DD'): string {
    return moment(time).format(formatValue)
  }
}
