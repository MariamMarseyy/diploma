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
//import { AutoMap } from '@automapper/classes';

/**
 *
 */
tableOptions.tableName = 'portfolio';

@Table({ ...tableOptions, paranoid: true })
export class Portfolio extends Model<DeepPartial<Portfolio>> {
  @IsUUID('4')
  // @AutoMap()
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  public id: string;

  // @AutoMap()
  @Column({ type: DataType.STRING, allowNull: false })
  exchange: string;

  // @AutoMap()
  @Column({ type: DataType.STRING, allowNull: false })
  api_key: string;

  // @AutoMap()
  @Column({ type: DataType.STRING, allowNull: false })
  api_secret: string;
  /**
   * Relations
   */
  @BelongsTo(() => User)
  user: User;
  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  user_id: string;
}
