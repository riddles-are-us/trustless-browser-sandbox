/* tslint:disable */
/* eslint-disable */
/**
* Step function receives a encoded command and changes the global state accordingly
* @param {bigint} command
*/
export function step(command: bigint): void;
/**
* @returns {boolean}
*/
export function get_state(): boolean;
/**
* @param {bigint} seed
*/
export function init(seed: bigint): void;
/**
* @returns {bigint}
*/
export function zkmain(): bigint;
