build:
	wasm-pack build --release --out-name gameplay --out-dir pkg
	cp -r pkg ../src/js/

trace:
	wasm-interp pkg/output.wasm --run-all-exports  --trace > trace.log
	wc -l trace.log

clean:
	rm -rf pkg
	rm -rf ../src/js/pkg
