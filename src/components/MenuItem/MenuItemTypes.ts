export interface IMenuItemProps {
  title: string;
  subItems: {
    id: string;
    path: string;
    userType: string;
    icon: string;
    name: string;
  }[];
}
