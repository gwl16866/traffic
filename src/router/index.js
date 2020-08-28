import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '家' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/index/Dashboard.vue'),
                    meta: { title: '系统首页' },
                },
                {
                    path: '/xueyuanxinxi',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/studentInfo/StudentInfo.vue'),
                    meta: { title: '学员信息' }
                },
                {
                    path: '/xueyuanshenhe',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/studentCheck/StudentCheck.vue'),
                    meta: { title: '学员审核' }
                },
                {
                    path: '/niandujihua',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/yearPlan/YearPlan.vue'),
                    meta: { title: '年度计划' }
                },
                {
                    path: '/jiaoxueneirong',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/teachInfo/TeachInfo.vue'),
                    meta: { title: '教学内容' }
                },
                {
                    // 富文本编辑器组件
                    path: '/anquanjiaoyu',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/safetyEdu/SafetyEdu.vue'),
                    meta: { title: '安全教育' }
                },
                {
                    // markdown组件
                    path: '/peixunjindu',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/trainProgress/TrainProgress.vue'),
                    meta: { title: '培训进度' }
                },
                // {
                //     // 图片上传组件
                //     path: '/peixunbaogao',
                //     component: () => import(/* webpackChunkName: "upload" */ '../components/page/trainReport/TrainReport.vue'),
                //     meta: { title: '培训报告' }
                // },
                // {
                //     // vue-schart组件
                //     path: '/xuexizhengming',
                //     component: () => import(/* webpackChunkName: "chart" */ '../components/page/studyEvidence/StudyEvidence.vue'),
                //     meta: { title: '学习证明' }
                // },
           
                // {
                //     path: '/fabugongwen',
                //     component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/issuerOfficialDocument/issuerOfficialDocument.vue'),
                //     meta: { title: '发布公文' }
                // },
              
                {
                    path: '/particulars',
                    component: () => import(/* webpackChunkName: "login" */ '../components/page/index/particulars.vue'),
                    meta: { title: '培训统计' }
                }
                ,
                {
                    path: '/xyparticulars',
                    component: () => import(/* webpackChunkName: "login" */ '../components/page/index/xyparticulars.vue'),
                    meta: { title: '学员详情' }
                }
          
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
