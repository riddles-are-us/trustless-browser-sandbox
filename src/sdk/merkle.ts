/**
 * Merkle tree
 * 0
 * 1 2
 * 3 4 5 6
 * 7 8 9 10 11 12 13 14
 *   ...
 * 2^32-1 2^32 ... 2^33-2
 */
export const MERKLE_TREE_HEIGHT = 32n;

export const BASE_MERKLE_URI = "http://rpc.zkcross.org:50000/v1";

export enum Mode {
  FETCH,
  STORE,
}

export const CACHE = {
  [Mode.FETCH]: "ModeFetch",
  [Mode.STORE]: "ModeStore",
};

export interface LeafData {
  node: { data: string };
  hash: string;
}

export const generateBigIntArray = (length: number) =>
  Array.from({ length }, () => BigInt(0));

export class MerkleEnv {
  constructor(public baseURI = BASE_MERKLE_URI) {}

  /**
   * address is key, aka index.
   */
  private _address = BigInt(0);

  /**
   * Data returned from merkle_getroot, the root hash of a Merkle tree, [u64; 4]
   */
  private _root_hash: bigint[] = [];

  /**
   * merkle_setroot takes 4 u64 values
   */
  private _root_data: bigint[] = [];

  /**
   * store or fetch hash and data fields
   */
  private _cache_mode: Mode = Mode.FETCH;

  private _cache_hash: bigint[] = [];

  private _cache_data: bigint[] = [];
  /**
   * Data returned from merkle_get, the hash of some leaf data, [u64; 4]
   */
  private _leaf_hash: bigint[] = [];

  /**
   * Data passed to poseidon_push, array of finite field elements
   */
  private _poseidon_buffer: bigint[] = [];
  /**
   * Data returned from poseidon_finalize, poseidon hash result, [u64; 4]
   */
  private _poseidon_results: bigint[] = [];

  /**
   * Convert bigint array to base64 string in little endian order
   */
  binaryArrayToBase64(bigintArray: bigint[]) {
    return btoa(
      // Convert each BigInt to little-endian bytes and push them to the array
      bigintArray.reduce(
        (acc, bigIntValue) =>
          acc +
          String.fromCharCode(
            ...new Uint8Array(8).map((unit8, index) =>
              Number((bigIntValue >> BigInt(index * 8)) & BigInt(0xff))
            )
          ),
        ""
      )
    );
  }

  /**
   * Convert base64 string to bigint array in little endian order
   */
  base64ToBinaryArray(base64String: string) {
    const binaryString = atob(base64String);

    return generateBigIntArray(binaryString.length / 8).map((bigint, index) =>
      generateBigIntArray(8).reduce(
        (acc, u64Value, currentIndex) =>
          acc +
          (BigInt(
            binaryString
              .slice(index * 8, (index + 1) * 8)
              .charCodeAt(currentIndex)
          ) <<
            BigInt(currentIndex * 8)),
        BigInt(0)
      )
    );
  }

  /**
   * rpc synchronous request
   * @param method request methd
   * @param path path
   * @param body request body
   * @returns respoonse text
   */
  requestRPC = (
    method: string,
    path: string,
    body?: XMLHttpRequestBodyInit | Document | null
  ) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, `${this.baseURI}/${path}`, false);
    xhr.send(body);

    if (xhr.status === 200) return JSON.parse(xhr.responseText);

    throw new Error(`Request failed with status code: ${xhr.status}`);
  };

  /**
   * Get merkle tree node address
   * @param value merkle tree node index
   */
  merkle_address = (value: string | number | bigint | boolean) =>
    (this._address = BigInt(value) + (1n << MERKLE_TREE_HEIGHT) - 1n);

  /**
   * Get merkle root address hash
   * @returns [u64; 4]
   */
  merkle_getroot = () => {
    // The client already drained up all the data obtained from remote server.
    // We need to issue RPC to server again.
    if (this._root_hash.length) return this._root_hash.shift();

    const data = this.requestRPC("GET", "root");

    if (!data?.root) throw new Error("Get merkle root hash failed!");

    const binaryData = this.base64ToBinaryArray(data.root);

    this._root_hash.push(...binaryData);

    console.log("get root method, root data", binaryData);

    return this._root_hash.shift();
  };

  /**
   * Set merkle root address
   */
  merkle_setroot = (value: bigint) => {
    this._root_data.push(value);

    // merkle_setroot takes 4 u64 values and then set the root hash to this array.
    if (this._root_data.length !== 4) return;

    const hash = this.binaryArrayToBase64(this._root_data);

    this._root_data = [];

    return this.requestRPC("POST", "root", JSON.stringify({ hash }));
  };

  /**
   * Get merkle leaf data with hash
   */
  merkle_get = () => {
    if (this._leaf_hash.length) return this._leaf_hash.shift();

    // The client already drained up all the data obtained from remote server.
    // We need to issue RPC to server again.

    const { node } = this.requestRPC("GET", `leaves?index=${this._address}`);

    if (!node) throw new Error("There is no node data for this leaf");

    const { hash } = node;

    this._leaf_hash = this.base64ToBinaryArray(hash);

    console.log("In JS, merkle get hash result:", node, this._leaf_hash);

    return this._leaf_hash.shift();
  };

  /**
   * Set data in merkle tree node
   */
  merkle_set = (value: bigint) => {
    this._leaf_hash.push(value);
    // merkle_set takes 4 u64 values and then set the leaf hash to this array.
    if (this._leaf_hash.length !== 4) return;

    const hash = this.binaryArrayToBase64(this._leaf_hash);

    console.log("In JavaScript, set index value to", this._leaf_hash);

    let requestData = JSON.stringify({ index: this._address + "", hash });

    if (this._cache_data[0]) {
      const data = this.binaryArrayToBase64(this._cache_data);
      console.log("In JavaScript, cache data", this._cache_data);
      requestData = JSON.stringify({ index: this._address + "", hash, data });
    }

    this.requestRPC("POST", "leaves", requestData);

    this._cache_data = [];
    this._leaf_hash = [];
  };

  cache_set_mode = (mode: bigint) => (this._cache_mode = Number(mode));

  /**
   * Create a mapping of data to hash, store or retrieve the corresponding data mapping
   */
  cache_set_hash = (value: bigint) => {
    this._cache_hash.push(value);

    if (this._cache_hash.length !== 4) return;

    const isFetching = this._cache_mode === Mode.FETCH;

    console.log(
      this._cache_data,
      this._cache_hash,
      this._cache_mode,
      "=====set hash"
    );

    const base64Hash = this.binaryArrayToBase64(this._cache_hash);
    const base64Data =
      !isFetching && this._cache_data
        ? this.binaryArrayToBase64(this._cache_data)
        : undefined;

    const datahashrecord = JSON.stringify({
      data: base64Data,
      hash: base64Hash,
      mode: CACHE[this._cache_mode],
    });

    const { data } = this.requestRPC("POST", "datahashrecord", datahashrecord);

    console.log(
      "In JavaScript, fetch cache",
      "data:",
      data,
      "-cache_hash:",
      this._cache_hash,
      "-cache_data:",
      this._cache_data,
      "mode",
      this._cache_mode
    );

    this._cache_hash = [];
    this._cache_data = isFetching ? this.base64ToBinaryArray(data) : [];
  };

  cache_fetch_data = () => {
    if (this._cache_mode !== Mode.FETCH) return this._cache_data.shift();

    this._cache_mode = Mode.STORE;

    const length = BigInt(this._cache_data.length);
    console.log("fetch success!length: ", length, "data:", this._cache_data);
    return length;
  };

  cache_store_data = (value: bigint) => {
    this._cache_data.push(value);
  };

  poseidon_new = () => (this._poseidon_buffer = []);

  poseidon_push = (value: bigint) => this._poseidon_buffer.push(value);

  poseidon_finalize = () => {
    if (this._poseidon_results.length) return this._poseidon_results.shift();

    const base64 = this.binaryArrayToBase64(this._poseidon_buffer);
    console.log(
      "In JavaScript, poseidon buffer",
      this._poseidon_buffer,
      base64
    );

    const { hash } = this.requestRPC(
      "POST",
      "poseidon",
      JSON.stringify({ data: base64 })
    );
    if (!hash) return;
    // TODO: we may need to evict some data hashes here.
    // Otherwise the space used by this map will keep growing.
    const poseidon_results_hash_array = this.base64ToBinaryArray(hash);

    this._poseidon_results.push(...poseidon_results_hash_array);

    console.log("In JavaScript, poseidon results", this._poseidon_results);

    return this._poseidon_results.shift();
  };
}
