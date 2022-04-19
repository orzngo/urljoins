import {urljoins} from "../src/urljoins";

describe("urljoins", () => {
    test("simple join", () => {
        expect(urljoins("t.test", "/aa", "bb")).toBe("t.test/aa/bb");
        expect(urljoins("t.test", "aa", "bb")).toBe("t.test/aa/bb");
        expect(urljoins("t.test", "aa", "/bb")).toBe("t.test/aa/bb");
        expect(urljoins("t.test", "/aa", "/bb")).toBe("t.test/aa/bb");
        expect(urljoins("t.test", "/aa/", "/bb")).toBe("t.test/aa/bb");
    });
    test("simple join with trailing slash", () => {
        expect(urljoins("t.test/", "/aa", "bb")).toBe("t.test/aa/bb");
        expect(urljoins("t.test/", "aa", "bb")).toBe("t.test/aa/bb");
        expect(urljoins("t.test/", "aa", "/bb")).toBe("t.test/aa/bb");
        expect(urljoins("t.test/", "/aa", "/bb")).toBe("t.test/aa/bb");
        expect(urljoins("t.test/", "/aa/", "/bb")).toBe("t.test/aa/bb");
        expect(urljoins("t.test/", "/aa/", "/bb/")).toBe("t.test/aa/bb/");
    });
    describe("other trailing (or heading) treatments",()=>{
        test("url with query",()=>{
            expect(urljoins("t.test/a?k1=v1", "aa", "bb")).toBe("t.test/a?k1=v1&aa&bb");
        });
        test("url with trailing some delimiter", ()=>{
            expect(urljoins("t.test?", "aa", "bb")).toBe("t.test?aa&bb");
            expect(urljoins("t.test?k1=v1&", "aa", "bb")).toBe("t.test?k1=v1&aa&bb");
        });

        test("query strings with delimiter", ()=>{
            expect(urljoins("t.test?", "?aa", "bb")).toBe("t.test?aa&bb");
        });

    })


    test("simple join with query", () => {
        expect(urljoins("t.test", "?k1=v1")).toBe("t.test?k1=v1");
        expect(urljoins("t.test/", "?k1=v1")).toBe("t.test/?k1=v1");
        expect(urljoins("t.test", "?k1=v1&k2=v2", "?k3=v3")).toBe("t.test?k1=v1&k2=v2&k3=v3");
        expect(urljoins("t.test", "?k1=v1", "aa", "bb")).toBe("t.test?k1=v1&aa&bb");
        expect(urljoins("t.test", "?k1=v1", "aa", "/bb")).toBe("t.test?k1=v1&aa&/bb");
    });

    test("simple join with query and path", ()=>{
        expect(urljoins("t.test", "/aa", "/bb", "?k1=v1")).toBe("t.test/aa/bb?k1=v1");
    });
    test("url with querystrings ", () => {
        expect(urljoins("t.test?k1=v1", "?k2=v2")).toBe("t.test?k1=v1&k2=v2");
        expect(urljoins("t.test?k1=v1", "k2=v2")).toBe("t.test?k1=v1&k2=v2");
    });

});

describe("urljoinso", () => {
    test("simple object join", () => {
        expect(urljoins("t.test", {k1: "v1"})).toBe("t.test?k1=v1");
        expect(urljoins("t.test", {k1: "v1", k2: "v2"})).toBe("t.test?k1=v1&k2=v2");
        expect(urljoins("t.test", {keys: ["v1", "v2", "v3"]})).toBe("t.test?keys[]=v1&keys[]=v2&keys[]=v3");
    });
    test("object with null | undefined", ()=>{
        expect(urljoins("t.test", {k1: "v1", k2: null, k3: "v3"})).toBe("t.test?k1=v1&k2=&k3=v3");
        expect(urljoins("t.test", {k1: "v1", k2: undefined, k3: "v3"})).toBe("t.test?k1=v1&k2=&k3=v3");
    });


    test("multiple objects join", () => {
        expect(urljoins("t.test", {k1: "v1"}, {k2: "v2"})).toBe("t.test?k1=v1&k2=v2");
        expect(urljoins("t.test", {k1: "v1", k2: "v2"}, {k3: "v3"})).toBe("t.test?k1=v1&k2=v2&k3=v3");
    });
    test("objects and strings combined",()=>{
        expect(urljoins("t.test", {k1: "v1"}, "a")).toBe("t.test?k1=v1&a");
        expect(urljoins("t.test", {k1: "v1"}, "/a", {k2:"v2"})).toBe("t.test?k1=v1&/a&k2=v2");
    });
});
