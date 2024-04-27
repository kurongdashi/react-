import page1Router from '@/views/Page1/router';
import page2Router from '@/views/Page2/router';

interface routerProps {
  title: string;
  path: string;
  element?: React.FC<any> | React.ComponentClass<any>;
}

const appRouter = [
  {
    title: '测试子应用页面1-1',
    path: '/app-react1/page1/test1'
  },
  {
    title: '测试子应用页面1-2',
    path: '/app-react2'
  }
];
const router: routerProps[] = [...page1Router, ...page2Router, ...appRouter];
export default router;
