import page1Router from '@/views/Page1/router';
import page2Router from '@/views/Page2/router';

interface routerProps {
    title: string;
    path: string;
    element: React.FC<any> | React.ComponentClass<any>;
}

const router: routerProps[] = [
    ...page1Router,
    ...page2Router,
]
export default router;