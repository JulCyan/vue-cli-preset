import { haveRolesPermission } from '@/plugins/directive/permission'
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Permission extends Vue {
  public haveRolesPermission: (binding: any) => boolean = haveRolesPermission
}
