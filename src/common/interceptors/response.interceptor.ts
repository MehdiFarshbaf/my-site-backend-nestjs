import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // If response is null or undefined (e.g., 204 No Content)
        if (data === null || data === undefined) {
          return {
            success: true,
            message: 'عملیات موفقیت آمیز بود.',
          };
        }

        // If response already has the correct structure with 'success' field
        if (typeof data === 'object' && 'success' in data) {
          return {
            ...data,
            message: data.message || 'عملیات موفقیت آمیز بود.',
          } as Response<T>;
        }

        // If response has 'message' or 'data' fields
        if (typeof data === 'object' && ('message' in data || 'data' in data)) {
          return {
            success: true,
            message: data.message || 'عملیات موفقیت آمیز بود.',
            ...(data.data !== undefined && { data: data.data }),
          };
        }

        // Default case: wrap the entire response in 'data'
        return {
          success: true,
          message: 'عملیات موفقیت آمیز بود.',
          data: data,
        };
      }),
    );
  }
}

// import {
//     Injectable,
//     NestInterceptor,
//     ExecutionContext,
//     CallHandler,
// } from '@nestjs/common';
// import {Observable} from 'rxjs';
// import {map} from 'rxjs/operators';
//
// export interface Response<T> {
//     success: boolean;
//     message?: string;
//     data: T;
// }
//
// @Injectable()
// export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
//     intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
//         return next.handle().pipe(
//             map((data) => {
//                 if (data && typeof data === 'object' && 'success' in data) {
//                     return data as Response<T>;
//                 }
//
//                 return {
//                     success: true,
//                     message: data?.message || 'عملیات موفقیت آمیز بود.',
//                     data: data?.data !== undefined ? data.data : data,
//                 };
//             }),
//         );
//     }
// }