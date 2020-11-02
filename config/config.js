// https://umijs.org/config/
import { defineConfig } from "umi";
import defaultSettings from "./defaultSettings";
import proxy from "./proxy";
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  base: "/dist/",
  publicPath: "/dist/",

  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: "zh-CN",
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: "@/components/PageLoading/index",
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: "/user",
      component: "../layouts/UserLayout",
      routes: [
        {
          name: "login",
          path: "/user/login",
          component: "./user/login",
        },
      ],
    },
    {
      path: "/",
      component: "../layouts/SecurityLayout",
      routes: [
        {
          path: "/",
          component: "../layouts/BasicLayout",
          // authority: ['admin', 'user'],
          routes: [
            {
              path: "/",
              redirect: "/buildOrder",
            },
            {
              path: "/buildOrder",
              name: "新建工单",
              icon: "smile",
              component: "./buildOrder",
            },
            {
              // name: '新建工单',
              // icon: 'table',
              path: "/buildOrder/addBuild",
              component: "./buildOrder/addBuild",
            },
            {
              path: "/orderList",
              name: "在线工单",
              icon: "crown",
              component: "./orderList",
              // authority: ['admin'],
              // routes: [
              //   {
              //     path: '/admin/sub-page',
              //     name: 'sub-page',
              //     icon: 'smile',
              //     component: './buildOrder',
              //     authority: ['admin'],
              //   },
              // ],
            },
            {
              // name: '编辑工单',
              // icon: 'table',
              path: "/orderList/edit/:id",
              component: "./orderList/components/edit",
            },
            {
              name: "维修记录",
              icon: "table",
              path: "/searchList",
              component: "./searchList",
            },

            {
              // name: '维修记录查看',
              // icon: 'table',
              path: "/searchList/lookPage/:id",
              component: "./searchList/lookPage",
            },

            {
              component: "./404",
            },
          ],
        },
        {
          component: "./404",
        },
      ],
    },
    {
      component: "./404",
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    "primary-color": defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || "dev"],
  manifest: {
    basePath: "/",
  },
});
