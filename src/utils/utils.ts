import { Router } from 'vue-router'
import { IResData } from '@/type'
import { allRoutes } from '@/router/config'
import type { IMenus } from '../store/types'
import { ElMessage } from 'element-plus'

export function showMessageByRes(res: IResData): boolean {
  const success = !!(res.code === 200)
  if (success) {
    res.msg && ElMessage.success(res.msg)
  } else {
    ElMessage.error(res.msg)
  }
  return success
}

export function findItem(menus: Readonly<IMenus[]>, condition: string): boolean {
  for (const item of menus) {
    if (findItem(item.children, condition)) {
      return true
    }
    if (item.permission === condition) {
      return true
    }
  }
  return false
}

export function loadRoutes(router: Router, menus: IMenus[]) {
  for (const item of menus) {
    if (item.type === 2) {
      const route = allRoutes.find((route) => route.path === item.path)
      if (route) {
        router.addRoute('home', route)
      }
    } else if (item.type === 1) {
      loadRoutes(router, item.children)
    }
  }
}

export function firstToUpper(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}
