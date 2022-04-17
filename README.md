# urljoins

Trailing-Slash compatible join utility.


# Feature

Trailing-Slash compatible.

```typescript
urljoins("a.test", "/a", "b"); // a.test/a/b
urljoins("a.test/", "/a", "b"); // a.test/a/b
```

Spread key-value objects.

```typescript
urljoins("a.test", {key1: v1, key2: v2}); // a.test?key1=v1&key2=v2
urljoins("a.test", {key1: v1, key2: undefined, key3:v3}); // a.test?key1=v1&key2=&key3=v3
urljoins("a.test", {key1: v1, key2: v2}, "/a"); // a.test?key1=v1&key2=v2&/a
urljoins("a.test", {keys: ["v1", "v2"]}); // a.test?keys[]=v1&keys[]=v2
```

Some other trailing (or heading) treatments.

```typescript
urljoins("a.test?", "?a", "b"); // a.test?a&b
```