import page1Router from '@/views/Page1/router';

interface routerProps{
    title:string;
    path:string;
    element:React.FC<any>|React.ComponentClass<any>;
}

const router:routerProps[]=[
    ...page1Router,
]
export default router;