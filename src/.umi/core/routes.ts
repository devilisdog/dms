// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'C:/Users/hanawa/Desktop/dms/dms/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'C:/Users/hanawa/Desktop/dms/dms/src/layouts/UserLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "name": "login",
        "path": "/user/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'C:/Users/hanawa/Desktop/dms/dms/src/pages/user/login'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'C:/Users/hanawa/Desktop/dms/dms/src/layouts/SecurityLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'C:/Users/hanawa/Desktop/dms/dms/src/layouts/BasicLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "redirect": "/buildOrder",
            "exact": true
          },
          {
            "path": "/buildOrder",
            "name": "新建工单",
            "icon": "smile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__buildOrder' */'C:/Users/hanawa/Desktop/dms/dms/src/pages/buildOrder'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/orderList",
            "name": "在线工单",
            "icon": "crown",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__orderList' */'C:/Users/hanawa/Desktop/dms/dms/src/pages/orderList'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/orderList/edit/:id",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__orderList__components__edit' */'C:/Users/hanawa/Desktop/dms/dms/src/pages/orderList/components/edit'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "维修记录",
            "icon": "table",
            "path": "/list",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__list' */'C:/Users/hanawa/Desktop/dms/dms/src/pages/list'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'C:/Users/hanawa/Desktop/dms/dms/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'C:/Users/hanawa/Desktop/dms/dms/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'C:/Users/hanawa/Desktop/dms/dms/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
