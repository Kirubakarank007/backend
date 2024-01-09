import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { promises } from "dns";

it('can create an instance of auth service',async()=>{
    //create fakeUSeService
    const fakeUSeService={
        find:()=>Promise.resolve([]),
        create:(email:string,password:string)=>Promise.resolve({id:1,email,password})
    }
    const module=await Test.createTestingModule({
        providers:[
            AuthService,
        {
            provide:UsersService,
            useValue:fakeUSeService
        }]
    }).compile();

    const service=module.get(AuthService);

    expect(service).toBeDefined();
})