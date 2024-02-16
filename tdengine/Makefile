build:
	wasm-pack build --release --out-name gameplay --out-dir pkg
	cp pkg/gameplay.d.ts ../src/js/gameplay.d.ts
	cp pkg/gameplay_bg.wasm ../src/js/gameplay_bg.wasm
	cp pkg/gameplay_bg.wasm.d.ts ../src/js/gameplay_bg.wasm.d.ts
	cp pkg/gameplay_bg.js ../src/js/gameplay_bg.js

clean:
	rm -rf pkg
	rm -rf ../src/js/gameplay.d.ts
	rm -rf ../src/js/gameplay.wasm_bg.js
