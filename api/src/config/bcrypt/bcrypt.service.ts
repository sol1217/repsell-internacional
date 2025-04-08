import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  // Default number of salt rounds used for hashing passwords
  private readonly saltRounds = 10;

  /**
   * Hashes a password using bcrypt with a predefined number of salt rounds.
   *
   * @param {string} password - The plaintext password to hash.
   * @returns {Promise<string>} - The hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compares a plaintext password with a hashed password.
   *
   * @param {string} password - The plaintext password to compare.
   * @param {string} hash - The hashed password to compare against.
   * @returns {Promise<boolean>} - Returns `true` if the password matches the hash, otherwise `false`.
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}