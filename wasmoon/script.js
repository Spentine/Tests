
import { LuaFactory } from 'https://cdn.jsdelivr.net/npm/wasmoon@latest/+esm';

async function main() {
  const factory = new LuaFactory();
  const lua = await factory.createEngine();
  
  const v = {"a": 1, "b": 2, "c": 3};
  lua.global.set("test", v);
  
  await lua.doString(`
    print(test)
    test.d = 4
  `);
  
  console.log(v);
  
  const a = [1, 2, 3];
  lua.global.set("testArray", a);
  
  await lua.doString(`
    print(testArray)
    table.insert(testArray, 4)
  `);
  
  console.log(a);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}