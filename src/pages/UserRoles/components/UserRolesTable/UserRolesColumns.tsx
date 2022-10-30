import UserRolesAddBtn from '../UserRolesBtns/UserRolesAddBtn';
import UserRolesDeleteBtn from '../UserRolesBtns/UserRolesDeleteBtn';
import UserRolesEditBtn from '../UserRolesBtns/UserRolesEditBtn';

function checkAccessRoleForUser(row) {
  let result: string[] = [];
  if (row) {
    for (let i = 0; i < row.length; i++) {
      const elementI = row[i];

      for (let j = 0; j < elementI.children.length; j++) {
        const itemJ = elementI.children[j];
        if (itemJ['access'] === true) {
          result.push(elementI.title);
          break;
        }
      }
    }
  }
  return result;
}

export const columnsTable = [
  {
    dataField: 'name',
    text: 'Название роли',
  },
  {
    dataField: 'rights',
    text: 'Доступ к подсистемам',
    formatter: cell => {
      const accessList = checkAccessRoleForUser(cell);

      return (
        accessList &&
        accessList.map((item, index) => {
          return (
            <span
              className='userroles-table-item-role-span'
              key={`${item}_${index}`}
            >
              {item}
            </span>
          );
        })
      );
    },
  },
  {
    dataField: 'roleBtns',
    headerClasses: 'table__header-button-wrapper',
    text: '',
    headerFormatter: () => {
      return <UserRolesAddBtn />;
    },
    formatter: (_, row) => {
      return (
        <div className='userroles-table-rowbtns-wrapper'>
          <UserRolesEditBtn currentId={row.role_id} />
          <UserRolesDeleteBtn deleteId={row.role_id} />
        </div>
      );
    },
  },
];
