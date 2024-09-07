import * as axios from "axios";
import fs from "fs";

describe.skip("HTTP Client", () => {
    it("should be supported by axios", async() => {
        const httpClient=axios.create();
        expect(httpClient).toBeDefined();
    });

    it("should be supported by axios", async() => {
        const httpClient=axios.create({
            baseURL:"https://eokih5piy7jx0o1.m.pipedream.net/",
            timeout:5000
        });

        expect(httpClient).toBeDefined();
    })
});

describe.skip("HTTP Method", () => {
    const httpClient=axios.create({
            baseURL:"https://eoaytbx3gxigqp2.m.pipedream.net",
            timeout:5000
    });

    httpClient.interceptors.request.use(
        async(config) => {
            console.info(`Send request to ${config.baseURL}${config.url}`);
        },
        async(error) => {
            console.error(`Request error : ${error.message}`);
            return Promise.reject(error);
        },
        {
            synchronous:false
        }
    );


    httpClient.interceptors.response.use(
        async(response) => {
           const fullUrl=response.config.baseURL+response.config.url;
           const body=JSON.stringify(response.data);
           console.info(`Receive response from ${fullUrl} with body ${body}`);
           return response;
        },
        async(error) => {
            console.error(`Response error : ${error.message}`);
            return Promise.reject(error);
        },
        {
            synchronous:false
        }
    );
    
    const urlPhoto="image.png";

    it.skip("should support GET Method", async() => {
        const httpClient=axios.create({
            baseURL:"https://eojnp3qpjxv6m67.m.pipedream.net",
            timeout:5000
        });

        const response=await httpClient.get("/");
        expect(response.status).toBe(200);
    })

    it.skip("should support GET Method with config", async() => {
        const response=await httpClient.get("/",{
            params:{
                name:"Fajar"
            },
            headers:{
                "Accept":"application/json"
            }
        });
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
    });
    
    it.skip("should support POST Method with request body", async() => {
       const json={
            username:"fajar",
            password:"rahasiabangetnich"
       }

        const response=await httpClient.post("/",json,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
    });

    it.skip("should support POST Method with TEXT request body", async() => {
        const text="Fajar Ganteng";

        const response=await httpClient.post("/", text, {
            headers:{
                "Content-Type":"text/plain",
                "Accept":"application/json"
            }
        });
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
    });

    it.skip("should support POST Method with FORM request body", async() => {
      const json={
            username:"fajar",
            password:"rahasiabangetnich"
       }
        const response=await httpClient.post("/", json, {
            headers:{
                "Accept":"application/x-www-form-urlencoded"
            }
        });
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
    });

    it("should support POST method with Multipart request body", async() => {
        const form=new FormData();
        form.append("username","fajar");
        form.append("password","rahasiabangetnich");

        const data=fs.readFileSync(urlPhoto);
        form.append("file", new Blob(data), urlPhoto);

        const response=await httpClient.post("/", form, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });

        console.log(response);
        
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
    });
});


describe("Error handler", () => {
    const httpClient=axios.create({
        baseURL:"https://programmerzamannow.com/",
        timeout:3000,
        validateStatus:(status) => {
            return status > 300;
        }
    });

    it("should error if 404 not found", async() => {
        const response=await httpClient.get("not-found");
        expect(response.status).toBe(404);
    })
})