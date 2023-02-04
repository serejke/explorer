/* tslint:disable */
/* eslint-disable */
/**
 * Explorer
 * Explorer API description
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface BlockchainStatusDto
 */
export interface BlockchainStatusDto {
    /**
     * 
     * @type {number}
     * @memberof BlockchainStatusDto
     */
    latestBlock?: number;
    /**
     * 
     * @type {number}
     * @memberof BlockchainStatusDto
     */
    blocks: number;
}

/**
 * Check if a given object implements the BlockchainStatusDto interface.
 */
export function instanceOfBlockchainStatusDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "blocks" in value;

    return isInstance;
}

export function BlockchainStatusDtoFromJSON(json: any): BlockchainStatusDto {
    return BlockchainStatusDtoFromJSONTyped(json, false);
}

export function BlockchainStatusDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockchainStatusDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'latestBlock': !exists(json, 'latestBlock') ? undefined : json['latestBlock'],
        'blocks': json['blocks'],
    };
}

export function BlockchainStatusDtoToJSON(value?: BlockchainStatusDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'latestBlock': value.latestBlock,
        'blocks': value.blocks,
    };
}

