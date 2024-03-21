/* tslint:disable */
/* eslint-disable */
/**
* @returns {BigUint64Array}
*/
export function clip(): BigUint64Array;
/**
* @returns {bigint}
*/
export function zkmain(): bigint;
/**
* Step function receives a encoded command and changes the global state accordingly
* @param {bigint} command
*/
export function step(command: bigint): void;
/**
* @param {bigint} account
* @param {bigint} r0
* @param {bigint} r1
* @param {bigint} r2
* @param {bigint} r3
*/
export function load(account: bigint, r0: bigint, r1: bigint, r2: bigint, r3: bigint): void;
/**
* @param {bigint} seed
*/
export function init(seed: bigint): void;
/**
* @returns {string}
*/
export function get_state(): string;
