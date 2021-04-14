import React from 'react';

export interface ResBasic<T> {
  success: boolean;
  resultData: T;
  traceId: null | number;
}

export interface User {
  id: number;
  gmtCreate: string;
  gmtModified: string;
  creator: null;
  operator: null;
  dictName: string;
  dictDesc: string;
  extInfo: null;
  tenantId: number;
  dataType: string;
}

export interface MenuItem {
  icon: React.ReactNode;
  key: string;
  title: string;
  url?: string;
  type: 'list' | 'page' | 'button';
  subs?: MenuItem[];
}

// 反解Promise
type R<T> = T extends Promise<infer U> ? U : T;
export type YieldReturn<T> = R<ReturnType<T extends (...args: any) => any ? T : any>>;
