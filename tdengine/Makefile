JSFOLDER:=../src/games/towerdefence/js
build:
	wasm-pack build --release --out-name gameplay --out-dir pkg
	cp pkg/gameplay.d.ts $(JSFOLDER)/gameplay.d.ts
	cp pkg/gameplay_bg.wasm $(JSFOLDER)/gameplay_bg.wasm
	cp pkg/gameplay_bg.wasm.d.ts $(JSFOLDER)/gameplay_bg.wasm.d.ts
	cp pkg/gameplay_bg.js $(JSFOLDER)/gameplay_bg.js

clean:
	rm -rf pkg
	rm -rf $(JSFOLDER)/gameplay.d.ts
	rm -rf $(JSFOLDER)/gameplay.wasm_bg.js
