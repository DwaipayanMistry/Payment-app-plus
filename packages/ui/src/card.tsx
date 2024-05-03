

interface CardProp {
  title: string;
  children?: React.ReactNode;
};
export function Card({ title, children }: CardProp): JSX.Element {
  return (
    <div className="border div-4">
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <div>
        {children}
      </div>
    </div>
  );
}