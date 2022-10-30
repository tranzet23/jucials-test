import React, { useMemo } from 'react';
import { Button, Card, CardBody, Input } from 'reactstrap';

interface IUserRolesCard {
  item: any;
  index: number;
  values: any;
  handler: any;
  setHandler: any;
}

export const UserRolesCard = React.memo(
  ({ item, values, index, handler, setHandler }: IUserRolesCard) => {
    const selectAll: boolean = useMemo(() => {
      if (item.children.length !== 0) {
        let selectItemsCount = 0;
        item.children.forEach(element => {
          if (element.access) selectItemsCount++;
        });
        if (selectItemsCount === item.children.length) return false;
        return true;
      }
      return true;
    }, [item]);

    const selectAllHandler = () => {
      item.children.forEach((item, j) => {
        if (item.title) {
          setHandler(`rights[${index}].children[${j}].access`, selectAll);
        }
      });
    };

    return (
      <Card className='userroles-form-item-wrapper'>
        <CardBody>
          <div className='userroles-form-item-header-wrapper'>
            <div className='userroles-form-item-header-name'>
              {values.title}
            </div>
            <div className='userroles-form-item-header-btn-wrapper'>
              <Button
                className='userroles-form-item-header-btn'
                color='primary'
                onClick={selectAllHandler}
              >
                Выбрать все
              </Button>
            </div>
          </div>
          <div className='userroles-form-item-checkboxes-wrapper'>
            {item.children &&
              item.children.map(
                (item, i) =>
                  item.title && (
                    <div
                      key={`${item.name}_${item.right_id}`}
                      className='userroles-form-item-label'
                    >
                      <Input
                        type='checkbox'
                        checked={values?.children[i]?.access}
                        onChange={handler}
                        name={`rights[${index}].children[${i}].access`}
                        id={`rights[${index}].children[${i}].access`}
                      />
                      <label
                        className='userroles-form-item-checkbox-name'
                        htmlFor={`rights[${index}].children[${i}].access`}
                      >
                        {item.title}
                      </label>
                    </div>
                  ),
              )}
          </div>
        </CardBody>
      </Card>
    );
  },
);
