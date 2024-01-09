import { NestInterceptor, ExecutionContext,CallHandler, ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor{
    new (...args:any[]):{}
}

export function Serilize(dto:any){
    return UseInterceptors( new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any>  {
        return handler.handle().pipe(
            map((data:any)=>{
               return  plainToClass(this.dto,data,{
                    excludeExtraneousValues:true
                })
            })
        )
        
    }
}