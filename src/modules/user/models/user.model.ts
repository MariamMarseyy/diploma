import {
  AfterCreate,
  AfterSave,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  HasMany,
  HasOne,
  IsUUID,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { UserDetails } from '@modules/user/models/user-details.model';
import { Portfolio } from '@modules/portfolio/models/portfolio.model';
/**
 *
 */
tableOptions.tableName = 'user';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Scopes(() => ({
  withoutPassword: {
    attributes: { exclude: ['password'] },
  },
}))
@Table({ ...tableOptions, paranoid: true })
export class User extends Model<DeepPartial<User>> {
  @IsUUID('4')
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({
    validate: { isEmail: true },
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password: string;

  /**
   * Relations
   */
  @HasOne(() => UserDetails)
  userDetails: UserDetails;

  @HasMany(() => Portfolio)
  portfolios: Portfolio[];

  // token?: string;

  /**
   * @description Hooks
   * @param user
   */
  @BeforeCreate
  @BeforeUpdate
  public static async hashPassword(user: User) {
    if (user.password) {
      const salt = genSaltSync(12);
      user.password = hashSync(user.password, salt);
    }
  }

  @AfterSave
  @AfterCreate
  static removePassword(user: any) {
    if (user.length === undefined) user.password = undefined;
    else user.forEach((_user: User) => (_user.password = undefined));
    return user;
  }

  /**
   * Verify user password
   *
   * @param password
   */
  verifyPassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
