import { ICellListIconLinkProps } from './CellListIconLinkTypes';

const CellListIconLink = (props: ICellListIconLinkProps) => {
  const { icon, link, title } = props;
  return (
    <a
      href={link}
      className={`icon-link ${icon}`}
      style={{ pointerEvents: 'none' }}
    >
      {title}
    </a>
  );
};

export default CellListIconLink;
