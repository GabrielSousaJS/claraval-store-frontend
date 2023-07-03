import "./styles.css";

type Props = {
  name: string;
};

export default function CategoryBadge({ name }: Props) {
  return <div className="category-badge-container">{name}</div>;
}
