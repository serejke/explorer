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


import * as runtime from '../runtime';
import type {
  BlockchainStatusDto,
  EthBlockDto,
  EthTransactionDto,
} from '../models';
import {
    BlockchainStatusDtoFromJSON,
    BlockchainStatusDtoToJSON,
    EthBlockDtoFromJSON,
    EthBlockDtoToJSON,
    EthTransactionDtoFromJSON,
    EthTransactionDtoToJSON,
} from '../models';

export interface FindBlocksRequest {
    from: number;
    limit: number;
}

export interface FindOneBlockRequest {
    id: string;
}

export interface FindOneTransactionRequest {
    hash: string;
}

export interface FindTransactionsOfBlockRequest {
    hash: string;
}

/**
 * EthApi - interface
 * 
 * @export
 * @interface EthApiInterface
 */
export interface EthApiInterface {
    /**
     * 
     * @summary 
     * @param {number} from 
     * @param {number} limit 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EthApiInterface
     */
    findBlocksRaw(requestParameters: FindBlocksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<EthBlockDto>>>;

    /**
     * 
     * 
     */
    findBlocks(requestParameters: FindBlocksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<EthBlockDto>>;

    /**
     * 
     * @summary 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EthApiInterface
     */
    findOneBlockRaw(requestParameters: FindOneBlockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EthBlockDto>>;

    /**
     * 
     * 
     */
    findOneBlock(requestParameters: FindOneBlockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EthBlockDto>;

    /**
     * 
     * @summary 
     * @param {string} hash 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EthApiInterface
     */
    findOneTransactionRaw(requestParameters: FindOneTransactionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EthTransactionDto>>;

    /**
     * 
     * 
     */
    findOneTransaction(requestParameters: FindOneTransactionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EthTransactionDto>;

    /**
     * 
     * @summary 
     * @param {string} hash 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EthApiInterface
     */
    findTransactionsOfBlockRaw(requestParameters: FindTransactionsOfBlockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<EthTransactionDto>>>;

    /**
     * 
     * 
     */
    findTransactionsOfBlock(requestParameters: FindTransactionsOfBlockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<EthTransactionDto>>;

    /**
     * 
     * @summary 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EthApiInterface
     */
    getBlockchainStatusRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BlockchainStatusDto>>;

    /**
     * 
     * 
     */
    getBlockchainStatus(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BlockchainStatusDto>;

}

/**
 * 
 */
export class EthApi extends runtime.BaseAPI implements EthApiInterface {

    /**
     * 
     * 
     */
    async findBlocksRaw(requestParameters: FindBlocksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<EthBlockDto>>> {
        if (requestParameters.from === null || requestParameters.from === undefined) {
            throw new runtime.RequiredError('from','Required parameter requestParameters.from was null or undefined when calling findBlocks.');
        }

        if (requestParameters.limit === null || requestParameters.limit === undefined) {
            throw new runtime.RequiredError('limit','Required parameter requestParameters.limit was null or undefined when calling findBlocks.');
        }

        const queryParameters: any = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/eth/blocks`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(EthBlockDtoFromJSON));
    }

    /**
     * 
     * 
     */
    async findBlocks(requestParameters: FindBlocksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<EthBlockDto>> {
        const response = await this.findBlocksRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * 
     */
    async findOneBlockRaw(requestParameters: FindOneBlockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EthBlockDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling findOneBlock.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/eth/block/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EthBlockDtoFromJSON(jsonValue));
    }

    /**
     * 
     * 
     */
    async findOneBlock(requestParameters: FindOneBlockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EthBlockDto> {
        const response = await this.findOneBlockRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * 
     */
    async findOneTransactionRaw(requestParameters: FindOneTransactionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EthTransactionDto>> {
        if (requestParameters.hash === null || requestParameters.hash === undefined) {
            throw new runtime.RequiredError('hash','Required parameter requestParameters.hash was null or undefined when calling findOneTransaction.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/eth/transaction/{hash}`.replace(`{${"hash"}}`, encodeURIComponent(String(requestParameters.hash))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EthTransactionDtoFromJSON(jsonValue));
    }

    /**
     * 
     * 
     */
    async findOneTransaction(requestParameters: FindOneTransactionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EthTransactionDto> {
        const response = await this.findOneTransactionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * 
     */
    async findTransactionsOfBlockRaw(requestParameters: FindTransactionsOfBlockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<EthTransactionDto>>> {
        if (requestParameters.hash === null || requestParameters.hash === undefined) {
            throw new runtime.RequiredError('hash','Required parameter requestParameters.hash was null or undefined when calling findTransactionsOfBlock.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/eth/transaction/byBlock/{hash}`.replace(`{${"hash"}}`, encodeURIComponent(String(requestParameters.hash))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(EthTransactionDtoFromJSON));
    }

    /**
     * 
     * 
     */
    async findTransactionsOfBlock(requestParameters: FindTransactionsOfBlockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<EthTransactionDto>> {
        const response = await this.findTransactionsOfBlockRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     * 
     */
    async getBlockchainStatusRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BlockchainStatusDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/eth/status`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BlockchainStatusDtoFromJSON(jsonValue));
    }

    /**
     * 
     * 
     */
    async getBlockchainStatus(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BlockchainStatusDto> {
        const response = await this.getBlockchainStatusRaw(initOverrides);
        return await response.value();
    }

}
