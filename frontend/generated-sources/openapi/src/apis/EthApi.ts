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
  EthBlockDto,
  EthTransactionDto,
} from '../models';
import {
    EthBlockDtoFromJSON,
    EthBlockDtoToJSON,
    EthTransactionDtoFromJSON,
    EthTransactionDtoToJSON,
} from '../models';

export interface FindLatestBlocksRequest {
    limit: number;
}

export interface FindOneBlockRequest {
    id: string;
}

export interface FindOneTransactionRequest {
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
     * @param {number} limit 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EthApiInterface
     */
    findLatestBlocksRaw(requestParameters: FindLatestBlocksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<EthBlockDto>>>;

    /**
     * 
     * 
     */
    findLatestBlocks(requestParameters: FindLatestBlocksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<EthBlockDto>>;

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

}

/**
 * 
 */
export class EthApi extends runtime.BaseAPI implements EthApiInterface {

    /**
     * 
     * 
     */
    async findLatestBlocksRaw(requestParameters: FindLatestBlocksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<EthBlockDto>>> {
        if (requestParameters.limit === null || requestParameters.limit === undefined) {
            throw new runtime.RequiredError('limit','Required parameter requestParameters.limit was null or undefined when calling findLatestBlocks.');
        }

        const queryParameters: any = {};

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
    async findLatestBlocks(requestParameters: FindLatestBlocksRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<EthBlockDto>> {
        const response = await this.findLatestBlocksRaw(requestParameters, initOverrides);
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

}
