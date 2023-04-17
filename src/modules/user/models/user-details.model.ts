import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  Table,
} from 'sequelize-typescript';
import { tableOptions } from '@common/database/config/table-options';
import { User } from '@modules/user/models/user.model';

/**
 *
 */
tableOptions.tableName = 'user_details';

@Table({ ...tableOptions, paranoid: true })
export class UserDetails extends Model<DeepPartial<UserDetails>> {
  @IsUUID('4')
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  // @Column({ type: DataType.STRING, allowNull: true })
  // referralId: string;


  /**
   * Relations
   */
  @BelongsTo(() => User)
  user: User;
  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  userId: string;
}
