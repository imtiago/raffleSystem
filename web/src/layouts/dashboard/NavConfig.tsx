// component
import Iconify from '../../components/Iconify';
import { checkRole, Role, systemRoles } from '../../utils/checkRole';

// ----------------------------------------------------------------------
interface itemNav { 
  title: string,
  path: string,
  icon: string | JSX.Element,
  canRender?: Object,
  roles?: Role[]
}
const getIcon = (name:string) => <Iconify icon={name} width={22} height={22} />;

const navConfig: itemNav[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
    canRender: checkRole
  },
  {
    title: 'Meu Perfil',
    path: '/profile',
    icon: getIcon('eva:person-fill'),
  },
  {
    title: 'usuários',
    path: '/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'produtos',
    path: '/product',
    icon: getIcon('eva:shopping-bag-fill'),
    roles: [systemRoles.ROLE_ADMIN]
  },
  {
    title: 'concursos',
    path: '/raffle',
    icon: getIcon('eva:activity-fill'),
  },
  {
    title: 'pedidos',
    path: '/orders',
    icon: getIcon('eva:activity-fill'),
  },
  {
    title: 'pagamentos',
    path: '/blog',
    icon: getIcon('eva:file-text-fill'),
    roles: [systemRoles.ROLE_ADMIN]
  },
  {
    title: 'permissoes',
    path: '/blog',
    icon: getIcon('eva:file-text-fill'),
    roles: [systemRoles.ROLE_ADMIN]
  },
  {
    title: 'blog',
    path: '/blog',
    icon: getIcon('eva:file-text-fill'),
    roles: [systemRoles.ROLE_ADMIN]
  },
  {
    title: 'login',
    path: '/signIn',
    icon: getIcon('eva:lock-fill'),
    roles: [systemRoles.ROLE_ADMIN]
  },
  {
    title: 'cadastre-se',
    path: '/signUp',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
  {
    title: 'Configurações',
    path: '/settings',
    icon: getIcon('eva:settings-2-fill'),
  },
  {
    title: 'Sair',
    path: '/404',
    icon: getIcon('eva:log-out-fill'),
  },
];

export default navConfig;
