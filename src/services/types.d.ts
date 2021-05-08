declare namespace API {
  interface ResBasic<T> {
    success: boolean;
    resultData: T;
    traceId: null | number;
  }

  interface User {
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

  // 反解Promise
  type R<T> = T extends Promise<infer U> ? U : T;
  type YieldReturn<T> = R<ReturnType<T extends (...args: any) => any ? T : any>>;
}
