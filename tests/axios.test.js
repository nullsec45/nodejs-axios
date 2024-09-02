import * as axios from "axios";

describe("HTTP Client", () => {
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

describe("HTTP Method", () => {
  
    it("should support GET Method", async() => {
        const httpClient=axios.create({
            baseURL:"https://eokih5piy7jx0o1.m.pipedream.net/",
            timeout:5000
        });

        const response=await httpClient.get("/");
        expect(response.status).toBe(200);
    })
});