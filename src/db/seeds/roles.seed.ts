import { RoleEntity } from '@features/user/entities/role.entity';
import { RoleEnum } from '@features/user/enums/role.enum';
import { DataSource } from 'typeorm';

export async function createRoles(datasource: DataSource) {
  return datasource
    .createQueryBuilder()
    .insert()
    .into(RoleEntity)
    .values([
      { name: 'Externo', code: RoleEnum.EXTERNAL_USER },
      { name: 'Administrador', code: RoleEnum.ADMIN_USER }
    ])
    .orUpdate(
      ["name"],
      ["code"],
      { skipUpdateIfNoValuesChanged: true }
    )
    .execute();
}