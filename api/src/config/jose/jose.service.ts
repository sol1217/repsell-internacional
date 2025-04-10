import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtVerify, SignJWT } from 'jose';

@Injectable()
export class JoseService {
  private secretKey: Uint8Array;

  constructor(private readonly configService: ConfigService) {
    const JWT_SECRET_KEY = this.configService.getOrThrow<string>('JWT_SECRET_KEY')

    this.secretKey = this.generateUint8ArrayFromString(JWT_SECRET_KEY);
  }

  /**
   * Generates a Uint8Array from a string or Base64 encoded array.
   *
   * @param {string} key - text key
   * @returns {Uint8Array}
   */
  private generateUint8ArrayFromString(key: string): Uint8Array {
    return new TextEncoder().encode(key);
  }

  /**
   * Generates a signed JWT.
   *
   * @param {object} payload - The payload to include in the token.
   * @param {string} expiresIn - Expiration time of the token (default: '8h').
   * @returns A signed JWT.
   */
  async generateSignedToken(
    payload: object,
    expiresIn: string = '8h',
  ): Promise<string> {
    return await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(expiresIn)
      .sign(this.secretKey);
  }

  /**
   * Decodes a signed JWT and validates its signature.
   *
   * @param token - The signed JWT to decode.
   * @returns The payload of the JWT.
   * @throws Error if the token is invalid or expired.
   */
  async decodeSignedToken<T extends object>(token: string): Promise<T> {
    try {
      const { payload } = await jwtVerify(token, this.secretKey);
      return payload as T;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * Validates the signature of a signed JWT.
   *
   * @param token - The signed JWT to validate.
   * @returns {boolean} - true` if the signature is valid, otherwise `false`.
   */
  async validateTokenSignature(token: string): Promise<boolean> {
    try {
      await jwtVerify(token, this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

}
